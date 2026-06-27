import React from "react";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-rose-50 to-white px-4 py-16 md:py-24">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-rose-900 mb-4">
            Welcome to Scarlet Rose
          </h1>
          <p className="text-lg text-gray-600 mb-6">
            Where elegance meets artistry in every creation
          </p>
          <div className="w-24 h-1 bg-rose-500 mx-auto rounded-full"></div>
        </div>
      </section>

      {/* Our Story */}
      <section className="px-4 py-16 md:py-20 max-w-5xl mx-auto">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="text-3xl font-bold text-rose-900 mb-4">Our Story</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Scarlet Rose was born from a passion for handcrafted beauty and
              timeless elegance. Inspired by the delicate charm of roses, we
              create exquisite products that celebrate artistry, creativity, and
              individuality.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Each piece, whether it's a wearable artwork, a handcrafted item,
              or a carefully curated garment, carries the spirit of our brand—
              bold, beautiful, and uniquely yours.
            </p>
          </div>
          <div className="bg-rose-100 rounded-lg h-64 flex items-center justify-center">
            <div className="text-rose-900 text-6xl">🌹</div>
          </div>
        </div>
      </section>

      {/* Mission & Values */}
      <section className="bg-rose-50 px-4 py-16 md:py-20">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-rose-900 mb-12 text-center">
            Our Mission & Values
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {/* Mission */}
            <div className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition">
              <div className="text-rose-500 text-3xl mb-3">✨</div>
              <h3 className="text-xl font-bold text-rose-900 mb-3">
                Our Mission
              </h3>
              <p className="text-gray-700">
                To inspire and empower creativity through beautifully crafted
                products that blend artistry with everyday life.
              </p>
            </div>

            {/* Quality */}
            <div className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition">
              <div className="text-rose-500 text-3xl mb-3">🎨</div>
              <h3 className="text-xl font-bold text-rose-900 mb-3">Quality</h3>
              <p className="text-gray-700">
                Every product is crafted with meticulous attention to detail,
                using premium materials and ethical practices.
              </p>
            </div>

            {/* Creativity */}
            <div className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition">
              <div className="text-rose-500 text-3xl mb-3">💝</div>
              <h3 className="text-xl font-bold text-rose-900 mb-3">
                Creativity
              </h3>
              <p className="text-gray-700">
                We celebrate individuality and encourage personal expression
                through unique, one-of-a-kind designs.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* What We Offer */}
      <section className="px-4 py-16 md:py-20 max-w-2xl mx-auto">
        <h2 className="text-3xl font-bold text-rose-900 mb-12 text-center">
          What We Offer
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          {/* Arts & Crafts */}
          <div className="text-center">
            <div className="bg-rose-100 rounded-lg p-8 mb-4 h-40 flex items-center justify-center">
              <div className="text-5xl">🖌️</div>
            </div>
            <h3 className="text-xl font-bold text-rose-900 mb-2">
              Arts & Crafts
            </h3>
            <p className="text-gray-700">
              Handpicked artisan creations, from floral arrangements to
              decorative pieces that add elegance to any space.
            </p>
          </div>

          {/* Fashion */}
          <div className="text-center">
            <div className="bg-rose-100 rounded-lg p-8 mb-4 h-40 flex items-center justify-center">
              <div className="text-5xl">👗</div>
            </div>
            <h3 className="text-xl font-bold text-rose-900 mb-2">Fashion</h3>
            <p className="text-gray-700">
              Curated clothing and accessories inspired by rose-themed designs,
              blending style with sophistication.
            </p>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="bg-gradient-to-r from-rose-900 to-rose-700 px-4 py-16 md:py-20 text-white">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">
            Why Choose Scarlet Rose?
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="flex gap-4">
              <div className="text-2xl">✓</div>
              <div>
                <h3 className="font-bold mb-2">Handcrafted Excellence</h3>
                <p className="text-rose-100">
                  Each item is carefully crafted with love and expertise.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="text-2xl">✓</div>
              <div>
                <h3 className="font-bold mb-2">Ethical Sourcing</h3>
                <p className="text-rose-100">
                  We support artisans and sustainable practices.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="text-2xl">✓</div>
              <div>
                <h3 className="font-bold mb-2">Unique Designs</h3>
                <p className="text-rose-100">
                  Stand out with one-of-a-kind pieces that express your style.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="text-2xl">✓</div>
              <div>
                <h3 className="font-bold mb-2">Fast & Reliable Shipping</h3>
                <p className="text-rose-100">
                  We deliver your treasures safely and promptly.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="text-2xl">✓</div>
              <div>
                <h3 className="font-bold mb-2">Customer Support</h3>
                <p className="text-rose-100">
                  Our team is here to help with any questions or concerns.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="text-2xl">✓</div>
              <div>
                <h3 className="font-bold mb-2">Quality Guarantee</h3>
                <p className="text-rose-100">
                  We stand behind every product with confidence.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-4 py-16 md:py-20 max-w-5xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-rose-900 mb-4">
          Ready to Discover Your Next Favorite Piece?
        </h2>
        <p className="text-gray-600 mb-8 text-lg">
          Explore our collection and find something that speaks to your heart.
        </p>
        <Link
          to="/"
          className="inline-block bg-rose-500 hover:bg-rose-600 text-white font-bold py-3 px-8 rounded-lg transition duration-300"
        >
          Shop Now
        </Link>
      </section>

      {/* Footer Info */}
      <section className="bg-gray-100 px-4 py-12">
        <div className="max-w-5xl mx-auto text-center text-gray-700">
          <p className="mb-2">
            Have questions? Reach out to us at{" "}
            <span className="font-bold text-rose-900">support@scarletrose.com</span>
          </p>
          <p>
            Follow us on social media for inspiration, updates, and exclusive
            offers.
          </p>
        </div>
      </section>
    </div>
  );
};

export default About;
