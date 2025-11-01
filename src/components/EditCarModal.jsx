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
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 w-[90%] max-w-md shadow-lg">
        <h2 className="text-xl font-bold mb-4 text-purple-700 dark:text-purple-300">
          Edit Car Details
        </h2>

        <div className="space-y-3">
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Car Name"
            className="w-full px-3 py-2 rounded-md border dark:bg-gray-700 dark:text-white"
          />
          <input
            type="text"
            name="model"
            value={formData.model}
            onChange={handleChange}
            placeholder="Car Model"
            className="w-full px-3 py-2 rounded-md border dark:bg-gray-700 dark:text-white"
          />
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            placeholder="Price"
            className="w-full px-3 py-2 rounded-md border dark:bg-gray-700 dark:text-white"
          />
          <input
            type="text"
            name="fuel"
            value={formData.fuel}
            onChange={handleChange}
            placeholder="Fuel Type"
            className="w-full px-3 py-2 rounded-md border dark:bg-gray-700 dark:text-white"
          />
        </div>

        <div className="flex justify-end gap-3 mt-5">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-400 hover:bg-gray-500 rounded-lg text-white"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-gradient-to-r from-purple-600 to-cyan-500 hover:opacity-90 rounded-lg text-white"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditCarModal;
