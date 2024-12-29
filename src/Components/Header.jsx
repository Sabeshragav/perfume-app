import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <header className="bg-gradient-to-r from-purple-800 to-purple-600 shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0">
              <img className="h-10 w-auto" src="/logo.svg" alt="Perfume Shop" />
            </Link>
            <nav className="hidden md:block ml-10">
              <ul className="flex items-baseline space-x-4">
                <NavLink to="/">Home</NavLink>
                <NavLink to="/collections">Collections</NavLink>
                <NavLink to="/about">About Us</NavLink>
                <NavLink to="/contact">Contact</NavLink>
              </ul>
            </nav>
          </div>
          <div className="hidden md:flex items-center">
            <SearchBar />
            <CartIcon />
          </div>
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-white hover:text-purple-200 focus:outline-none focus:ring-2 focus:ring-white"
            >
              {isMenuOpen ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>
      {isMenuOpen && <MobileMenu />}
    </header>
  );
};

const NavLink = ({ to, children }) => (
  <li>
    <Link
      to={to}
      className="text-white hover:bg-purple-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors"
    >
      {children}
    </Link>
  </li>
);

const SearchBar = () => (
  <div className="relative">
    <input
      type="text"
      placeholder="Search..."
      className="bg-purple-700 text-white placeholder-purple-300 rounded-full py-1 px-4 pr-10 focus:outline-none focus:ring-2 focus:ring-white"
    />
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 absolute right-3 top-1/2 transform -translate-y-1/2 text-purple-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    </svg>
  </div>
);

const CartIcon = () => (
  <Link to="/cart" className="ml-4 text-white hover:text-purple-200 transition-colors">
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
    </svg>
  </Link>
);

const MobileMenu = () => (
  <div className="md:hidden">
    <nav className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
      <MobileNavLink to="/">Home</MobileNavLink>
      <MobileNavLink to="/collections">Collections</MobileNavLink>
      <MobileNavLink to="/about">About Us</MobileNavLink>
      <MobileNavLink to="/contact">Contact</MobileNavLink>
    </nav>
    <div className="px-4 py-3">
      <SearchBar />
      <Link to="/cart" className="mt-4 flex items-center text-white hover:text-purple-200 transition-colors">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
        </svg>
        <span>Cart</span>
      </Link>
    </div>
  </div>
);

const MobileNavLink = ({ to, children }) => (
  <Link
    to={to}
    className="text-white hover:bg-purple-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium transition-colors"
  >
    {children}
  </Link>
);

export default Header;

