import React from "react";
import { Link } from "react-router-dom";
const Home = () => {
  return (
    <main className="min-h-screen bg-gray-50 px-6 py-16">
      <div className="mx-auto max-w-5xl rounded-xl bg-white p-8 shadow-sm">
        <h1 className="text-3xl font-bold text-gray-800">Welcome to ECom</h1>
        <p className="mt-3 text-lg text-gray-600">
          Your storefront is loading correctly.
        </p>
        <div className="mt-6 flex gap-4">
          <Link to="/" className="rounded-md bg-blue-600 px-4 py-2 text-white">Shop now</Link>
          <Link to="/" className="rounded-md border border-gray-300 px-4 py-2 text-gray-700">Learn more</Link>
        </div>
      </div>
    </main>
  );
};

export default Home;
