const nodeMailer = require('nodemailer');
const transporter = require('./emailSetup.helper');

async function sendEmail(reciver, subject, text) {
    const userName = process.env.APP_EMAIL_USERNAME || 'hannaparkingapp@gmail.com';

    const mailOptions = {
        from: userName,
        to: reciver,
        subject: subject,
        text: text, 
    };

    const send = transporter.sendMail(mailOptions);
    try {
      await send;
    } catch (err) {
      console.error(err);
	  return false
    }
    return true;
}

module.exports = sendEmail;