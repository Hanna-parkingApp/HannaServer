const { getUser, updateUser } = require('../../Services/user.service');

async function updateUserPoints(req, res) {
    //const token = req.headers["x-refresh-token"];
    const { token, pointsModifier }= req.body;
    console.log("pointController: ", token, pointsModifier);
    //const pointsModifier = parseInt(req.body.pointsModifier);

    if ( !pointsModifier || ! token ) {
        return res.status(400).json({message: "all parameters required"});
    }

    const userList = await getUser({token: token});
    if ( userList.length == 0 ) {
        return res.status(404).json({message: "user not found"});
    }

    const user = userList[0];
    console.log('user: ', user);
    const currentPoints = user.points;
    if ( pointsModifier < 0 && currentPoints + pointsModifier < 0) {
        return res.status(400).json({message: "not enough points to update"});
    }

    user.points = currentPoints + pointsModifier;
    const updatedUser = await user.save();
    if ( updatedUser.points == currentPoints + pointsModifier ) {
        return res.status(200).json({ message: "user points updated successfully", points: updatedUser.points });
    }
    else {
        return res.status(500).json({ message: "user points did not update successfully", points: updatedUser.points });
    }
}

module.exports = updateUserPoints;