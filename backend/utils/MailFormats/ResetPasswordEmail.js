const sendmail = require("../sendEmail.js");
const dotenv = require("dotenv");
dotenv.config();



const ResetPasswordEmail = async (userEmail, resetToken) => {
    const subject = "Password Reset Request";
    const message = `You have requested to reset your password. Please click the link below to set a new password:\n\n${process.env.FRONTEND_URL}/reset-password?token=${resetToken}`;
    const to = userEmail;   
    await sendmail(to,subject,message);
}
module.exports = ResetPasswordEmail