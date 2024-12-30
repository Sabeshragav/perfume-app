import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

const CollectionItems = () => {
  const [items, setItems] = useState([]);
  const [collectionName, setCollectionName] = useState("");
  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_BASE_URL}/products`)
      .then((response) => {
        const collectionItems = response.data.filter(
          (product) => product.collections === parseInt(id)
        );
        setItems(collectionItems);
        setCollectionName(getCollectionName(parseInt(id)));
      })
      .catch((error) => console.error("Error fetching products:", error));
  }, [id]);

  const getCollectionName = (collectionId) => {
    const collections = [
      "Summer Breeze",
      "Autumn Whispers",
      "Winter Frost",
      "Spring Bloom",
      "Travel Desire",
    ];
    return collections[collectionId] || "Unknown Collection";
  };

  return (
    <div className="min-h-screen bg-purple-50 flex flex-col">
      <main className="flex-grow container mx-auto py-8 px-4">
        <Link
          to="/collections"
          className="text-purple-600 hover:text-purple-800 mb-4 inline-block"
        >
          &larr; Back to Collections
        </Link>
        <h2 className="text-3xl font-bold text-purple-800 mb-6">
          {collectionName} Collection
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {items.map((item) => (
            <div
              key={item._id}
              className="bg-white rounded-lg shadow-md overflow-hidden"
            >
              <img
                src={item.images[0]}
                alt={item.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-xl font-semibold text-purple-700 mb-2">
                  {item.name}
                </h3>
                <p className="text-purple-600 mb-2">${item.price.toFixed(2)}</p>
                <p className="text-sm text-gray-600 mb-4">
                  {item.description.substring(0, 100)}...
                </p>
                <button className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600 transition duration-300">
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default CollectionItems;
