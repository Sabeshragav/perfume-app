import React from "react";

const Logo = ({ className = "" }) => {
  return (
    <svg
      className={`w-10 h-10 ${className}`}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="20" cy="20" r="20" fill="#8B5CF6" />

      {/* Bottle body */}
      <path
        d="M15 18C15 16.3431 16.3431 15 18 15H22C23.6569 15 25 16.3431 25 18V30C25 31.1046 24.1046 32 23 32H17C15.8954 32 15 31.1046 15 30V18Z"
        fill="white"
      />

      {/* Bottle neck */}
      <path
        d="M18 15L19 11H21L22 15"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Spray nozzle */}
      <rect x="18" y="8" width="4" height="3" rx="1" fill="white" />

      {/* Decorative elements */}
      <path
        d="M18 22C18 20.3431 19.3431 19 21 19H22C23.6569 19 25 20.3431 25 22V30C25 31.1046 24.1046 32 23 32H20C18.8954 32 18 31.1046 18 30V22Z"
        fill="#8B5CF6"
        fillOpacity="0.3"
      />
      <path
        d="M15 24H25"
        stroke="#8B5CF6"
        strokeWidth="0.5"
        strokeLinecap="round"
      />
      <path
        d="M15 28H25"
        stroke="#8B5CF6"
        strokeWidth="0.5"
        strokeLinecap="round"
      />
    </svg>
  );
};

export default Logo;
