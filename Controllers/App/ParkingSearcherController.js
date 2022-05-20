const {getUserParking, createUserParking } = require('../../Services/userParking.service'); 

async function parkingController(req, res) {

    const { latitude, longitude, generalLoc, timeStamp } = req.body;

    if (!(latitude && longitude && generalLoc && timeStamp)) {
        return res.status(400).json({message: "Failed to connect due to empty parametres"});
    }

    const coords = { latitude: latitude, longitude: longitude }
    const coords_json = JSON.stringify(coords);
    try {
        const demoParking1 = {
            userId: '625ffa17c798ef69449ca699',
            generalLocation: req.body.generalLoc,
            specificLocation: coords_json,
            //carParked: '6229256',
            timeStamp: new Date().getDate()
        }

        const nearbyParking = await getUserParking({generalLocation: generalLoc})
        if(nearbyParking.length > 0) {
            return res.status(200).json({
                "message": "Export parking successfully.",
                nearbyParking
            });
        } else {
            return res.status(204).json({"message": "No relevant parking have found!"});
        }
         
 } catch (e) {
 
    }
 }
 
 module.exports = parkingController;