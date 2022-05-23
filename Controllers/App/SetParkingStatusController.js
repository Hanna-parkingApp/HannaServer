const { updateUserParking } = require('../../Services/userParking.service')

async function setParkingStatusController(req, res) {
    try {
        const {userParkingId}  = req.body;

        if (!(userParkingId)) {
            return res.status(400).json({ message:"User parking id must be provided"})
        }

        const userParking = await updateUserParking(
        { 
            _id: userParkingId 
        },
        {
            isAvail: false
        });

        if (!userParking) {
            return res.status(500).json({ message:"parking wasn't found in DB"})
        }

        const parkingStatus = userParking[0].isAvail;
        console.log("parkingStatus: ", parkingStatus)
        return res.status(200).json({
            message: "Successfully update parking status",
        })
    
    } catch (e) {
        return res.status(500).json({ message: "problem getting user parking status from server"})
    }
}

module.exports = setParkingStatusController;