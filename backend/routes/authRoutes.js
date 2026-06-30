const express = require("express");
const router = express.Router();
const { registerUser, loginUser, getallUsers ,verifyEmail,resendOtp} = require("../controllers/authController.js");
const { protect } = require("../middleware/authMiddleware.js");
const {admin} = require("../middleware/adminMiddleware.js");

router.post("/register", registerUser);
router.post("/login", loginUser);//route = /api/auth/login
router.get("/users",protect,admin,getallUsers);
//router.post("/logout", logout);
router.post("/verify-email", verifyEmail);
router.post("/resend-otp", resendOtp);
module.exports = router;

//registerUser, loginUser, getallUsers