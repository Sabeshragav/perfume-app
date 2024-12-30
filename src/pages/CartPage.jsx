import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Trash2, Plus, Minus } from 'lucide-react';
import { CartContext } from '../context/CartContext';
import Footer from '../Components/Footer';

const CartPage = () => {
  const { cartItems, removeFromCart, updateQuantity } = useContext(CartContext);
  const [total, setTotal] = useState(0);

  // Calculate total price whenever cartItems change
  useEffect(() => {
    const newTotal = cartItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    setTotal(newTotal);
  }, [cartItems]);

  // Handle quantity change
  const handleQuantityChange = (_id, change) => {
    updateQuantity(_id, change);
  };

  // Handle item removal
  const handleRemoveItem = (_id) => {
    removeFromCart(_id);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <main className="container mx-auto py-10 px-4 flex-grow">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Your Cart</h1>
        {cartItems.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              {cartItems.map((item) => (
                <motion.div
                  key={item._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="bg-white p-6 rounded-lg shadow-md mb-4 flex items-center"
                >
                  <img
                    src={item.images[0]}
                    alt={item.name}
                    className="w-20 h-20 object-cover rounded-md mr-4"
                  />
                  <div className="flex-grow">
                    <h2 className="text-lg font-semibold text-gray-800">
                      {item.name}
                    </h2>
                    <p className="text-purple-600 font-bold">
                      ₹{item.price.toFixed(2)}
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => handleQuantityChange(item._id, -1)}
                      className="p-1 rounded-full bg-gray-200 text-gray-600 hover:bg-gray-300"
                    >
                      <Minus size={16} />
                    </button>
                    <span className="font-semibold">{item.quantity}</span>
                    <button
                      onClick={() => handleQuantityChange(item._id, 1)}
                      className="p-1 rounded-full bg-gray-200 text-gray-600 hover:bg-gray-300"
                    >
                      <Plus size={16} />
                    </button>
                  </div>
                  <button
                    onClick={() => handleRemoveItem(item._id)}
                    className="ml-4 p-2 text-red-500 hover:text-red-700"
                  >
                    <Trash2 size={20} />
                  </button>
                </motion.div>
              ))}
            </div>
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white p-6 rounded-lg shadow-md"
              >
                <h2 className="text-xl font-bold text-gray-800 mb-4">
                  Order Summary
                </h2>
                <div className="space-y-4">
                  {cartItems.map((item) => (
                    <div
                      key={item._id}
                      className="flex justify-between mb-2 border-b pb-2"
                    >
                      <span>{item.name} ({item.quantity})</span>
                      <span>₹{(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                </div>
                <div className="flex justify-between mb-2">
                  <span>Shipping:</span>
                  <span>₹5.99</span>
                </div>
                <div className="flex justify-between font-bold text-lg mt-4">
                  <span>Total:</span>
                  <span>₹{(total + 5.99).toFixed(2)}</span>
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full bg-purple-600 text-white py-3 rounded-full mt-6 hover:bg-purple-700 transition-colors"
                >
                  Proceed to Checkout
                </motion.button>
              </motion.div>
            </div>
          </div>
        ) : (
          <div className="text-center">
            <p className="text-xl text-gray-600 mb-4">Your cart is empty</p>
            <Link
              to="/"
              className="inline-block bg-purple-600 text-white px-6 py-3 rounded-full hover:bg-purple-700 transition-colors"
            >
              Continue Shopping
            </Link>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default CartPage;
