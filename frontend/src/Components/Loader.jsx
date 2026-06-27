import React from "react";

const Loader = ({ cards = 4 }) => {
  return (
    <div className="mt-10 space-y-6">
      <div className="flex items-center justify-center gap-4 rounded-3xl bg-blue-50 p-6 text-blue-700 shadow-sm">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-blue-600 border-t-transparent" />
        <div>
          <p className="text-lg font-semibold">Loading featured products</p>
          <p className="text-sm text-blue-700/80">
            Just a moment while we fetch the latest items.
          </p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {Array.from({ length: cards }).map((_, index) => (
          <div
            key={index}
            className="overflow-hidden rounded-3xl border border-gray-200 bg-gray-100 p-5 shadow-sm animate-pulse"
          >
            <div className="h-52 w-full rounded-3xl bg-gray-200" />
            <div className="mt-5 space-y-3">
              <div className="h-6 w-3/4 rounded-full bg-gray-200" />
              <div className="h-4 w-1/2 rounded-full bg-gray-200" />
              <div className="mt-4 flex items-center justify-between gap-4">
                <div className="h-8 w-24 rounded-full bg-gray-200" />
                <div className="h-8 w-20 rounded-full bg-gray-200" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Loader;
