require('dotenv').config();
const nodemailer = require('nodemailer');

// Step 1
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL, // your gmail account
    pass: process.env.PASSWORD // your gmail password
  },
  tls: { rejectUnauthorized: false }
});

const sendEmail = (user) => {
  // Step 2
  const mailOptions = {
    from: process.env.EMAIL, // email sender
    to: user.email, //  email receiver
    subject: 'Nodemailer - Test',
    text: 'Wooohooo it works!!'
  };
  // Step 3
  transporter.sendMail(mailOptions, (err, data) => {
    if (err) {
      return console.log(err);
    }
    return console.log('Email sent!!!');
  });
};
module.exports = { sendEmail };
