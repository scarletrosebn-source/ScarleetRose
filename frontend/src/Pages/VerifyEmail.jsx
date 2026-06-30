import React, { useEffect, useState ,useContext} from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import { AuthContext } from "../Context/AuthContext";
import { PLACEHOLDER_IMAGE } from "../config/assets";

const VerifyEmail = () => {
  const location = useLocation();
  const registrationEmail = location.state?.email || "";
  const [email, setEmail] = useState(registrationEmail);
  const [otpDigits, setOtpDigits] = useState(["", "", "", "", "", ""]);
  const hasEmail = Boolean(registrationEmail);
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleSubmit = async  (e) => {
    e.preventDefault();
    const otp = otpDigits.join("");
    
    if (!email || otp.length !== 6) {
      alert("Please enter your email and 6-digit OTP");
      return;
    }

    try {
      const resp = await axios.post("/api/auth/verify-email", { email, otp });
      alert("Email verification successful");
      login(
        {
        name: resp.data.username,
        role: resp.data.role,
        email: resp.data.email,
        token: resp.data.token,
      });
      navigate("/");
    } catch (error) {
      alert(error.response?.data?.message || "Email verification failed");
    }
  };

  const handleOtpChange = (index, value) => {
    const digit = value.replace(/\D/g, "").slice(-1);
    const updatedOtp = [...otpDigits];
    updatedOtp[index] = digit;
    setOtpDigits(updatedOtp);

    if (digit && index < otpDigits.length - 1) {
      document.getElementById(`otp-${index + 1}`)?.focus();
    }
  };

  const handleOtpPaste = (index, event) => {
    event.preventDefault();
    const pastedDigits = event.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, otpDigits.length - index);

    if (!pastedDigits) {
      return;
    }

    const updatedOtp = [...otpDigits];
    pastedDigits.split("").forEach((digit, offset) => {
      updatedOtp[index + offset] = digit;
    });

    setOtpDigits(updatedOtp);

    const nextIndex = Math.min(index + pastedDigits.length, otpDigits.length - 1);
    document.getElementById(`otp-${nextIndex}`)?.focus();
  };

  return (
    <main className="relative isolate min-h-screen overflow-hidden bg-gradient-to-br from-rose-50 via-white to-pink-100 px-4 py-12 sm:px-6 lg:px-8">
      <div
        className="pointer-events-none absolute inset-0 -z-10 bg-cover bg-center opacity-20"
        style={{ backgroundImage: "url('/Register.jpg')" }}
        aria-hidden="true"
      />
      <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-br from-white/95 via-rose-50/90 to-white/80" aria-hidden="true" />

      <section className="mx-auto grid max-w-5xl overflow-hidden rounded-[2rem] bg-white/95 shadow-2xl shadow-rose-200/40 ring-1 ring-rose-100 backdrop-blur md:grid-cols-[0.9fr_1.1fr]">
        <div className="relative hidden min-h-[620px] overflow-hidden bg-rose-950 md:block">
          <img
            src="/Register.jpg"
            alt="Email verification"
            className="h-full w-full object-cover opacity-80"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-rose-950 via-rose-950/35 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 p-10 text-white">
            <span className="inline-flex rounded-full bg-white/15 px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] ring-1 ring-white/30 backdrop-blur">
              Almost there
            </span>
            <h1 className="mt-5 max-w-md text-4xl font-extrabold tracking-tight">
              Confirm your email to enter Scarlet Rose.
            </h1>
            <p className="mt-4 max-w-sm text-sm leading-7 text-rose-50/85">
              We sent a verification code to your inbox. Enter it here to finish setting up your account.
            </p>
          </div>
        </div>

        <div className="flex min-h-[620px] items-center px-6 py-10 sm:px-10 lg:px-14">
          <div className="w-full">
            <div className="mb-8 text-center md:text-left">
              <Link to="/" className="mx-auto mb-6 flex w-fit items-center gap-3 rounded-full bg-rose-50 px-4 py-2 ring-1 ring-rose-100 md:mx-0">
                <img src={PLACEHOLDER_IMAGE} alt="Scarlet Rose logo" className="h-10 w-10 rounded-full object-cover" />
                <span className="text-sm font-bold uppercase tracking-[0.2em] text-rose-900">Scarlet Rose</span>
              </Link>
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-rose-600">Email verification</p>
              <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-rose-950 sm:text-4xl">
                Enter your OTP
              </h2>
              <p className="mt-3 text-sm leading-6 text-gray-600">
                Type the 6-digit code sent to your email address.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-rose-950">
                  Email address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder="you@example.com"
                  className="mt-2 w-full rounded-2xl border border-rose-100 bg-white px-4 py-3 text-gray-900 shadow-sm outline-none transition placeholder:text-gray-400 focus:border-rose-400 focus:ring-4 focus:ring-rose-100"
                  value={email}
                  readOnly={hasEmail}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-rose-950">
                  Verification code
                </label>
                <div className="mt-3 grid grid-cols-6 gap-2 sm:gap-3">
                  {[0, 1, 2, 3, 4, 5].map((index) => (
                    <input
                      key={index}
                      id={`otp-${index}`}
                      type="text"
                      inputMode="numeric"
                      maxLength="1"
                      aria-label={`OTP digit ${index + 1}`}
                      className="h-12 rounded-2xl border border-rose-100 bg-white text-center text-xl font-bold text-rose-950 shadow-sm outline-none transition focus:border-rose-400 focus:ring-4 focus:ring-rose-100 sm:h-14"
                      value={otpDigits[index]}
                      onChange={(e) => handleOtpChange(index, e.target.value)}
                      onPaste={(e) => handleOtpPaste(index, e)}
                    />
                  ))}
                </div>
              </div>

              <div className="rounded-2xl bg-rose-50 p-4 text-sm leading-6 text-rose-900 ring-1 ring-rose-100">
                The code may take a minute to arrive. Check spam or promotions if it is not in your inbox.
              </div>

              <button
                type="submit"
                className="w-full rounded-2xl bg-rose-600 px-5 py-3 text-sm font-bold uppercase tracking-[0.18em] text-white shadow-lg shadow-rose-500/25 transition hover:bg-rose-700"
              >
                Verify email
              </button>
            </form>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-4 text-sm md:justify-start">
              <button type="button" className="font-bold text-rose-700 transition hover:text-rose-900">
                Resend code
              </button>
              <span className="text-gray-300">|</span>
              <Link to="/register" className="font-bold text-gray-600 transition hover:text-rose-900">
                Change email
              </Link>
              <span className="text-gray-300">|</span>
              <Link to="/login" className="font-bold text-gray-600 transition hover:text-rose-900">
                Back to login
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default VerifyEmail;
