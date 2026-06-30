
const Otp = require("../model/Otp.js");
const OwnerSocials = require("../model/Ownersocials.js");
const Ticket = require("../model/Ticket.js");
const sendCustomerMailAndNotifyAdmin = require("../utils/MailFormats/CustomermailsAndNotifyAdmin.js");
const SendResetPasswordEmail = require("../utils/MailFormats/ResetPasswordEmail.js");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();
const User = require("../model/User.js");

const getOwnerSocials = async (req, res) => {
    try {
        const socials = await OwnerSocials.findOne();
        res.status(200).json(socials);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
const createOwnerSocials = async (req, res) => {
    try {
        const { socials, contacts } = req.body;
        const ownerSocials = await OwnerSocials.create({ socials, contacts });
        res.status(200).json(ownerSocials);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
const updateOwnerSocials = async (req, res) => {
    try {
        const { socials, contacts } = req.body;
        const updatedOwnerSocials = await OwnerSocials.findOneAndUpdate(
            {},
            { socials, contacts },
            { returnDocument: "after"}
        );
        res.status(200).json(updatedOwnerSocials);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
const deleteOwnerSocials = async (req, res) => {
    try {
        await OwnerSocials.findOneAndDelete();
        res.status(200).json({ message: "OwnerSocials deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
const createTicket = async (req, res) => {    
    try {
        const { name, email, subject, message } = req.body;
        console.log("Received ticket data:", { name, email, subject, message });
        if (!name || !email || !subject || !message) {
            return res.status(400).json({ message: "All fields are required" });
        }
        const ticket = await Ticket.create({ name, email, mail: { subject, message } });
        if (!ticket) {
            return res.status(400).json({ message: "Failed to create ticket" });
        }
        await sendCustomerMailAndNotifyAdmin(email, subject, message);
        res.status(201).json(ticket);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

//Forgot password and reset password
const forgetAndResetPasswordMail = async (req, res) => {
    const userEmail = req.body.email;
    const user = await User.findOne({ email: userEmail });
    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }
    const resetToken = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "20m" });
    try {
        await SendResetPasswordEmail(userEmail, resetToken); 
        res.status(200).json({ message: "Reset password email sent successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }   
};

const resetPassword = async (req, res) => {
    const { token, password } = req.body;
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.userId;

    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        user.password = password;
        await user.save();
        res.status(200).json({ message: "Password reset successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { getOwnerSocials, createOwnerSocials, updateOwnerSocials, deleteOwnerSocials,createTicket , forgetAndResetPasswordMail , resetPassword };