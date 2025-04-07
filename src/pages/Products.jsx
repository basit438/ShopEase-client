import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useLocation, useNavigate, Link } from "react-router-dom";
import instance from "../axiosConfig";

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const location = useLocation();

  // Fetch products from your API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await instance.get("product/get");
        setProducts(response.data.products);
      } catch (err) {
        setError("Failed to fetch products. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  // Fetch the current user's wishlist on component mount
  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const response = await instance.get("user/wishlist", {
          withCredentials: true,
        });
        setWishlist(response.data.wishlist);
      } catch (err) {
        console.error("Error fetching wishlist:", err);
      }
    };
    fetchWishlist();
  }, []);

  // Handler to toggle wishlist status for a product
  const handleWishlistClick = async (productId) => {
    try {
      const response = await instance.post(
        "user/add-to-wishlist",
        { productId },
        { withCredentials: true }
      );
      setWishlist(response.data.wishlist);
      toast.success(response.data.message);
    } catch (err) {
      console.error("Error updating wishlist:", err.response?.data?.message || err.message);
      if (err.response && err.response.status === 401) {
        toast.error("Please login to add products to your wishlist.");
        setTimeout(() => {
          const refer = encodeURIComponent(location.pathname + location.search);
          navigate(`/login?refer=${refer}`);
        }, 1500);
      } else {
        toast.error(err.response?.data?.message || "Error updating wishlist");
      }
    }
  };

  // Helper to check if a product is in the wishlist
  const isInWishlist = (productId) =>
    wishlist.some((id) => id.toString() === productId.toString());

  // Framer Motion variants for card animations
  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.1 } },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  // Function to render Featured Products for the home page
  const renderFeaturedProducts = () => {
    if (loading || error || products.length === 0) return null;
    
    // Select first 3 products for featured section
    const featuredProducts = products.slice(0, 3);
    
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {featuredProducts.map((product) => (
          <div key={product._id} className="bg-white border border-gray-300">
            <div className="aspect-square w-full bg-gray-100 flex items-center justify-center">
              <img
                src={product.image}
                alt={product.name}
                className="max-h-full max-w-full object-contain p-4"
              />
            </div>
            <div className="p-4">
              <h3 className="text-base font-normal uppercase tracking-wider line-clamp-1">{product.name}</h3>
              <p className="text-sm text-gray-700 mt-2 font-light">${product.price}</p>
              <Link 
                to={`/product/${product._id}`}
                className="mt-4 inline-block w-full text-center border border-black text-black px-4 py-2 text-sm uppercase tracking-wider hover:bg-black hover:text-white transition-colors duration-300"
              >
                View Item
              </Link>
              {!product.inStock && (
                <p className="mt-2 text-xs text-red-600 uppercase tracking-wider text-center">Out of stock</p>
              )}
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 font-mono">
      <div className="max-w-6xl mx-auto px-6">
        <h1 className="text-2xl font-normal text-black mb-12 text-center uppercase tracking-widest">
          Collection
        </h1>
        
        {loading ? (
          <div className="flex justify-center py-20">
            <div className="w-16 h-16 border-t-2 border-black rounded-full animate-spin"></div>
          </div>
        ) : error ? (
          <div className="flex justify-center py-20">
            <p className="text-base uppercase tracking-wider text-black">{error}</p>
          </div>
        ) : (
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {products.length > 0 ? (
              products.map((product) => (
                <motion.div
                  key={product._id}
                  variants={cardVariants}
                  className="bg-white border border-gray-300 flex flex-col"
                >
                  <Link to={`/product/${product._id}`}>
                    <div className="w-full aspect-square flex items-center justify-center bg-gray-100">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="max-h-full max-w-full object-contain p-4"
                      />
                    </div>
                  </Link>
                  <div className="p-6 flex flex-col flex-grow">
                    <Link to={`/product/${product._id}`}>
                      <h2 className="text-base font-normal uppercase tracking-wider line-clamp-2">
                        {product.name}
                      </h2>
                    </Link>
                    <p className="mt-2 text-sm text-gray-700 font-light">{product.brand}</p>
                    <div className="mt-4 flex items-center justify-between">
                      <span className="text-lg font-normal text-black">
                        ${product.price}
                      </span>
                      <button
                        onClick={() => handleWishlistClick(product._id)}
                        className={`px-3 py-1 border ${
                          isInWishlist(product._id)
                            ? "bg-black text-white border-black"
                            : "bg-white text-black border-black hover:bg-black hover:text-white"
                        } text-xs uppercase tracking-wider transition-colors duration-300`}
                      >
                        {isInWishlist(product._id) ? "Saved" : "Save"}
                      </button>
                    </div>
                    <div className="mt-6">
                      <Link to={`/product/${product._id}`}>
                        <button className="w-full bg-white border border-black text-black py-2 px-4 uppercase tracking-wider text-sm hover:bg-black hover:text-white transition-colors duration-300">
                          View Details
                        </button>
                      </Link>
                      {!product.inStock && (
                        <p className="mt-2 text-xs text-red-600 uppercase tracking-wider text-center">Out of stock</p>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))
            ) : (
              <p className="col-span-full text-center text-gray-700 uppercase tracking-wider py-20">
                No products available.
              </p>
            )}
          </motion.div>
        )}
      </div>
      
      {/* Custom toast container styling */}
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={true}
        closeButton={false}
        toastClassName="bg-black text-white font-mono text-sm uppercase tracking-wider"
      />
    </div>
  );
}

// Export the featured products function for use in the Home component
export const FeaturedProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await instance.get("product/get");
        // Get first 3 products for featured section
        setProducts(response.data.products.slice(0, 3));
      } catch (err) {
        console.error("Failed to fetch featured products");
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center py-12">
        <div className="w-12 h-12 border-t-2 border-black rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {products.map((product) => (
        <div key={product._id} className="bg-white border border-gray-300">
          <div className="aspect-square w-full bg-gray-100 flex items-center justify-center">
            <img
              src={product.image}
              alt={product.name}
              className="max-h-full max-w-full object-contain p-4"
            />
          </div>
          <div className="p-4">
            <h3 className="text-base font-normal uppercase tracking-wider line-clamp-1">{product.name}</h3>
            <p className="text-sm text-gray-700 mt-2 font-light">${product.price}</p>
            <Link 
              to={`/product/${product._id}`}
              className="mt-4 inline-block w-full text-center border border-black text-black px-4 py-2 text-sm uppercase tracking-wider hover:bg-black hover:text-white transition-colors duration-300"
            >
              View Item
            </Link>
            {!product.inStock && (
              <p className="mt-2 text-xs text-red-600 uppercase tracking-wider text-center">Out of stock</p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};