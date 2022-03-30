const jwt = require('jsonwebtoken');
const config = process.env;

const verifyToken = (req, res, next) => {
    const token = req.body.token || req.query.token || req.headers["x-access-token"];
    if (!token) {
        res.status(400).send("Token is required");
    }

    try {
        const decoded = jwt.verify(token, config.TOKEN_KEY);
        req.user = decoded;
    }
    catch (err) {
        res.status(400).send("invalid token");
    }
    return next();
}

module.exports = verifyToken;