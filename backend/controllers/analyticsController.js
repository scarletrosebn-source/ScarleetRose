const orders=require("../model/orderModel")
const products=require("../model/productModel")
const User=require("../model/userModel")

const getAdminStats=async(req,res)=>{
    const totalOrders=await orders.countDocuments({status:"payment-received & shipped & delivered"})
    const totalShippedOrders=await orders.countDocuments({status:"shipped"})
    const totalDeliveredOrders=await orders.countDocuments({status:"delivered"})
    const totalordersToBeShipped=totalOrders-totalShippedOrders-totalDeliveredOrders
    const totalProducts=await products.countDocuments()
    const totalOutofStock=await products.countDocuments({stock:0})
    const totalInStock=await products.countDocuments({stock:{$gt:0}})
    const totalInventory=products.aggregate([{$group:{_id:"$category",totalInventory:{$sum:"$stock"}}}])
    const totalUsers=await User.countDocuments({role:"user"})
    res.status(200).json({totalOrders,totalProducts,totalUsers})
}