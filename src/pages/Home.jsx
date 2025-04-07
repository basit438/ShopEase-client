// Home.jsx
import React from "react";
import { Link } from "react-router-dom";
import Footer from "../components/Footer/Footer";
import { FeaturedProducts } from "./Products"; // Import the FeaturedProducts component

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50 text-gray-900 font-mono">
      {/* Hero Section */}
      <section className="bg-black text-white py-24 px-6 text-center border-b-4 border-black">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-normal mb-6 tracking-tight uppercase">
            Timeless Essentials
          </h1>
          <p className="text-lg md:text-xl mb-10 font-light tracking-wider">
            Curated goods for the discerning individual.
          </p>
          <Link
            to="/products"
            className="inline-block bg-white text-black px-10 py-3 font-normal tracking-widest uppercase text-sm hover:bg-gray-200 transition border border-black"
          >
            Browse Collection
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-normal text-black mb-16 text-center uppercase tracking-widest">
            Our Philosophy
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="p-8 bg-white border border-gray-300">
              <div className="mb-6">
                <div className="w-12 h-12 mx-auto border-2 border-black"></div>
              </div>
              <h3 className="text-lg font-normal text-black mb-4 uppercase tracking-wider text-center">
                Enduring Quality
              </h3>
              <p className="text-gray-700 text-center font-light">
                Meticulously crafted goods designed to accompany you through the decades.
              </p>
            </div>
            <div className="p-8 bg-white border border-gray-300">
              <div className="mb-6">
                <div className="w-12 h-12 mx-auto border-2 border-black flex items-center justify-center">
                  <div className="w-8 h-1 bg-black"></div>
                </div>
              </div>
              <h3 className="text-lg font-normal text-black mb-4 uppercase tracking-wider text-center">
                Personal Service
              </h3>
              <p className="text-gray-700 text-center font-light">
                Assistance provided with the courtesy and attention of a bygone era.
              </p>
            </div>
            <div className="p-8 bg-white border border-gray-300">
              <div className="mb-6">
                <div className="w-12 h-12 mx-auto border-2 border-black flex items-center justify-center">
                  <div className="w-1 h-8 bg-black"></div>
                </div>
              </div>
              <h3 className="text-lg font-normal text-black mb-4 uppercase tracking-wider text-center">
                Reliable Delivery
              </h3>
              <p className="text-gray-700 text-center font-light">
                Prompt dispatch and careful packaging for every order without exception.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products Section - Now using actual products */}
      <section className="py-20 px-6 bg-gray-100 border-t border-b border-gray-300">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-normal text-black mb-10 text-center uppercase tracking-widest">
            Featured Collection
          </h2>
          <FeaturedProducts />
          <div className="text-center mt-12">
            <Link 
              to="/products"
              className="inline-block border border-black text-black px-8 py-3 text-sm uppercase tracking-wider hover:bg-black hover:text-white transition-colors duration-300"
            >
              View All Products
            </Link>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="bg-black text-white py-20 px-6 text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-normal mb-6 uppercase tracking-wider">Join Us</h2>
          <p className="text-lg mb-10 font-light tracking-wide">
            Subscribe for early access to our latest collections.
          </p>
          <Link
            to="/register"
            className="inline-block bg-white text-black px-10 py-3 font-normal tracking-widest uppercase text-sm hover:bg-gray-200 transition border border-white"
          >
            Subscribe
          </Link>
        </div>
      </section>

      {/* Quote Section */}
      <section className="py-20 px-6 bg-white border-t border-gray-300">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-xl md:text-2xl font-light italic mb-6">
            "Simplicity is the ultimate sophistication."
          </p>
          <p className="text-sm uppercase tracking-widest">— Leonardo da Vinci</p>
        </div>
      </section>

      <Footer />
    </div>
  );
}