import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";

const ProductGrid = ({ products }) => {
  const [inView, setInView] = useState(new Array(products.length).fill(false)); // Track visibility of each product
  const productRefs = useRef([]);

  // Handle intersection observer
  useEffect(() => {
    const options = {
      root: null,
      rootMargin: "0px",
      threshold: 0.5, // Trigger when 50% of the element is in view
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          setInView((prev) => {
            const newState = [...prev];
            newState[index] = true; // Mark the product as in view
            return newState;
          });
        }
      });
    }, options);

    // Observe each product reference
    productRefs.current.forEach((ref) => {
      if (ref) {
        observer.observe(ref);
      }
    });

    // Cleanup observer
    return () => {
      observer.disconnect();
    };
  }, [products]);

  return (
    <div className="container mx-auto py-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {products.map((product, index) => (
        <Link
          to={`/product/${product._id}`}
          key={product._id}
          ref={(el) => (productRefs.current[index] = el)}
          className={`bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transform transition-transform hover:scale-105 product-item ${
            inView[index] ? "in-view" : ""
          }`}
          style={{
            animationDelay: `${index * 0.1}s`,  // Delay animation for each product
          }}
        >
          <div className="relative">
            <img
              src={product.images[0]}
              alt={product.name}
              className="w-full h-48 object-cover rounded-t-lg transition-transform transform"
            />
            <div className="absolute top-2 right-2 bg-purple-700 text-white text-xs px-2 py-1 rounded-full">
              {product.rating}/5
            </div>
          </div>
          <h3 className="text-xl font-bold mt-4 text-gray-900">{product.name}</h3>
          <p className="text-gray-600 mt-2 line-clamp-2">{product.description}</p>
          <p className="text-purple-700 font-bold mt-2">${product.price}</p>
          <p className="text-gray-700 mb-2">Made from: {product.madeFrom}</p>
          <p className="text-gray-700 mb-2">Brand: {product.brand}</p>
        </Link>
      ))}
    </div>
  );
};

export default ProductGrid;
