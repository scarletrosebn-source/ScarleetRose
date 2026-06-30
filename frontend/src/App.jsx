import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import About from "./Pages/About";
import Contact from "./Pages/Contact";
import ReturnsRefunds from "./Pages/ReturnsRefunds.jsx";
import PrivacyPolicy from "./Pages/PrivacyPolicy.jsx";
import TermsConditions from "./Pages/TermsConditions.jsx";
import Shop from "./Pages/Shop";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import VerifyEmail from "./Pages/VerifyEmail";
import ProductDetails from "./Pages/ProductDetails";
import ForgotPassword from "./Pages/ForgotPassword";
import ResetPassword from "./Pages/ResetPassword";
import Cart from "./Pages/Cart";
import OrderDettails from "./Pages/OrderDettails.jsx";
import Checkout from "./Pages/Checkout.jsx";
function App() {
    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/shop" element={<Shop />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/about" element={<About />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/verify-email" element={<VerifyEmail />} />
                <Route path="/returns-refunds" element={<ReturnsRefunds />} />
                <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                <Route path="/terms-conditions" element={<TermsConditions />} />
                <Route path="/product/:id" element={<ProductDetails />} />
                <Route path="/reset-password" element={<ResetPassword />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/order/:orderId" element={<OrderDettails />} />
                <Route path="/checkout" element={<Checkout />} />
                {/* <Route path="/contact" element={<div>Contact Page</div>} /> */}
            </Routes>
            <Footer />
        </Router>
    );
}

export default App;
