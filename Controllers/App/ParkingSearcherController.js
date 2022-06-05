const {getUserParking, createUserParking } = require('../../Services/userParking.service');
const { getCar } = require('../../Services/car.service'); 
const { checkDatewithinMinutesOfOtherDate } = require('../../util/general.helper');

async function parkingController(req, res) {
    console.log("ParkingSearcherController, searching for nearby parking: ");

    const { latitude, longitude, generalLoc, timeStamp, minutes = 5 } = req.body;
    if (!(latitude && longitude && generalLoc && timeStamp)) {
        return res.status(400).json({message: "Failed to connect due to empty parametres"});
    }
    const fullAddressArray = generalLoc.split(', ');
    let fullAddress = fullAddressArray.length > 1 ? fullAddressArray[1] : fullAddressArray[0];
    const parsedDate = new Date(Date.parse(timeStamp));
    const coords = { latitude: latitude, longitude: longitude }
    const coords_json = JSON.stringify(coords);
    try {
        const demoParking1 = {
            userId: '625ffa17c798ef69449ca699',
            address: req.body.generalLoc,
            specificLocation: coords_json,
            //carParked: '6229256',
            timeStamp: new Date().getDate()
        }

        const nearbyParking = await getUserParking({address: { "$regex": fullAddress[1] }})
        // console.log(parsedDate.getTime())
        // const relevantParking = nearbyParking.filter(
        //     parking => checkDatewithinMinutesOfOtherDate(parking.timeStamp, parsedDate, minutes))
        //     console.log("relevant",relevantParking)
        // if(relevantParking.length > 0) {
            // return res.status(200).json({
            //     "message": "Export parking successfully.",
            //     relevantParking
            // });
           
            
            const relevantParking = nearbyParking;
            const relevantCars = await Promise.all(relevantParking.map(async (p) => {
                const car = await getCar({ _id: p.carParked });
                return car[0];
            }));

            if(relevantParking.length>0){
            return res.status(200).json({
            "message": "Export parking successfully.",
            relevantParking,
            relevantCars
        });
     }         
       else {
            return res.status(204).json({"message": "No relevant parking have been found!"});
        }
         
 } catch (e) {
 
    }
 }
 
 module.exports = parkingController;