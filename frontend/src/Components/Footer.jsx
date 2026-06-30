import React from "react";
import { Link } from "react-router-dom";
const Footer = () => {
  return (
    <footer className="footer bg-slate-950 px-4 py-6 text-center text-sm text-gray-300">
      <div className="footer-content mx-auto max-w-6xl">
       <p className="mb-2">
          &copy; 2023 Scarlet Rose. All rights reserved.
        </p>
        <ul className="flex flex-wrap justify-center gap-x-5 gap-y-2">
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
