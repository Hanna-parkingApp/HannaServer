const { getUser } = require('../../Services/user.service');
const { deleteUserParking } = require('../../Services/userParking.service')

async function deleteParkingController (req,res) {
    console.log("DeleteParkingController: delete parking by the user id");

    try {
        console.log('req body: ', req.body);
        const { userParkingId } = req.body;
        if (!userParkingId) {
            return res.status(400).json({ message:"User parkingId must be provided"})
        }
        
        const isDeleted = await deleteUserParking({ _Id: userParkingId });
        if (!isDeleted) {
            return res.status(500).json({message: "Delete parking error"});
        }

        return res.status(200).json({
            message: 'Delete parking successfully',
            isDeleted
        });
    
    } catch(e) {
        console.log(e);
    }

}

module.exports = deleteParkingController;