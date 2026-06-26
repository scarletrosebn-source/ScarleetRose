const Order = require("../model/Order.js");
const Product = require("../model/Product.js");
const User = require("../model/User.js");

const getAdminStats = async (req, res) => {
    try {
        const totalOrders = await Order.countDocuments({ status: "payment-received" });
        const totalShippedOrders = await Order.countDocuments({ status: "shipped" });
        const totalDeliveredOrders = await Order.countDocuments({ status: "delivered" });
        const totalordersToBeShipped = totalOrders - totalShippedOrders - totalDeliveredOrders;
        const totalProducts = await Product.countDocuments({});
        const totalOutofStock = await Product.countDocuments({ stock: 0 });
        const totalInStock = await Product.countDocuments({ stock: { $gt: 0 } });
        const totalUsers = await User.countDocuments({ role: "user" });
        const allOrders = await Order.find()
            .populate("userId", "email username")
            .populate("products.productId", "name price discount");

        const totalRevenue = allOrders.reduce((total, order) => {
            return total + order.products.reduce((orderTotal, product) => {
                return orderTotal + (product.price * product.quantity * (100 - product.discount)) / 100;
            }, 0);
        }, 0);

        res.status(200).json({
            totalOrders,
            totalProducts,
            totalUsers,
            totalOrdersToBeShipped: totalordersToBeShipped,
            totalShippedOrders,
            totalDeliveredOrders,
            totalInStock,
            totalOutofStock,
            totalRevenue,
        });
    } catch (error) {
        console.error("Error fetching admin stats:", error);
        res.status(500).json({ message: "Failed to fetch admin stats" });
    }
};

module.exports = { getAdminStats };
