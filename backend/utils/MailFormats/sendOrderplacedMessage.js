const sendmail = require("../sendEmail.js");

const sendOrderplacedMessage = async (email, username, order) => {
  const subject = `Order Placed Successfully--${order._id}`;
  const message = `
    Hi ${username},\n\n
    Your order has been successfully placed.\n  
    Order ID: ${order._id}\n
    Total Price: ${order.totalPrice}\n
    Payment ID: ${order.paymentId}\n
    Address: ${order.address.fullname}, ${order.address.address}, ${order.address.city}, ${order.address.postalCode}, ${order.address.country}\n
    Products:\n
    ${order.products
  .map(
    (item) =>
      `- ${item.productId.name} (Quantity: ${item.quantity}, Price: ${
        item.price - item.price * (item.discount / 100)
      })`
  )
  .join("\n")}
    \n\nThank you for shopping with us!\n
  `;
  await sendmail(email, subject, message);
};
module.exports = sendOrderplacedMessage;