const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.email_user || 'kb.bcit.4711.proj@gmail.com',
    pass: process.env.email_pass || 'keyboardcat',
  },
});

const sendEmail = async (mailOptions) => {
  return new Promise((resolve, reject) => {
    mailOptions.from = process.env.email_user || 'kb.bcit.4711.proj@gmail.com';
    transporter.sendMail(mailOptions, (error, { response }) => {
      if (error) {
        return reject(error);
      } else {
        resolve(`Email sent: ${response}`);
      }
    });
  });
};

module.exports = {
  sendEmail,
};
