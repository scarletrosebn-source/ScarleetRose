import React, { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../Redux/CartSlice";
import Loader from "../Components/Loader";

const getReviewRating = (review) => {
  const rating = Number(review.customer_rating ?? review.customerRating ?? review.rating);
  return Number.isFinite(rating) ? rating : 0;
};

const getReviewText = (review) => {
  return review.review || review.comment || review.text || review.message || "No written review was provided.";
};

const ProductDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [product, setProduct] = useState(null);
  const [activeImage, setActiveImage] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    window.scrollTo(0, 0);

    const loadProduct = async () => {
      try {
        const resp = await fetch(`/api/products/${id}`);

        if (!resp.ok) {
          throw new Error(`Server responded with ${resp.status}`);
        }

        const data = await resp.json();
        setProduct(data);
        setActiveImage(data.images?.[0] || "/Design.png");
      } catch (fetchError) {
        console.error("Error fetching product:", fetchError);
        setError("Unable to load this product right now.");
      } finally {
        setLoading(false);
      }
    };

    loadProduct();
  }, [id]);

  const priceAfterDiscount = useMemo(() => {
    if (!product) {
      return 0;
    }

    return Math.round(product.price * (1 - (product.discount || 0) / 100));
  }, [product]);

  const reviews = useMemo(() => product?.reviews || [], [product?.reviews]);
  const averageReviewRating = useMemo(() => {
    if (!reviews.length) {
      return product?.rating || 0;
    }

    const validRatings = reviews
      .map((review) => getReviewRating(review))
      .filter((rating) => rating > 0);

    if (!validRatings.length) {
      return product?.rating || 0;
    }

    const totalRating = validRatings.reduce((total, rating) => total + rating, 0);
    return (totalRating / validRatings.length).toFixed(1);
  }, [product?.rating, reviews]);

  const reviewCounts = useMemo(() => {
    return [5, 4, 3, 2, 1].map((rating) => ({
      rating,
      count: reviews.filter((review) => Math.round(getReviewRating(review)) === rating).length,
    }));
  }, [reviews]);

  const maxQuantity = product?.stock > 0 ? Math.min(product.stock, 10) : 1;
  const isInStock = product?.stock > 0;

  const handleAddToCart = () => {
    if (!product || !isInStock) {
      return;
    }

    dispatch(
      addToCart({
        ...product,
        id: product._id,
        quantity,
        priceAfterDiscount,
      })
    );
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-rose-50 px-4 py-16">
        <Loader />
      </main>
    );
  }

  if (error || !product) {
    return (
      <main className="min-h-screen bg-rose-50 px-4 py-16">
        <div className="mx-auto max-w-3xl rounded-2xl border border-red-200 bg-white p-8 text-center shadow-sm">
          <p className="text-lg font-semibold text-red-700">{error || "Product not found."}</p>
          <Link to="/" className="mt-5 inline-flex rounded-full bg-rose-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-rose-700">
            Back to products
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-pink-50 px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-6 flex flex-wrap items-center gap-2 text-sm text-gray-500">
          <Link to="/" className="font-semibold text-rose-700 transition hover:text-rose-900">
            Home
          </Link>
          <span>/</span>
          <span className="text-gray-700">{product.name}</span>
        </div>

        <section className="grid gap-8 lg:grid-cols-[1fr_0.9fr] lg:items-start">
          <div className="space-y-4">
            <div className="overflow-hidden rounded-2xl bg-white shadow-xl shadow-rose-200/30 ring-1 ring-rose-100">
              <img
                src={activeImage}
                alt={product.name}
                className="h-[420px] w-full object-cover sm:h-[560px]"
              />
            </div>

            {product.images?.length > 1 && (
              <div className="grid grid-cols-4 gap-3 sm:grid-cols-5">
                {product.images.map((image) => (
                  <button
                    key={image}
                    type="button"
                    onClick={() => setActiveImage(image)}
                    className={`h-20 overflow-hidden rounded-xl bg-white ring-2 transition sm:h-24 ${
                      activeImage === image ? "ring-rose-500" : "ring-rose-100 hover:ring-rose-300"
                    }`}
                  >
                    <img src={image} alt={product.name} className="h-full w-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="rounded-2xl bg-white p-6 shadow-xl shadow-rose-200/30 ring-1 ring-rose-100 sm:p-8">
            <div className="flex flex-wrap items-center gap-2">
              {product.category?.map((category) => (
                <span key={category} className="rounded-full bg-rose-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-rose-700 ring-1 ring-rose-100">
                  {category}
                </span>
              ))}
            </div>

            <h1 className="mt-5 text-3xl font-extrabold tracking-tight text-rose-950 sm:text-4xl">
              {product.name}
            </h1>

            <div className="mt-4 flex flex-wrap items-center gap-3">
              <span className="rounded-full bg-amber-50 px-3 py-1 text-sm font-semibold text-amber-800 ring-1 ring-amber-100">
                Rating {product.rating || 0}/5
              </span>
              <span className={`rounded-full px-3 py-1 text-sm font-semibold ring-1 ${
                isInStock
                  ? "bg-emerald-50 text-emerald-800 ring-emerald-100"
                  : "bg-red-50 text-red-700 ring-red-100"
              }`}
              >
                {isInStock ? `${product.stock} in stock` : "Out of stock"}
              </span>
            </div>

            <div className="mt-6 flex flex-wrap items-end gap-3">
              <p className="text-4xl font-extrabold text-gray-950">Rs. {priceAfterDiscount}</p>
              {product.discount > 0 && (
                <>
                  <p className="pb-1 text-lg font-semibold text-gray-400 line-through">Rs. {product.price}</p>
                  <span className="mb-1 rounded-full bg-red-600 px-3 py-1 text-xs font-bold uppercase tracking-[0.14em] text-white">
                    {product.discount}% off
                  </span>
                </>
              )}
            </div>

            <p className="mt-6 text-base leading-8 text-gray-600">{product.description}</p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <label htmlFor="quantity" className="text-sm font-semibold text-gray-700">
                Quantity
              </label>
              <select
                id="quantity"
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                disabled={!isInStock}
                className="rounded-xl border border-rose-100 bg-white px-4 py-3 text-sm font-semibold text-gray-900 outline-none transition focus:border-rose-400 focus:ring-4 focus:ring-rose-100 disabled:cursor-not-allowed disabled:bg-gray-100"
              >
                {Array.from({ length: maxQuantity }, (_, index) => index + 1).map((value) => (
                  <option key={value} value={value}>
                    {value}
                  </option>
                ))}
              </select>
            </div>

            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              <button
                type="button"
                onClick={handleAddToCart}
                disabled={!isInStock}
                className="rounded-2xl bg-rose-600 px-5 py-3 text-sm font-bold uppercase tracking-[0.16em] text-white shadow-lg shadow-rose-500/20 transition hover:bg-rose-700 disabled:cursor-not-allowed disabled:bg-gray-300 disabled:shadow-none"
              >
                Add to cart
              </button>
              <Link to="/" className="rounded-2xl border border-rose-200 px-5 py-3 text-center text-sm font-bold uppercase tracking-[0.16em] text-rose-700 transition hover:border-rose-300 hover:bg-rose-50">
                Continue shopping
              </Link>
            </div>

            <div className="mt-8 grid gap-3 border-t border-rose-100 pt-6 text-sm text-gray-600 sm:grid-cols-3">
              <div>
                <p className="font-semibold text-gray-950">Secure checkout</p>
                <p className="mt-1">Protected payment flow.</p>
              </div>
              <div>
                <p className="font-semibold text-gray-950">Carefully packed</p>
                <p className="mt-1">Prepared for gifting.</p>
              </div>
              <div>
                <p className="font-semibold text-gray-950">Easy support</p>
                <p className="mt-1">Help when you need it.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="mt-10 rounded-2xl bg-white p-6 shadow-lg shadow-rose-100/40 ring-1 ring-rose-100 sm:p-8">
          <div className="flex flex-wrap items-end justify-between gap-3 border-b border-rose-100 pb-6">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-rose-600">Customer reviews</p>
              <h2 className="mt-2 text-2xl font-bold text-rose-950">What shoppers are saying</h2>
            </div>
            <span className="rounded-full bg-rose-50 px-4 py-2 text-sm font-semibold text-rose-700 ring-1 ring-rose-100">
              {reviews.length} review{reviews.length === 1 ? "" : "s"}
            </span>
          </div>

          {reviews.length > 0 ? (
            <div className="mt-8 grid gap-8 lg:grid-cols-[0.38fr_1fr]">
              <aside className="rounded-2xl bg-gradient-to-br from-rose-50 to-amber-50 p-6 ring-1 ring-rose-100">
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-rose-700">Overall rating</p>
                <div className="mt-4 flex items-end gap-2">
                  <span className="text-5xl font-extrabold text-rose-950">{averageReviewRating}</span>
                  <span className="pb-2 text-base font-semibold text-gray-500">/ 5</span>
                </div>
                <div className="mt-4 flex gap-1" aria-label={`Average rating ${averageReviewRating} out of 5`}>
                  {[1, 2, 3, 4, 5].map((star) => (
                    <span
                      key={star}
                      className={`h-3 w-8 rounded-full ${
                        star <= Math.round(Number(averageReviewRating)) ? "bg-amber-400" : "bg-white"
                      }`}
                    />
                  ))}
                </div>
                <p className="mt-4 text-sm leading-6 text-rose-900/75">
                  Based on verified product feedback from shoppers.
                </p>

                <div className="mt-6 space-y-3">
                  {reviewCounts.map(({ rating, count }) => {
                    const percent = reviews.length ? (count / reviews.length) * 100 : 0;

                    return (
                      <div key={rating} className="grid grid-cols-[36px_1fr_24px] items-center gap-3 text-xs font-semibold text-gray-600">
                        <span>{rating}/5</span>
                        <div className="h-2 overflow-hidden rounded-full bg-white ring-1 ring-rose-100">
                          <div className="h-full rounded-full bg-rose-500" style={{ width: `${percent}%` }} />
                        </div>
                        <span className="text-right">{count}</span>
                      </div>
                    );
                  })}
                </div>
              </aside>

              <div className="grid gap-4 md:grid-cols-2">
                {reviews.map((review, index) => {
                  const rating = getReviewRating(review);
                  const reviewText = getReviewText(review);

                  return (
                    <article
                      key={review._id}
                      className="rounded-2xl border border-rose-100 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <p className="text-sm font-bold text-rose-950">Verified customer</p>
                          <p className="mt-1 text-xs font-semibold uppercase tracking-[0.16em] text-gray-400">
                            Product feedback
                          </p>
                        </div>
                        <span className="rounded-full bg-amber-50 px-3 py-1 text-sm font-bold text-amber-700 ring-1 ring-amber-100">
                          {rating ? `${rating}/5` : "No rating"}
                        </span>
                      </div>

                      <div className="mt-4 flex gap-1" aria-label={`Review rating ${rating || 0} out of 5`}>
                        {[1, 2, 3, 4, 5].map((star) => (
                          <span
                            key={star}
                            className={`h-2.5 w-7 rounded-full ${
                              star <= Math.round(rating) ? "bg-amber-400" : "bg-gray-100"
                            }`}
                          />
                        ))}
                      </div>

                      <p className="mt-5 text-sm leading-7 text-gray-700">{reviewText}</p>
                    </article>
                  );
                })}
              </div>
            </div>
          ) : (
            <div className="mt-8 rounded-2xl border border-dashed border-rose-200 bg-gradient-to-br from-rose-50 to-white p-8 text-center">
              <p className="text-lg font-bold text-rose-950">No reviews yet</p>
              <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-rose-700/80">
                Reviews from customers will appear here after they share their product experience.
              </p>
            </div>
          )}
        </section>
      </div>
    </main>
  );
};

export default ProductDetails;
