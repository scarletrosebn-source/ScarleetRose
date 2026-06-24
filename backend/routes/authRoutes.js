const express = require("express");
const router = express.Router();
const { registerUser, loginUser, getallUsers } = require("../controllers/authController.js");
const { protect } = require("../middleware/authMiddleware.js");
const {admin} = require("../middleware/adminMiddleware.js");

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/users",protect,admin,getallUsers);
//router.post("/logout", logout);
module.exports = router;

//registerUser, loginUser, getallUsers