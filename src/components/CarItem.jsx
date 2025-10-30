// src/components/CarItem.jsx
import React from "react";
import { useNavigate } from "react-router-dom";

const CarItem = ({ car }) => {
  const navigate = useNavigate();

  // Hourly price logic (your ranges)
  let pricePerHour;
  if (car.price <= 900) pricePerHour = 99;
  else if (car.price <= 1100) pricePerHour = 129;
  else if (car.price <= 1300) pricePerHour = 149;
  else if (car.price <= 1500) pricePerHour = 179;
  else pricePerHour = 199;

  const handleCardClick = () => {
    navigate(`/cars/${car.id}`);
  };

  const handleButtonClick = (e) => {
    // Prevent the card onClick from firing
    e.stopPropagation();
    // TODO: add rent / add-to-cart behavior here
    if (!car.availability) return;
    alert(`${car.name} added to cart (demo)`); // temporary demo behavior
  };

  return (
    <div
      onClick={handleCardClick}
      className={`cursor-pointer rounded-xl overflow-hidden transition-transform transform hover:scale-105
        ${car.availability ? "bg-white shadow-md" : "bg-gray-100 dark:bg-gray-700 opacity-80"}`}
    >
      <img src={car.image} alt={car.name} className="w-full h-48 object-cover" />

      <div className="p-4">
        <h3 className="text-xl font-semibold text-blue-800">{car.name}</h3>
        <p className="text-gray-500">Model: {car.model}</p>

        <div className="mt-2">
          <p className="text-gray-700 font-medium">
            ₹{car.price} <span className="text-sm text-gray-500">/day</span>
          </p>
          <p className="text-gray-600 text-sm">
            ₹{pricePerHour} <span className="text-xs text-gray-400">/hour</span>
          </p>
        </div>

        <p className={`mt-3 font-semibold ${car.availability ? "text-green-600" : "text-red-600"}`}>
          {car.availability ? "Available" : "Not Available"}
        </p>

        <button
          onClick={handleButtonClick}
          disabled={!car.availability}
          className={`mt-3 w-full py-2 rounded-lg transition ${
            car.availability ? "bg-purple-800 hover:bg-purple-600 text-white" : "bg-gray-400 text-gray-700 cursor-not-allowed"
          }`}
        >
          {car.availability ? "Add To Cart" : "Unavailable"}
        </button>
      </div>
    </div>
  );
};

export default CarItem;
