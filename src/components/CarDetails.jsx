// src/pages/CarDetails.jsx
import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { products } from "../data/cars";

const CarDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const car = products.find((c) => c.id === parseInt(id));

  if (!car) {
    return <p className="text-center text-red-500 mt-10">Car not found.</p>;
  }

  // simple deterministic fake details generator so each car looks unique
  const year = 2016 + (car.id % 8); // e.g. 2016-2023
  const seats =
  car.name.toLowerCase().includes("innova") ||
  car.name.toLowerCase().includes("bolero") ||
  car.name.toLowerCase().includes("alphard") ||
  car.name.toLowerCase().includes("hycross") ||
  car.name.toLowerCase().includes("xuv 700") ||
  car.name.toLowerCase().includes("scorpio")
    ? 7
    : 5;
  const fuel = car.model === "Mahindra" ? "Diesel" : "Petrol";
  const transmission = car.id % 2 === 0 ? "Automatic" : "Manual";
  const mileage = Math.floor(12 + (car.id % 8)); // 12 - 19 kmpl
  const features = [
    "Air Conditioning",
    "ABS",
    "Airbags",
    "Bluetooth Audio",
    "Reverse Camera",
    "Cruise Control",
  ].slice(0, 4 + (car.id % 3)); // choose 4-6 features depending on id

  // hourly rate logic (same as in CarItem)
  let pricePerHour;
  if (car.price <= 900) pricePerHour = 99;
  else if (car.price <= 1100) pricePerHour = 129;
  else if (car.price <= 1300) pricePerHour = 149;
  else if (car.price <= 1500) pricePerHour = 179;
  else pricePerHour = 199;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <button onClick={() => navigate(-1)} className="mb-4 bg-blue-800 text-white hover:bg-blue-500 hover:text-black px-4 py-2 rounded-lg">
        Back
      </button>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden md:flex">
        <img src={car.image} alt={car.name} className="w-full md:w-1/2 h-64 object-cover" />

        <div className="p-6 md:w-1/2">
          <h2 className="text-3xl font-bold text-blue-800">{car.name}</h2>
          <p className="text-gray-600 mt-1">Model: {car.model} • {year}</p>

          <div className="mt-4">
            <p className="text-lg font-semibold">Price: ₹{car.price} /day</p>
            <p className="text-sm text-gray-600 mt-1">Hourly: ₹{pricePerHour} /hour</p>
            <p className={`mt-2 font-semibold ${car.availability ? "text-green-600" : "text-red-600"}`}>
              {car.availability ? "✅ Available" : "❌ Not Available"}
            </p>
          </div>

          <div className="mt-4 text-gray-700">
            <p><strong>Seats:</strong> {seats}</p>
            <p><strong>Fuel:</strong> {fuel}</p>
            <p><strong>Transmission:</strong> {transmission}</p>
            <p><strong>Mileage:</strong> {mileage} kmpl</p>
          </div>

          <div className="mt-4">
            <strong>Features:</strong>
            <ul className="list-disc list-inside mt-2 text-gray-700">
              {features.map((f, i) => <li key={i}>{f}</li>)}
            </ul>
          </div>

          <p className="mt-4 text-gray-600">
            {`A comfortable ${car.model} ideal for city rides and weekend trips. This ${car.name} offers a smooth driving experience, reliable performance and modern features for a pleasant journey.`}
          </p>

          <div className="mt-5">
            <button
              disabled={!car.availability}
              className={`px-6 py-3 rounded-lg ${
                car.availability ? "bg-purple-800 hover:bg-purple-600 text-white" : "bg-gray-400 text-gray-700 cursor-not-allowed"
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
