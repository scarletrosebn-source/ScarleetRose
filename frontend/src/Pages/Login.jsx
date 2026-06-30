import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { PLACEHOLDER_IMAGE } from "../config/assets";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <main className="relative isolate min-h-screen overflow-hidden bg-gradient-to-br from-rose-50 via-white to-rose-100 px-4 py-12 sm:px-6 lg:px-8">
      <div
        className="pointer-events-none absolute inset-0 -z-10 bg-cover bg-center opacity-25"
        style={{ backgroundImage: "url('/festive.jpg')" }}
        aria-hidden="true"
      />
      <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-br from-white/95 via-rose-50/90 to-white/75" aria-hidden="true" />

      <section className="mx-auto grid max-w-6xl overflow-hidden rounded-[2rem] bg-white/95 shadow-2xl shadow-rose-200/40 ring-1 ring-rose-100 backdrop-blur md:grid-cols-[0.95fr_1.05fr]">
        <div className="relative hidden min-h-[640px] overflow-hidden bg-rose-950 md:block">
          <img
            src="login.jpg"
            alt="Scarlet Rose collection"
            className="h-full w-full object-cover opacity-75"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-rose-950 via-rose-950/35 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 p-10 text-white">
            <span className="inline-flex rounded-full bg-white/15 px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] ring-1 ring-white/30 backdrop-blur">
              Scarlet Rose
            </span>
            <h1 className="mt-5 max-w-md text-4xl font-extrabold tracking-tight">
              Welcome back to your rose artistry venture.
            </h1>
            <p className="mt-4 max-w-sm text-sm leading-7 text-rose-50/85">
              Sign in to continue shopping curated styles, saved favorites, and order updates.
            </p>
          </div>
        </div>

        <div className="flex min-h-[640px] items-center px-6 py-10 sm:px-10 lg:px-14">
          <div className="w-full">
            <div className="mb-8 text-center md:text-left">
              <Link to="/" className="mx-auto mb-6 flex w-fit items-center gap-3 rounded-full bg-rose-50 px-4 py-2 ring-1 ring-rose-100 md:mx-0">
                <img src={PLACEHOLDER_IMAGE} alt="Scarlet Rose logo" className="h-10 w-10 rounded-full object-cover" />
                <span className="text-sm font-bold uppercase tracking-[0.2em] text-rose-900">Scarlet Rose</span>
              </Link>
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-rose-600">Account login</p>
              <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-rose-950 sm:text-4xl">
                Sign in to continue
              </h2>
              <p className="mt-3 text-sm leading-6 text-gray-600">
                Access your cart, checkout faster, and keep your favorite finds close.
              </p>
            </div>

            <div className="mb-6 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm leading-6 text-amber-900">
              <p className="font-semibold">Email not verified yet?</p>
              <p className="mt-1">
                Verify your account with the OTP sent to your inbox before signing in.
              </p>
              <Link to="/verify-email" className="mt-3 inline-flex rounded-full bg-white px-4 py-2 text-sm font-bold text-amber-800 ring-1 ring-amber-200 transition hover:bg-amber-500 hover:text-white">
                Go to verification
              </Link>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
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
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-semibold text-rose-950">
                  Password
                </label>
                <div className="mt-2 flex rounded-2xl border border-rose-100 bg-white shadow-sm transition focus-within:border-rose-400 focus-within:ring-4 focus-within:ring-rose-100">
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    required
                    autoComplete="current-password"
                    placeholder="Enter your password"
                    className="min-w-0 flex-1 rounded-2xl border-0 bg-transparent px-4 py-3 text-gray-900 outline-none placeholder:text-gray-400"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((currentValue) => !currentValue)}
                    className="shrink-0 px-4 text-sm font-semibold text-rose-700 transition hover:text-rose-900"
                  >
                    {showPassword ? "Hide" : "Show"}
                  </button>
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-3 text-sm">
                <label className="inline-flex items-center gap-2 font-medium text-gray-600">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="h-4 w-4 rounded border-rose-200 text-rose-600 focus:ring-rose-500"
                  />
                  Remember me
                </label>
                <Link to="/forgot-password" className="font-semibold text-rose-700 transition hover:text-rose-900">
                  Forgot password?
                </Link>
              </div>

              <button
                type="submit"
                className="w-full rounded-2xl bg-rose-600 px-5 py-3 text-sm font-bold uppercase tracking-[0.18em] text-white shadow-lg shadow-rose-500/25 transition hover:bg-rose-700"
              >
                Sign in
              </button>
            </form>

            <div className="mt-8 rounded-2xl bg-rose-50 p-5 ring-1 ring-rose-100">
              <p className="text-sm font-semibold text-rose-950">New to Scarlet Rose?</p>
              <p className="mt-2 text-sm leading-6 text-rose-800/80">
                Create an account to keep your favorites, checkout details, and order updates close.
              </p>
              <Link to="/register" className="mt-4 inline-flex rounded-full bg-white px-4 py-2 text-sm font-bold text-rose-700 ring-1 ring-rose-200 transition hover:bg-rose-600 hover:text-white">
                Create account
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Login;
