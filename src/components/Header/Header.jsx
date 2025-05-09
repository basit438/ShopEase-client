import { useEffect, useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate, useLocation } from "react-router-dom";
import useCart from "../../hooks/useCart";
import instance from "../../axiosConfig";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { cart, fetchCart } = useCart();

  // Check login status on location change.
  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const response = await instance.get("user/profile", {
          withCredentials: true,
        });
        setIsLoggedIn(response.status === 200);
      } catch (err) {
        setIsLoggedIn(false);
      }
    };
    checkLoginStatus();
  }, [location]);

  // Fetch cart data when the component mounts.
  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  const handleLogout = async () => {
    try {
      await instance.post("user/logout", {}, { withCredentials: true });
      setIsLoggedIn(false);
      navigate("/login");
    } catch (err) {
      console.error(err);
    }
  };

  // Build navigation links using useMemo for optimization.
  const navLinks = useMemo(() => {
    const links = [
      { name: "Home", to: "/" },
      { name: "About", to: "/about" },
      { name: "Products", to: "/products" },
    ];
    if (isLoggedIn) {
      links.push({ name: "My Profile", to: "/profile" });
    } else {
      links.push({ name: "Login", to: "/login" });
      links.push({ name: "Register", to: "/register" });
    }
    if (isLoggedIn) {
      links.push({
        name: (
          <div className="relative inline-block">
            <span>Cart</span>
            {cart?.items?.length > 0 && (
              <span className="absolute -top-2 -right-3 bg-black text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {cart.items.length}
              </span>
            )}
          </div>
        ),
        to: "/cart",
      });
    }
    return links;
  }, [isLoggedIn, cart]);

  return (
    <header className="sticky top-0 z-50 bg-white text-black shadow-md border-b border-black">
      <div className="container mx-auto flex justify-between items-center px-4 py-4 md:py-6">
        {/* Logo */}
        <motion.h1
          className="text-2xl md:text-3xl font-bold tracking-wide"
          whileHover={{ scale: 1.1 }}
        >
          <Link to="/">ShopEase</Link>
        </motion.h1>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-6">
          {navLinks.map((link, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                to={link.to}
                className="text-lg font-medium hover:text-gray-600 transition-colors duration-200"
              >
                {link.name}
              </Link>
            </motion.div>
          ))}
          {isLoggedIn && (
            <button
              onClick={handleLogout}
              className="text-lg font-medium hover:text-gray-600 transition-colors duration-200"
            >
              Logout
            </button>
          )}
        </nav>

        {/* Mobile Hamburger Menu Button */}
        <div className="md:hidden">
          <button
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            className="focus:outline-none"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? (
              <svg
                className="w-8 h-8"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                className="w-8 h-8"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 8h16M4 16h16"
                />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {mobileMenuOpen && (
        <nav className="md:hidden bg-white border-t border-black">
          <ul className="flex flex-col items-center space-y-4 py-4">
            {navLinks.map((link, index) => (
              <motion.li
                key={index}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full text-center"
              >
                <Link
                  onClick={() => setMobileMenuOpen(false)}
                  to={link.to}
                  className="block text-lg font-medium hover:text-gray-600 transition-colors duration-200 px-4 py-2"
                >
                  {link.name}
                </Link>
              </motion.li>
            ))}
            {isLoggedIn && (
              <li className="w-full text-center">
                <button
                  onClick={() => {
                    handleLogout();
                    setMobileMenuOpen(false);
                  }}
                  className="text-lg font-medium hover:text-gray-600 transition-colors duration-200 px-4 py-2"
                >
                  Logout
                </button>
              </li>
            )}
          </ul>
        </nav>
      )}
    </header>
  );
}
