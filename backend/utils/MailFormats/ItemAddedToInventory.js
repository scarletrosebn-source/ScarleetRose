const sendmail = require("../sendEmail.js");
const dotenv = require("dotenv");
dotenv.config();

const ItemAddedToInventoryMessage = async (productName,productId,description) => {
  const subject = "New Product Added to Inventory";
  const message = `A new product "${productName}" has been added to the inventory. Product ID: ${productId}\nDescription: ${description}`;

  const adminEmails = (process.env.ADMIN_EMAIL || "")
    .split(",")
    .map((email) => email.trim())
    .filter(Boolean);

  if (adminEmails.length === 0) {
    return;
  }

  await sendmail(adminEmails, subject, message);
};

exports.ItemAddedToInventoryMessage = ItemAddedToInventoryMessage;