const User = require('../../db/schemas/User');
const refreshToken = require('../../Services/token.service')
const userService = require('../../services/user.service');
const {createCar} = require('../../Services/car.service');
const {createUser} = require('../../Services/user.service');

async function registerController(req, res) {
    try {
        const { email, password, fullName, carNumber, carMaker, carModel, carColor } = req.body;
        if (!(email && password && fullName && carNumber && carMaker && carModel && carColor)) {
            return res.status(400).json({ message:"All Fields must be provided"})
        }
    
        const existingUser = await userService.getUser({email: email});
        //User.findOne({ email }).exec();
        if (existingUser.length > 0) {
            return res.status(400).json({ message:"Email already in use"});
        }

        const newCar = await createCar({
            registrationNumber: carNumber,
            make: carMaker,
            model: carModel,
            color: carColor 
        });

        if (!newCar) {
            return res.status(500).json({ message: "Error while uploading new car to db"})
        }

        console.log("####car: ", newCar);
        let carID = newCar._id;

    
        const newUser = await createUser({ 
            email,
            password,
            fullName,
            points: 0,
            cars: carID,
        });

        if (!newUser) {
            return res.status(500).json({ message: "Error while creating new user to db"})
        }

        console.log("####user: ", newCar);
        
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