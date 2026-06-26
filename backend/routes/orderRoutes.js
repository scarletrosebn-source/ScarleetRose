const express = require("express");
const router = express.Router();
const {protect}=require("../middleware/authMiddleware.js");
const {admin}=require("../middleware/adminMiddleware.js");
const {createOrder,getAllOrders,getOrderByUserId,getMyOrders,updateOrderStatus,getOrderStatus  }=require("../controllers/orderController.js");
router.get("/", (req, res) => {
  res.status(200).json({ message: "Orders route is ready" });
});

router.route('/').post(protect,createOrder).get(protect,admin,getAllOrders);
router.route('/:id').get(protect,admin,getOrderByUserId);
router.route('/:id/status').put(protect,admin,updateOrderStatus).get(protect,admin,getOrderStatus);
router.get('/myorders',protect,getMyOrders) ;

module.exports = router;
