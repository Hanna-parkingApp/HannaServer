const User = require('../../db/schemas/User');
const refreshToken = require('../../Services/token.service')
const userService = require('../../services/user.service');

async function registerController(req, res) {
    try {
        const { email, password, fullName, } = req.body;
        if (!(email && password && fullName)) {
            return res.status(400).json({ message:"All Fields must be provided"})
        }
    
        const existingUser = await userService.getUser({email: email});
        //User.findOne({ email }).exec();
        if (existingUser.length > 0) {
            return res.status(400).json({ message:"Email already in use"});
        }
    
        const newUser = await userService.createUser({
            email,
            password,
            fullName,
            points: 0 
        })
    
        const rToken = await refreshToken.createRefreshToken(newUser._id);
        const tokens = {}
        tokens.accessToken = refreshToken.generateJWT(newUser.email);
        tokens.refreshToken = rToken.token;

        newUser.token = tokens.refreshToken;
        newUser.save();
    
        return res.status(200).json({
            "message": "User created successfully.",
            tokens
        });
    
    }
    catch (err) {
        console.error(err);
    }
}

module.exports = registerController;