require("dotenv").config();
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const connectDB = require("./config/db");
const User = require("./model/User");
const Product = require("./model/Product");
const Order = require("./model/Order");
const OwnerSocials = require("./model/Ownersocials");

const seedDatabase = async () => {
  try {
    await connectDB();

    const passwordHash = await bcrypt.hash("123456", 10);

    const adminUser = await User.findOneAndUpdate(
      { email: "admin@example.com" },
      {
        $setOnInsert: {
          username: "admin",
          email: "admin@example.com",
          password: passwordHash,
          role: "admin",
          isVerified: true,
        },
      },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );

    const regularUsers = await Promise.all(
      [
        { username: "alice", email: "alice@example.com" },
        { username: "bob", email: "bob@example.com" },
      ].map(async (user) => {
        return User.findOneAndUpdate(
          { email: user.email },
          {
            $setOnInsert: {
              username: user.username,
              email: user.email,
              password: passwordHash,
              role: "user",
              isVerified: true,
            },
          },
          { upsert: true, new: true, setDefaultsOnInsert: true }
        );
      })
    );

    const productsData = [
      {
        name: "Wireless Headphones",
        description: "Noise-cancelling over-ear headphones with 30h battery life.",
        price: 2499,
        discount: 10,
        category: ["Electronics", "Audio"],
        images: ["https://via.placeholder.com/300x300?text=Headphones"],
        stock: 15,
        rating: 4.6,
        reviews: [
          { review: "Great sound quality", customer_rating: 5 },
          { review: "Comfortable for long use", customer_rating: 4 },
        ],
      },
      {
        name: "Smart Watch",
        description: "Fitness tracking smartwatch with heart rate monitoring.",
        price: 1899,
        discount: 5,
        category: ["Electronics", "Wearables"],
        images: ["https://via.placeholder.com/300x300?text=Smart+Watch"],
        stock: 8,
        rating: 4.4,
        reviews: [{ review: "Looks premium", customer_rating: 4 }],
      },
      {
        name: "Casual T-Shirt",
        description: "Soft cotton casual t-shirt in navy blue.",
        price: 799,
        discount: 0,
        category: ["Fashion", "Men"],
        images: ["https://via.placeholder.com/300x300?text=T-Shirt"],
        stock: 25,
        rating: 4.2,
        reviews: [{ review: "Good fit", customer_rating: 5 }],
      },
      {
        name: "Leather Backpack",
        description: "Durable backpack with multiple compartments.",
        price: 1499,
        discount: 15,
        category: ["Accessories", "Travel"],
        images: ["https://via.placeholder.com/300x300?text=Backpack"],
        stock: 12,
        rating: 4.7,
        reviews: [{ review: "Excellent quality", customer_rating: 5 }],
      },
    ];

    const createdProducts = await Promise.all(
      productsData.map(async (product) => {
        return Product.findOneAndUpdate(
          { name: product.name },
          {
            $setOnInsert: product,
          },
          { upsert: true, new: true, setDefaultsOnInsert: true }
        );
      })
    );

    const sampleOrders = [
      {
        userId: regularUsers[0]._id,
        products: [
          {
            productId: createdProducts[0]._id,
            quantity: 1,
            price: createdProducts[0].price,
            discount: createdProducts[0].discount,
          },
          {
            productId: createdProducts[2]._id,
            quantity: 2,
            price: createdProducts[2].price,
            discount: createdProducts[2].discount,
          },
        ],
        address: {
          fullname: "Alice Johnson",
          address: "12, Main Street",
          city: "Mumbai",
          postalCode: "400001",
          country: "India",
        },
        status: "payment-received",
        paymentId: "pay_test_001",
      },
      {
        userId: regularUsers[1]._id,
        products: [
          {
            productId: createdProducts[1]._id,
            quantity: 1,
            price: createdProducts[1].price,
            discount: createdProducts[1].discount,
          },
          {
            productId: createdProducts[3]._id,
            quantity: 1,
            price: createdProducts[3].price,
            discount: createdProducts[3].discount,
          },
        ],
        address: {
          fullname: "Bob Smith",
          address: "88, Park Avenue",
          city: "Delhi",
          postalCode: "110001",
          country: "India",
        },
        status: "delivered",
        paymentId: "pay_test_002",
      },
    ];

    await Promise.all(
      sampleOrders.map(async (order) => {
        return Order.findOneAndUpdate(
          { paymentId: order.paymentId },
          { $setOnInsert: order },
          { upsert: true, new: true, setDefaultsOnInsert: true }
        );
      })
    );

    const ownerSocialsData = {
      socials: {
        facebook: "https://www.facebook.com/yourpage",
        instagram: "https://www.instagram.com/yourprofile",
        twitter: "https://twitter.com/yourhandle",
        pinterest: "https://www.pinterest.com/yourprofile",
      },
      contacts: {
        email: "sample@sample.com",
        phone: "+91-1234567890",
      },
    };

    const ownerSocials = await OwnerSocials.findOneAndUpdate(
      {},
      {
        $set: ownerSocialsData,
      },
      { upsert: true, new: true, setDefaultsOnInsert: true, runValidators: true }
    );

    console.log("Dummy data seeded successfully.");
    console.log({ adminUser: adminUser.email, users: regularUsers.map((u) => u.email), products: createdProducts.map((p) => p.name), ownerSocials: ownerSocials.contacts.email });
  } catch (error) {
    console.error("Seed failed:", error);
  } finally {
    await mongoose.disconnect();
  }
};

seedDatabase();
