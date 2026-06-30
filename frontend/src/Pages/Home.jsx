import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Card from "../Components/Card";
import Loader from "../Components/Loader";

const seasonalEventSlides = [
  {
    season: "Summer",
    title: "Bloom Into Something Beautiful",
    subtitle: "Fresh arrivals with soft colors, floral moods, and gift-ready charm.",
    accent: "New Bloom",
    backgroundImage: "/summer.jpg",
    palette: {
      hero: "shadow-emerald-200/40 ring-emerald-100",
      overlay: "from-white/95 via-emerald-50/85 to-white/75",
      panel: "bg-emerald-50 text-emerald-950 ring-emerald-100",
      eyebrow: "text-emerald-700",
      body: "text-emerald-800/80",
      card: "bg-white text-emerald-950 ring-emerald-100",
      dot: "bg-emerald-600",
      inactiveDot: "bg-emerald-200",
    },
  },
  {
    season: "Monsoon",
    title: "Rainy Days, Rosy Finds",
    subtitle: "Cozy picks and cheerful shades curated for slow, beautiful showers.",
    accent: "Cozy Edit",
    backgroundImage: "/monsoon.jpg",
    palette: {
      hero: "shadow-sky-200/40 ring-sky-100",
      overlay: "from-white/95 via-sky-50/85 to-white/75",
      panel: "bg-sky-50 text-sky-950 ring-sky-100",
      eyebrow: "text-sky-700",
      body: "text-sky-800/80",
      card: "bg-white text-sky-950 ring-sky-100",
      dot: "bg-sky-600",
      inactiveDot: "bg-sky-200",
    },
  },
  {
    season: "Festive",
    title: "Glow For Every Celebration",
    subtitle: "Elegant favorites for gifting, hosting, and little festive moments.",
    accent: "Festive Picks",
    backgroundImage: "/festive.jpg",
    palette: {
      hero: "shadow-amber-200/40 ring-amber-100",
      overlay: "from-white/95 via-amber-50/85 to-white/75",
      panel: "bg-amber-50 text-amber-950 ring-amber-100",
      eyebrow: "text-amber-700",
      body: "text-amber-800/80",
      card: "bg-white text-amber-950 ring-amber-100",
      dot: "bg-amber-500",
      inactiveDot: "bg-amber-200",
    },
  },
  {
    season: "Winter",
    title: "Wrap The Season In Warmth",
    subtitle: "Soft, thoughtful pieces for holidays, gifting, and cozy everyday joy.",
    accent: "Winter Warmth",
    backgroundImage: "/winter.jpg",
    palette: {
      hero: "shadow-violet-200/40 ring-violet-100",
      overlay: "from-white/95 via-violet-50/85 to-white/75",
      panel: "bg-violet-50 text-violet-950 ring-violet-100",
      eyebrow: "text-violet-700",
      body: "text-violet-800/80",
      card: "bg-white text-violet-950 ring-violet-100",
      dot: "bg-violet-600",
      inactiveDot: "bg-violet-200",
    },
  },
];

