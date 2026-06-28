const react = require("react");

const Shop = () => {
  return (
    <div className="min-h-screen bg-white">
      <section className="bg-gradient-to-b from-rose-50 to-white px-4 py-16 md:py-24">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-rose-900 mb-4">Shop</h1>
          <p className="text-lg text-gray-600 mb-6">Explore our wide selection of handcrafted beauty and timeless elegance</p>
          <div className="w-24 h-1 bg-rose-500 mx-auto rounded-full"></div>
        </div>
      </section>
      <section className="px-4 py-16 md:py-20 max-w-5xl mx-auto"></section>
    </div>
  );
};
export default Shop;