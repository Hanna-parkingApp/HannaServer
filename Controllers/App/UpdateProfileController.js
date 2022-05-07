const {updateUser} = require('../../Services/user.service');
const {updateCar} = require('../../Services/car.service');
const {getUser} = require('../../Services/user.service');

async function updateProfileController(req, res) {
    try {
        console.log(req.body);
        const { email, fullName, carNumber, carMaker, carModel, carColor } = req.body;

        if (!(email && fullName && carNumber && carMaker && carModel && carColor)) {
            return res.status(400).json({ message:"All Fields must be provided"})
        }
        
        const existingUser = await getUser({ email });
        if (!existingUser) {
            return res.status(400).json({ message: "Email is not valid"});
        }

        const updatedCar = await updateCar(
            {
                _id: existingUser[0].cars[0]
            },
            {
                registrationNumber: carNumber,
                make: carMaker,
                model: carModel,
                color: carColor
            }
        )
        if (!updatedCar) {
            return res.status(500).json({ message: "Error updating car details!"});
        }

        const updatedUser = await updateUser(
            {
            _id: existingUser[0]._id,
            },
            {
               email,
               fullName,
               cars: updatedCar._id 
            }
        )

        if (!updatedUser) {
            return res.status(500).json({ message: "Error updating user details!"});
        }

        return res.status(200).json({
            "message": "User updated successfully.",
        });
    
    } catch (e) {
        console.log(e);
    }
}

module.exports = updateProfileController;