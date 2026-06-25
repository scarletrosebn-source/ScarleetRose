const nodemailer = require("nodemailer");

const sendEmail = async (to, subject, message) => {
  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  const recipients = Array.isArray(to) ? to : [to];

  const mailOptions = {
    from: process.env.SMTP_USER,
    to: recipients,
    subject,
    text: message,
  };

  await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;
