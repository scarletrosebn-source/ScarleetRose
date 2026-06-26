const Order = require("../model/Order.js");
const Product = require("../model/Product.js");
const paymentRecord = require("../model/PaymentRecords.js");
const sendOrderplacedMessage = require("../utils/MailFormats/sendOrderplacedMessage.js");
const sendOrdermodificationMessage = require("../utils/MailFormats/sendOrdermodificationMessage.js");



//HELPER FUNCTION TO CONFIRM ORDER AND REDUCE STOCK
const confirmOrder = async (orderId, paymentId) => {
  try {
    const order = await Order.findById(orderId).populate("userId", "email username").populate("products.productId", "name price discount");
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    //TODO: check if paymentId is valid and matches the order
    Order.findByIdAndUpdate(orderId, { status: "payment-received", paymentId }, { new: true });
    //reduce stock of products in the order
    for (const item of order.products) {
      const product = await Product.findById(item.productId);
      if (product) {
        product.stock -= item.quantity;
        await product.save();
      }
    }
    // Send confirmation email to user
    sendOrderplacedMessage(order.userId.email, order.userId.username, order);
  } catch (error) {
    console.error("Error confirming order:", error);
  }
    
};



const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate("userId", "email username").populate("products.productId", "name price discount");
    orders.forEach((order) => {
      order.products.forEach((product) => {
        product.discounted_price = (product.productId.price * (100 - product.productId.discount)) / 100;
      });
    });
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const createOrder = async (req, res) => {
  try {
    const {paymentId,  cartItems, address } = req.body;
    if ( cartItems.length === 0 || !totalPrice || !address) {
      return res.status(400).json({ message: "Missing required fields on Order Creation" });
    }
    // TODO: check if all products exist and have sufficient stock
    for (const item of cartItems) {
      const product = await Product.findById(item.productId);
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }
      if (product.stock < item.quantity) {
        return res.status(400).json({ message: "Insufficient stock for product" });
      }
    }
    // Calculate total price
    const totalPrice = cartItems.reduce((total, item) => total + (item.price * item.quantity * (100 - item.discount)) / 100, 0);
    const order = await Order.create({
      paymentId,
      products: cartItems,
      totalPrice,
      address,
      userId: req.user._id,
      status: "pending",
    });
    await paymentRecord.create({
      userId: req.user._id,
      paymentId,
      orderId: order._id,
      status: "pending",
    });
    ///Payment received and order confirmed LOGIC
    //
    //
    ///
    ///
    ///
    await confirmOrder(order._id, paymentId);
    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.user._id }).populate("userId", "email username").populate("products.productId", "name price discount");
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const orderId = req.params.id;
    const updatedOrder = await Order.findByIdAndUpdate(orderId, { status }, { new: true });
    if (!updatedOrder) {
      return res.status(404).json({ message: "Order not found" });
    }
    sendOrdermodificationMessage(req.user.email, req.user.username, updatedOrder);
    res.status(200).json(updatedOrder);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};  
const getOrderStatus = async (req, res) => {
  try {
    const orderId = req.params.id;
    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const getOrderByUserId = async (req, res) => {
  try {
    const userId = req.params.id;
    const order = await Order.find({ userId });
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
module.exports = { createOrder,getAllOrders,getOrderByUserId,getMyOrders,updateOrderStatus,getOrderStatus };
    