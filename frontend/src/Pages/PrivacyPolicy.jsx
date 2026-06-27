
import React from "react";



const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-white">
      <section className="bg-gradient-to-b from-rose-50 to-white px-4 py-16 md:py-24">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-rose-900 mb-4">
            Privacy Policy
          </h1>
          <p className="text-lg text-gray-600 mb-6">
            At Scarlet Rose, we take your privacy seriously. This Privacy Policy
            outlines how we collect, use, and protect your personal information.
          </p>
          <div className="w-24 h-1 bg-rose-500 mx-auto rounded-full"></div>
        </div>
      </section>
      <section className="px-4 py-16 md:py-20 max-w-5xl mx-auto">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="text-3xl font-bold text-rose-900 mb-4">
              Information We Collect
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Scarlet Rose collects the following information from you:
            </p>
            <ul className="list-disc list-inside">
              <li>Name</li>
              <li>Email address</li>
              <li>Shipping address</li>
              <li>Payment information</li>
            </ul>
          </div>
          <div>
            <h2 className="text-3xl font-bold text-rose-900 mb-4">
              How We Use Your Information
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Scarlet Rose uses your information to process your orders, provide
              customer service, and fulfill your purchases.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PrivacyPolicy;