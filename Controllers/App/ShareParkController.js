const {getUser}   = require('../../Services/user.service');
const {createUserParking} = require('../../Services/userParking.service');


async function shareParkController(req, res) {
   try {

    console.log(req.body);

    const { userToken , specificLocation, genralLocation, timeStamp, } = req.body;

    if (!(userToken && specificLocation && genralLocation && timeStamp )) {
        return res.status(400).json({ message:"All Fields must be provided"})
    }
    const specificLocation_json = JSON.stringify(specificLocation);

    const user = await getUser({token: userToken});
    console.log("!!!!!!!!!!!!!!!",user);

    if(user==null)
    {
        return res.status(500).json({ message:"user not found in DB"})
    }
    let userID = user.id;
    console.log("@@@@@",userID);
    try{

    const newParkingUSER = await createUserParking({
        userID,
        specificLocation: specificLocation_json,
        generalLocation: genralLocation,
        timeStamp 
    });
    return res.status(200).json({
        "message": "user parking successfully.",
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


