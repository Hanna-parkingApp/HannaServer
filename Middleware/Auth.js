const jwt = require('jsonwebtoken');
const config = process.env;
const refreshToken = require('../Services/token.service')
const userService = require('../services/user.service');

const verifyToken = async (req, res, next) => {
    const token = req.body.token || req.query.token || req.headers["x-access-token"];

    if (!token) {
        return res.status(400).send("Token is required");
    }

    try {
        const decoded = jwt.verify(token, config.ACCESS_TOKEN_KEY);
        req.user = decoded;
    }
    catch (err) {
        if (err["expiredAt"] < Date.now()) {
            if (!req.headers["x-refresh-token"]) {
                return res.status(400).send("Refresh token is required");
            }
            const userArray = userService.getUser({token: req.headers["x-refresh-token"]});
            const tokens = await refreshToken.refreshToken(req.headers["x-refresh-token"], userArray[0]);
            req.headers["x-refresh-token"] = tokens.refreshToken;
            req.headers["x-access-token"] = tokens.accessToken;
            req.user = userArray[0];
            return next();
        }
        return res.status(400).send("invalid token");
    }
    return next();
}

module.exports = verifyToken;