/* eslint-disable */
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../features/cart/cartSlice";

const CarItem = ({ car, userRole = "customer", onRemove, onEdit }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [isEditing, setIsEditing] = useState(false);
  const [editedCar, setEditedCar] = useState({ ...car });

  const getPricePerHour = (price) => {
    if (price <= 900) return 99;
    else if (price <= 1100) return 129;
    else if (price <= 1300) return 149;
    else if (price <= 1500) return 179;
    else return 199;
  };

  const pricePerHour = getPricePerHour(editedCar.price);

  const handleCardClick = () => {
    if (userRole !== "agency" && !isEditing) {
      navigate(`/cars/${car.id}`);
    }
  };

  const handleAddToCart = (e) => {
    e.stopPropagation();
    if (!editedCar.availability) return;

    dispatch(
      addToCart({
        id: editedCar.id,
        name: editedCar.name,
        model: editedCar.model,
        fuel: editedCar.fuel || "Petrol",
        price: editedCar.price,
        pricePerDay: editedCar.price,
        pricePerHour: pricePerHour,
        image: editedCar.image || "/car-placeholder.png",
      })
    );
  };

  const handleEditToggle = (e) => {
    e.stopPropagation();
    setIsEditing(!isEditing);
  };

  const handleRemove = (e) => {
    e.stopPropagation();
    if (window.confirm(`Are you sure you want to remove ${car.name}?`)) {
      onRemove(car.id);
    }
  };

  const handleSave = (e) => {
    e.stopPropagation();
    setIsEditing(false);
    onEdit(editedCar);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setEditedCar({
      ...editedCar,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  return (
    <div
      onClick={handleCardClick}
      className={`cursor-pointer rounded-xl overflow-hidden transition-transform transform hover:scale-105 ${
        editedCar.availability
          ? "bg-white shadow-md dark:bg-gray-800"
          : "bg-gray-200 dark:bg-gray-700 opacity-80"
      }`}
    >
      <img
        src={editedCar.image}
        alt={editedCar.name}
        className="w-full h-48 object-cover"
        onError={(e) => (e.target.style.display = "none")}
      />

      <div className="p-4 bg-transparent">
        {isEditing ? (
          <>
            {/* Editable fields */}
            <input
              name="name"
              value={editedCar.name}
              onChange={handleChange}
              className="w-full mb-2 p-2 border text-black rounded dark:bg-gray-700 dark:text-white"
              placeholder="Car Name"
            />
            <input
              name="model"
              value={editedCar.model}
              onChange={handleChange}
              className="w-full mb-2 p-2 text-black border rounded dark:bg-gray-700 dark:text-white"
              placeholder="Model"
            />
            <input
              name="fuel"
              value={editedCar.fuel}
              onChange={handleChange}
              className="w-full mb-2 p-2 text-black border rounded dark:bg-gray-700 dark:text-white"
              placeholder="Fuel Type"
            />
            <input
              name="year"
              value={editedCar.year}
              onChange={handleChange}
              className="w-full mb-2 p-2  text-black border rounded dark:bg-gray-700 dark:text-white"
              placeholder="Year"
            />
            <input
              name="price"
              type="number"
              value={editedCar.price}
              onChange={handleChange}
              className="w-full mb-2 p-2 text-black border rounded dark:bg-gray-700 dark:text-white"
              placeholder="Price"
            />
            <input
              name="image"
              value={editedCar.image}
              onChange={handleChange}
              className="w-full mb-2 p-2 text-black border rounded dark:bg-gray-700 dark:text-white"
              placeholder="Image URL"
            />
            <label className="flex items-center gap-2 mt-2">
              <input
                type="checkbox"
                name="availability"
                checked={editedCar.availability}
                onChange={handleChange}
              />
              <span className="text-gray-800 dark:text-gray-200">
                Available
              </span>
            </label>

            <div className="flex gap-2 mt-4">
              <button
                onClick={handleSave}
                className="flex-1 py-2 rounded-lg bg-green-600 hover:bg-green-500 text-white transition font-medium"
              >
                💾 Save
              </button>
              <button
                onClick={handleEditToggle}
                className="flex-1 py-2 rounded-lg bg-gray-500 hover:bg-gray-400 text-white transition font-medium"
              >
                ✖ Cancel
              </button>
            </div>
          </>
        ) : (
          <>
            {/* Display mode */}
            <h3 className="text-xl  text-black font-semibold text-purple-800 dark:text-purple-300">
              {editedCar.name}
            </h3>
            <p className="text-black dark:text-gray-200 text-sm mt-1">
              Model: {editedCar.model}
            </p>
            <p className="text-black dark:text-gray-300 text-sm">
              Fuel: {editedCar.fuel || "Petrol"} | Year: {editedCar.year}
            </p>

            <div className="mt-3">
              <p className="text-black dark:text-gray-200 font-medium">
                ₹{editedCar.price}
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  /day
                </span>
              </p>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                ₹{pricePerHour}
                <span className="text-xs text-gray-400 dark:text-gray-500">
                  /hour
                </span>
              </p>
            </div>

            <p
              className={`mt-3 font-semibold ${
                editedCar.availability ? "text-green-600" : "text-red-600"
              }`}
            >
              {editedCar.availability ? "Available" : "Not Available"}
            </p>

            {userRole?.toLowerCase() === "agency" ? (
              <div className="flex gap-2 mt-4">
                <button
                  onClick={handleEditToggle}
                  className="flex-1 py-2 rounded-lg bg-gradient-to-r from-purple-600 to-cyan-500 hover:opacity-90 text-black transition font-medium"
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
                onClick={handleAddToCart}
                disabled={!editedCar.availability}
                className={`mt-4 w-full py-2 rounded-lg transition font-medium ${
                  editedCar.availability
                    ? "bg-purple-800 hover:bg-purple-700 text-white"
                    : "bg-gray-400 text-gray-700 cursor-not-allowed"
                }`}
              >
                {editedCar.availability ? "Add To Cart" : "Unavailable"}
              </button>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default CarItem;
