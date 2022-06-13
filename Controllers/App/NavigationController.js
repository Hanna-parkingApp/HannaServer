const {updateNavigation} = require('../../Services/navigation.service')
const {getUser} = require('../../Services/user.service')

async function navigationController(req,res) {
    console.log("NavigationConroller: return Navigation object with current other position");
    console.log(req.body);
    try {
        const { userId , userToken , userType ,myLoc } = req.body;

        if (!(userId && userToken && userType && myLoc)) {
            return res.status(400).json({ message: "All fields must be provided!"})
        }

    const curLoc_json = JSON.stringify(myLoc);

    let updatedObj;
        
    const user = await getUser({token: userToken});

    if(user==null || user.length == 0)
    {
        return res.status(500).json({ message:"user not found in DB"})
    }
    let userID = user[0]._id;

    
        if(userType=='SHARE'){

             updatedObj = await updateNavigation(
                {
                shareUserId: userID,
                },
                {
                    shareCurLoc: curLoc_json 
                }
            )
        }

        if(userType=='SEARCHER'){
             updatedObj = await updateNavigation(
                {
                shareUserId: userId,
                },
                {   searcherUserId : userID ,
                    searcherCurLoc: curLoc_json 
    
                }
            )
        }

        console.log("updatedObj: ", updatedObj);

        if (!updatedObj) {
            return res.status(500).json({ message: "Error updating navigation obj !"});
        }
        return res.status(200).json({
            "message": "updating navigation obj successfully.",
            updatedObj
            
        });

    
    } catch (e) {
        console.log("Error in navigation controller", e);
    }
}

module.exports = navigationController;