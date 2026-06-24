const User = require("../model/User.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


const sendEmail = require("../utils/sendEmail.js"); // Assuming you have a utility function to send emails
const generateToken = (id) => {
  return jwt.sign({id}, process.env.JWT_SECRET, {
    expiresIn: "30d", // Set token expiration time as needed
  });
}
//Register a new user
const registerUser = async (req, res) => {
  const { name:username,  email, password } = req.body;
  

    try {
        if (!username || !email || !password) {
          return res.status(400).json({ message: "Username, email, and password are required" });
        }

        // Check if the user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }
        ////// Create a new user//////
        // TODO: Hash the password before saving :DONE
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        // TODO: Validate the email format and password strength
        
        // TODO: Implement JWT token generation for user authentication
        const newUser = await User.create({
            username: username,
            email,
            password: hashedPassword
        });
        // TODO: Implement email verification OTP
       if(newUser){
        const otp = Math.floor(100000 + Math.random() * 900000); // Generate a 6-digit OTP
        const subject = `Email Verification - Welcome to ${process.env.APP_NAME}`;
        const message = `Hi ${username},
        welcome to ${process.env.APP_NAME}! Your account creatin is just a step away. 
        Please verify your email address using the OTP below:
        ${otp} 
        This OTP is valid for 10 minutes. If you did not request this, please ignore this email.
        Thank you for joining us!
        Best regards,
        The ${process.env.APP_NAME} Team`;
        await sendEmail(email, subject, message);
         res.status(201).json({ 
            _id: newUser._id,
            username: newUser.username,
            email: newUser.email,
            message: "User registered successfully. Please check your email for verification."
          });
       }
        // TODO: Send a welcome email to the user after successful registration
       else {
        res.status(400).json({ message: "User registration failed:invalid input" });
       }

    } catch (error) {
        console.error("Registration failed:", error.message);
        res.status(500).json({ message: "Server error" });
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
module.exports = { registerUser, loginUser, getallUsers };
