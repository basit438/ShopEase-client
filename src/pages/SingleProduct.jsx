import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import instance from '../axiosConfig';
import useCart from '../hooks/useCart';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function SingleProduct() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);   // Holds product data
  const [loading, setLoading] = useState(true);     // Indicates loading state
  const [error, setError] = useState(null);         // Holds error message if any
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await instance.get(`product/get/${id}`);
        setProduct(response.data.product);
      } catch (err) {
        setError(err.response?.data?.message || err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  // Handler for adding to cart with toast notifications.
  const handleAddToCart = async () => {
    try {
      await addToCart(product._id);
      toast.success("Product added to cart successfully.");
    } catch (err) {
      toast.error("Failed to add product to cart.");
    }
  };

  if (loading) {
    return <div className="p-4 text-center text-black">Loading...</div>;
  }

  if (error) {
    return <div className="p-4 text-center text-red-600">Error: {error}</div>;
  }

  return (
    <>
      <div className="p-4 max-w-4xl mx-auto bg-white text-black">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Image Section */}
          <div className="md:w-1/2 flex justify-center items-center">
            <img
              src={product.image}
              alt={product.name}
              className="object-contain w-full max-h-96 rounded-lg border border-black"
            />
          </div>
          {/* Product Details Section */}
          <div className="md:w-1/2 flex flex-col justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
              <p className="text-sm mb-2">Category: <span className="font-medium">{product.category}</span></p>
              <p className="mb-4">{product.description}</p>
              <p className="text-xl font-semibold mb-2">${product.price}</p>
              <p className="text-sm mb-2">Brand: <span className="font-medium">{product.brand}</span></p>
              <p className="text-sm">
                In Stock: <span className="font-medium">{product.inStock ? 'Yes' : 'No'}</span>
              </p>
            </div>
            <div className="mt-4">
              <button
                onClick={handleAddToCart}
                className="bg-black hover:bg-gray-800 text-white font-semibold py-2 px-4 rounded w-full md:w-auto border border-black"
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* ToastContainer to render the notifications */}
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} />
    </>
  );
}

export default SingleProduct;
