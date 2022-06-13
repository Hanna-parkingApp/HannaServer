const { getUser } = require('../../Services/user.service');

async function autoLoginController(req, res) {
    console.log("AutoLoginController");
    try {
        console.log("req.user: ", req.user);
        const user = await getUser({ email: req.user.userEmail })

        if (!user) {
            return res.status(500).send('User not found by email');
        }

        console.log(user);

        return res.status(200).json({
            user: user[0],
            RefreshToken: req.headers["x-refresh-token"],
            AccessToken: req.headers["x-access-token"]
        })
    } catch (error) {
        return res.status(500).json({ message: "Something went wrong", error: error});
    }
}

module.exports = autoLoginController;