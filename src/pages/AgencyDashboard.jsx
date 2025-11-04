/* eslint-disable */
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import CarList from "../components/CarList";
import {
  selectOrders,
  confirmCancellation,
  rejectCancellation,
  markAsDelivered,
} from "../features/orders/ordersSlice";
import { clearBookings } from "../features/bookings/bookingsSlice";


import {
  BarChart as ChartIcon,
  Moon,
  Sun,
  Car,
  ClipboardList,
  PlusCircle,
  Menu,
  X,
} from "lucide-react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

// 🧩 Add Car Form Component
function AddCarForm({ theme, onCancel }) {
  const [car, setCar] = useState({
    name: "",
    model: "",
    price: "",
    fuel: "",
    transmission: "",
    mileage: "",
    seats: "",
    image: "",
    availability: true,
    description: "",
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setCar({ ...car, [name]: type === "checkbox" ? checked : value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const existingCars = JSON.parse(localStorage.getItem("agencyCars")) || [];
    const newCar = { id: Date.now(), ...car };
    localStorage.setItem("agencyCars", JSON.stringify([...existingCars, newCar]));

    alert("✅ New car added successfully!");
    onCancel(); // Close the form
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={`mt-6 grid grid-cols-1 md:grid-cols-2 gap-6 ${
        theme === "light" ? "text-gray-900" : "text-gray-100"
      }`}
    >
      {[
        { label: "Car Name", name: "name", type: "text" },
        { label: "Model", name: "model", type: "text" },
        { label: "Price (per day)", name: "price", type: "number" },
        { label: "Mileage (kmpl)", name: "mileage", type: "number" },
        { label: "Seats", name: "seats", type: "number" },
      ].map((field) => (
        <div key={field.name}>
          <label className="block font-semibold mb-1">{field.label}</label>
          <input
            type={field.type}
            name={field.name}
            value={car[field.name]}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
          />
        </div>
      ))}

      <div>
        <label className="block font-semibold mb-1">Fuel Type</label>
        <select
          name="fuel"
          value={car.fuel}
          onChange={handleChange}
          required
          className="w-full text-black bg-white p-2 border rounded"
        >
          <option value="">Select</option>
          <option value="Petrol">Petrol</option>
          <option value="Diesel">Diesel</option>
          <option value="Electric">Electric</option>
          <option value="Hybrid">Hybrid</option>
        </select>
      </div>

      <div>
        <label className="block font-semibold mb-1">Transmission</label>
        <select
          name="transmission"
          value={car.transmission}
          onChange={handleChange}
          required
          className="w-full bg-white text-black p-2 border rounded"
        >
          <option value="">Select</option>
          <option value="Manual">Manual</option>
          <option value="Automatic">Automatic</option>
        </select>
      </div>

      <div>
        <label className="block font-semibold mb-1">Image URL</label>
        <input
          type="text"
          name="image"
          value={car.image}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        />
      </div>

      <div className="col-span-2">
        <label className="block font-semibold mb-1">Description</label>
        <textarea
          name="description"
          value={car.description}
          onChange={handleChange}
          rows="3"
          className="w-full p-2 border rounded"
        ></textarea>
      </div>

      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          name="availability"
          checked={car.availability}
          onChange={handleChange}
        />
        <label>Available</label>
      </div>

      <div className="col-span-2 flex justify-center gap-4 mt-4">
        <button
          type="submit"
          className="bg-green-600 hover:bg-green-500 text-white px-6 py-2 rounded-full"
        >
          Save Car
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="bg-gray-500 hover:bg-gray-400 text-white px-6 py-2 rounded-full"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}

export default function AgencyDashboard({ theme, toggleTheme }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [activeSection, setActiveSection] = useState("overview");
  const [menuOpen, setMenuOpen] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const orders = useSelector(selectOrders) || [];
const { bookings } = useSelector((state) => state.bookings || {});
const cars = JSON.parse(localStorage.getItem("agencyCars")) || [];


  useEffect(() => {
    const role = localStorage.getItem("userRole");
    if (role !== "agency") {
      alert("Unauthorized access! Please login as an agency.");
      navigate("/login");
    }
  }, [navigate]);

  const handleApproveCancellation = (id) => dispatch(confirmCancellation(id));
  const handleRejectCancellation = (id) => dispatch(rejectCancellation(id));
  const handleMarkDelivered = (id) => dispatch(markAsDelivered(id));

  const menuItems = [
    { icon: <Car size={18} />, label: "My Cars", key: "cars" },
    { icon: <ClipboardList size={18} />, label: "Bookings", key: "bookings" },
    { icon: <PlusCircle size={18} />, label: "Add New Car", key: "addCar" },
    { icon: <ChartIcon size={18} />, label: "Analytics", key: "analytics" },
  ];

  const renderContent = () => {
    switch (activeSection) {
      case "cars":
        return (
          <div>
            <div className="flex justify-end mb-6">
              <button
                onClick={() => setActiveSection("addCar")}
                className="bg-gradient-to-r from-purple-600 to-cyan-500 hover:from-purple-700 hover:to-cyan-600 text-white px-5 py-2 rounded-full shadow-md hover:shadow-lg transition-transform transform hover:scale-105"
              >
                ➕ Add New Car
              </button>
            </div>
            <CarList userRole="agency" />
          </div>
        );

      case "bookings":
  
  const handleClearBookings = () => {
    if (window.confirm("Are you sure you want to clear all booking history?")) {
      dispatch(clearBookings());
      alert("✅ Booking history cleared successfully!");
    }
  };

  return (
    <div
      className={`p-6 rounded-2xl shadow-md ${
        theme === "light" ? "bg-white text-gray-900" : "bg-gray-800 text-white"
      }`}
    >
      {/* 🆕 Clear History Button */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Bookings</h2>
        <button
          onClick={handleClearBookings}
          className={`px-4 py-2 rounded-full text-sm font-semibold transition ${
            theme === "light"
              ? "bg-red-500 text-white hover:bg-red-600"
              : "bg-red-600 text-white hover:bg-red-500"
          }`}
        >
          🗑️ Clear History
        </button>
      </div>

      <p className="text-sm mb-6 text-gray-400">
        Live orders from users (requests, cancellations, delivered).
      </p>

      {/* 🟡 Cancellation Requests */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-3 text-yellow-400">
          Cancellation Requests
        </h3>
        {orders.filter((o) => o.status === "Cancellation Requested").length > 0 ? (
          // existing cancellation block remains unchanged
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {orders
              .filter((o) => o.status === "Cancellation Requested")
              .map((order) => (
                <div
                  key={order.id}
                  className={`p-5 rounded-xl shadow-md ${
                    theme === "light"
                      ? "bg-gray-50 text-gray-900"
                      : "bg-gray-900 text-gray-100"
                  }`}
                >
                  <h4 className="text-lg font-semibold mb-2">
                    Order #{order.id}
                  </h4>
                  <p className="text-sm mb-1">
                    <strong>Customer:</strong>{" "}
                    {order.customerName || order.userName || "Customer"}
                  </p>
                  <p className="text-sm mb-1">
                    <strong>Reason:</strong> {order.cancelReason || "—"}
                  </p>
                  <p className="text-sm mb-3">
                    <strong>Date:</strong> {order.date}
                  </p>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleApproveCancellation(order.id)}
                      className="flex-1 py-2 rounded bg-red-600 hover:bg-red-500 text-white text-sm"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => handleRejectCancellation(order.id)}
                      className="flex-1 py-2 rounded bg-gray-500 hover:bg-gray-400 text-white text-sm"
                    >
                      Reject
                    </button>
                  </div>
                </div>
              ))}
          </div>
        ) : (
          <p className="text-gray-400">No cancellation requests right now.</p>
        )}
      </div>

     


      {/* 🟣 Active / Delivered Orders */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-3 text-cyan-400">
          Active / Delivered Orders
        </h3>
        {orders.filter(
          (o) => o.status !== "Cancelled" && o.status !== "Cancellation Requested"
        ).length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {orders
              .filter(
                (o) => o.status !== "Cancelled" && o.status !== "Cancellation Requested"
              )
              .map((order) => (
                <div
                  key={order.id}
                  className={`p-5 rounded-xl shadow-md transition-all ${
                    theme === "light"
                      ? "bg-gray-50 text-gray-900"
                      : "bg-gray-900 text-gray-100"
                  }`}
                >
                  <h4 className="text-lg font-semibold mb-2">
                    Order #{order.id}
                  </h4>
                  <p className="text-sm mb-1">
                    <strong>Customer:</strong>{" "}
                    {order.customerName || order.userName || "Customer"}
                  </p>
                  <p className="text-sm mb-1">
                    <strong>Status:</strong> {order.status}
                  </p>
                  <p className="text-sm mb-1">
                    <strong>Date:</strong> {order.date}
                  </p>
                  <p className="text-sm mb-1">
                    <strong>Expected:</strong> {order.expectedDate}
                  </p>

                  {order.deliveredDate && (
                    <p className="text-sm text-green-400">
                      <strong>Delivered On:</strong> {order.deliveredDate}
                    </p>
                  )}

                  {order.cancelledDate && (
                    <p className="text-sm text-red-400">
                      <strong>Cancelled On:</strong> {order.cancelledDate}
                    </p>
                  )}

                  <div className="flex gap-2">
                    {order.status !== "Delivered" && (
                      <button
                        onClick={() => handleMarkDelivered(order.id)}
                        className="flex-1 py-2 rounded bg-green-600 hover:bg-green-500 text-white text-sm"
                      >
                        Mark Delivered
                      </button>
                    )}
                  </div>
                </div>
              ))}
          </div>
        ) : (
          <p className="text-gray-400">No active/delivered orders yet.</p>
        )}
      </div>

      {/* 🔴 Cancelled Orders */}
      <div>
        <h3 className="text-lg font-semibold mb-3 text-red-400">
          Cancelled Orders
        </h3>
        {orders.filter((o) => o.status === "Cancelled").length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {orders
              .filter((o) => o.status === "Cancelled")
              .map((order) => (
                <div
                  key={order.id}
                  className={`p-5 rounded-xl shadow-md ${
                    theme === "light"
                      ? "bg-gray-50 text-gray-900"
                      : "bg-gray-900 text-gray-100"
                  }`}
                >
                  <h4 className="text-lg font-semibold mb-2">
                    Order #{order.id}
                  </h4>
                  <p className="text-sm mb-1">
                    <strong>Customer:</strong>{" "}
                    {order.customerName || order.userName || "Customer"}
                  </p>
                  <p className="text-sm mb-1">
                    <strong>Reason:</strong> {order.cancelReason || "—"}
                  </p>
                  <p className="text-sm mb-1">
                    <strong>Date:</strong> {order.date}
                  </p>
                  {order.cancelledDate && (
                    <p className="text-sm text-red-400">
                      <strong>Cancelled On:</strong> {order.cancelledDate}
                    </p>
                  )}
                </div>
              ))}
          </div>
        ) : (
          <p className="text-gray-400">No cancelled orders yet.</p>
        )}
      </div>
    </div>
  );


      case "addCar":
        return (
          <div className={`p-8 rounded-2xl shadow-md ${
            theme === "light" ? "bg-white text-gray-900" : "bg-gray-800 text-white"
          }`}>
            {!showForm ? (
              <div className="text-center">
                <button
                  onClick={() => setShowForm(true)}
                  className="bg-gradient-to-r from-purple-600 to-cyan-500 hover:from-purple-700 hover:to-cyan-600 text-white font-semibold px-6 py-3 rounded-full shadow-md hover:shadow-lg transition-transform transform hover:scale-105"
                >
                  ➕ Add New Car
                </button>
              </div>
            ) : (
              <AddCarForm theme={theme} onCancel={() => setShowForm(false)} />
            )}
          </div>
        );

      case "analytics":
        const totalCars = cars.length;
        const totalBookings = orders.length;
        const cancelledOrders = orders.filter((o) => o.status === "Cancelled").length;
        const deliveredOrders = orders.filter((o) => o.status === "Delivered").length;
        const activeOrders = totalBookings - (cancelledOrders + deliveredOrders);
        const revenue = orders
          .filter((o) => o.status === "Delivered")
          .reduce((sum, o) => sum + (o.totalAmount || o.price || 0), 0);

        return (
          <div className={`p-6 rounded-2xl shadow-md ${
            theme === "light" ? "bg-white text-gray-900" : "bg-gray-800 text-white"
          }`}>
            <h2 className="text-2xl font-bold mb-6">Analytics Overview</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-6 mb-8">
              <StatCard color="blue" label="Total Cars" value={totalCars} />
              <StatCard color="cyan" label="Total Bookings" value={totalBookings} />
              <StatCard color="green" label="Delivered Orders" value={deliveredOrders} />
              <StatCard color="yellow" label="Active Orders" value={activeOrders} />
              <StatCard color="red" label="Cancelled Orders" value={cancelledOrders} />
            </div>
            <div className={`p-5 rounded-xl shadow-md mb-8 ${
              theme === "light" ? "bg-gray-100" : "bg-gray-900"
            }`}>
              <h3 className="text-lg font-semibold mb-2">Total Revenue</h3>
              <p className="text-3xl font-bold text-green-500">
                ₹{revenue.toLocaleString("en-IN")}
              </p>
            </div>
            <div className={`p-5 rounded-xl shadow-md ${
              theme === "light" ? "bg-gray-50" : "bg-gray-900"
            }`}>
              <h3 className="text-lg font-semibold mb-4">Booking Status Overview</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart
                  data={[
                    { name: "Delivered", value: deliveredOrders },
                    { name: "Active", value: activeOrders },
                    { name: "Cancelled", value: cancelledOrders },
                  ]}
                >
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="value" fill="#3b82f6" radius={[10, 10, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        );

      default:
        return (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <DashboardCard title="Total Cars" value={cars.length} theme={theme} />
              <DashboardCard
                title="Active Bookings"
                value={orders.filter((o) => o.status !== "Cancelled").length}
                theme={theme}
              />
              <DashboardCard
                title="Pending Approvals"
                value={orders.filter((o) => o.status === "Cancellation Requested").length}
                theme={theme}
              />
            </div>
            <div className={`mt-8 p-8 rounded-2xl shadow-md text-center ${
              theme === "light" ? "bg-white text-gray-900" : "bg-gray-800 text-white"
            }`}>
              <p className="text-lg">
                Welcome to your <strong>Agency Dashboard</strong>! Manage your cars,
                track bookings, and view insights — all in one place.
              </p>
            </div>
          </>
        );
    }
  };

  const DashboardCard = ({ title, value, theme }) => (
    <div
      className={`p-6 rounded-2xl shadow-md ${
        theme === "light" ? "bg-white text-gray-900" : "bg-gray-800 text-white"
      }`}
    >
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-3xl font-bold">{value}</p>
    </div>
  );

  const StatCard = ({ color, label, value }) => (
    <div
      className={`p-5 rounded-xl shadow-md bg-gradient-to-r from-${color}-500 to-${color}-700 text-white`}
    >
      <p className="text-sm opacity-80">{label}</p>
      <h3 className="text-3xl font-bold">{value}</h3>
    </div>
  );

  return (
    <div
      className={`min-h-screen flex flex-col lg:flex-row transition-all duration-300 ${
        theme === "light"
          ? "bg-gray-100 text-gray-900"
          : "bg-gray-900 text-gray-100"
      }`}
    >
      {/* Top Bar Mobile */}
      <div
        className={`lg:hidden flex justify-between items-center px-4 py-3 border-b ${
          theme === "light"
            ? "bg-white border-gray-200"
            : "bg-gray-800 border-gray-700"
        }`}
      >
        <h1 className="text-xl font-bold">🚗 GoDrive Agency</h1>
        <div className="flex gap-3">
          <button
            onClick={toggleTheme}
            className={`p-2 rounded-full ${
              theme === "light"
                ? "bg-gray-200 hover:bg-gray-300 text-black"
                : "bg-gray-700 hover:bg-gray-600 text-white"
            }`}
          >
            {theme === "light" ? <Moon size={20} /> : <Sun size={20} />}
          </button>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className={`p-2 rounded-md ${
              theme === "light"
                ? "bg-gray-200 hover:bg-gray-300 text-black"
                : "bg-gray-700 hover:bg-gray-600 text-white"
            }`}
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div
          className={`lg:hidden flex flex-col px-4 py-3 border-b ${
            theme === "light"
              ? "bg-white border-gray-200"
              : "bg-gray-800 border-gray-700"
          }`}
        >
          {menuItems.map((item) => (
            <button
              key={item.key}
              onClick={() => {
                setActiveSection(item.key);
                setMenuOpen(false);
              }}
              className={`flex items-center gap-3 px-3 py-2 rounded-lg transition font-medium ${
                activeSection === item.key
                  ? "bg-gradient-to-r from-purple-600 to-cyan-500 text-white shadow-md"
                  : theme === "light"
                  ? "hover:bg-gray-200"
                  : "hover:bg-gray-700 hover:text-white"
              }`}
            >
              {item.icon}
              {item.label}
            </button>
          ))}
        </div>
      )}

      {/* Sidebar */}
      <aside
        className={`hidden lg:flex w-64 p-6 flex-col gap-6 border-r transition-all duration-300 ${
          theme === "light"
            ? "bg-white border-gray-300"
            : "bg-gray-800 border-gray-700"
        }`}
      >
        <h1 className="text-2xl font-bold text-center mb-4">🚗 GoDrive Agency</h1>
        <nav className="flex flex-col gap-4">
          {menuItems.map((item) => (
            <button
              key={item.key}
              onClick={() => setActiveSection(item.key)}
              className={`flex items-center gap-3 px-3 py-2 rounded-lg transition font-medium ${
                activeSection === item.key
                  ? "bg-gradient-to-r from-purple-600 to-cyan-500 text-white shadow-md"
                  : theme === "light"
                  ? "hover:bg-gray-200"
                  : "hover:bg-gray-700 hover:text-white"
              }`}
            >
              {item.icon}
              {item.label}
            </button>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 sm:p-8">{renderContent()}</main>
    </div>
  );
}
