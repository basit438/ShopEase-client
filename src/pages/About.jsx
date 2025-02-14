// About.jsx
import React, { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';

export default function About() {
  // Create refs for the animated icons
  const cartRef = useRef(null);
  const tagRef = useRef(null);
  const boxRef = useRef(null);

  useEffect(() => {
    // Animate each icon with a slight vertical bounce
    gsap.to(cartRef.current, {
      duration: 1,
      y: -50,
      repeat: -1,
      yoyo: true,
      ease: 'power1.inOut'
    });
    gsap.to(tagRef.current, {
      duration: 1,
      y: -50,
      repeat: -1,
      yoyo: true,
      ease: 'power1.inOut',
      delay: 0.2
    });
    gsap.to(boxRef.current, {
      duration: 1,
      y: -50,
      repeat: -1,
      yoyo: true,
      ease: 'power1.inOut',
      delay: 0.4
    });
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white py-20 px-4 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold mb-4">About Us</h1>
          <p className="text-xl md:text-2xl mb-8">
            We are a marketplace for both sellers and buyers where everyone can buy or sell their products.
          </p>
        </div>
      </section>

      {/* Description Section */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <p className="text-gray-800 text-lg mb-6">
            Welcome to our platform! Here, sellers can showcase their products to a wide audience, while buyers can find unique items and great deals with ease.
          </p>
          <p className="text-gray-800 text-lg mb-6">
            This project is still under development, and various improvements will be implemented in the future.
            Your feedback is welcomed and valued as it helps us grow and serve you better.
          </p>
        </div>
      </section>

      {/* Animated Icons Section */}
      <section className="relative py-16">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-8 text-gray-800">Our Marketplace in Motion</h2>
          <div className="relative h-64 flex justify-center items-center">
            {/* GSAP Animated Icons */}
            <i
              ref={cartRef}
              className="fas fa-shopping-cart text-6xl text-indigo-600 mx-4"
            ></i>
            <i
              ref={tagRef}
              className="fas fa-tag text-6xl text-purple-600 mx-4"
            ></i>
            <i
              ref={boxRef}
              className="fas fa-box text-6xl text-indigo-600 mx-4"
            ></i>
          </div>
        </div>
      </section>

      {/* Feedback / Call to Action Section */}
      <section className="bg-indigo-600 text-white py-20 px-4 text-center mt-auto">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold mb-4">We Value Your Feedback</h2>
          <p className="text-xl mb-8">
            Your feedback is important to us! Let us know how we can improve and serve you better.
          </p>
          <Link
            to="/feedback"
            className="inline-block bg-white text-indigo-600 px-8 py-3 rounded-full font-semibold shadow-md hover:bg-gray-100 transition"
          >
            Give Feedback
          </Link>
        </div>
      </section>
    </div>
  );
}
