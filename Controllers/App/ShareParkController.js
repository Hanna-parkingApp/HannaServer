const {getUser}   = require('../../Services/user.service');
const {createUserParking} = require('../../Services/userParking.service');
const User = require('../../db/schemas/User');
const { createNavigation } = require('../../Services/navigation.service');
const { json } = require('express/lib/response');


async function shareParkController(req, res) {
   try {
console.log("$$$$req body",req.body);
    const { userToken , myLoc, specificLocation, genralLocation, timeStamp } = req.body;

    if (!(userToken  && myLoc && specificLocation && genralLocation && timeStamp  )) {
        return res.status(400).json({ message:"All Fields must be provided"})
    }
    const specificLocation_json = JSON.stringify(specificLocation);

    const myLoc_json = JSON.stringify(myLoc);

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
            address: genralLocation,
            timeStamp,
            carParked: user[0].cars[0]
        })
        if (!userParking)
            return res.status(500).json({ message:"could create userParking obj in DB"});

        const navigation = await createNavigation({
            shareUserId: userID,
            shareCurLoc :  myLoc_json,
           parkLoc: specificLocation_json 
        })
        if (!navigation)
            return res.status(500).json({ message:"could create navigation obj in DB"});

        console.log("navigation_obj",navigation);

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


