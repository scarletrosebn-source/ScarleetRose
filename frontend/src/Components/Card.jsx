import React from "react";
import { Link } from "react-router-dom";
import { PLACEHOLDER_IMAGE } from "../config/assets";

const Card = ({ product }) => {
  const priceAfterDiscount = Math.round(product.price * (1 - (product.discount || 0) / 100));

  return (
    <div className="w-full overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
      <div className="relative h-64 overflow-hidden bg-gray-100 sm:h-72">
        <img
          src={product.images?.[0] || PLACEHOLDER_IMAGE}
          alt={product.name}
          className="h-full w-full object-cover transition duration-300 hover:scale-105"
          onError={(event) => {
            event.currentTarget.src = PLACEHOLDER_IMAGE;
          }}
        />
        {product.discount > 0 && (
          <span className="absolute left-4 top-4 rounded-full bg-red-600 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white shadow-sm">
            {product.discount}% off
          </span>
        )}
      </div>

      <div className="space-y-4 p-5">
        <div>
          <h2 className="text-xl font-semibold leading-snug text-gray-900">{product.name}</h2>
          <p className="mt-2 text-sm text-gray-500 line-clamp-3">{product.description}</p>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-2xl font-bold text-gray-900">₹{priceAfterDiscount}</p>
            {product.discount > 0 && (
              <p className="text-sm text-gray-500 line-through">₹{product.price}</p>
            )}
          </div>
          <div className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-800">
            {product.stock > 0 ? `${product.stock} in stock` : "Out of stock"}
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {product.category?.map((category) => (
            <span key={category} className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700">
              {category}
            </span>
          ))}
        </div>

        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <span className="rounded-full bg-gray-100 px-2 py-1 font-semibold">Rating</span>
            <span>{product.rating || 0}</span>
          </div>
          <Link
            to={`/product/${product._id}`}
            className="rounded-full bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Card;
