import React from "react";

// Array of brand names
const brands = [
  "Chanel", "Dior", "Gucci", "Tom Ford", "Yves Saint Laurent", 
  "Armani", "Versace", "Burberry", "Viktor & Rolf", "Prada"
];

// Array of font classes corresponding to each brand
const fontStyles = [
  'brand1', 'brand2', 'brand3', 'brand4', 'brand5',
  'brand6', 'brand7', 'brand8', 'brand9', 'brand10'
];

const Banner = () => (
  <section className="bg-gradient-to-r from-purple-400 to-pink-500 text-white py-20 text-center relative">
    <h2 className="text-4xl font-bold mb-4 banner-title">Discover Our Exclusive Perfume Collection</h2>
    <button className="bg-white text-purple-700 px-6 py-2 rounded-full shadow-md hover:bg-purple-700 hover:text-white banner-button">
      Shop Now
    </button>
    
    <div className="brand-names-container">
      <div className="brand-names">
        {brands.map((brand, index) => (
          <span key={index} className={`${fontStyles[index % fontStyles.length]} mr-6`}>
            {brand}
          </span>
        ))}
      </div>
    </div>
  </section>
);

export default Banner;
