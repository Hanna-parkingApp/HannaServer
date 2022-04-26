const User = require('../../db/schemas/User');
const RefreshToken = require('../../db/schemas/RefreshToken');
const refreshToken = require('../../Services/token.service');
const userService = require('../../services/user.service');

async function loginController(req, res) {
    try {
        const { email, password } = req.body;

        // Validate user input
        if(!(email && password)) {
            return res.status(400).json({message: "Failed to login, Please enter email and password"});
        }

        const userArray = await userService.getUser({email: email});
        if (userArray[0]) {
            const user = userArray[0];
            if (password == user.password) {
                userId = user.id;
                const userRefreshToken = await RefreshToken.findOne({ user: userId, revoked: undefined }).exec();
                const tokens = await refreshToken.refreshToken(userRefreshToken.token, user)
                if (!tokens) {
                    return res.status(401).json({message: "Invalid Token bla"});
                } 
        
                res.status(200).json({
                    message: "login successful",
                    tokens
                });
            }
            else {
                return res.status(400).json({message: "Failed to login, Wrong Password"});
            }
        }
        else {
            return res.status(404).json({message: "Failed to login, User not found"});
        }
    }
    catch (err) {
        console.error(err);
    }

}

module.exports = loginController;