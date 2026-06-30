const Order = require("../model/Order.js");
const Product = require("../model/Product.js");
const paymentRecord = require("../model/PaymentRecords.js");
const sendOrderplacedMessage = require("../utils/MailFormats/sendOrderplacedMessage.js");




//HELPER FUNCTION TO CONFIRM ORDER AND REDUCE STOCK


// name: "",
//     email: "",----
//     phone: "",-----
//     address: "",----
//     city: "",
//     state: "",
//     pincode: "",
//     country: "India",



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
    const { cartItems = [], address } = req.body;
    if (!Array.isArray(cartItems) || cartItems.length === 0 || !address) {
      return res.status(400).json({ message: "Missing required fields on Order Creation" });
    }

    const requiredAddressFields = ["name", "phone", "address", "city", "state", "pincode", "country"];
    const missingAddressField = requiredAddressFields.find((field) => !address[field]);
    if (missingAddressField) {
      return res.status(400).json({ message: `Missing address field: ${missingAddressField}` });
    }

    const orderProducts = cartItems.map((item) => ({
      productId: item.productId || item._id || item.id,
      quantity: item.quantity,
      price: item.price,
      discount: item.discount || 0,
    }));

    // TODO: check if all products exist and have sufficient stock
    for (const item of orderProducts) {
      const product = await Product.findById(item.productId);
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }
      if (product.stock < item.quantity) {
        return res.status(400).json({ message: "Insufficient stock for product" });
      }
    }
    // Calculate total price
    const totalPrice = orderProducts.reduce((total, item) => total + (item.price * item.quantity * (100 - item.discount)) / 100, 0);
    const order = await Order.create({
      products: orderProducts,
      totalPrice,
      address:{
        fullname:address.name,
        address:address.address,
        city:address.city,
        postalCode:address.pincode,
        country:address.country,
        phoneNo:address.phone,
        state:address.state

      },
      userId: req.user._id,
      status: "pending",
    });
    
    res.status(201).json({ message: "Order created successfully", orderId: order._id, orderAmt: order.totalPrice });
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
    const updatedOrder = await Order.findByIdAndUpdate(orderId, { status }, { returnDocument: "after" }).populate("userId", "email username").populate("products.productId", "name price discount");
    if (!updatedOrder) {
      return res.status(404).json({ message: "Order not found" });
    }
    sendOrdermodificationMessage(updatedOrder.userId.email, updatedOrder.userId.username, updatedOrder);
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
    if (req.user.role !== "admin" && order.userId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized to view this order" });
    }
    const amount = order.products.reduce((total, item) => total + (item.price * item.quantity * (100 - item.discount)) / 100, 0);
    order.totalPrice = amount;
    res.status(200).json({ order });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const getOrderByUserId = async (req, res) => {
  try {
    const userId = req.params.userId;
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
    
