const express = require("express");
const router = express.Router();
const {protect}=require("../middleware/authMiddleware.js");
const {admin}=require("../middleware/adminMiddleware.js");
const {createOrder,getAllOrders,getOrderByUserId,getMyOrders,updateOrderStatus,getOrderStatus  }=require("../controllers/orderController.js");

router.get('/myorders',protect,getMyOrders) ;
router.route('/').post(protect,createOrder).get(protect,admin,getAllOrders);
router.route('/:id').get(protect,admin,getOrderByUserId);
router.route('/:id/status').put(protect,admin,updateOrderStatus).get(protect,admin,getOrderStatus);


module.exports = router;
