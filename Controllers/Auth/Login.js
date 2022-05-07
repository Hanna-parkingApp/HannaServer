const User = require('../../db/schemas/User');
const RefreshToken = require('../../db/schemas/RefreshToken');
const refreshToken = require('../../Services/token.service')
const {getCar} = require('../../Services/car.service');

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
                let userId = user.id;
                const userRefreshToken = await RefreshToken.findOne({ user: userId, revoked: undefined }).exec();
                const tokens = await refreshToken.refreshToken(userRefreshToken.token, user)
                if (!tokens) {
                    return res.status(401).json({message: "Invalid Token bla"});
                }
                
                let car_user_id = user.cars[0];
                console.log("car_user_id:", car_user_id);
                const carDetail = await getCar({_id: car_user_id});
                if (!carDetail) {
                    return res.status(500).json({message: "Can not get car detail from user"});
                }

                res.status(200).json({
                    message: "login successful",
                    tokens,
                    user,
                    carDetail
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