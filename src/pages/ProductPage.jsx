import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Header from "../Components/Header";
import Footer from "../Components/Footer"; // Import the footer

const ProductPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/products/${id}`)
      .then((response) => setProduct(response.data))
      .catch((error) => console.error("Error fetching product:", error));

    axios
      .get(`http://localhost:5000/reviews/${id}`)
      .then((response) => setReviews(response.data))
      .catch((error) => console.error("Error fetching reviews:", error));
  }, [id]);

  if (!product) return <p>Loading...</p>;

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <div className="container mx-auto py-10 flex-grow">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left Section: Product Images */}
          <div className="flex justify-center">
            <img
              src={product.images[0]}
              alt={product.name}
              className="max-w-full md:max-w-md h-auto rounded-lg"
            />
          </div>

          {/* Right Section: Product Details */}
          <div>
            <h2 className="text-3xl font-bold mb-4">{product.name}</h2>
            <p className="text-gray-600 mb-4">{product.description}</p>
            <p className="text-purple-700 font-bold mb-4">Price: ${product.price}</p>

            <p className="text-gray-700 mb-2">Rating: {product.rating}/5</p>
            <p className="text-gray-700 mb-2">Made from: {product.madeFrom}</p>
            <p className="text-gray-700 mb-2">Brand: {product.brand}</p>

            <button className="bg-purple-700 text-white px-6 py-2 rounded-full hover:bg-purple-500 mb-6">
              Share
            </button>

            {/* Reviews Section */}
            <div className="mt-10">
              <h3 className="text-2xl font-bold mb-4">Reviews</h3>
              {reviews.length > 0 ? (
                reviews.map((review) => (
                  <div key={review._id} className="border-b pb-4 mb-4">
                    <p className="font-bold">{review.username}</p>
                    <p className="text-gray-600">{review.comment}</p>
                    <p className="text-yellow-500">Rating: {review.rating}/5</p>
                  </div>
                ))
              ) : (
                <p>No reviews yet. Be the first to review this product!</p>
              )}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ProductPage;
