const User = require('../../db/schemas/User');
const jwt = require('jsonwebtoken');

async function loginController(req, res) {
    try {
        const { email, password } = req.body;

        // Validate user input
        if(!(email && password)) {
            return res.status(400).json({message: "Failed to login, Please enter email and password"});
        }

        const user = await User.findOne({ email });
        if (user) {
            if (password == user.password) {
                const token = jwt.sign(
                    { user_id: user._id, email },
                    process.env.TOKEN_KEY,
                    { expiresIn: "2h" }
                );

                user.token = token;
                res.status(200).json({
                    message: "login successful",
                    user: user
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