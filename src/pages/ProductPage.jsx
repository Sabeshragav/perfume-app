import React, { useState, useEffect, useCallback, useContext } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';
import { Star, Share2, ShoppingBag, Heart } from 'lucide-react';

import Header from '../Components/Header';
import ReviewForm from '../Components/ReviewForm';
import Footer from '../Components/Footer';
import { CartContext } from '../context/CartContext';

const ProductPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [activeImage, setActiveImage] = useState(0);
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const { addToCart } = useContext(CartContext);

  const fetchProductData = useCallback(async () => {
    try {
      const [productResponse, reviewsResponse] = await Promise.all([
        axios.get(`${process.env.REACT_APP_API_BASE_URL}/products/${id}`),
        axios.get(`${process.env.REACT_APP_API_BASE_URL}/reviews/${id}`),
      ]);
      setProduct(productResponse.data);
      setReviews(reviewsResponse.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }, [id]);

  useEffect(() => {
    fetchProductData();
  }, [fetchProductData]);

  const handleAddReview = (product) => {
    setSelectedProduct(product);
    setShowReviewForm(true);
  };

  const handleReviewSubmit = () => {
    setShowReviewForm(false);
    fetchProductData();
  };

  const handleAddToCart = () => {
    addToCart(product);
    // You can add a notification or feedback here
    console.log('Added to cart:', product);
  };

  const handleToggleWishlist = () => {
    setIsWishlisted(!isWishlisted);
    // TODO: Implement wishlist functionality
  };

  if (!product) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  const truncateDescription = (text, maxLength) => {
    if (text.length <= maxLength) return text;
    return isDescriptionExpanded ? text : `${text.slice(0, maxLength)}...`;
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto py-10 px-4 flex-grow">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12"
        >
          {/* Left Section: Product Images */}
          <div className="space-y-4">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="relative overflow-hidden rounded-lg shadow-lg"
            >
              <img
                src={product.images[activeImage]}
                alt={product.name}
                className="w-full h-96 object-cover"
              />
              <motion.div
                whileHover={{ scale: 1.1 }}
                className="absolute top-4 right-4 bg-white rounded-full p-2 shadow-md"
              >
                <Share2 className="w-6 h-6 text-purple-600 cursor-pointer" />
              </motion.div>
            </motion.div>
            <div className="flex space-x-2 overflow-x-auto pb-2">
              {product.images.map((image, index) => (
                <motion.img
                  key={index}
                  whileHover={{ scale: 1.1 }}
                  src={image}
                  alt={`${product.name} ${index + 1}`}
                  className={`w-20 h-20 object-cover rounded-md cursor-pointer transition-opacity ${
                    index === activeImage
                      ? 'border-2 border-purple-500'
                      : 'opacity-60 hover:opacity-100'
                  }`}
                  onClick={() => setActiveImage(index)}
                />
              ))}
            </div>
          </div>

          {/* Right Section: Product Details */}
          <div className="space-y-6">
            <h1 className="text-4xl font-bold text-gray-800">{product.name}</h1>
            <div className="flex items-center space-x-2">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 ${
                      i < Math.round(product.rating)
                        ? 'text-yellow-400'
                        : 'text-gray-300'
                    }`}
                    fill="currentColor"
                  />
                ))}
              </div>
              <span className="text-gray-600">
                ({product.rating.toFixed(1)})
              </span>
            </div>
            <p className="text-2xl font-bold text-purple-600">
              ${product.price.toFixed(2)}
            </p>
            <div>
              <p className="text-gray-700 mb-2">
                {truncateDescription(product.description, 150)}
              </p>
              {product.description.length > 150 && (
                <button
                  className="text-purple-600 hover:text-purple-800 transition-colors"
                  onClick={() => setIsDescriptionExpanded(!isDescriptionExpanded)}
                >
                  {isDescriptionExpanded ? 'Read less' : 'Read more'}
                </button>
              )}
            </div>
            <div className="space-y-2">
              <p className="text-gray-700">
                <span className="font-semibold">Made from:</span> {product.madeFrom}
              </p>
              <p className="text-gray-700">
                <span className="font-semibold">Brand:</span> {product.brand}
              </p>
            </div>
            <div className="flex space-x-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex-grow bg-purple-600 text-white px-6 py-3 rounded-full hover:bg-purple-700 transition-colors flex items-center justify-center space-x-2"
                onClick={handleAddToCart}
              >
                <ShoppingBag className="w-5 h-5" />
                <span>Add to Cart</span>
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`p-3 rounded-full ${
                  isWishlisted ? 'bg-red-500 text-white' : 'bg-gray-200 text-gray-600'
                }`}
                onClick={handleToggleWishlist}
              >
                <Heart className="w-6 h-6" fill={isWishlisted ? 'currentColor' : 'none'} />
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Reviews Section */}
        <section className="mt-16">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-3xl font-bold text-gray-800">Customer Reviews</h2>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleAddReview(product)}
              className="bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700 transition-colors duration-300"
            >
              Add Review
            </motion.button>
          </div>
          {reviews.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {reviews.map((review) => (
                <motion.div
                  key={review._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="bg-white p-6 rounded-lg shadow-md transition-transform hover:scale-105"
                >
                  <div className="flex items-center mb-4">
                    <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center mr-3">
                      <span className="text-purple-600 font-semibold">
                        {review.username[0].toUpperCase()}
                      </span>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800">{review.username}</p>
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${
                              i < review.rating ? 'text-yellow-400' : 'text-gray-300'
                            }`}
                            fill="currentColor"
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-600">{review.comment}</p>
                </motion.div>
              ))}
            </div>
          ) : (
            <p className="text-gray-600 text-center py-8">
              No reviews yet. Be the first to review this product!
            </p>
          )}
        </section>

        {showReviewForm && selectedProduct && (
          <ReviewForm
            productId={selectedProduct._id}
            onClose={handleReviewSubmit}
            setShowReviewForm={setShowReviewForm}
          />
        )}
      </main>
      <Footer />
    </div>
  );
};

export default ProductPage;

