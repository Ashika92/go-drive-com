import React from "react";

const Filter = ({ filters, setFilters }) => {
  const handleChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleRangeChange = (e) => {
    const value = e.target.value;
    let min = 0, max = Infinity;

    if (value === "700-900") { min = 700; max = 900; }
    else if (value === "900-1100") { min = 900; max = 1100; }
    else if (value === "1100-1300") { min = 1100; max = 1300; }
    else if (value === "1300-1500") { min = 1300; max = 1500; }
    else if (value === "1500-2000") { min = 1500; max = 2000; }

    setFilters({ ...filters, priceRange: { min, max } });
  };

  return (
    <div className="p-4 rounded-xl shadow-md flex flex-col sm:flex-row gap-4 justify-between items-center
                    bg-gray-100 dark:bg-gray-800 transition-colors duration-300">
      
      {/* Search by name */}
      <input
        type="text"
        name="name"
        placeholder="Search by name..."
        value={filters.name}
        onChange={handleChange}
        className="p-2 border rounded-lg w-full sm:w-1/3
                   bg-white dark:bg-gray-700
                   text-gray-800 dark:text-gray-100
                   border-gray-300 dark:border-gray-600
                   placeholder-gray-500 dark:placeholder-gray-400
                   focus:outline-none focus:ring-2 focus:ring-blue-400 dark:focus:ring-blue-500
                   font-medium transition-colors duration-300"
      />

      {/* Filter by Model */}
      <select
        name="model"
        value={filters.model}
        onChange={handleChange}
        className="p-2 border rounded-lg w-full sm:w-1/3
                   bg-white dark:bg-gray-700
                   text-gray-800 dark:text-gray-100
                   border-gray-300 dark:border-gray-600
                   focus:outline-none focus:ring-2 focus:ring-blue-400 dark:focus:ring-blue-500
                   font-medium transition-colors duration-300"
      >
        <option value="">All Models</option>
        <option value="Maruti">Maruti</option>
        <option value="Hyundai">Hyundai</option>
        <option value="Toyota">Toyota</option>
        <option value="Mahindra">Mahindra</option>
      </select>

      {/* Filter by Rent Range */}
      <select
        onChange={handleRangeChange}
        value={
          filters.priceRange
            ? `${filters.priceRange.min}-${filters.priceRange.max}`
            : ""
        }
        className="p-2 border rounded-lg w-full sm:w-1/3
                   bg-white dark:bg-gray-700
                   text-gray-800 dark:text-gray-100
                   border-gray-300 dark:border-gray-600
                   focus:outline-none focus:ring-2 focus:ring-blue-400 dark:focus:ring-blue-500
                   font-medium transition-colors duration-300"
      >
        <option value="">All Price Ranges</option>
        <option value="700-900">₹700 - ₹900</option>
        <option value="900-1100">₹900 - ₹1100</option>
        <option value="1100-1300">₹1100 - ₹1300</option>
        <option value="1300-1500">₹1300 - ₹1500</option>
        <option value="1500-2000">₹1500 - ₹2000</option>
      </select>
    </div>
  );
};

export default Filter;
