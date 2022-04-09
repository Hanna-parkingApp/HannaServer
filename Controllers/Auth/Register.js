const User = require('../../db/schemas/User');
const refreshToken = require('../../Services/token.service')

async function registerController(req, res) {
    try {
        const { email, password, fullName, } = req.body;
        if (!(email && password && fullName)) {
            return res.status(400).json({ message:"All Fields must be provided"})
        }
    
        const existingUser = await User.findOne({ email }).exec();
        if (existingUser) {
            return res.status(400).json({ message:"Email already in use"});
        }
    
        const newUser = await User.create({ 
            email,
            password,
            fullName,
            points: 0
        });
    
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