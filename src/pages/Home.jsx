import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "../Components/Header";
import Banner from "../Components/Banner";
import ProductGrid from "../Components/ProductGrid";
import Footer from "../Components/Footer";

const Home = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/products")
      .then((response) => setProducts(response.data))
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

  return (
    <div className="fade-in">
      <Header />
      <Banner />
      <ProductGrid products={products} />
      <Footer />
    </div>
  );
};

export default Home;
