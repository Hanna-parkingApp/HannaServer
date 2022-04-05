const jwt = require('jsonwebtoken');
const createToken = require('../util/CreateToken');
const dbHelpers = require('../util');
const generalHelper = require('../util/general.helper');
const User = require('../db/schemas/User');
const RefreshToken = require('../db/schemas/RefreshToken');

async function refreshToken(token) {
    const refreshToken = await getRefreshToken(token);
    const user = jwt.verify(token, config.REFRESH_TOKEN_KEY);

    const newToken = createToken(user, 'refresh');
    const newRefreshToken = await RefreshToken.create({
        user: user._id,
        token: newToken,
        expires: generalHelper.addDays(Date.now(), process.env.REFRESH_TOKEN_EXPIRATION),
    })

    refreshToken.revoked = Date.now();
    refreshToken.replacedByToken = newRefreshToken.token;
    await refreshToken.save();
    
    const accessToken = createToken(user, 'access');

    return { 
        accessToken,
        refreshToken: newRefreshToken.token
    };
}

async function revokeToken(token) {
    const refreshToken = await getRefreshToken(token);

    // revoke token and save
    refreshToken.revoked = Date.now();
    await refreshToken.save();
}

async function getRefreshToken(token) {
    const refreshToken = await RefreshToken.findOne({ token }).exec();
    if (!refreshToken || !refreshToken.isActive) {
        return false;
    }
    return refreshToken;
}