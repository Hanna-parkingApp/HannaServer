const crypto = require('crypto');
const userService = require('../../services/user.service');
const sendEmail = require('../../util/email/sendEmail.helper');

async function generateRecoveryCode(req, res) {
    const tempPass = crypto.randomBytes(8).toString('hex');
    const user = await userService.updateUser({ email: req.body.email }, { password: tempPass });
    if (!user) {
        return res.status(404).json({ message: "email dosen't exist" });
    }
    const emailMsg = `Your recovery code is: ${tempPass}`;
    const sendEmailResult = await sendEmail(req.body.email, "Password recovery code", emailMsg);
    if ( sendEmailResult ){
        return res.status(200).json({ message: "recovery code sent successfully"})
    }
    return res.status(500).json({ message: "recovery code sent failed"})
}

async function verifyRecoveryCode(req, res) {
    const userArray = await userService.getUser({ email: req.body.email });
    const user = userArray[0];
    if( req.body.password == user.password ) {
        return res.status(200).json({ message: "recovery code verified"})
    }

    return res.status(400).json({ message: "recovery code dosent match"})
}

async function changePassword(req, res) {
    const changedUser = await userService.updateUser({ email: req.body.email }, { password: req.body.newPassword});
    if ( !changedUser ) {
        return res.status(500).json({ message: "Password change failed"});
    }

    console.log(changedUser)
    return res.status(200).json({ message: "Password changed successfully"});
}

module.exports = {
    generateRecoveryCode,
    verifyRecoveryCode,
    changePassword
}