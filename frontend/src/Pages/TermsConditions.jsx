import React from "react";

const TermsConditions = () => {
  const appName = process.env.REACT_APP_APP_NAME || "Scarlet Rose";

  return (
    <div className="min-h-screen bg-white">
      <section className="bg-gradient-to-b from-rose-50 to-white px-4 py-16 md:py-24">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-rose-900 mb-4">
            Terms & Conditions
          </h1>
          <p className="text-lg text-gray-600 mb-6">
            Welcome to {appName}. By browsing our website or placing an order,
            you agree to the terms below. These terms help us keep our small
            business transparent, fair, and reliable.
          </p>
          <div className="w-24 h-1 bg-rose-500 mx-auto rounded-full"></div>
        </div>
      </section>

      <section className="px-4 py-16 md:py-20 max-w-5xl mx-auto">
        <div className="space-y-10">
          <div className="rounded-lg border border-rose-100 bg-rose-50 p-6">
            <h2 className="text-2xl font-bold text-rose-900 mb-3">
              General Use
            </h2>
            <p className="text-gray-700 leading-relaxed">
              You agree to use this website only for lawful purposes. You must
              not misuse the site, attempt unauthorized access, interfere with
              its operation, or use it in a way that may harm {appName}, our
              customers, or our services.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            <div>
              <h2 className="text-2xl font-bold text-rose-900 mb-3">
                Product Information
              </h2>
              <p className="text-gray-700 leading-relaxed">
                We try our best to display product details, colors, prices, and
                availability accurately. Slight variations may occur due to
                lighting, screen settings, handcrafted details, or material
                differences.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-rose-900 mb-3">
                Orders & Acceptance
              </h2>
              <p className="text-gray-700 leading-relaxed">
                Placing an order does not automatically guarantee acceptance.
                We may cancel or refuse an order if an item is unavailable,
                pricing is incorrect, payment fails, or suspicious activity is
                detected.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-rose-900 mb-3">
                Pricing & Payments
              </h2>
              <p className="text-gray-700 leading-relaxed">
                Prices are listed in the applicable currency and may change
                without prior notice. Payments are processed through secure
                third-party payment providers. We do not store your complete
                card or payment details on our website.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-rose-900 mb-3">
                Shipping & Delivery
              </h2>
              <p className="text-gray-700 leading-relaxed">
                Delivery timelines are estimates and may vary due to courier
                delays, weather, holidays, address issues, or other factors
                outside our control. Please ensure your shipping details are
                accurate before placing an order.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-rose-900 mb-3">
                Returns & Refunds
              </h2>
              <p className="text-gray-700 leading-relaxed">
                Returns and refunds are handled according to our Returns &
                Refunds policy. Payment gateway charges and return shipping
                costs may apply as described in that policy.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-rose-900 mb-3">
                Customer Responsibilities
              </h2>
              <p className="text-gray-700 leading-relaxed">
                You are responsible for providing accurate account, contact,
                billing, and shipping information. We are not responsible for
                delays, failed deliveries, or losses caused by incorrect
                information provided at checkout.
              </p>
            </div>
          </div>

          <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
            <h2 className="text-2xl font-bold text-rose-900 mb-3">
              Limitation Of Liability
            </h2>
            <p className="text-gray-700 leading-relaxed">
              As a small business, we work hard to provide a dependable
              shopping experience. However, {appName} will not be liable for
              indirect, incidental, or consequential losses arising from use of
              this website, delayed delivery, unavailable products, third-party
              payment issues, or courier service failures.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            <div>
              <h2 className="text-2xl font-bold text-rose-900 mb-3">
                Intellectual Property
              </h2>
              <p className="text-gray-700 leading-relaxed">
                Website content, product images, branding, text, and designs
                belong to {appName} or their respective owners. They may not be
                copied, reused, or distributed without permission.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-rose-900 mb-3">
                Changes To Terms
              </h2>
              <p className="text-gray-700 leading-relaxed">
                We may update these Terms & Conditions from time to time. The
                latest version posted on this page will apply to your use of
                the website and any future purchases.
              </p>
            </div>
          </div>

          <div className="text-center">
            <p className="text-gray-700 leading-relaxed">
              If you have any questions about these terms, please contact us
              before placing an order.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default TermsConditions;
