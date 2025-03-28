import React, { useState } from "react";
import PropTypes from "prop-types";

const FlipCard = ({ frontContent, backContent, className = "", onClick }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
    if (onClick) onClick();
  };

  return (
    <div
      className={`relative w-[300px] h-[400px] cursor-pointer [perspective:1000px] ${className}`}
      onClick={handleFlip}
    >
      <div
        className={`relative w-full h-full transition-transform duration-500 [transform-style:preserve-3d] ${isFlipped ? "[transform:rotateY(180deg)]" : ""
          }`}
      >
        <div className="absolute w-full h-full [backface-visibility:hidden]">
          {frontContent}
        </div>
        <div className="absolute w-full h-full [backface-visibility:hidden] [transform:rotateY(180deg)]">
          {backContent}
        </div>
      </div>
    </div>
  );
};


FlipCard.propTypes = {
  frontContent: PropTypes.node.isRequired,
  backContent: PropTypes.node.isRequired,
  className: PropTypes.string,
  onClick: PropTypes.func,
};


export default function Card({ addToCart }) {
  return (
    <div className="p-8 bg-slate-100 flex justify-center items-center min-h-screen">
      <FlipCard
        frontContent={
          <div className="w-full h-full bg-white rounded-lg shadow-lg p-4 flex flex-col items-center justify-center">
            <img
              src="https://images.unsplash.com/photo-1542291026-7eec264c27ff"
              alt="Product"
              className="w-48 h-48 object-contain mb-4"
            />
            <h2 className="text-xl font-bold">Nike Shoes</h2>
            <p className="text-gray-600">$199.99</p>
          </div>
        }
        backContent={
          <div className="w-full h-full bg-white rounded-lg shadow-lg p-4 flex flex-col items-center justify-center">
            <h3 className="text-lg font-semibold mb-2">Product Details</h3>
            <p className="text-gray-600 text-center mb-4">
              Premium comfort with innovative design. Perfect for both casual wear and sports activities.
            </p>
            <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
              onClick={() => addToCart()}>
              Add to Cart
            </button>
          </div>
        }
      />
    </div>
  );
}