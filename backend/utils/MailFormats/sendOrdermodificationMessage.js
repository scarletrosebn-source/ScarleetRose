const sendmail = require("../sendEmail.js");
const dotenv = require("dotenv");
dotenv.config();

const sendOrdermodificationMessage = async (email, username, updatedOrder) => {
    const { products ,totalPrice } = updatedOrder;
    const subject = `Order Modification--${updatedOrder._id}`;
    const message = `
      Hi ${username},\n\n
      Your order has been modified.\n  
      Order ID: ${updatedOrder._id}\n
      Total Price: ${updatedOrder.totalPrice}\n
      Payment ID: ${updatedOrder .paymentId}\n
      
      Products:\n
      ${products.map((item) => `- ${item.productId.name} (Quantity: ${item.quantity}, Price: ${item.price-item.price*(item.discount/100)})`).join("\n")}
      \n
      
      Order Status: ${updatedOrder.status}\n
      \n\nThank you for shopping with us!\n
    `;
    console.log("Sending order modification email to:", email);
    await sendmail(email, subject, message);
  };
  
  module.exports = sendOrdermodificationMessage;