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

function App() {
    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/about" element={<About />} />
                <Route path="/returns-refunds" element={<ReturnsRefunds />} />
                <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                <Route path="/terms-conditions" element={<TermsConditions />} />
                {/* <Route path="/contact" element={<div>Contact Page</div>} /> */}
            </Routes>
            <Footer />
        </Router>
    );
}

export default App;