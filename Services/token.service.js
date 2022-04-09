const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const dbHelpers = require('../util/db.helper');
const generalHelper = require('../util/general.helper');
const User = require('../db/schemas/User');
const RefreshToken = require('../db/schemas/RefreshToken');

async function refreshToken(token, user) {
    const refreshToken = await getRefreshToken(token);
    if (!refreshToken) {
        return false;
    }

    if(user.token != token) {
        return false;
    }

    console.log(user)
    const newRefreshToken = await createRefreshToken(user._id);

    refreshToken.revoked = Date.now();
    refreshToken.replacedByToken = newRefreshToken.token;
    await refreshToken.save();
    user.token = newRefreshToken.token;
    await user.save();
    
    const accessToken = generateJWT(user._doc.email);

    return { 
        accessToken: accessToken,
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

async function createRefreshToken(userId) {
    const token = generateTokenString();
    const refreshToken = await RefreshToken.create({
        user: userId,
        token: token,
        expires: new Date(generalHelper.addDays(Date.now(), parseInt(process.env.REFRESH_TOKEN_EXPIRATION))),
    });
    return refreshToken;
}

function generateTokenString() {
    return crypto.randomBytes(40).toString('hex');
}

function generateJWT(userEmail) {
    return jwt.sign(
        {userEmail: userEmail}, 
        process.env.ACCESS_TOKEN_KEY, 
        {expiresIn: process.env.ACCESS_TOKEN_EXPIRATION}
    );
}

module.exports = {
    refreshToken,
    revokeToken,
    getRefreshToken,
    createRefreshToken,
    generateJWT
}