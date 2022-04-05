const createToken = require('../../util/CreateToken');
const User = require('../../db/schemas/User');

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
                const token = createToken(user, 'access');

                const tokens = {}
                tokens.accessToken = createToken(user, 'access');
                tokens.refreshToken = createToken(user, 'refresh');

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