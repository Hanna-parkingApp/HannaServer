const createParkingTransaction = require('../../Services/parkingTransaction.service'); 

async function shareParkController(req, res) {
   try {
      // const { specificLocation,generalLocation, arrivalTime } = req.body;

      // if (!(specificLocation && generalLocation && arrivalTime)) {
      //     return res.status(400).json({message: "Failed to connect due to empty parametres"});
      // }

      // const transactions = await getParkingTransaction({timeStamp: {$gte: arrivalTime , $lte : arrivalTime + 4 * 60000 }})
      console.log(req.body);
} catch (e) {

 }
}
 
 module.exports = shareParkController;