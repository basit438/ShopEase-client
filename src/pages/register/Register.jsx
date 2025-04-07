import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import instance from "../../axiosConfig";

export default function RegisterUser() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
  });
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");
    setLoading(true);

    try {
      const response = await instance.post("user/register", formData);
      setMessage(response.data.message);
      setFormData({ name: "", email: "", password: "", phone: "" });
    } catch (err) {
      setError(err.response?.data?.message || "Error registering user");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative bg-white rounded-3xl shadow-md p-10 w-full max-w-md border border-black"
      >
        <h2 className="text-4xl font-bold text-center text-black mb-6">
          Create Account
        </h2>
        {message && (
          <p className="text-green-600 text-center font-medium mb-4">
            {message}
          </p>
        )}
        {error && (
          <p className="text-red-600 text-center font-medium mb-4">
            {error}
          </p>
        )}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label
              htmlFor="name"
              className="block text-black mb-1 font-medium"
            >
              Full Name
            </label>
            <input
              id="name"
              type="text"
              name="name"
              placeholder="Your full name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-3 rounded-lg border border-black focus:outline-none focus:ring-2 focus:ring-black bg-white"
              required
            />
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-black mb-1 font-medium"
            >
              Email Address
            </label>
            <input
              id="email"
              type="email"
              name="email"
              placeholder="you@example.com"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-3 rounded-lg border border-black focus:outline-none focus:ring-2 focus:ring-black bg-white"
              required
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-black mb-1 font-medium"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              name="password"
              placeholder="Enter a secure password"
              value={formData.password}
              onChange={handleChange}
              className="w-full p-3 rounded-lg border border-black focus:outline-none focus:ring-2 focus:ring-black bg-white"
              required
            />
          </div>
          <div>
            <label
              htmlFor="phone"
              className="block text-black mb-1 font-medium"
            >
              Phone Number
            </label>
            <input
              id="phone"
              type="text"
              name="phone"
              placeholder="(123) 456-7890"
              value={formData.phone}
              onChange={handleChange}
              className="w-full p-3 rounded-lg border border-black focus:outline-none focus:ring-2 focus:ring-black bg-white"
              required
            />
          </div>
          <motion.button
            type="submit"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            className="w-full bg-black hover:bg-gray-800 text-white py-3 rounded-lg font-semibold shadow-md transition duration-300"
            disabled={loading}
          >
            {loading ? "Registering..." : "Sign Up"}
          </motion.button>
        </form>

        <p className="text-black text-center mt-6">
          Already have an account?{" "}
          <Link
            to="/login"
            className="underline transition duration-300 hover:text-gray-800"
          >
            Login
          </Link>
          <span className="block mt-4">
            Or register as a{" "}
            <Link
              to="/register-seller"
              className="underline transition duration-300 hover:text-gray-800"
            >
              Seller
            </Link>
          </span>
        </p>
      </motion.div>
    </div>
  );
}
