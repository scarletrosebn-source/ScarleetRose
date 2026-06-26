const Razorpay = require("razorpay");
const crypto = require("crypto");
const { configDotenv } = require("dotenv");
configDotenv();

const razorpayInstance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

module.exports = razorpayInstance;