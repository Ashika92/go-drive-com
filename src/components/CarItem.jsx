import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../features/cart/cartSlice";

const CarItem = ({ car }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Function to calculate price per hour
  const getPricePerHour = (price) => {
    if (price <= 900) return 99;
    else if (price <= 1100) return 129;
    else if (price <= 1300) return 149;
    else if (price <= 1500) return 179;
    else return 199;
  };

  const pricePerHour = getPricePerHour(car.price);

  const handleCardClick = () => {
    navigate(`/cars/${car.id}`);
  };

  const handleButtonClick = (e) => {
    e.stopPropagation();
    if (!car.availability) return;

    dispatch(
      addToCart({
        id: car.id,
        name: car.name,
        model: car.model,
        fuel: car.fuel || "Petrol",
        price: car.price,
        pricePerDay: car.price,
        pricePerHour: pricePerHour,
        image: car.image || "/car-placeholder.png",
      })
    );
  };

  return (
    <div
      onClick={handleCardClick}
      className={`cursor-pointer rounded-xl overflow-hidden transition-transform transform hover:scale-105
        ${
          car.availability
            ? "bg-white shadow-md dark:bg-gray-800"
            : "bg-gray-200 dark:bg-gray-700 opacity-80"
        }`}
    >
      {/* ✅ Car Image */}
      <img
        src={car.image}
        alt={car.name}
        className="w-full h-48 object-cover"
        onError={(e) => (e.target.style.display = "none")}
      />

      {/* ✅ Content Section */}
      <div className="p-4 bg-transparent">
        <h3 className="text-xl font-semibold text-purple-800 dark:text-purple-300">
          {car.name}
        </h3>

        <p
          className="text-gray-700 dark:text-gray-200 text-sm mt-1"
          style={{ backgroundColor: "transparent" }}
        >
          Model: {car.model}
        </p>

        {/* ✅ Pricing Details */}
        <div className="mt-3">
          <p className="text-gray-700 dark:text-gray-200 font-medium">
            ₹{car.price}{" "}
            <span className="text-sm text-gray-500 dark:text-gray-400">/day</span>
          </p>
          <p className="text-gray-600 dark:text-gray-300 text-sm">
            ₹{pricePerHour}{" "}
            <span className="text-xs text-gray-400 dark:text-gray-500">/hour</span>
          </p>
        </div>

        {/* ✅ Availability */}
        <p
          className={`mt-3 font-semibold ${
            car.availability ? "text-green-600" : "text-red-600"
          }`}
        >
          {car.availability ? "Available" : "Not Available"}
        </p>

        {/* ✅ Add to Cart Button */}
        <button
          onClick={handleButtonClick}
          disabled={!car.availability}
          className={`mt-4 w-full py-2 rounded-lg transition font-medium ${
            car.availability
              ? "bg-purple-800 hover:bg-purple-700 text-white"
              : "bg-gray-400 text-gray-700 cursor-not-allowed"
          }`}
        >
          {car.availability ? "Add To Cart" : "Unavailable"}
        </button>
      </div>
    </div>
  );
};

export default CarItem;
