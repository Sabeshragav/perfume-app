import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Collections = () => {
  const [collections, setCollections] = useState([]);

  const collectionsData = [
    { id: 0, name: "Summer Breeze", image: "/assets/17.jpg" },
    { id: 1, name: "Autumn Whispers", image: "/assets/16.jpg" },
    { id: 2, name: "Winter Frost", image: "/assets/15.jpg" },
    { id: 3, name: "Spring Bloom", image: "/assets/14.jpg" },
    { id: 4, name: "Travel Desire", image: "/assets/13.jpg" },
  ];

  const processProducts = (products) => {
    const updatedCollections = collectionsData.map((collection) => {
      const collectionProducts = products.filter(
        (product) => product.collections === collection.id
      );
      return {
        ...collection,
        items: collectionProducts.length,
        products: collectionProducts,
      };
    });
    setCollections(
      updatedCollections.filter((collection) => collection.items > 0)
    );
  };

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_BASE_URL}/products`)
      .then((response) => {
        processProducts(response.data);
      })
      .catch((error) => console.error("Error fetching products:", error));
      // eslint-disable-next-line
  }, []);

  return (
    <div className="min-h-screen bg-purple-50 flex flex-col">
      <main className="flex-grow container mx-auto py-8 px-4">
        <h2 className="text-3xl font-bold text-purple-800 mb-6">
          Our Latest Collections
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {collections.map((collection) => (
            <div
              key={collection.id}
              className="bg-white rounded-lg shadow-md overflow-hidden transform transition-transform duration-300 hover:scale-105"
            >
              <Link to={`/collections/${collection.id}`}>
                <img
                  src={collection.image}
                  alt={`${collection.name} collection`}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-xl font-semibold text-purple-700 mb-2">
                    {collection.name}
                  </h3>
                  <p className="text-purple-600">{collection.items} items</p>
                  <div
                    to={`/collections/${collection.id}`}
                    className="mt-4 bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600 transition duration-300 inline-block"
                  >
                    View Collection
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Collections;
