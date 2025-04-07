import React, { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';

export default function About() {
  // Create refs for the animated icons
  const cartRef = useRef(null);
  const tagRef = useRef(null);
  const boxRef = useRef(null);

  useEffect(() => {
    // Animate each icon with a gentle vertical bounce for subtle movement
    gsap.to(cartRef.current, {
      duration: 1,
      y: -30,
      repeat: -1,
      yoyo: true,
      ease: 'power1.inOut'
    });
    gsap.to(tagRef.current, {
      duration: 1,
      y: -30,
      repeat: -1,
      yoyo: true,
      ease: 'power1.inOut',
      delay: 0.15
    });
    gsap.to(boxRef.current, {
      duration: 1,
      y: -30,
      repeat: -1,
      yoyo: true,
      ease: 'power1.inOut',
      delay: 0.3
    });
  }, []);

  return (
    <div className="min-h-screen flex flex-col font-mono bg-white text-black">
      {/* Hero Section */}
      <section className="bg-white py-20 px-4 text-center border-b border-black">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold mb-4 tracking-wide">About Us</h1>
          <p className="text-xl md:text-2xl mb-8 leading-relaxed">
            Discover our story—where quality meets simplicity. We are a marketplace that connects passionate sellers with discerning buyers.
          </p>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-semibold mb-4 tracking-wide">Our Story</h2>
          <p className="text-lg mb-6 leading-relaxed">
            Born out of a passion for timeless design and exceptional service, our platform was built to foster genuine connections between creators and customers. We believe in quality, simplicity, and honesty—values that shine through in every interaction.
          </p>
          <p className="text-lg mb-6 leading-relaxed">
            Whether you’re browsing for unique items or sharing your own creations, we’re committed to providing a seamless, enjoyable experience. Our journey is one of continuous improvement and innovation, and your feedback plays a crucial role in our evolution.
          </p>
        </div>
      </section>

      {/* Animated Icons Section */}
      <section className="relative py-16 border-t border-b border-gray-300">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-8 tracking-wide">Our Marketplace in Motion</h2>
          <div className="relative h-64 flex justify-center items-center">
            {/* GSAP Animated Icons */}
            <i
              ref={cartRef}
              className="fas fa-shopping-cart text-6xl mx-4"
            ></i>
            <i
              ref={tagRef}
              className="fas fa-tag text-6xl mx-4"
            ></i>
            <i
              ref={boxRef}
              className="fas fa-box text-6xl mx-4"
            ></i>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 px-4 bg-gray-100">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-semibold mb-6 tracking-wide">What Our Community Says</h2>
          <p className="text-lg mb-4 leading-relaxed italic">
            "A breath of fresh air in the world of online marketplaces. The simplicity and quality of service have won me over."
          </p>
          <p className="text-md uppercase tracking-wider font-medium">— Alex D.</p>
        </div>
      </section>

      {/* Feedback / Call to Action Section */}
      <section className="bg-white text-black py-20 px-4 text-center border-t border-black mt-auto">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold mb-4 tracking-wide">We Value Your Feedback</h2>
          <p className="text-xl mb-8 leading-relaxed">
            Your thoughts help us shape the future of our marketplace. Tell us what you love or what we can improve!
          </p>
          <Link
            to="/feedback"
            className="inline-block border border-black text-black px-8 py-3 rounded-full font-semibold shadow hover:bg-gray-200 transition"
          >
            Give Feedback
          </Link>
        </div>
      </section>
    </div>
  );
}