const Home = () => {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [error, setError] = useState("");
  const [activeSeasonalSlide, setActiveSeasonalSlide] = useState(0);
  const seasonalSlide = seasonalEventSlides[activeSeasonalSlide];
  

  useEffect(() => {
    window.scrollTo(0, 0);

    const loadProducts = async () => {
      try {
        const resp = await fetch(`/api/products`);
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
  }, []);

  useEffect(() => {
    const carouselTimer = setInterval(() => {
      setActiveSeasonalSlide((currentSlide) => (currentSlide + 1) % seasonalEventSlides.length);
    }, 3000);

    return () => clearInterval(carouselTimer);
  }, []);

  return (
    <main className="relative isolate min-h-screen overflow-x-hidden bg-gradient-to-br from-rose-50 via-white to-slate-50 px-4 py-10 sm:px-6 sm:py-14">
      <div
        className="pointer-events-none absolute inset-0 -z-10 bg-cover bg-center opacity-90 transition-all duration-700"
        style={{ backgroundImage: `url(${seasonalSlide.backgroundImage})` }}
        aria-hidden="true"
      />
      <div className={`pointer-events-none absolute inset-0 -z-10 bg-gradient-to-br ${seasonalSlide.palette.overlay}`} aria-hidden="true" />
      <div className="pointer-events-none absolute inset-0 -z-10 bg-white/30 backdrop-blur-[1px]" aria-hidden="true" />
      <div className="mx-auto max-w-6xl space-y-10">
        <section className={`relative overflow-hidden rounded-3xl bg-white/95 p-5 shadow-xl ring-1 backdrop-blur-sm transition-colors duration-500 sm:p-8 ${seasonalSlide.palette.hero}`}>
          <div className="relative z-10 grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
            <div className="space-y-6 rounded-2xl bg-white/80 p-5 shadow-sm ring-1 ring-white/70 backdrop-blur-md sm:p-6">
              <span className="inline-flex rounded-full bg-rose-100/95 px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-rose-700 shadow-sm sm:text-sm">
                Rose collection
              </span>
              <h1 className="text-4xl font-extrabold tracking-tight text-rose-950 drop-shadow-sm sm:text-5xl">
                Welcome to {process.env.REACT_APP_APP_NAME}
              </h1>
              <p className="max-w-xl text-base font-medium leading-8 text-rose-900/90 sm:text-lg">
                Elegance meets comfort with our curated rose-themed collection. Explore featured products tailored to delight and inspire.
              </p>
              <div className="flex flex-wrap items-center gap-4">
                <Link to="/shop" className="rounded-full bg-rose-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-rose-500/20 transition hover:bg-rose-700">
                  Shop the rose edit
                </Link>
                <Link to="/shop" className="rounded-full border border-rose-200 px-6 py-3 text-sm font-semibold text-rose-700 transition hover:border-rose-300 hover:text-rose-800">
                  Discover more
                </Link>
              </div>
            </div>

            <div className={`min-h-[320px] rounded-3xl p-6 shadow-sm ring-1 transition-colors duration-500 sm:p-8 ${seasonalSlide.palette.panel}`}>
              <p className={`text-sm font-semibold uppercase tracking-[0.2em] ${seasonalSlide.palette.eyebrow}`}>
                Seasonal events
              </p>
              <h2 className="mt-4 min-h-[72px] text-3xl font-bold tracking-tight">{seasonalSlide.title}</h2>
              <p className={`mt-4 min-h-[56px] text-sm leading-7 ${seasonalSlide.palette.body}`}>
                {seasonalSlide.subtitle}
              </p>
              <div className="mt-6 grid gap-4">
                <div className={`min-h-[88px] rounded-2xl p-4 text-sm shadow-sm ring-1 ${seasonalSlide.palette.card}`}>
                  <p className="font-semibold">{seasonalSlide.season} Highlight</p>
                  <p className={`mt-2 ${seasonalSlide.palette.body}`}>{seasonalSlide.accent}</p>
                </div>
                <div className="flex items-center gap-2">
                  {seasonalEventSlides.map((slide, index) => (
                    <button
                      key={slide.season}
                      type="button"
                      aria-label={`Show ${slide.season} event`}
                      onClick={() => setActiveSeasonalSlide(index)}
                      className={`h-2.5 rounded-full transition-all ${
                        activeSeasonalSlide === index
                          ? `w-8 ${seasonalSlide.palette.dot}`
                          : `w-2.5 ${seasonalSlide.palette.inactiveDot}`
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
 
        <section className="grid gap-8 xl:grid-cols-[0.45fr_1fr]">
          <aside className="rounded-3xl bg-rose-50 p-6 shadow-lg shadow-rose-200/30 ring-1 ring-rose-100 sm:p-8">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-rose-700">Featured</p>
            <h2 className="mt-4 text-3xl font-bold text-rose-900">Featured products</h2>
            <p className="mt-3 text-sm leading-7 text-rose-700/85">
              Browse our highlighted products with a soft rose palette and premium style.
            </p>
            <div className="mt-8 rounded-2xl bg-white p-5 shadow-sm ring-1 ring-rose-100">
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
