import React, { useState } from "react";

const EditCarModal = ({ car, onClose }) => {
  const [formData, setFormData] = useState({
    name: car.name,
    model: car.model,
    price: car.price,
    fuel: car.fuel,
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    alert(`Updated car: ${formData.name} (${formData.model})`);
    onClose();
  };

  return (
    
    <div className="fixed inset-0 bg-gray-900/60 dark:bg-black/70 flex items-center justify-center z-50 transition-colors duration-300">
      {/* Modal container */}
      <div className="w-[90%] max-w-md rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700
                      bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 p-6 transition-all duration-300">
        <h2 className="text-xl font-semibold mb-5 text-purple-700 dark:text-purple-300">
          Edit Car Details
        </h2>

        {/* Inputs */}
        <div className="space-y-4">
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Car Name"
            className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600
                       bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100
                       focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
          />
          <input
            type="text"
            name="model"
            value={formData.model}
            onChange={handleChange}
            placeholder="Car Model"
            className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600
                       bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100
                       focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
          />
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            placeholder="Price"
            className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600
                       bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100
                       focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
          />
          <input
            type="text"
            name="fuel"
            value={formData.fuel}
            onChange={handleChange}
            placeholder="Fuel Type"
            className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600
                       bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100
                       focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
          />
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-3 mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-gray-300 hover:bg-gray-400 text-gray-900
                       dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-100 transition"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 rounded-lg bg-gradient-to-r from-purple-600 to-cyan-500 
                       hover:opacity-90 text-white font-medium transition"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditCarModal;
