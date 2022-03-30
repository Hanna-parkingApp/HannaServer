const User = require('../../db/schemas/User');
const jwt = require('jsonwebtoken')

async function registerController(req, res) {
    try {
        const { email, password, fullName, } = req.body;
        if (!(email && password && fullName)) {
            res.status(400).json({ error:"All Fields must be provided"})
        }
    
        const existingUser = await User.findOne({ email }).exec();
        if (existingUser) {
            res.status(400).json({ error:"Email already in use"});
        }
    
        const newUser = await User.create({ 
            email,
            password,
            fullName,
            points: 0
        });
    
        const token = jwt.sign(
            { user_id: newUser._id, email },
            process.env.TOKEN_KEY,
            { expiresIn: "2h" }
        );
    
        newUser.token = token;
        res.status(200).json({
            "message": "User created successfully.",
            User: newUser
        });
    
    }
    catch (err) {
        console.error(err);
    }
}

module.exports = registerController;