async function autoLoginController(req, res) {
    try {
        return res.status(200).json({
            user: req.user,
            RefreshToken: req.headers["x-refresh-token"],
            AccessToken: req.headers["x-access-token"]
        })
    } catch (error) {
        return res.status(500).json({ message: "Something went wrong", error: error});
    }
}

module.exports = autoLoginController;