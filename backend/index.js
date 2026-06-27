const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
// Load environment variables early so other modules can read them
dotenv.config();
const connectDB = require("./config/db");
connectDB();
const app = express();
const PORT = process.env.PORT || 5000;


app.use(cors(
  {
    origin: ["http://localhost:3000","https://scarlet-rose.vercel.app","http://localhost:3001","https://localhost:5000"],
    allowedMethods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,

  }
));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// Routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/products", require("./routes/productRoutes.js")); 
app.use("/api/orders", require("./routes/orderRoutes.js"));
//app.use("/api/payments", require("./routes/paymentRoutes.js"));
app.use("/api/analytics", require("./routes/analyticsRoutes.js"));
app.use("/api/customerSupport", require("./routes/customerSupportRoutes.js"));



app.get("/health", (req, res) => {
  res.send("Ecom Backend is running!");
});
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});