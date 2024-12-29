import React from "react";
import { Link } from "react-router-dom";

const ProductGrid = ({ products }) => (
  <div className="container mx-auto py-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
    {products.map((product) => (
      <Link
        to={`/product/${product._id}`}
        key={product._id}
        className="bg-white rounded-lg shadow-md p-4 hover:shadow-xl transition"
      >
        <img src={product.images[0]} alt={product.name} className="w-full h-48 object-cover rounded-t-lg" />
        <h3 className="text-xl font-bold mt-2">{product.name}</h3>
        <p className="text-gray-600 mt-1">{product.description}</p>
        <p className="text-purple-700 font-bold mt-2">${product.price}</p>
      </Link>
    ))}
  </div>
);

export default ProductGrid;
