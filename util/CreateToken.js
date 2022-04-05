const jwt = require('jsonwebtoken');

function CreateToken(user, type) {
    const tokenConfig = {};
    const returnToken = {};

    if (type == 'access') {
        tokenConfig.tokenKey = process.env.ACCESS_TOKEN_KEY;
        tokenConfig.expriartion = process.env.ACCESS_TOKEN_EXPIRATION;
    } 
    else if (type == 'refresh') {
        tokenConfig.tokenKey = process.env.REFRESH_TOKEN_KEY;
        tokenConfig.expriartion = process.env.REFRESH_TOKEN_EXPIRATION;
    }

    try {
        returnToken.token = jwt.sign( {...user}, tokenConfig.tokenKey, {expiresIn: tokenConfig.expriartion});
    } catch (err) {
        console.error(err);
        return false;
    }
    
    return returnToken.token;
}

module.exports = CreateToken;