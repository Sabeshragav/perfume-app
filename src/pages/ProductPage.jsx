import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import { Star, Share2, ShoppingBag } from 'lucide-react';

const ProductPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [activeImage, setActiveImage] = useState(0);
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const [productResponse, reviewsResponse] = await Promise.all([
          axios.get(`http://localhost:5000/products/${id}`),
          axios.get(`http://localhost:5000/reviews/${id}`)
        ]);
        setProduct(productResponse.data);
        setReviews(reviewsResponse.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchProductData();
  }, [id]);

  if (!product) return (
    <div className="flex items-center justify-center h-screen">
      <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-purple-500"></div>
    </div>
  );

  const truncateDescription = (text, maxLength) => {
    if (text.length <= maxLength) return text;
    return isDescriptionExpanded ? text : `${text.slice(0, maxLength)}...`;
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />

      <main className="container mx-auto py-10 px-4 flex-grow">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left Section: Product Images */}
          <div className="space-y-4">
            <div className="relative overflow-hidden rounded-lg shadow-lg">
              <img
                src={product.images[activeImage]}
                alt={product.name}
                className="w-full h-96 object-cover transition-transform duration-500 ease-in-out transform hover:scale-110"
              />
              <div className="absolute top-4 right-4 bg-white rounded-full p-2 shadow-md">
                <Share2 className="w-6 h-6 text-purple-600 cursor-pointer hover:text-purple-800 transition-colors" />
              </div>
            </div>
            <div className="flex space-x-2 overflow-x-auto pb-2">
              {product.images.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`${product.name} ${index + 1}`}
                  className={`w-20 h-20 object-cover rounded-md cursor-pointer transition-opacity ${
                    index === activeImage ? 'border-2 border-purple-500' : 'opacity-60 hover:opacity-100'
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
                  <Star key={i} className={`w-5 h-5 ${i < Math.round(product.rating) ? 'text-yellow-400' : 'text-gray-300'}`} fill="currentColor" />
                ))}
              </div>
              <span className="text-gray-600">({product.rating.toFixed(1)})</span>
            </div>
            <p className="text-2xl font-bold text-purple-600">${product.price.toFixed(2)}</p>
            <div>
              <p className="text-gray-700 mb-2">{truncateDescription(product.description, 150)}</p>
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
              <p className="text-gray-700"><span className="font-semibold">Made from:</span> {product.madeFrom}</p>
              <p className="text-gray-700"><span className="font-semibold">Brand:</span> {product.brand}</p>
            </div>
            <button className="w-full bg-purple-600 text-white px-6 py-3 rounded-full hover:bg-purple-700 transition-colors flex items-center justify-center space-x-2">
              <ShoppingBag className="w-5 h-5" />
              <span>Add to Cart</span>
            </button>
          </div>
        </div>

        {/* Reviews Section */}
        <section className="mt-16">
          <h2 className="text-3xl font-bold mb-6 text-gray-800">Customer Reviews</h2>
          {reviews.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {reviews.map((review) => (
                <div key={review._id} className="bg-white p-6 rounded-lg shadow-md transition-transform hover:scale-105">
                  <div className="flex items-center mb-4">
                    <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center mr-3">
                      <span className="text-purple-600 font-semibold">{review.username[0].toUpperCase()}</span>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800">{review.username}</p>
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className={`w-4 h-4 ${i < review.rating ? 'text-yellow-400' : 'text-gray-300'}`} fill="currentColor" />
                        ))}
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-600">{review.comment}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-600 text-center py-8">No reviews yet. Be the first to review this product!</p>
          )}
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default ProductPage;
