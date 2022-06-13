const jwt = require('jsonwebtoken');
const config = process.env;
const refreshTokenService = require('../Services/token.service')
const userService = require('../services/user.service');

const verifyToken = async (req, res, next) => {
    console.log("headers: ", req.headers);
    const token = req.body.token || req.query.token || req.headers["x-access-token"];
    const refreshtoken = req.body.refreshToken || req.query.refreshToken || req.headers["x-refresh-token"];

    if (!token || !refreshtoken) {
        return res.status(400).send("Token is required");
    }

    console.log("token is exist");

    try {
        const decoded = jwt.verify(token, config.ACCESS_TOKEN_KEY);
        req.user = decoded;
        console.log("token is decoded");
    }
    catch (err) {
        console.log("catch after decode")
        if (err["expiredAt"] < Date.now()) {
            if (!req.headers["x-refresh-token"]) {
                return res.status(400).send("Refresh token is required");
            }
            const userArray = await userService.getUser({token: req.headers["x-refresh-token"]});
            console.log("user array: ", userArray);
            if (userArray.length == 0) {
                return  res.status(404).send("User with token not found");
            } 
            const tokens = await refreshTokenService.refreshToken(req.headers["x-refresh-token"], userArray[0]);
            console.log('auth middle token: ', tokens)
            req.headers["x-refresh-token"] = tokens.refreshToken;
            req.headers["x-access-token"] = tokens.accessToken;
            req.user = userArray[0];
            req.flag = true;
            return next();
        }
        return res.status(400).send("invalid token");
    }
    return next();
}

module.exports = verifyToken;