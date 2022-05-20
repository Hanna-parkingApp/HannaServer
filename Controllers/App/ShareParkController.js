const {getUser}   = require('../../Services/user.service');
const {createUserParking} = require('../../Services/userParking.service');
const User = require('../../db/schemas/User');


async function shareParkController(req, res) {
   try {

    const { userToken , specificLocation, genralLocation, timeStamp } = req.body;

    if (!(userToken && specificLocation && genralLocation && timeStamp )) {
        return res.status(400).json({ message:"All Fields must be provided"})
    }
    const specificLocation_json = JSON.stringify(specificLocation);

    const user = await getUser({token: userToken});

    if(user==null || user.length == 0)
    {
        return res.status(500).json({ message:"user not found in DB"})
    }
    let userID = user[0]._id;
    
    try{
         const userParking = await createUserParking({
            userId: userID ,
            specificLocation: specificLocation_json,
            generalLocation: genralLocation,
            timeStamp,
            carParked: user[0].cars[0]
        });

        console.log("user parking id:## ",  userParking._id)
        
        const userParkingId = userParking._id;

    return res.status(200).json({
        "message": "user parking successfully.",
        userParkingId
    });
    }
    catch(e){
    return res.status(500).json({ message:"can't upload data on DB"})
    }
        }   
    catch (e) {
    console.error(e);
 }
}
 
 module.exports = shareParkController;


