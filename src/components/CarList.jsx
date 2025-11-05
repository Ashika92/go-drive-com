// src/components/CarList.jsx
import React, { useState } from "react";
import CarItem from "./CarItem";
import Filter from "./Filter";
import { products } from "../data/cars"; 

const CarList = ({ userRole = "customer" }) => {
  const [cars, setCars] = useState(products);
  const [filters, setFilters] = useState({
    name: "",
    model: "",
    priceRange: null,
  });

  const handleRemoveCar = (id) => {
    setCars((prev) => prev.filter((car) => car.id !== id));
  };

  const handleEditCar = (updatedCar) => {
    setCars((prev) =>
      prev.map((car) => (car.id === updatedCar.id ? updatedCar : car))
    );
  };

  const filteredCars = cars.filter((car) => {
    const nameMatch = car.name.toLowerCase().includes(filters.name.toLowerCase());
    const modelMatch = filters.model ? car.model === filters.model : true;
    const priceMatch =
      filters.priceRange && filters.priceRange.min !== undefined
        ? car.price >= filters.priceRange.min &&
          car.price <= filters.priceRange.max
        : true;
    return nameMatch && modelMatch && priceMatch;
  });

  return (
    <div className="max-w-7xl mx-auto p-6 min-h-screen bg-transparent">
      <h2 className="text-3xl font-bold text-center mb-6 text-purple-800 dark:text-purple-300">
        {userRole === "agency" ? "MANAGE YOUR CARS" : "EXPLORE OUR CARS"}
      </h2>

      <Filter filters={filters} setFilters={setFilters} />

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-6">
        {filteredCars.map((car) => (
          <CarItem
            key={car.id}
            car={car}
            userRole={userRole}
            onRemove={handleRemoveCar}
            onEdit={handleEditCar}
          />
        ))}
      </div>

      {filteredCars.length === 0 && (
        <p className="text-center text-gray-500 dark:text-gray-400 mt-6">
          No cars match your filters.
        </p>
      )}
    </div>
  );
};

export default CarList;
