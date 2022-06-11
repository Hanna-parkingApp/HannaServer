const { getUserParking } = require('../../Services/userParking.service')

async function checkParkingStatusController(req, res) {
    try {
        console.log("CheckParkingStatusController: The share-parking-person check if parking available");
        const {userParkingId}  = req.body;
        

        if (!(userParkingId)) {
            return res.status(400).json({ message:"User parking id must be provided"})
        }

        const userParking = await getUserParking({ _id: userParkingId });

        if (!userParking) {
            return res.status(500).json({ message:"parking wasn't found in DB"})
        }

        if (userParking.length == 0) {
            return res.status(200).json({
                message: "No parking on that id",
            })
        }

        const parkingStatus = userParking[0].isAvail;
        return res.status(200).json({
            message: "Successfully got parking status",
            isAvail: parkingStatus
        })
    
    } catch (e) {
        return res.status(500).json({ message: "problem getting user parking status from server"})
    }
}

module.exports = checkParkingStatusController;