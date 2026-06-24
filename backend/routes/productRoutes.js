const express = require("express");
const router = express.Router();

const { protect } = require("../middleware/authMiddleware.js");
const {admin} = require("../middleware/adminMiddleware.js");
const { getAllProducts, getProductById, createProduct, updateProduct, deleteProduct } = require("../controllers/productController.js");
//all product 
router.route("/").get(getAllProducts).post(protect,admin,createProduct)
//single product
router.route("/:id").get(getProductById).put(protect,admin,updateProduct).delete(protect,admin,deleteProduct)

//router.post("/logout", logout);
module.exports = router;

