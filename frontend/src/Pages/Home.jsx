import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Card from "../Components/Card";
import Loader from "../Components/Loader";

const Home = () => {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [error, setError] = useState("");
  const apiBase = process.env.REACT_APP_API_BASE || "";

  useEffect(() => {
    window.scrollTo(0, 0);

    const loadProducts = async () => {
      try {
        const resp = await fetch(`${apiBase}/api/products`);
        if (!resp.ok) {
          throw new Error(`Server responded with ${resp.status}`);
        }
        const data = await resp.json();
        setProducts(Array.isArray(data) ? data.slice(0, 4) : []);
      } catch (fetchError) {
        console.error("Error fetching products:", fetchError);
        setError("Unable to load products. Verify that the backend is running and the API port is correct.");
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, [apiBase]);

  return (
    <main className="min-h-screen bg-gradient-to-br from-rose-50 via-rose-100 to-white px-6 py-16">
      <div className="mx-auto max-w-6xl space-y-10">
        <section className="rounded-[2rem] bg-white/95 p-8 shadow-xl shadow-rose-200/40 ring-1 ring-rose-100 backdrop-blur-sm">
          <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
            <div className="space-y-6">
              <span className="inline-flex rounded-full bg-rose-100 px-4 py-2 text-sm font-semibold uppercase tracking-[0.3em] text-rose-700 shadow-sm">
                Rose collection
              </span>
              <h1 className="text-4xl font-extrabold tracking-tight text-rose-900 sm:text-5xl">
                Welcome to ECom
              </h1>
              <p className="max-w-xl text-lg leading-8 text-rose-700/90">
                Elegance meets comfort with our curated rose-themed collection. Explore featured products tailored to delight and inspire.
              </p>
              <div className="flex flex-wrap items-center gap-4">
                <Link to="/" className="rounded-full bg-rose-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-rose-500/20 transition hover:bg-rose-700">
                  Shop the rose edit
                </Link>
                <Link to="/" className="rounded-full border border-rose-200 px-6 py-3 text-sm font-semibold text-rose-700 transition hover:border-rose-300 hover:text-rose-800">
                  Discover more
                </Link>
              </div>
            </div>

            <div className="rounded-[2rem] bg-rose-50 p-8 text-rose-900 ring-1 ring-rose-100 shadow-sm">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-rose-700/90">Featured products</p>
              <h2 className="mt-4 text-3xl font-bold tracking-tight text-rose-900">A rosy selection</h2>
              <p className="mt-4 text-sm leading-7 text-rose-700/85">
                Handpicked favourites appear here first — bright, beautiful, and ready to become your new essentials.
              </p>
              <div className="mt-6 grid gap-4">
                <div className="rounded-3xl bg-white p-4 text-sm text-rose-900 shadow-sm ring-1 ring-rose-100">
                  <p className="font-semibold">Fresh arrivals</p>
                  <p className="mt-2 text-rose-700/80">New rose-inspired designs every week.</p>
                </div>
                <div className="rounded-3xl bg-white p-4 text-sm text-rose-900 shadow-sm ring-1 ring-rose-100">
                  <p className="font-semibold">Curated picks</p>
                  <p className="mt-2 text-rose-700/80">Only the best items make the featured list.</p>
                </div>
              </div>
            </div>
          </div>
        </section>
 
        <section className="grid gap-8 xl:grid-cols-[0.45fr_1fr]">
          <aside className="rounded-[2rem] bg-rose-50 p-8 shadow-lg shadow-rose-200/30 ring-1 ring-rose-100">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-rose-700">Featured</p>
            <h2 className="mt-4 text-3xl font-bold text-rose-900">Featured products</h2>
            <p className="mt-3 text-sm leading-7 text-rose-700/85">
              Browse our highlighted products with a soft rose palette and premium style.
            </p>
            <div className="mt-8 rounded-3xl bg-white p-5 shadow-sm ring-1 ring-rose-100">
              <div className="space-y-4">
                <div>
                  <p className="font-semibold text-rose-900">Beauty + quality</p>
                  <p className="mt-2 text-sm text-rose-700/80">Selected items that feel luxurious and look stunning.</p>
                </div>
                <div>
                  <p className="font-semibold text-rose-900">Quick picks</p>
                  <p className="mt-2 text-sm text-rose-700/80">Fast access to the products we recommend most.</p>
                </div>
              </div>
            </div>
          </aside>

          <div>
            {loading ? (
              <Loader />
            ) : error ? (
              <div className="rounded-3xl border border-red-200 bg-red-50 p-8 text-center text-red-700">
                <p className="text-lg font-semibold">Unable to load products</p>
                <p className="mt-2 text-sm text-red-700/80">{error}</p>
              </div>
            ) : products.length > 0 ? (
              <div className="grid gap-6 md:grid-cols-2">
                {products.map((product) => (
                  <Card key={product._id || product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="rounded-3xl border border-dashed border-rose-200 bg-rose-50 p-8 text-center text-rose-700">
                No featured products are available right now. Please check back soon.
              </div>
            )}
          </div>
        </section>
      </div>
    </main>
  );
};

export default Home;
