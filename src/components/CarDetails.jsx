// src/pages/CarDetails.jsx
import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { products } from "../data/cars";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../features/cart/cartSlice";
import { removeFromWishlist } from "../features/wishlist/wishlistSlice";
import toast from "react-hot-toast";


const CarDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // 🧠 Try to find car from main product list first
  let car = products.find((c) => c.id === parseInt(id));

  // 🧩 If not found, check Redux (cart/wishlist items)
  const cartItems = useSelector((state) => state.cart.items);
  const wishlistItems = useSelector((state) => state.wishlist.items);
  if (!car) {
    car =
      cartItems.find((c) => c.id === parseInt(id)) ||
      wishlistItems.find((c) => c.id === parseInt(id));
  }

  // 🧾 If still not found, show error
  if (!car) {
    return (
      <p className="text-center text-red-500 mt-10">
        Car not found or removed from data.
      </p>
    );
  }

  // Simple fake details generator
  const year = 2016 + (car.id % 8);
  const seats =
    car.name.toLowerCase().includes("innova") ||
    car.name.toLowerCase().includes("bolero") ||
    car.name.toLowerCase().includes("alphard") ||
    car.name.toLowerCase().includes("hycross") ||
    car.name.toLowerCase().includes("xuv 700") ||
    car.name.toLowerCase().includes("scorpio")
      ? 7
      : 5;

  const fuel = car.fuel || (car.model === "Mahindra" ? "Diesel" : "Petrol");
  const transmission = car.id % 2 === 0 ? "Automatic" : "Manual";
  const mileage = Math.floor(12 + (car.id % 8));

  const features = [
    "Air Conditioning",
    "ABS",
    "Airbags",
    "Bluetooth Audio",
    "Reverse Camera",
    "Cruise Control",
  ].slice(0, 4 + (car.id % 3));

  // hourly rate logic
  let pricePerHour;
  if (car.price <= 900) pricePerHour = 99;
  else if (car.price <= 1100) pricePerHour = 129;
  else if (car.price <= 1300) pricePerHour = 149;
  else if (car.price <= 1500) pricePerHour = 179;
  else pricePerHour = 199;

  // 🛒 Add to Cart handler
  // 🛒 Add to Cart handler
const handleAddToCart = () => {
  dispatch(
    addToCart({
      id: car.id,
      name: car.name,
      price: car.price,
      image: car.image,
      fuel: fuel,
      pricePerHour: pricePerHour,
      pricePerDay: car.price,
    })
  );

  // ✅ If this car exists in wishlist, remove it automatically
  const isInWishlist = wishlistItems.some((item) => item.id === car.id);
  if (isInWishlist) {
    dispatch(removeFromWishlist(car.id));
  }

  toast.success(`${car.name} added to Cart 🛒`);
};


  return (
    <div className="max-w-4xl mx-auto p-6">
      <button
        onClick={() => navigate(-1)}
        className="mb-4 bg-blue-800 text-white hover:bg-blue-500 hover:text-black px-4 py-2 rounded-lg"
      >
        Back
      </button>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden md:flex">
        <img
          src={car.image}
          alt={car.name}
          className="w-full md:w-1/2 h-64 object-cover"
        />

        <div className="p-6 md:w-1/2">
          <h2 className="text-3xl font-bold text-blue-800 dark:text-blue-300">
            {car.name}
          </h2>

          <p className="text-gray-600 dark:text-gray-300 mt-1">
            Model: {car.model || "N/A"} • {year}
          </p>

          <div className="mt-4">
            <p className="text-lg font-semibold text-gray-800 dark:text-gray-100">
              Price: ₹{car.price} /day
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
              Hourly: ₹{pricePerHour} /hour
            </p>
            <p
              className={`mt-2 font-semibold ${
                car.availability ? "text-green-600" : "text-red-600"
              }`}
            >
              {car.availability ? "✅ Available" : "❌ Not Available"}
            </p>
          </div>

          <div className="mt-4 text-gray-800 dark:text-gray-100 space-y-1">
            <p>
              <strong className="text-gray-900 dark:text-white">Seats:</strong>{" "}
              <span className="text-gray-700 dark:text-gray-200">{seats}</span>
            </p>
            <p>
              <strong className="text-gray-900 dark:text-white">Fuel:</strong>{" "}
              <span className="text-gray-700 dark:text-gray-200">{fuel}</span>
            </p>
            <p>
              <strong className="text-gray-900 dark:text-white">
                Transmission:
              </strong>{" "}
              <span className="text-gray-700 dark:text-gray-200">
                {transmission}
              </span>
            </p>
            <p>
              <strong className="text-gray-900 dark:text-white">Mileage:</strong>{" "}
              <span className="text-gray-700 dark:text-gray-200">
                {mileage} kmpl
              </span>
            </p>
          </div>

          <div className="mt-4">
            <strong className="text-gray-800 dark:text-gray-200">Features:</strong>
            <ul className="list-disc list-inside mt-2 text-gray-700 dark:text-gray-300">
              {features.map((f, i) => (
                <li key={i}>{f}</li>
              ))}
            </ul>
          </div>

          <p className="mt-4 text-gray-600 dark:text-gray-300">
            {`A comfortable ${car.model || "car"} ideal for city rides and weekend trips. This ${car.name} offers a smooth driving experience, reliable performance and modern features for a pleasant journey.`}
          </p>

          <div className="mt-5">
            <button
              onClick={handleAddToCart}
              disabled={!car.availability}
              className={`px-6 py-3 rounded-lg transition font-medium ${
                car.availability
                  ? "bg-purple-800 hover:bg-purple-600 text-white"
                  : "bg-gray-400 text-gray-700 cursor-not-allowed"
              }`}
            >
              {car.availability ? "Add to Cart" : "Unavailable"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarDetails;
