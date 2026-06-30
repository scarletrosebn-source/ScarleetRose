import React, { useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { incrementQuantity, decrementQuantity, removeFromCart } from "../Redux/CartSlice";

import { ShoppingBag, Minus, Plus, Trash2, ArrowLeft, ShieldCheck, Truck } from "lucide-react";
import { PLACEHOLDER_IMAGE } from "../config/assets";

const Cart = () => {
  const dispatch = useDispatch();

  const { cartItems } = useSelector((state) => state.cart);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const subtotal = useMemo(() => {
    return cartItems.reduce((total, item) => {
      const discounted = item.price - item.price * (item.discount / 100);

      return total + discounted * item.quantity;
    }, 0);
  }, [cartItems]);

  const originalPrice = useMemo(() => {
    return cartItems.reduce((total, item) => {
      return total + item.price * item.quantity;
    }, 0);
  }, [cartItems]);

  const totalDiscount = originalPrice - subtotal;

  const totalItems = useMemo(() => {
    return cartItems.reduce((acc, item) => acc + item.quantity, 0);
  }, [cartItems]);

  if (cartItems.length === 0) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-rose-50 via-rose-100 to-white flex items-center justify-center px-6">
        <div className="max-w-lg w-full bg-white/90 backdrop-blur-xl rounded-[40px] shadow-2xl shadow-rose-200/40 ring-1 ring-rose-100 p-12 text-center">
          <div className="mx-auto flex h-28 w-28 items-center justify-center rounded-full bg-rose-100">
            <ShoppingBag size={55} className="text-rose-600" />
          </div>

          <h1 className="mt-8 text-4xl font-extrabold text-rose-950">Your Cart is Empty</h1>

          <p className="mt-4 leading-8 text-rose-700">Looks like you haven't added anything yet. Discover beautiful products from our latest collection.</p>

          <Link
            to="/shop"
            className="inline-flex items-center gap-2 mt-10 rounded-full bg-rose-600 px-8 py-4 text-white font-semibold shadow-lg shadow-rose-300 transition hover:bg-rose-700 hover:scale-105"
          >
            <ArrowLeft size={18} />
            Continue Shopping
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-rose-50 via-rose-100 to-white py-14">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-12">
          <h1 className="text-5xl font-extrabold text-rose-950">Shopping Cart</h1>

          <p className="mt-3 text-lg text-rose-700">
            {totalItems} item{totalItems > 1 ? "s" : ""} in your cart
          </p>
        </div>

        <div className="grid gap-10 lg:grid-cols-[1.7fr_0.8fr]">
          {/* LEFT SIDE */}

          <div className="space-y-7">
            {cartItems.map((item) => {
              const discountedPrice = item.price - item.price * (item.discount / 100);

              return (
                <div
                  key={item.id}
                  className="rounded-[32px] bg-white/90 backdrop-blur-lg shadow-xl shadow-rose-200/30 ring-1 ring-rose-100 p-6 transition duration-300 hover:-translate-y-1 hover:shadow-2xl"
                >
                  <div className="flex flex-col gap-6 md:flex-row">
                    <div className="relative">
                      <img
                        src={item.images?.[0] || PLACEHOLDER_IMAGE}
                        alt={item.name}
                        className="h-44 w-44 rounded-3xl object-cover border border-rose-100"
                        onError={(event) => {
                          event.currentTarget.src = PLACEHOLDER_IMAGE;
                        }}
                      />

                      {item.discount > 0 && <div className="absolute left-3 top-3 rounded-full bg-rose-600 px-3 py-1 text-xs font-bold text-white shadow-lg">{item.discount}% OFF</div>}
                    </div>

	                    <div className="flex flex-1 flex-col justify-between">
	                      <div>
	                        <div className="flex items-start justify-between gap-4">
	                          <div>
	                            <h2 className="text-2xl font-bold text-rose-950">{item.name}</h2>

                            <p className="mt-3 line-clamp-2 text-sm leading-7 text-rose-700/80">{item.description}</p>
                          </div>

                          <button onClick={() => dispatch(removeFromCart(item))} className="rounded-xl p-3 text-rose-400 transition hover:bg-rose-50 hover:text-red-500">
                            <Trash2 size={20} />
                          </button>
                        </div>

                        <div className="mt-6 flex flex-wrap items-center gap-4">
                          <span className="text-3xl font-bold text-rose-700">₹{discountedPrice.toFixed(2)}</span>

                          {item.discount > 0 && <span className="text-lg text-rose-300 line-through">₹{item.price.toFixed(2)}</span>}
                        </div>

                        <div className="mt-5 flex flex-wrap items-center gap-3">
                          {item.stock > 10 ? (
                            <span className="rounded-full bg-emerald-100 px-4 py-2 text-sm font-semibold text-emerald-700">In Stock</span>
                          ) : item.stock > 0 ? (
                            <span className="rounded-full bg-orange-100 px-4 py-2 text-sm font-semibold text-orange-600">Only {item.stock} left</span>
                          ) : (
                            <span className="rounded-full bg-red-100 px-4 py-2 text-sm font-semibold text-red-600">Out of Stock</span>
                          )}

	                          <span className="rounded-full bg-rose-100 px-4 py-2 text-sm font-medium text-rose-700">Qty: {item.quantity}</span>
	                        </div>
	                      </div>
	                    </div>
	                  </div>

	                  <div className="mt-8 flex flex-col items-start gap-6 sm:flex-row sm:items-center sm:justify-between">
	                    <div className="flex w-fit items-center rounded-2xl border border-rose-100 bg-rose-50 p-2 shadow-sm">
	                      <button onClick={() => dispatch(decrementQuantity(item))} className="flex h-11 w-11 items-center justify-center rounded-xl text-rose-700 transition hover:bg-white">
	                        <Minus size={18} />
	                      </button>

	                      <span className="w-14 text-center text-xl font-bold text-rose-900">{item.quantity}</span>

	                      <button
	                        disabled={item.quantity >= item.stock}
	                        onClick={() => dispatch(incrementQuantity(item))}
	                        className={`flex h-11 w-11 items-center justify-center rounded-xl transition
	                          ${item.quantity >= item.stock ? "cursor-not-allowed bg-gray-100 text-gray-400" : "text-rose-700 hover:bg-white"}`}
	                      >
	                        <Plus size={18} />
	                      </button>
	                    </div>

	                    <div className="text-left sm:text-right">
	                      <p className="text-sm text-rose-600">Total</p>

	                      <h2 className="text-3xl font-extrabold text-rose-950">₹{(discountedPrice * item.quantity).toFixed(2)}</h2>
	                    </div>
	                  </div>
	                </div>
	              );
            })}
          </div>

          {/* RIGHT SIDE */}

          <aside className="sticky top-10 h-fit rounded-[32px] bg-white/90 backdrop-blur-lg shadow-xl shadow-rose-200/30 ring-1 ring-rose-100 p-8">
            <h2 className="text-3xl font-bold text-rose-950">Order Summary</h2>

            <div className="mt-8 space-y-6">
              <div className="flex items-center justify-between">
                <span className="text-rose-700">Original Price</span>

                <span className="font-semibold text-rose-900">₹{originalPrice.toFixed(2)}</span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-rose-700">Discount</span>

                <span className="font-semibold text-emerald-600">- ₹{totalDiscount.toFixed(2)}</span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-rose-700">Shipping</span>

                <span className="font-semibold text-emerald-600">FREE</span>
              </div>

              <hr className="border-rose-100" />
              <div className="flex items-center justify-between">
                <span className="text-xl font-bold text-rose-950">Grand Total</span>

                <span className="text-3xl font-extrabold text-rose-700">₹{subtotal.toFixed(2)}</span>
              </div>
            </div>

            <button className="mt-10 w-full rounded-full bg-rose-600 py-4 text-lg font-semibold text-white shadow-lg shadow-rose-300 transition duration-300 hover:scale-[1.02] hover:bg-rose-700 active:scale-100">
              Proceed to Checkout
            </button>

            <Link to="/shop" className="mt-5 block text-center font-semibold text-rose-700 transition hover:text-rose-900">
              Continue Shopping
            </Link>

            <div className="mt-10 space-y-5 rounded-3xl bg-rose-50 p-6">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white shadow">
                  <Truck size={22} className="text-rose-600" />
                </div>

                <div>
                  <p className="font-semibold text-rose-900">Free Shipping</p>

                  <p className="text-sm text-rose-700/80">On all eligible orders.</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white shadow">
                  <ShieldCheck size={22} className="text-rose-600" />
                </div>

                <div>
                  <p className="font-semibold text-rose-900">Secure Payments</p>

                  <p className="text-sm text-rose-700/80">SSL encrypted checkout for your safety.</p>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
};

export default Cart;
