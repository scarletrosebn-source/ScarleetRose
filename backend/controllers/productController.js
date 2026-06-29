const Product = require("../model/Product.js");
const cloudinary = require("../config/cloudinary.js");
const { ItemAddedToInventoryMessage } = require("../utils/MailFormats/ItemAddedToInventory.js");

const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getProductById = async (req, res) => {
  try {
    const productId = req.params.id;
    const foundProduct = await Product.findById(productId);
    if (!foundProduct) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json(foundProduct);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


const createProduct = async (req, res) => {
  try {
    const { name, description, price, discount, category, stock } = req.body;
    let images = [];

    if (req.files && req.files.length > 0) {
      const uploadedImages = await Promise.all(
        req.files.map(async (file) => {
          if (file.mimetype.startsWith("image/")) {
            const result = await cloudinary.uploader.upload(file.path, {
              folder: "products",
            });
            return result.secure_url;
          }
        })
      );

      images = uploadedImages.filter(Boolean);
    }

    const newProduct = new Product({
      name,
      description,
      price,
      discount,
      category,
      images,
      stock,
    });

    const savedProduct = await newProduct.save();

    res.status(201).json(savedProduct);

    // Run email asynchronously after the response is sent.
    ItemAddedToInventoryMessage(name, savedProduct._id, description).catch((mailError) => {
      console.error("Failed to send inventory email:", mailError.message);
    });

    return;
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};


const updateProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    const { name, description, price, discount, category, stock } = req.body;

    const oldProduct = await Product.findById(productId);

    if (!oldProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    const oldImages = oldProduct.images || [];
    let images;
    // Check if new images are uploaded
    if (req.files && req.files.length > 0) {
      images = await Promise.all(
        req.files.map(async (file) => {
          if (file.mimetype.startsWith("image/")) {
            const result = await cloudinary.uploader.upload(file.path, {
              folder: "products",
            });

            return result.secure_url;
          }
        })
      );

      images = images.filter(Boolean);
    }

    const updateData = {
      name: name ?? oldProduct.name,
      description: description ?? oldProduct.description,
      price: price ?? oldProduct.price,
      discount: discount ?? oldProduct.discount,
      category: category ?? oldProduct.category,
      stock: stock ?? oldProduct.stock,
    };

    if (images && images.length > 0) {
      updateData.images = images;
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      updateData,
      { returnDocument: "after" }
    );

    if (images && images.length > 0 && oldImages.length > 0) {
      await Promise.all(
        oldImages.map((oldImage) => {
          const fileName = oldImage.split("/").pop().split(".")[0];
          return cloudinary.uploader.destroy(`products/${fileName}`);
        })
      );
    }

    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    const productToDelete = await Product.findById(productId);

    if (!productToDelete) {
      return res.status(404).json({ message: "Product not found" });
    }

    await Product.findByIdAndDelete(productId);
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

///PRODUCT REVIEW CONTROLLER LOGICS

const addProductReview = async (req, res) => {
  try {
    const productId = req.params.id;
    const { rating, comment } = req.body;
    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    const newReview = {
      review: comment,
      customer_rating:rating
    };
    product.reviews.push(newReview);
    await product.save();
    res.status(201).json({ message: "Review added successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
const deleteReview = async (req, res) => {
  try {
    const productId = req.params.id;
    const reviewID = req.params.reviewID;
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    const existingReviews = product.reviews;
    const updatedReviews = existingReviews.filter(
      (r) => r._id.toString() !== reviewID
    );
    product.reviews = updatedReviews;
    await product.save();
    res.status(200).json({ message: "Review deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

const updateReview = async (req, res) => {
  try {
    const productId = req.params.id;
    const reviewID = req.params.reviewID;
    const { rating, comment } = req.body;
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    const existingReviews = product.reviews;
    const updatedReviews = existingReviews.map((r) => {
      if (r._id.toString() === reviewID) {
        r.review = comment;
        r.customer_rating = rating;
      }
      return r;
    });
    product.reviews = updatedReviews;
    await product.save();
    res.status(200).json({ message: "Review updated successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  addProductReview,
  deleteReview
  //updateReview
};
//updateReview not there as i am currently not tracking the review-owner in the database