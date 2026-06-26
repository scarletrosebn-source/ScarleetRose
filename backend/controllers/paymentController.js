const razorpayInstance = require("../config/razorpay");
const crypto = require("crypto");
const paymentRecord = require("../model/PaymentRecords");
const Order = require("../model/Order");
const Product = require("../model/Product");
const sendOrdermodificationMessage = require("../utils/MailFormats/sendOrdermodificationMessage.js");
const sendOrderplacedMessage = require("../utils/MailFormats/sendOrderplacedMessage.js");
const dotenv = require("dotenv");
dotenv.config();
const confirmOrder = async (dborderId, razorpayPaymentId,raxorpayOrderId) => {
  try {
    
    //TODO: check if paymentId is valid and matches the order
    const updatedOrder = await Order.findByIdAndUpdate(orderId, { status: "payment-received", paymentId: razorpayPaymentId }, { returnDocument: "after"  }).populate("userId", "email username").populate("products.productId", "name price discount");
   
    if (!updatedOrder) {
      return res.status(404).json({ message: "Order not found" });
    }

    //reduce stock of products in the order
    for (const item of updatedOrder.products) {
      const product = await Product.findById(item.productId);
      if (product) {
        product.stock -= item.quantity;
        await product.save();
      }
    }
    // Send confirmation email to user
    sendOrderplacedMessage(updatedOrder.userId.email, updatedOrder.userId.username, updatedOrder);
    return updatedOrder;
  } catch (error) {
    console.error("Error confirming order:", error);
  }
    
};



const createrazorpayOrder = async (req, res) => {
  try {
    const orderId = req.body.orderId; // Use consistent casing for variable names
    const order = Order.findById(orderId);

    // Calculate the amount by summing up the total price of all products
    const amount = order.products.reduce(
      (total, item) => total + (item.price * item.quantity * (100 - item.discount)) / 100,
      0
    );

    // Create the Razorpay order options
    const options = {
      amount: amount * 100, // Multiply by 100 to convert to paise
      currency: "INR",
      receipt: orderId,
      payment_capture: 1,
    };

    // Create the Razorpay order
    const razorpayOrder = await razorpayInstance.orders.create(options);

    // Update the payment record if the orderId is provided
    if (orderId) {
      await paymentRecord.create({
        db_orderId: orderId,
        razorpayOrderId: razorpayOrder.id,
        paymentStatus: "pending",
      });
    }

    res.status(200).json(razorpayOrder);
  } catch (error) {
    console.error("Error creating Razorpay order:", error);
    res.status(500).json({ error: "Failed to create Razorpay order" });
  }
};
const verifyrazorpayPayment = async (req, res) => {
    try {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

        const hmac = crypto.createHmac("sha256", process.env.RAZORPAY_SECRET);
        hmac.update(razorpay_order_id + "|" + razorpay_payment_id);
        const calculatedSignature = hmac.digest("hex");

        if (calculatedSignature === razorpay_signature) {
            // Payment is verified
            const paymentRecord = await paymentRecord.updateOne({ razorpayOrderId: razorpay_order_id}, { paymentStatus: "paid", razorpayPaymentId: razorpay_payment_id },{ returnDocument: "after" });
            await confirmOrder(paymentRecord.db_orderId, razorpay_payment_id, razorpay_order_id);
            res.status(200).json({ message: "Payment verified successfully" });
        } else {
            // Payment verification failed
            paymentRecord.updateOne({ razorpayOrderId: razorpay_order_id}, { paymentStatus: "failed",razorpayPaymentId: razorpay_payment_id });
            res.status(400).json({ error: "Payment verification failed" });
        }
    } catch (error) {
        console.error("Error verifying Razorpay payment:", error);
        res.status(500).json({ error: "Failed to verify Razorpay payment" });
    }
};

module.exports = { createrazerpayOrder,verifyrazorpayPayment };