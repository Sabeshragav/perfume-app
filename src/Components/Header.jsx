import React from "react";

const Header = () => (
  <header className="bg-purple-800 text-white p-4 shadow-lg">
    <div className="container mx-auto flex justify-between items-center">
      <h1 className="text-2xl font-bold">Perfume Shop</h1>
      <nav className="space-x-4">
        <a href="#" className="hover:text-gray-300">Home</a>
        <a href="#" className="hover:text-gray-300">Collections</a>
        <a href="#" className="hover:text-gray-300">About Us</a>
        <a href="#" className="hover:text-gray-300">Contact</a>
      </nav>
    </div>
  </header>
);

export default Header;