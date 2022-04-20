const getParkingTransaction = require('../../Services/parkingTransaction.service'); 

async function parkingController(req, res) {
    try {
         const { specificLocation,generalLocation, arrivalTime } = req.body;
 
         if (!(specificLocation && generalLocation && arrivalTime)) {
             return res.status(400).json({message: "Failed to connect due to empty parametres"});
         }
 
         const transactions = await getParkingTransaction({timeStamp: {$gte: arrivalTime , $lte : arrivalTime + 4 * 60000 }})
         
 } catch (e) {
 
    }
 }
 
 module.exports = parkingController;