// Footer.jsx
import React from "react";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-white text-black border-t border-gray-300 py-12 font-mono">
      <div className="max-w-5xl mx-auto px-6">
        {/* Top section */}
        <div className="flex flex-col md:flex-row justify-between items-center text-center md:text-left space-y-6 md:space-y-0">
          {/* Logo / Tagline */}
          <div>
            <h2 className="text-xl uppercase tracking-widest font-normal">
              Timeless Essentials
            </h2>
            <p className="text-sm text-gray-600 mt-2 font-light">
              Crafted for those who appreciate enduring quality.
            </p>
          </div>

          {/* Social Icons */}
          <div className="flex space-x-4">
            {[FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn].map((Icon, index) => (
              <a
                key={index}
                href="#"
                className="w-9 h-9 flex items-center justify-center border border-black rounded-full hover:bg-black hover:text-white transition"
              >
                <Icon className="text-base" />
              </a>
            ))}
          </div>
        </div>

        {/* Divider */}
        <hr className="my-10 border-gray-300" />

        {/* Bottom Links */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-sm font-light">
          <div>
            <h4 className="mb-2 font-normal uppercase tracking-wider">Shop</h4>
            <ul className="space-y-1 text-gray-700">
              <li><a href="#" className="hover:underline">Men</a></li>
              <li><a href="#" className="hover:underline">Women</a></li>
              <li><a href="#" className="hover:underline">Accessories</a></li>
            </ul>
          </div>
          <div>
            <h4 className="mb-2 font-normal uppercase tracking-wider">Company</h4>
            <ul className="space-y-1 text-gray-700">
              <li><a href="#" className="hover:underline">About</a></li>
              <li><a href="#" className="hover:underline">Careers</a></li>
              <li><a href="#" className="hover:underline">Contact</a></li>
            </ul>
          </div>
          <div>
            <h4 className="mb-2 font-normal uppercase tracking-wider">Support</h4>
            <ul className="space-y-1 text-gray-700">
              <li><a href="#" className="hover:underline">FAQ</a></li>
              <li><a href="#" className="hover:underline">Shipping</a></li>
              <li><a href="#" className="hover:underline">Returns</a></li>
            </ul>
          </div>
          <div>
            <h4 className="mb-2 font-normal uppercase tracking-wider">Legal</h4>
            <ul className="space-y-1 text-gray-700">
              <li><a href="#" className="hover:underline">Privacy Policy</a></li>
              <li><a href="#" className="hover:underline">Terms of Service</a></li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-10 text-center text-xs text-gray-500">
          &copy; {new Date().getFullYear()} Timeless Essentials. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
