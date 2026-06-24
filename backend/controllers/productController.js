 const product = require("../model/Product.js");
 const cloudinary = require("../config/cloudinary.js");

 const getAllProducts = async (req, res) => {
   try {
     const products = await product.find({});
     res.status(200).json(products);
   } catch (error) {
     res.status(500).json({ message: error.message });
   }
 };

 const getProductById = async (req, res) => {
   try {
     const productId = req.params.id;
     const product = await product.findById(productId);
     if (!product) {
       return res.status(404).json({ message: "Product not found" });
     }
     res.status(200).json(product);
   } catch (error) {
     res.status(500).json({ message: error.message });
   }
 };

 const createProduct = async (req, res) => {
   try {
     const { name, description, price, discount, category, stock } = req.body;
     const images = req.files.map((file) => {
        if(file.mimetype.startsWith("image/")) {    
            const result = cloudinary.uploader.upload(file.path, { folder: "products" }); 
            return result.secure_url;
        }
     }); // Assuming you're using multer for file uploads
     const newProduct = new product({
       name,
       description,
       price,
       discount,
       category,
       images,
       stock
     });
     const savedProduct = await newProduct.save();
     res.status(201).json(savedProduct);
   } catch (error) {
     res.status(500).json({ message: error.message });
   }
 };
