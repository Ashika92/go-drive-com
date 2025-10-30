import React from "react";

export default function AgencyDashboard() {
  const handleAddCar = () => {
    alert("Add New Car feature coming soon!");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-purple-100 to-cyan-100 dark:from-gray-900 dark:to-gray-800 transition-all duration-300 text-gray-800 dark:text-white">
      <h1 className="text-3xl font-bold mb-8 text-center text-black dark:text-white">
        🚗 Agency Dashboard
      </h1>

      <button
        onClick={handleAddCar}
        className="bg-gradient-to-r from-purple-500 to-cyan-400 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:scale-105 transition-transform duration-300"
      >
        + Add New Car
      </button>
    </div>
  );
}
