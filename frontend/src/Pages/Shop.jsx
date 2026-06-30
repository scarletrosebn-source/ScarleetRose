import  { useEffect, useState } from "react";
import Card from "../Components/Card";
import Loader from "../Components/Loader";

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    window.scrollTo(0, 0);

    const loadProducts = async () => {
      try {
        const resp = await fetch("/api/products");
        if (!resp.ok) {
          throw new Error(`Server responded with ${resp.status}`);
        }

        const data = await resp.json();
        setProducts(Array.isArray(data) ? data : []);
      } catch (fetchError) {
        console.error("Error fetching shop products:", fetchError);
        setError("Unable to load products right now. Please check back soon.");
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <section className="bg-gradient-to-b from-rose-50 to-white px-4 py-14 md:py-20">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-rose-900 mb-4">Shop</h1>
          <p className="text-lg text-gray-600 mb-6">Explore our wide selection of handcrafted beauty and timeless elegance</p>
          <div className="w-24 h-1 bg-rose-500 mx-auto rounded-full"></div>
        </div>
      </section>
      <section className="px-4 pb-16 md:pb-20 max-w-6xl mx-auto">
        {loading ? (
          <Loader />
        ) : error ? (
          <div className="rounded-2xl border border-red-200 bg-red-50 p-8 text-center text-red-700">
            <p className="text-lg font-semibold">Unable to load products</p>
            <p className="mt-2 text-sm text-red-700/80">{error}</p>
          </div>
        ) : products.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((product) => (
              <Card key={product._id || product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-rose-200 bg-rose-50 p-8 text-center text-rose-700">
            No products are available right now. Please check back soon.
          </div>
        )}
      </section>
    </div>
  );
};
export default Shop;
