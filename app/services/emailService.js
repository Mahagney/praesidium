// #region 'NPM DEP'
const nodemailer = require('nodemailer');
// #endregion

// Step 1
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL, // your gmail account
    pass: process.env.PASSWORD, // your gmail password
  },
  tls: { rejectUnauthorized: false },
});

const sendEmail = async (user) => {
  // Step 2
  const mailOptions = {
    from: process.env.EMAIL, // email sender
    to: user.EMAIL, //  email receiver
    subject: 'Praesidium Email - Test',
    text: `Utilizator: ${user.EMAIL}\r\nParola: ${user.PASSWORD}`,
  };
  // Step 3
  return transporter
    .sendMail(mailOptions)
    .then((info) => {
      return info;
    })
    .catch((error) => {
      const err = new Error(error);
      err.statusCode = 502;
      err.customMessage = 'Sending email -> EMAIL SERVICE ERROR';
      throw err;
    });
};
module.exports = { sendEmail };
