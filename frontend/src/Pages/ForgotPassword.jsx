import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { PLACEHOLDER_IMAGE } from "../config/assets";
const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Perform password recovery logic here
    const resp = await axios.post("/api/customerSupport/forgot-password", { email });
    if (resp.status === 200) {
      setIsSubmitted(true);
      setIsLoading(false);
      alert(resp.data.message);
    }
    else{
      alert(resp.data.message);
    }
    setIsLoading(false);
  };

  return (
    <main className="relative isolate min-h-screen overflow-hidden bg-gradient-to-br from-rose-50 via-white to-pink-100 px-4 py-12 sm:px-6 lg:px-8">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-cover bg-center opacity-20" style={{ backgroundImage: "url('/Register.jpg')" }} aria-hidden="true" />
      <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-br from-white/95 via-rose-50/90 to-white/80" aria-hidden="true" />

      <section className="mx-auto grid max-w-5xl overflow-hidden rounded-[2rem] bg-white/95 shadow-2xl shadow-rose-200/40 ring-1 ring-rose-100 backdrop-blur md:grid-cols-[0.9fr_1.1fr]">
        <div className="relative hidden min-h-[600px] overflow-hidden bg-rose-950 md:block">
          <img src="/login.jpg" alt="Password recovery" className="h-full w-full object-cover opacity-80" />
          <div className="absolute inset-0 bg-gradient-to-t from-rose-950 via-rose-950/35 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 p-10 text-white">
            <span className="inline-flex rounded-full bg-white/15 px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] ring-1 ring-white/30 backdrop-blur">Account recovery</span>
            <h1 className="mt-5 max-w-md text-4xl font-extrabold tracking-tight">Reset access to your Scarlet Rose account.</h1>
            <p className="mt-4 max-w-sm text-sm leading-7 text-rose-50/85">Enter your account email and we will send a secure password reset link.</p>
          </div>
        </div>

        <div className="flex min-h-[600px] items-center px-6 py-10 sm:px-10 lg:px-14">
          <div className="w-full">
            <div className="mb-8 text-center md:text-left">
              <Link to="/" className="mx-auto mb-6 flex w-fit items-center gap-3 rounded-full bg-rose-50 px-4 py-2 ring-1 ring-rose-100 md:mx-0">
                <img src={PLACEHOLDER_IMAGE} alt="Scarlet Rose logo" className="h-10 w-10 rounded-full object-cover" />
                <span className="text-sm font-bold uppercase tracking-[0.2em] text-rose-900">Scarlet Rose</span>
              </Link>
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-rose-600">Forgot password</p>
              <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-rose-950 sm:text-4xl">Get a reset link</h2>
              <p className="mt-3 text-sm leading-6 text-gray-600">Use the email connected to your account. The link will open a form where you can create a new password.</p>
            </div>

            {isSubmitted && (
              <div className="mb-6 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm leading-6 text-emerald-900">
                <p className="font-semibold">Check your inbox</p>
                <p className="mt-1">If an account exists for that email, a reset link will be sent shortly.</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-rose-950">
                  Email address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  placeholder="you@example.com"
                  className="mt-2 w-full rounded-2xl border border-rose-100 bg-white px-4 py-3 text-gray-900 shadow-sm outline-none transition placeholder:text-gray-400 focus:border-rose-400 focus:ring-4 focus:ring-rose-100"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className={`flex w-full items-center justify-center rounded-2xl px-5 py-3 text-sm font-bold uppercase tracking-[0.18em] text-white shadow-lg transition
    ${isLoading ? "cursor-not-allowed bg-rose-400 shadow-none" : "bg-rose-600 shadow-rose-500/25 hover:bg-rose-700"}`}
              >
                {isLoading ? (
                  <>
                    <svg className="mr-2 h-5 w-5 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
                    </svg>
                    Sending...
                  </>
                ) : (
                  "Send Reset Link"
                )}
              </button>
            </form>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-4 text-sm md:justify-start">
              <Link to="/login" className="font-bold text-rose-700 transition hover:text-rose-900">
                Back to login
              </Link>
              <span className="text-gray-300">|</span>
              <Link to="/contact" className="font-bold text-gray-600 transition hover:text-rose-900">
                Need help?
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default ForgotPassword;
