import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { PLACEHOLDER_IMAGE } from "../config/assets";

const Register = () => {
  const [user, setUser] = useState({ firstName: "", lastName: "", email: "", password: "", confirmPassword: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);
  const navigate = useNavigate();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(!user.firstName || !user.lastName || !user.email || !user.password || !user.confirmPassword){
      alert("Please fill in all the fields");
      return;
    }
    if(!acceptTerms){
      alert("Please accept the terms and conditions");
      return;
    }
    //Backend Check
    if(user.password !== user.confirmPassword){
      alert("Passwords do not match");
      return;
    }
    const name = user.firstName + " " + user.lastName;
    const email = user.email;
    const password = user.password;
  //   const resp = await fetch("/api/register", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({ name, email, password }),
  //   }
  // )
    try {
      const resp = await axios.post("/api/auth/register", { name, email, password });

      alert("Registration successful");
      navigate("/verify-email", { state: { email: resp.data.email || user.email } });
    } catch (error) {
      alert(error.response?.data?.message || "Registration failed");
    }

  };

 const handleChange = (e) => {
  const { name, value } = e.target;

  setUser((prevUser) => {
    const updatedUser = { ...prevUser, [name]: value };
    return updatedUser;
  });
};
  return (
    <main className="relative isolate min-h-screen overflow-hidden bg-gradient-to-br from-rose-50 via-white to-pink-100 px-4 py-12 sm:px-6 lg:px-8">
      <div
        className="pointer-events-none absolute inset-0 -z-10 bg-cover bg-center opacity-20"
        style={{ backgroundImage: "url('/Register.jpg')" }}
        aria-hidden="true"
      />
      <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-br from-white/95 via-rose-50/90 to-white/80" aria-hidden="true" />

      <section className="mx-auto grid max-w-6xl overflow-hidden rounded-[2rem] bg-white/95 shadow-2xl shadow-rose-200/40 ring-1 ring-rose-100 backdrop-blur md:grid-cols-[1.05fr_0.95fr]">
        <div className="flex min-h-[720px] items-center px-6 py-10 sm:px-10 lg:px-14">
          <div className="w-full">
            <div className="mb-8 text-center md:text-left">
              <Link to="/" className="mx-auto mb-6 flex w-fit items-center gap-3 rounded-full bg-rose-50 px-4 py-2 ring-1 ring-rose-100 md:mx-0">
                <img src={PLACEHOLDER_IMAGE} alt="Scarlet Rose logo" className="h-10 w-10 rounded-full object-cover" />
                <span className="text-sm font-bold uppercase tracking-[0.2em] text-rose-900">Scarlet Rose</span>
              </Link>
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-rose-600">Create account</p>
              <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-rose-950 sm:text-4xl">
                Start your rose journey
              </h1>
              <p className="mt-3 text-sm leading-6 text-gray-600">
                Join Scarlet Rose for quicker checkout, saved details, and a softer shopping experience.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-semibold text-rose-950">
                    First name
                  </label>
                  <input
                    id="firstName"
                    name="firstName"
                    type="text"
                    required
                    autoComplete="given-name"
                    placeholder="Pekham"
                    className="mt-2 w-full rounded-2xl border border-rose-100 bg-white px-4 py-3 text-gray-900 shadow-sm outline-none transition placeholder:text-gray-400 focus:border-rose-400 focus:ring-4 focus:ring-rose-100"
                    onChange={handleChange}
                  />
                </div>

                <div>
                  <label htmlFor="lastName" className="block text-sm font-semibold text-rose-950">
                    Last name
                  </label>
                  <input
                    id="lastName"
                    name="lastName"
                    type="text"
                    autoComplete="family-name"
                    placeholder="Halder"
                    className="mt-2 w-full rounded-2xl border border-rose-100 bg-white px-4 py-3 text-gray-900 shadow-sm outline-none transition placeholder:text-gray-400 focus:border-rose-400 focus:ring-4 focus:ring-rose-100"
                    onChange={handleChange}
                  />
                </div>
              </div>

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
                  onChange={handleChange}
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
                    autoComplete="new-password"
                    placeholder="Create a password"
                    className="min-w-0 flex-1 rounded-2xl border-0 bg-transparent px-4 py-3 text-gray-900 outline-none placeholder:text-gray-400"
                    onChange={handleChange}
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

              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-semibold text-rose-950">
                  Confirm password
                </label>
                <div className="mt-2 flex rounded-2xl border border-rose-100 bg-white shadow-sm transition focus-within:border-rose-400 focus-within:ring-4 focus-within:ring-rose-100">
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    required
                    autoComplete="new-password"
                    placeholder="Re-enter your password"
                    className="min-w-0 flex-1 rounded-2xl border-0 bg-transparent px-4 py-3 text-gray-900 outline-none placeholder:text-gray-400"
                    onChange={handleChange}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword((currentValue) => !currentValue)}
                    className="shrink-0 px-4 text-sm font-semibold text-rose-700 transition hover:text-rose-900"
                  >
                    {showConfirmPassword ? "Hide" : "Show"}
                  </button>
                </div>
              </div>

              <label className="flex items-start gap-3 rounded-2xl bg-rose-50 p-4 text-sm text-rose-900 ring-1 ring-rose-100">
                <input
                  type="checkbox"
                  checked={acceptTerms}
                  onChange={(e) => setAcceptTerms(e.target.checked)}
                  className="mt-1 h-4 w-4 rounded border-rose-200 text-rose-600 focus:ring-rose-500"
                />
                <span>
                  I agree to the Scarlet Rose terms and would like to receive thoughtful updates.
                </span>
              </label>

              <button
                type="submit"
                className="w-full rounded-2xl bg-rose-600 px-5 py-3 text-sm font-bold uppercase tracking-[0.18em] text-white shadow-lg shadow-rose-500/25 transition hover:bg-rose-700"
              >
                Create account
              </button>
            </form>

            <p className="mt-8 text-center text-sm text-gray-600 md:text-left">
              Already have an account?{" "}
              <Link to="/login" className="font-bold text-rose-700 transition hover:text-rose-900">
                Sign in
              </Link>
            </p>
          </div>
        </div>

        <div className="relative hidden min-h-[720px] overflow-hidden bg-rose-950 md:block">
          <img
            src="/Register.jpg"
            alt="Scarlet Rose registration"
            className="h-full w-full object-cover opacity-80"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-rose-950 via-rose-950/25 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 p-10 text-white">
            <span className="inline-flex rounded-full bg-white/15 px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] ring-1 ring-white/30 backdrop-blur">
              New collection access
            </span>
            <h2 className="mt-5 max-w-md text-4xl font-extrabold tracking-tight">
              Grab your favorites before they bloom away.
            </h2>
            <p className="mt-4 max-w-sm text-sm leading-7 text-rose-50/85">
              A Scarlet Rose account keeps checkout details, wishlists, and order moments in one graceful place.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Register;
