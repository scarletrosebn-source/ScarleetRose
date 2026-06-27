const express = require("express");
const router = express.Router();

const {getOwnerSocials,createOwnerSocials,updateOwnerSocials,deleteOwnerSocials,createTicket} = require("../controllers/customerSupportController.js");
const { protect } = require("../middleware/authMiddleware.js");
const { admin } = require("../middleware/adminMiddleware.js");


router.route("/").get(getOwnerSocials).post(protect,admin,createOwnerSocials).put(protect,admin,updateOwnerSocials).delete(protect,admin,deleteOwnerSocials);
//TODO : Add protect middleware for the ticket creation route its temporarily removed for testing purposes
router.post("/tickets", createTicket);
module.exports = router;