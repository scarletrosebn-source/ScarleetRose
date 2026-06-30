import React, { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import { PLACEHOLDER_IMAGE } from "../config/assets";

const ResetPassword = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const token = searchParams.get("token");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    try {
      setIsLoading(true);

      const resp = await axios.post("/api/customerSupport/reset-password", {
        token,
        password,
      });

      alert(resp.data.message);
      setIsSubmitted(true);

      setTimeout(() => navigate("/login"), 2500);
    } catch (err) {
      alert(err.response?.data?.message || "Something went wrong.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="relative isolate min-h-screen overflow-hidden bg-gradient-to-br from-rose-50 via-white to-pink-100 px-4 py-12 sm:px-6 lg:px-8">
      <div
        className="pointer-events-none absolute inset-0 -z-10 bg-cover bg-center opacity-20"
        style={{ backgroundImage: "url('/Register.jpg')" }}
      />

      <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-br from-white/95 via-rose-50/90 to-white/80" />

      <section className="mx-auto grid max-w-5xl overflow-hidden rounded-[2rem] bg-white/95 shadow-2xl shadow-rose-200/40 ring-1 ring-rose-100 backdrop-blur md:grid-cols-[0.9fr_1.1fr]">

        <div className="relative hidden min-h-[600px] overflow-hidden bg-rose-950 md:block">
          <img
            src="/login.jpg"
            alt="Reset password"
            className="h-full w-full object-cover opacity-80"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-rose-950 via-rose-950/35 to-transparent" />

          <div className="absolute inset-x-0 bottom-0 p-10 text-white">
            <span className="inline-flex rounded-full bg-white/15 px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] ring-1 ring-white/30 backdrop-blur">
              Secure Account
            </span>

            <h1 className="mt-5 text-4xl font-extrabold tracking-tight">
              Create your new password.
            </h1>

            <p className="mt-4 max-w-sm text-sm leading-7 text-rose-50/85">
              Your new password should be unique and difficult to guess.
            </p>
          </div>
        </div>

        <div className="flex min-h-[600px] items-center px-6 py-10 sm:px-10 lg:px-14">

          <div className="w-full">

            <div className="mb-8 text-center md:text-left">

              <Link
                to="/"
                className="mx-auto mb-6 flex w-fit items-center gap-3 rounded-full bg-rose-50 px-4 py-2 ring-1 ring-rose-100 md:mx-0"
              >
                <img
                  src={PLACEHOLDER_IMAGE}
                  alt="Scarlet Rose"
                  className="h-10 w-10 rounded-full object-cover"
                />
                <span className="text-sm font-bold uppercase tracking-[0.2em] text-rose-900">
                  Scarlet Rose
                </span>
              </Link>

              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-rose-600">
                Reset Password
              </p>

              <h2 className="mt-3 text-4xl font-extrabold text-rose-950">
                Choose a new password
              </h2>

              <p className="mt-3 text-sm leading-6 text-gray-600">
                Your password must be at least 8 characters long.
              </p>

            </div>

            {isSubmitted && (
              <div className="mb-6 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-900">
                <p className="font-semibold">
                  Password updated successfully!
                </p>

                <p className="mt-1">
                  Redirecting you to login...
                </p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">

              <div>
                <label className="block text-sm font-semibold text-rose-950">
                  New Password
                </label>

                <div className="relative mt-2">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full rounded-2xl border border-rose-100 px-4 py-3 pr-14 shadow-sm outline-none focus:border-rose-400 focus:ring-4 focus:ring-rose-100"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-sm font-medium text-rose-600"
                  >
                    {showPassword ? "Hide" : "Show"}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-rose-950">
                  Confirm Password
                </label>

                <div className="relative mt-2">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    className="w-full rounded-2xl border border-rose-100 px-4 py-3 pr-14 shadow-sm outline-none focus:border-rose-400 focus:ring-4 focus:ring-rose-100"
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowConfirmPassword(!showConfirmPassword)
                    }
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-sm font-medium text-rose-600"
                  >
                    {showConfirmPassword ? "Hide" : "Show"}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className={`flex w-full items-center justify-center rounded-2xl px-5 py-3 text-sm font-bold uppercase tracking-[0.18em] text-white shadow-lg transition ${
                  isLoading
                    ? "cursor-not-allowed bg-rose-400 shadow-none"
                    : "bg-rose-600 shadow-rose-500/25 hover:bg-rose-700"
                }`}
              >
                {isLoading ? (
                  <>
                    <svg
                      className="mr-2 h-5 w-5 animate-spin"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                        className="opacity-25"
                      />

                      <path
                        fill="currentColor"
                        className="opacity-75"
                        d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                      />
                    </svg>

                    Updating...
                  </>
                ) : (
                  "Reset Password"
                )}
              </button>

            </form>

            <div className="mt-8 text-center md:text-left">
              <Link
                to="/login"
                className="font-bold text-rose-700 hover:text-rose-900"
              >
                Back to Login
              </Link>
            </div>

          </div>
        </div>
      </section>
    </main>
  );
};

export default ResetPassword;
