import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "../Components/Header";
import Banner from "../Components/Banner";
import ProductGrid from "../Components/ProductGrid";


const Home = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/products")
      .then((response) => setProducts(response.data))
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

  return (
    <div>
      <Header />
      <Banner />
      <ProductGrid products={products} />
    </div>
  );
};

export default Home;