const express = require("express");
const router = express.Router();

const { protect } = require("../middleware/authMiddleware.js");
const {admin} = require("../middleware/adminMiddleware.js");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
const { getAllProducts, getProductById, createProduct, updateProduct, deleteProduct } = require("../controllers/productController.js");
//all product 
router.route("/").get(getAllProducts).post(protect,admin,upload.array("images", 5),createProduct)
//single product
router.route("/:id").get(getProductById).put(protect,admin,upload.array("images", 5),updateProduct).delete(protect,admin,deleteProduct)
//router.post("/logout", logout);
module.exports = router;

    