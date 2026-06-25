const sendEmail = require("../sendEmail.js");
 

const verificationSuccessMessage = async (userEmail) => {
  const subject = "Email Verification Successful";
  const message = `Congratulations! Your email (${userEmail}) has been successfully verified. You can now access all the features of our platform.`;
  await sendEmail(userEmail, subject, message);
};

module.exports = { verificationSuccessMessage };