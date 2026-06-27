import React from "react";
import { Link } from "react-router-dom";
const Footer = () => {
  return (
    <footer className="footer sticky bottom-0 bg-gray-900 py-4 text-center text-sm text-gray-300">
      <div className="footer-content">
       <p className="mb-2">
          &copy; 2023 Scarlet Rose. All rights reserved.
        </p>
        <ul className="flex justify-center space-x-4">
          <li>
            <Link to="/about" className="text-gray-300 hover:text-white">
              About
            </Link>
          </li>
          <li>
            <Link to="/contact" className="text-gray-300 hover:text-white">
              Contact
            </Link>
          </li>
          <li>
            <Link to="/returns-refunds" className="text-gray-300 hover:text-white">
              Returns & Refunds
            </Link>
          </li>
          <li>
            <Link to="/privacy-policy" className="text-gray-300 hover:text-white">
              Privacy Policy
            </Link>
          </li>
          <li>
            <Link to="/terms-conditions" className="text-gray-300 hover:text-white">
              Terms & Conditions
            </Link>
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
