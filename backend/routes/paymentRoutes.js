const express = require("express");
const router = express.Router();

const {createrazerpayOrder , verifyrazorpayPayment} = require("../controllers/paymentController.js");
router.get("/", (req, res) => {
  res.status(200).json({ message: "Payments route is ready" });
});
router.post("/order",createrazerpayOrder);
router.post("/confirm", verifyrazorpayPayment);

module.exports = router;
