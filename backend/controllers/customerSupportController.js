
const OwnerSocials = require("../model/ownersocials.js");
const Ticket = require("../model/Ticket.js");
const sendCustomerMailAndNotifyAdmin = require("../utils/MailFormats/CustomermailsAndNotifyAdmin.js");


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

module.exports = { getOwnerSocials, createOwnerSocials, updateOwnerSocials, deleteOwnerSocials,createTicket };