const express = require("express");
const router = express.Router();

const {createrazorpayOrder , validateRazorpayPayment} = require("../controllers/paymentController.js");
router.get("/", (req, res) => {
  res.status(200).json({ message: "Payments route is ready" });
});
router.post("/order",createrazorpayOrder);//path: /api/payments/order
router.post("/confirm", validateRazorpayPayment);// path: /api/payments/confirm 

module.exports = router;
