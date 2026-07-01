import React, { useMemo, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { clearcart } from "../Redux/CartSlice";
import { AuthContext } from "../Context/AuthContext";
import { useContext } from "react";
import { User, Mail, Phone, MapPin, CreditCard, Truck, ShieldCheck, TicketPercent, Lock } from "lucide-react";
import { PLACEHOLDER_IMAGE } from "../config/assets";

const Checkout = () => {
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.cart);
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);

    if (!user?.token) {
      logout();
      navigate("/login", {
        state: {
          redirectUrl: "/checkout",
        },
      });
    }
  }, [logout, navigate, user]);

  const subtotal = useMemo(() => {
    return cartItems.reduce((sum, item) => sum + (item.price * item.quantity * (100 - item.discount)) / 100, 0);
  }, [cartItems]);

  const shipping = subtotal > 999 ? 0 : 40;

  // const gst = Number((subtotal * 0.18).toFixed(2));

  const gst = 0;//small business so no gst

  const total = subtotal + shipping + gst;

  const [paymentMethod, setPaymentMethod] = useState("cod");

  const [coupon, setCoupon] = useState("");

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    country: "India",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleCheckout = async () => {
    const requiredFields = ["name", "email", "phone", "address", "city", "state", "pincode", "country"];
    const missingField = requiredFields.find((field) => !formData[field].trim());

    if (missingField) {
      alert(`Please enter your ${missingField}.`);
      return;
    }

    if (!user?.token) {
      navigate("/login", {
        state: {
          redirectUrl: "/checkout",
        },
      });
      return;
    }

    setLoading(true);

    try {
      const createOrderReq = await axios.post(
        "/api/orders",
        { cartItems, address: formData },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        },
      );

      if (createOrderReq.status === 201 && createOrderReq.data.message === "Order created successfully") {
        const { orderId, orderAmt } = createOrderReq.data;

        if (paymentMethod === "cod") {
          dispatch(clearcart());
          navigate(`/order/${orderId}`);
          return;
        }

        if (paymentMethod !== "razorpay") {
          alert("This payment method is not available yet. Please choose Cash on Delivery or Razorpay.");
          return;
        }

        const order_created_and_rzp_req_created = await axios.post(
          "/api/payments/order",
          { orderId },
          {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          },
        );
        const razorpayOrderId = order_created_and_rzp_req_created.data.razorpay_order_id;
        if (razorpayOrderId) {
          ////RAZORPAY
          //I HAVE ACQUIRED RAZORPAY ORDER ID
          //           router.post("/order",createrazerpayOrder);//path: /api/payments/order
          // router.post("/confirm", verifyrazorpayPayment);// path: /api/payments/confirm

          const options = {
            key: process.env.REACT_APP_RAZORPAY_KEY_ID,

            amount: orderAmt,

            currency: "INR",

            name: `${user.name} (${user.email})`,

            description: "Order Payment",

            order_id: razorpayOrderId,

            handler: async function (response) {
              try {
                const verifyReq = await axios.post(
                  "/api/payments/confirm",
                  {
                    orderId,

                    razorpay_payment_id: response.razorpay_payment_id,

                    razorpay_order_id: response.razorpay_order_id,

                    razorpay_signature: response.razorpay_signature,
                  },
                  {
                    headers: {
                      Authorization: `Bearer ${user.token}`,
                    },
                  },
                );

                if (verifyReq.status === 200 && verifyReq.data.message === "Payment verified successfully") {
                  dispatch(clearcart());

                  navigate(`/order/${orderId}`);
                }
              } catch (err) {
                alert("Payment verification failed.");
              }
            },

            prefill: {
              name: user.name,
              email: user.email,
            },

            theme: {
              color: "#3399cc",
            },
          };
          const rzp1 = new window.Razorpay(options);
          rzp1.open();
        }
      }
    } catch (error) {
      alert(error.response?.data?.message || "Order creation failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="relative isolate min-h-screen overflow-hidden bg-gradient-to-br from-rose-50 via-white to-pink-100 px-4 py-10 lg:px-8">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-cover bg-center opacity-20" style={{ backgroundImage: "url('/Register.jpg')" }} />

      <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-br from-white/95 via-rose-50/90 to-white/80" />

      <section className="mx-auto max-w-7xl">
        <div className="mb-10 flex flex-col items-center justify-between gap-4 md:flex-row">
          <Link to="/" className="flex items-center gap-3 rounded-full bg-white px-5 py-3 shadow-lg ring-1 ring-rose-100">
            <img src="/Design.png" alt="" className="h-11 w-11 rounded-full" />

            <span className="text-lg font-extrabold uppercase tracking-[0.18em] text-rose-900">Scarlet Rose</span>
          </Link>

          <div className="flex items-center gap-3 rounded-full bg-emerald-50 px-5 py-3 ring-1 ring-emerald-200">
            <ShieldCheck className="text-emerald-600" size={20} />

            <span className="font-semibold text-emerald-700">Secure Checkout</span>
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1.5fr_0.8fr]">
          {/* LEFT SECTION */}
          <div className="space-y-8">
            {/* Shipping Address */}
            <div className="rounded-[2rem] bg-white/95 p-8 shadow-xl ring-1 ring-rose-100">
              <div className="mb-8 flex items-center gap-3">
                <Truck className="text-rose-600" />
                <h2 className="text-2xl font-bold text-rose-900">Shipping Details</h2>
              </div>

              <div className="grid gap-6">
                <div className="grid gap-6 md:grid-cols-2">
                  <div>
                    <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-rose-900">
                      <User size={16} />
                      Full Name
                    </label>

                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="John Doe"
                      className="w-full rounded-2xl border border-rose-100 px-4 py-3 shadow-sm outline-none transition focus:border-rose-400 focus:ring-4 focus:ring-rose-100"
                    />
                  </div>

                  <div>
                    <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-rose-900">
                      <Mail size={16} />
                      Email
                    </label>

                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="john@example.com"
                      className="w-full rounded-2xl border border-rose-100 px-4 py-3 shadow-sm outline-none transition focus:border-rose-400 focus:ring-4 focus:ring-rose-100"
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-rose-900">
                    <Phone size={16} />
                    Phone Number
                  </label>

                  <input
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+91 9876543210"
                    className="w-full rounded-2xl border border-rose-100 px-4 py-3 shadow-sm outline-none transition focus:border-rose-400 focus:ring-4 focus:ring-rose-100"
                  />
                </div>

                <div>
                  <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-rose-900">
                    <MapPin size={16} />
                    Address
                  </label>

                  <textarea
                    rows={4}
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    placeholder="Flat, Street, Area..."
                    className="w-full resize-none rounded-2xl border border-rose-100 px-4 py-3 shadow-sm outline-none transition focus:border-rose-400 focus:ring-4 focus:ring-rose-100"
                  />
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                  <div>
                    <label className="mb-2 text-sm font-semibold text-rose-900">City</label>

                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      className="w-full rounded-2xl border border-rose-100 px-4 py-3 shadow-sm outline-none transition focus:border-rose-400 focus:ring-4 focus:ring-rose-100"
                    />
                  </div>

                  <div>
                    <label className="mb-2 text-sm font-semibold text-rose-900">State</label>

                    <input
                      type="text"
                      name="state"
                      value={formData.state}
                      onChange={handleChange}
                      className="w-full rounded-2xl border border-rose-100 px-4 py-3 shadow-sm outline-none transition focus:border-rose-400 focus:ring-4 focus:ring-rose-100"
                    />
                  </div>
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                  <div>
                    <label className="mb-2 text-sm font-semibold text-rose-900">Pincode</label>

                    <input
                      type="text"
                      name="pincode"
                      value={formData.pincode}
                      onChange={handleChange}
                      className="w-full rounded-2xl border border-rose-100 px-4 py-3 shadow-sm outline-none transition focus:border-rose-400 focus:ring-4 focus:ring-rose-100"
                    />
                  </div>

                  <div>
                    <label className="mb-2 text-sm font-semibold text-rose-900">Country</label>

                    <input
                      type="text"
                      name="country"
                      value={formData.country}
                      onChange={handleChange}
                      className="w-full rounded-2xl border border-rose-100 px-4 py-3 shadow-sm outline-none transition focus:border-rose-400 focus:ring-4 focus:ring-rose-100"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Payment Method */}

            <div className="rounded-[2rem] bg-white/95 p-8 shadow-xl ring-1 ring-rose-100">
              <div className="mb-8 flex items-center gap-3">
                <CreditCard className="text-rose-600" />

                <h2 className="text-2xl font-bold text-rose-900">Payment Method</h2>
              </div>

              <div className="space-y-4">
                <button
                  type="button"
                  onClick={() => setPaymentMethod("cod")}
                  className={`w-full rounded-2xl border p-5 text-left transition ${
                    paymentMethod === "cod" ? "border-rose-500 bg-rose-50 ring-4 ring-rose-100" : "border-rose-100 hover:border-rose-300"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-bold text-rose-900">💵 Cash on Delivery</h3>

                      <p className="mt-1 text-sm text-gray-500">Pay when your order arrives.</p>
                    </div>

                    <div className={`h-5 w-5 rounded-full border-2 ${paymentMethod === "cod" ? "border-rose-600 bg-rose-600" : "border-gray-300"}`} />
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod("razorpay")}
                  className={`w-full rounded-2xl border p-5 text-left transition ${
                    paymentMethod === "razorpay" ? "border-rose-500 bg-rose-50 ring-4 ring-rose-100" : "border-rose-100 hover:border-rose-300"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-bold text-rose-900">💳 Razorpay</h3>

                      <p className="mt-1 text-sm text-gray-500">UPI • Cards • Wallets • Net Banking</p>
                    </div>

                    <div className={`h-5 w-5 rounded-full border-2 ${paymentMethod === "razorpay" ? "border-rose-600 bg-rose-600" : "border-gray-300"}`} />
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod("stripe")}
                  className={`w-full rounded-2xl border p-5 text-left transition ${
                    paymentMethod === "stripe" ? "border-rose-500 bg-rose-50 ring-4 ring-rose-100" : "border-rose-100 hover:border-rose-300"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-bold text-rose-900">💳 Stripe</h3>

                      <p className="mt-1 text-sm text-gray-500">International Cards & Payments</p>
                    </div>

                    <div className={`h-5 w-5 rounded-full border-2 ${paymentMethod === "stripe" ? "border-rose-600 bg-rose-600" : "border-gray-300"}`} />
                  </div>
                </button>
              </div>
            </div>
          </div>
          {/* RIGHT SECTION */}
          <div className="space-y-6">
            {/* Order Summary */}
            <div className="sticky top-8 rounded-[2rem] bg-white/95 p-8 shadow-xl ring-1 ring-rose-100">
              <h2 className="mb-6 text-2xl font-bold text-rose-900">Order Summary</h2>

              <div className="max-h-72 space-y-4 overflow-y-auto pr-2">
                {cartItems.length === 0 ? (
                  <p className="text-center text-gray-500">Your cart is empty.</p>
                ) : (
                  cartItems.map((item) => (
                    <div key={item._id} className="flex items-center gap-4 rounded-2xl border border-rose-100 p-3">
                      <img src={item.images?.[0] || PLACEHOLDER_IMAGE} alt={item.name} className="h-20 w-20 rounded-xl object-cover" />

                      <div className="flex-1">
                        <h3 className="font-semibold text-rose-900">{item.name}</h3>

                        <p className="text-sm text-gray-500">Qty : {item.quantity}</p>
                      </div>

                      <span className="font-bold text-rose-700">₹{(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  ))
                )}
              </div>

              {/* Coupon */}

              <div className="mt-8">
                <label className="mb-2 flex items-center gap-2 font-semibold text-rose-900">
                  <TicketPercent size={18} />
                  Coupon Code
                </label>

                <div className="flex gap-3">
                  <input
                    value={coupon}
                    onChange={(e) => setCoupon(e.target.value)}
                    placeholder="Enter coupon"
                    className="flex-1 rounded-xl border border-rose-100 px-4 py-3 outline-none transition focus:border-rose-400 focus:ring-4 focus:ring-rose-100"
                  />

                  <button className="rounded-xl bg-rose-600 px-5 font-semibold text-white transition hover:bg-rose-700">Apply</button>
                </div>
              </div>

              {/* Price Details */}

              <div className="mt-8 space-y-4 border-t border-dashed border-rose-200 pt-6">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>₹{subtotal.toFixed(2)}</span>
                </div>

                <div className="flex justify-between text-gray-600">
                  <span>Shipping</span>

                  {shipping === 0 ? <span className="font-semibold text-emerald-600">FREE</span> : <span>₹{shipping}</span>}
                </div>

                <div className="flex justify-between text-gray-600">
                  <span>GST (18%)</span>
                  <span>₹{gst.toFixed(2)}</span>
                </div>

                <div className="flex justify-between border-t pt-5 text-2xl font-bold text-rose-900">
                  <span>Total</span>
                  <span>₹{total.toFixed(2)}</span>
                </div>
              </div>

              {/* Checkout */}

              <button
                onClick={handleCheckout}
                disabled={loading || cartItems.length === 0}
                className={`mt-8 flex w-full items-center justify-center rounded-2xl py-4 text-lg font-bold text-white transition ${
                  loading ? "cursor-not-allowed bg-rose-400" : "bg-rose-600 hover:bg-rose-700"
                }`}
              >
                {loading ? (
                  <>
                    <svg className="mr-3 h-6 w-6 animate-spin" fill="none" viewBox="0 0 24 24">
                      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" className="opacity-25" />

                      <path fill="currentColor" className="opacity-75" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
                    </svg>
                    Processing...
                  </>
                ) : (
                  <>
                    <Lock className="mr-2" size={20} />
                    Complete Purchase
                  </>
                )}
              </button>

              {/* Security */}

              <div className="mt-8 rounded-2xl bg-rose-50 p-5">
                <div className="flex items-center gap-2 text-rose-800">
                  <ShieldCheck size={22} />

                  <span className="font-bold">Safe & Secure Checkout</span>
                </div>

                <ul className="mt-4 space-y-2 text-sm text-gray-600">
                  <li>✓ SSL Encrypted Payment</li>

                  <li>✓ 100% Genuine Products</li>

                  <li>✓ Easy Returns</li>

                  <li>✓ Free Shipping above ₹999</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Checkout;
