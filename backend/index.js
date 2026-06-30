const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
// Load environment variables early so other modules can read them
dotenv.config();
const connectDB = require("./config/db");
connectDB();
const app = express();
const PORT = process.env.PORT || 5000;
const path = require("path");

const allowedOrigins = [
  process.env.FRONTEND_URL,
  "http://localhost:3000",
  "http://localhost:3001",
  "https://scarlet-rose.vercel.app",
].filter(Boolean);

if(process.env.NODE_ENV === "development"){
  const morgan = require("morgan");
  app.use(morgan("dev"));
}
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/build")));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../frontend/build/index.html"));
  });
}
else{
  app.get("/", (req, res) => {
    res.send("API is running");
  });
}

app.use(cors(
  {
    origin: allowedOrigins,
    allowedMethods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,

  }
));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// Routes
console.log("Registering auth routes...");
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/products", require("./routes/productRoutes.js")); 
app.use("/api/orders", require("./routes/orderRoutes.js"));
app.use("/api/payments", require("./routes/paymentRoutes.js"));
app.use("/api/analytics", require("./routes/analyticsRoutes.js"));
app.use("/api/customerSupport", require("./routes/customerSupportRoutes.js"));



app.get("/health", (req, res) => {
  res.send("Ecom Backend is running!");
});
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
