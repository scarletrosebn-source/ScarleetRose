import { useContext, useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../Context/AuthContext";
import {
  CheckCircle2,
  Clock3,
  XCircle,
  CreditCard,
  Receipt,
  ShoppingBag,
  ArrowRight,
} from "lucide-react";

const OrderDetails = () => {
  const { orderId } = useParams();
  const { user } = useContext(AuthContext);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [orderState, setOrderState] = useState({
    orderId: "",
    paymentId: "",
    amount: 0,
    paymentMethod: "Razorpay",
    orderStatus: "",
  });

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const res = await axios.get(`/api/orders/${orderId}/status`, {
          headers: {
            Authorization: `Bearer ${user?.token}`,
          },
        });

        if (res.status === 200) {
          const { order } = res.data;

          setOrderState({
            orderId: order._id,
            paymentId: order.paymentId,
            amount: order.totalPrice,
            paymentMethod: "Razorpay",
            orderStatus: order.status,
          });
        }
      } catch (err) {
        setError("Unable to fetch order details.");
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [orderId, user]);

  const { paymentId, amount, paymentMethod, orderStatus } = orderState;

  const isPaid = orderStatus === "payment-received";
  const isPending = orderStatus === "pending";
  const isFailed = orderStatus === "payment-failed";

  return (
    <main className="relative isolate min-h-screen overflow-hidden bg-gradient-to-br from-rose-50 via-white to-pink-100 px-4 py-10">

      {/* Background */}

      <div
        className="pointer-events-none absolute inset-0 -z-10 bg-cover bg-center opacity-20"
        style={{ backgroundImage: "url('/Register.jpg')" }}
      />

      <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-br from-white/95 via-rose-50/90 to-white/80" />

      {loading ? (
        <div className="flex min-h-screen items-center justify-center">

          <div className="rounded-3xl bg-white px-10 py-8 shadow-xl ring-1 ring-rose-100">

            <div className="flex items-center gap-4">

              <svg
                className="h-8 w-8 animate-spin text-rose-600"
                viewBox="0 0 24 24"
                fill="none"
              >
                <circle
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                  className="opacity-20"
                />

                <path
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                />
              </svg>

              <span className="text-lg font-semibold text-rose-900">
                Fetching Order Details...
              </span>

            </div>

          </div>

        </div>
      ) : error ? (
        <div className="flex min-h-screen items-center justify-center">

          <div className="rounded-3xl bg-white p-10 shadow-xl ring-1 ring-red-200">

            <h2 className="text-2xl font-bold text-red-600">
              {error}
            </h2>

          </div>

        </div>
      ) : (
        <section className="mx-auto max-w-2xl">

          <div className="rounded-[2.5rem] bg-white/95 p-10 shadow-2xl ring-1 ring-rose-100">

            {/* Icon */}

            <div className="flex justify-center">

              <div
                className={`flex h-28 w-28 items-center justify-center rounded-full ring-8
                  ${
                    isPaid
                      ? "bg-emerald-100 ring-emerald-50"
                      : isPending
                      ? "bg-yellow-100 ring-yellow-50"
                      : "bg-red-100 ring-red-50"
                  }`}
              >
                {isPaid && (
                  <CheckCircle2
                    size={70}
                    className="text-emerald-600"
                  />
                )}

                {isPending && (
                  <Clock3
                    size={70}
                    className="text-yellow-600"
                  />
                )}

                {isFailed && (
                  <XCircle
                    size={70}
                    className="text-red-600"
                  />
                )}
              </div>

            </div>

            {/* Heading */}

            <h1 className="mt-8 text-center text-4xl font-extrabold text-rose-900">

              {isPaid && "Payment Successful 🎉"}

              {isPending && "Payment Verification Pending"}

              {isFailed && "Payment Failed"}

            </h1>

            <p className="mt-4 text-center text-gray-600">

              {isPaid &&
                "Your payment has been verified successfully and your order has been confirmed."}

              {isPending &&
                "We're waiting for Razorpay to confirm your payment. Please don't make another payment."}

              {isFailed &&
                "Unfortunately we couldn't verify your payment."}

            </p>

            {/* Details */}

            <div className="mt-10 rounded-3xl border border-rose-100 bg-rose-50 p-6">

              <div className="mb-6 flex items-center gap-3">

                <Receipt className="text-rose-600" />

                <h2 className="text-xl font-bold text-rose-900">
                  Payment Details
                </h2>

              </div>

              <div className="space-y-5">

                <div className="flex justify-between">
                  <span className="text-gray-500">Order ID</span>

                  <span className="font-semibold text-rose-900">
                    #{orderId}
                  </span>
                </div>

                <div className="flex justify-between">

                  <span className="text-gray-500">
                    Payment Status
                  </span>

                  {isPaid && (
                    <span className="rounded-full bg-emerald-100 px-4 py-1 text-sm font-bold text-emerald-700">
                      Paid
                    </span>
                  )}

                  {isPending && (
                    <span className="rounded-full bg-yellow-100 px-4 py-1 text-sm font-bold text-yellow-700">
                      Pending
                    </span>
                  )}

                  {isFailed && (
                    <span className="rounded-full bg-red-100 px-4 py-1 text-sm font-bold text-red-700">
                      Failed
                    </span>
                  )}

                </div>

                <div className="flex justify-between">

                  <span className="text-gray-500">
                    Amount
                  </span>

                  <span className="font-bold text-rose-900">
                    ₹{Number(amount).toFixed(2)}
                  </span>

                </div>

                <div className="flex justify-between">

                  <span className="text-gray-500">
                    Payment Method
                  </span>

                  <span className="flex items-center gap-2 font-semibold text-rose-900">

                    <CreditCard size={18} />

                    {paymentMethod}

                  </span>

                </div>

                <div className="flex justify-between items-start">

                  <span className="text-gray-500">
                    Transaction ID
                  </span>

                  <span className="max-w-[220px] break-all text-right text-sm text-gray-700">
                    {paymentId || "-"}
                  </span>

                </div>

              </div>

            </div>

            {/* Order Status */}

            <div className="mt-8 rounded-3xl bg-gradient-to-r from-rose-600 to-pink-600 p-6 text-white">

              <div className="flex items-center gap-4">

                <ShoppingBag size={32} />

                <div>

                  <h3 className="text-xl font-bold capitalize">
                    {orderStatus.replace("-", " ")}
                  </h3>

                  <p className="mt-2 text-sm text-rose-100">

                    {isPaid &&
                      "Our team has started preparing your order. You'll receive another email once it has been shipped."}

                    {isPending &&
                      "Your order will automatically be confirmed once the payment is verified."}

                    {isFailed &&
                      "Please retry your payment from the Orders section if required."}

                  </p>

                </div>

              </div>

            </div>

            {/* Buttons */}

            <div className="mt-10 flex flex-col gap-4 sm:flex-row">

              <Link
                to={`/orders/${orderId}`}
                className="flex flex-1 items-center justify-center gap-2 rounded-2xl bg-rose-600 py-4 font-bold text-white transition hover:bg-rose-700"
              >
                View Order

                <ArrowRight size={18} />

              </Link>

              <Link
                to="/"
                className="flex-1 rounded-2xl border border-rose-200 bg-white py-4 text-center font-bold text-rose-700 transition hover:bg-rose-50"
              >
                Continue Shopping
              </Link>

            </div>

          </div>

        </section>
      )}
    </main>
  );
};

export default OrderDetails;
