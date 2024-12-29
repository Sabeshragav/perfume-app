import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Header from "../Components/Header";
import 'animate.css';

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
    <div className="bg-gray-50">
      <Header />
      <div className="container mx-auto py-10 animate__animated animate__fadeInUp">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex justify-center animate__animated animate__zoomIn">
            <img
              src={product.images[0]}
              alt={product.name}
              className="max-w-full md:max-w-md h-auto rounded-lg shadow-lg hover:scale-105 transform transition duration-300"
            />
          </div>
          <div className="animate__animated animate__fadeInUp">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">{product.name}</h2>
            <p className="text-gray-600 mb-4">{product.description}</p>
            <p className="text-purple-700 font-bold text-xl mb-4">${product.price}</p>
            <p className="text-gray-700 mb-4">Rating: {product.rating}/5</p>
            <p className="text-gray-700 mb-4">Made from: {product.madeFrom}</p>
            <p className="text-gray-700 mb-4">Category: {product.category}</p>
            <p className="text-gray-700 mb-4">Brand: {product.brand}</p>
            <button className="bg-purple-700 text-white px-6 py-2 rounded-full hover:bg-purple-500 transition duration-300 ease-in-out transform hover:scale-110">
              Add to Cart
            </button>
          </div>
        </div>

        <div className="mt-10 animate__animated animate__fadeInUp">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Customer Reviews</h3>
          {reviews.map((review) => (
            <div key={review._id} className="border-b pb-4 mb-4">
              <p className="font-bold text-gray-800">{review.username}</p>
              <p className="text-gray-600">{review.comment}</p>
              <p className="text-yellow-500">Rating: {review.rating}/5</p>
            </div>
          ))}
        </div>
      </div>

      <footer className="bg-gray-800 text-white py-6">
        <div className="container mx-auto text-center">
          <p>&copy; 2024 Your Brand Name</p>
          <div className="mt-4">
            <a href="#" className="text-gray-400 hover:text-white mx-4">Privacy Policy</a>
            <a href="#" className="text-gray-400 hover:text-white mx-4">Terms of Service</a>
            <a href="#" className="text-gray-400 hover:text-white mx-4">Contact Us</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ProductPage;
