import React from "react";

const ReturnsRefunds = () => {
  const appName = process.env.REACT_APP_APP_NAME || "Scarlet Rose";

  return (
    <div className="min-h-screen bg-white">
      <section className="bg-gradient-to-b from-rose-50 to-white px-4 py-16 md:py-24">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-rose-900 mb-4">
            Returns & Refunds
          </h1>
          <p className="text-lg text-gray-600 mb-6">
            We want you to love your purchase from {appName}. As a small
            business, we keep our return and refund process fair, transparent,
            and practical for both our customers and our team.
          </p>
          <div className="w-24 h-1 bg-rose-500 mx-auto rounded-full"></div>
        </div>
      </section>

      <section className="px-4 py-16 md:py-20 max-w-5xl mx-auto">
        <div className="space-y-10">
          <div className="rounded-lg border border-rose-100 bg-rose-50 p-6">
            <h2 className="text-2xl font-bold text-rose-900 mb-3">
              Our Policy
            </h2>
            <p className="text-gray-700 leading-relaxed">
              Returns may be accepted for eligible items that are unused,
              undamaged, and returned in their original packaging. To request a
              return, please contact us with your order details and reason for
              return before sending the item back.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            <div>
              <h2 className="text-2xl font-bold text-rose-900 mb-3">
                Refund Amount
              </h2>
              <p className="text-gray-700 leading-relaxed">
                Approved refunds will be processed after we receive and inspect
                the returned item. Payment gateway charges, including fees
                charged to us by Razorpay during the original transaction, are
                non-refundable and may be deducted from the refund amount where
                applicable.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-rose-900 mb-3">
                Return Shipping
              </h2>
              <p className="text-gray-700 leading-relaxed">
                Return shipping costs are to be borne by the buyer unless the
                item received was incorrect, defective, or damaged due to our
                error. We recommend using a trackable shipping service for all
                returns.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-rose-900 mb-3">
                Non-Returnable Items
              </h2>
              <p className="text-gray-700 leading-relaxed">
                Items that are used, altered, damaged after delivery, missing
                original packaging, or specially customized may not be eligible
                for return or refund.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-rose-900 mb-3">
                Processing Time
              </h2>
              <p className="text-gray-700 leading-relaxed">
                Once approved, refunds are initiated to the original payment
                method. The time taken for the amount to reflect depends on the
                payment provider, bank, or card issuer.
              </p>
            </div>
          </div>

          <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
            <h2 className="text-2xl font-bold text-rose-900 mb-3">
              How To Request A Return
            </h2>
            <ol className="list-decimal list-inside space-y-2 text-gray-700 leading-relaxed">
              <li>Contact us with your order number and reason for return.</li>
              <li>Wait for our confirmation before shipping the product back.</li>
              <li>Pack the item securely in its original packaging.</li>
              <li>Share the return tracking details with us once shipped.</li>
            </ol>
          </div>

          <div className="text-center">
            <p className="text-gray-700 leading-relaxed">
              For return or refund requests, please reach out through our
              contact page. We will review your request and guide you through
              the next steps.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ReturnsRefunds;