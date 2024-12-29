import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function App() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/products")
      .then((response) => setProducts(response.data))
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

  return (
    <div>
      <header className="navbar">
        <h1>Perfume Shop</h1>
        <nav>
          <a href="#">Home</a>
          <a href="#">Collections</a>
          <a href="#">About Us</a>
          <a href="#">Contact</a>
        </nav>
      </header>

      <section className="banner">
        <h2>Discover Our Exclusive Perfume Collection</h2>
        <button>Shop Now</button>
      </section>

      <div className="product-grid">
        {products.map((product) => (
          <Link
            to={`/product/${product._id}`}
            key={product._id}
            className="product-card"
          >
            <img src={product.image} alt={product.name} />
            <h3>{product.name}</h3>
            <p>{product.description}</p>
            <p>${product.price}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default App;
