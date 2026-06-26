const User = require("../model/User.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Otp = require("../model/Otp.js");
const sendEmail = require("../utils/sendEmail.js");
const { verificationSuccessMessage } = require("../utils/MailFormats/VerificationSuccessMessage.js");

const generateToken = (id) => {
  return jwt.sign({id}, process.env.JWT_SECRET, {
    expiresIn: "30d", // Set token expiration time as needed
  });
}
//Register a new user
const registerUser = async (req, res) => {
  const { name: username, email, password } = req.body;

  try {
    if (!username || !email || !password) {
      return res.status(400).json({ message: "Username, email, and password are required" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpiresAt = new Date(Date.now() + 10 * 60 * 1000);

    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
      isVerified: false
    });
    const newOtp = await Otp.create({
      userId: newUser._id,
      otp,
      expiresAt: otpExpiresAt
    });

    if (newUser) {
      const subject = `Email Verification - Welcome to ${process.env.APP_NAME}`;
      const message = `Hi ${username},\n\nwelcome to ${process.env.APP_NAME}! Your account creation is just a step away.\nPlease verify your email address using the OTP below:\n\n${otp}\n\nThis OTP is valid for 10 minutes. If you did not request this, please ignore this email.\n\nThank you for joining us!\n\nBest regards,\nThe ${process.env.APP_NAME} Team`;

      await sendEmail(email, subject, message);

      return res.status(201).json({
        _id: newUser._id,
        username: newUser.username,
        email: newUser.email,
        message: "User registered successfully. Please check your email for verification.",
      });
    }

    return res.status(400).json({ message: "User registration failed: invalid input" });
  } catch (error) {
    console.error("Registration failed:", error.message);
    return res.status(500).json({ message: "Server error" });
  }
};

const verifyEmail = async (req, res) => {
  const { email, otp } = req.body;

  try {
    if (!email || !otp) {
      return res.status(400).json({ message: "Email and OTP are required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    if (user.isVerified) {
      return res.status(400).json({ message: "Email is already verified" });
    }

    const otpRecord = await Otp.findOne({ userId: user._id });
    if (!otpRecord) {
      return res.status(400).json({ message: "No OTP found for this user" });
    }

    if (otpRecord.otp !== otp) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    if (otpRecord.expiresAt < new Date()) {
      await Otp.deleteOne({ _id: otpRecord._id });
      return res.status(400).json({ message: "OTP has expired" });
    }

    user.isVerified = true;
    await user.save();
    await Otp.deleteOne({ _id: otpRecord._id });
    verificationSuccessMessage(user.email);

    return res.status(200).json({ message: "Email verified successfully." });
  } catch (error) {
    console.error("Email verification failed:", error.message);
    return res.status(500).json({ message: "Server error" });
  }
};
const loginUser = async (req, res) => {
  const { email, password } = req.body; 
  try {
    // Check if the user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email!" });
    }
    else if(user && (await bcrypt.compare(password, user.password))){
      const token = generateToken(user._id);
      res.json({ 
        _id: user._id,
        username: user.username,
        email: user.email,
        token
      });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
const getallUsers = async (req, res) => {
  try {
    const users = await User.find({}).select("-password");
    if (users.length === 0) {
      return res.status(404).json({ message: "No users found" });
    }
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
const resendOtp = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const newOtp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpiresAt = new Date(Date.now() + 10 * 60 * 1000);

    await Otp.findOneAndUpdate(
  { userId: user._id },
  { otp: newOtp, expiresAt: otpExpiresAt },
  { returnDocument: "after", upsert: true }
);

    const subject = `Resend OTP - ${process.env.APP_NAME}`;
    const message = `Hi ${user.username},\n\nYou have requested a new OTP for your account.\nPlease use the following OTP to verify your email:\n\n${newOtp}\n\nThis OTP is valid for 10 minutes. If you did not request this, please ignore this email.\n\nThank you!\n\nBest regards,\nThe ${process.env.APP_NAME} Team`;

    await sendEmail(user.email, subject, message);

    return res.status(200).json({ message: "New OTP sent successfully." });
  } catch (error) {
    console.error("Failed to resend OTP:", error.message);
    return res.status(500).json({ message: "Server error" });
  }
};

module.exports = { registerUser, loginUser, getallUsers, verifyEmail, resendOtp };
