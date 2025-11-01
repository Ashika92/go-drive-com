import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../features/cart/cartSlice";
import EditCarModal from "./EditCarModal"; // ✅ import the modal

const CarItem = ({ car, userType = "customer" }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isEditOpen, setIsEditOpen] = useState(false); // ✅ modal control

  const getPricePerHour = (price) => {
    if (price <= 900) return 99;
    else if (price <= 1100) return 129;
    else if (price <= 1300) return 149;
    else if (price <= 1500) return 179;
    else return 199;
  };

  const pricePerHour = getPricePerHour(car.price);

  const handleCardClick = () => {
    if (userType !== "agency") {
      navigate(`/cars/${car.id}`);
    }
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

  const handleEdit = (e) => {
    e.stopPropagation();
    setIsEditOpen(true); // ✅ open the modal instead of navigating
  };

  const handleRemove = (e) => {
    e.stopPropagation();
    alert(`Removed car: ${car.name}`);
  };

  return (
    <>
      <div
        onClick={handleCardClick}
        className={`cursor-pointer rounded-xl overflow-hidden transition-transform transform hover:scale-105
          ${
            car.availability
              ? "bg-white shadow-md dark:bg-gray-800"
              : "bg-gray-200 dark:bg-gray-700 opacity-80"
          }`}
      >
        <img
          src={car.image}
          alt={car.name}
          className="w-full h-48 object-cover"
          onError={(e) => (e.target.style.display = "none")}
        />

        <div className="p-4 bg-transparent">
          <h3 className="text-xl font-semibold text-purple-800 dark:text-purple-300">
            {car.name}
          </h3>

          <p className="text-gray-700 dark:text-gray-200 text-sm mt-1">
            Model: {car.model}
          </p>

          <div className="mt-3">
            <p className="text-gray-700 dark:text-gray-200 font-medium">
              ₹{car.price}{" "}
              <span className="text-sm text-gray-500 dark:text-gray-400">
                /day
              </span>
            </p>
            <p className="text-gray-600 dark:text-gray-300 text-sm">
              ₹{pricePerHour}{" "}
              <span className="text-xs text-gray-400 dark:text-gray-500">
                /hour
              </span>
            </p>
          </div>

          <p
            className={`mt-3 font-semibold ${
              car.availability ? "text-green-600" : "text-red-600"
            }`}
          >
            {car.availability ? "Available" : "Not Available"}
          </p>

          {/* ✅ Conditionally show buttons based on userType */}
          {userType?.toLowerCase() === "agency" ? (
            <div className="flex gap-2 mt-4">
              <button
                onClick={handleEdit}
                className="flex-1 py-2 rounded-lg bg-gradient-to-r from-purple-600 to-cyan-500 hover:opacity-90 text-white transition font-medium"
              >
                ✏️ Edit
              </button>
              <button
                onClick={handleRemove}
                className="flex-1 py-2 rounded-lg bg-red-700 hover:bg-red-600 text-white transition font-medium"
              >
                🗑 Remove
              </button>
            </div>
          ) : (
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
          )}
        </div>
      </div>

      {/* ✅ Show edit modal if open */}
      {isEditOpen && (
        <EditCarModal
          car={car}
          onClose={() => setIsEditOpen(false)}
        />
      )}
    </>
  );
};

export default CarItem;
