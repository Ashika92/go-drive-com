import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  selectOrders,
  confirmCancellation,
  rejectCancellation,
  markAsDelivered,
} from "../features/orders/ordersSlice";
import { BarChart, Moon, Sun, Car, ClipboardList, PlusCircle, Settings, Menu, X } from "lucide-react";
import CarList from "../components/CarList";
import MyOrdersPage from "./MyOrdersPage";

export default function AgencyDashboard({ theme, toggleTheme }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [activeSection, setActiveSection] = useState("overview");
  const [menuOpen, setMenuOpen] = useState(false);

  // Pull orders from Redux
  const orders = useSelector(selectOrders) || [];

  useEffect(() => {
    const role = localStorage.getItem("userRole");
    if (role !== "agency") {
      alert("Unauthorized access! Please login as an agency.");
      navigate("/login");
    }
  }, [navigate]);

  const handleApproveCancellation = (id) => {
    dispatch(confirmCancellation(id));
  };

  const handleRejectCancellation = (id) => {
    dispatch(rejectCancellation(id));
  };

  const handleMarkDelivered = (id) => {
    dispatch(markAsDelivered(id));
  };

  const menuItems = [
    { icon: <Car size={18} />, label: "My Cars", key: "cars" },
    { icon: <ClipboardList size={18} />, label: "Bookings", key: "bookings" },
    { icon: <PlusCircle size={18} />, label: "Add New Car", key: "addCar" },
    { icon: <Settings size={18} />, label: "Settings", key: "settings" },
    { icon: <BarChart size={18} />, label: "Analytics", key: "analytics" }, // 🆕
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
        return (
          <div
            className={`p-6 rounded-2xl shadow-md ${
              theme === "light" ? "bg-white text-gray-900" : "bg-gray-800 text-white"
            }`}
          >
            <h2 className="text-2xl font-bold mb-4">Bookings</h2>
            <p className="text-sm mb-6 text-gray-400">
              Live orders from users (requests, cancellations, delivered).
            </p>

            {/* Cancellation Requests */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-3 text-yellow-400">Cancellation Requests</h3>
              {orders.filter((o) => o.status === "Cancellation Requested").length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {orders
                    .filter((o) => o.status === "Cancellation Requested")
                    .map((order) => (
                      <div
                        key={order.id}
                        className={`p-5 rounded-xl shadow-md ${
                          theme === "light" ? "bg-gray-50 text-gray-900" : "bg-gray-900 text-gray-100"
                        }`}
                      >
                        <h4 className="text-lg font-semibold mb-2">Order #{order.id}</h4>
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
                            Approve Cancellation
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

            {/* Active / Delivered Orders */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-3 text-cyan-400">Active / Delivered Orders</h3>
              {orders.filter((o) => o.status !== "Cancelled" && o.status !== "Cancellation Requested").length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {orders
                    .filter((o) => o.status !== "Cancelled" && o.status !== "Cancellation Requested")
                    .map((order) => (
                      <div
                        key={order.id}
                        className={`p-5 rounded-xl shadow-md transition-all ${
                          theme === "light" ? "bg-gray-50 text-gray-900" : "bg-gray-900 text-gray-100"
                        }`}
                      >
                        <h4 className="text-lg font-semibold mb-2">Order #{order.id}</h4>
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

            {/* Cancelled Orders */}
            <div>
              <h3 className="text-lg font-semibold mb-3 text-red-400">Cancelled Orders</h3>
              {orders.filter((o) => o.status === "Cancelled").length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {orders
                    .filter((o) => o.status === "Cancelled")
                    .map((order) => (
                      <div
                        key={order.id}
                        className={`p-5 rounded-xl shadow-md ${
                          theme === "light" ? "bg-gray-50 text-gray-900" : "bg-gray-900 text-gray-100"
                        }`}
                      >
                        <h4 className="text-lg font-semibold mb-2">Order #{order.id}</h4>
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
          <div
            className={`p-8 rounded-2xl shadow-md ${
              theme === "light" ? "bg-white text-gray-900" : "bg-gray-800 text-white"
            }`}
          >
            <h2 className="text-2xl font-bold mb-4">Add New Car</h2>
            <p>Here you can add new cars to your agency’s listing.</p>
          </div>
        );

      case "settings":
        return (
          <div
            className={`p-8 rounded-2xl shadow-md ${
              theme === "light" ? "bg-white text-gray-900" : "bg-gray-800 text-white"
            }`}
          >
            <h2 className="text-2xl font-bold mb-4">Settings</h2>
            <p>Customize your profile and preferences here.</p>
          </div>
        );

      default:
        return (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <div
                className={`p-6 rounded-2xl shadow-md ${
                  theme === "light" ? "bg-white text-gray-900" : "bg-gray-800 text-white"
                }`}
              >
                <h3 className="text-xl font-semibold mb-2">Total Cars</h3>
                <p className="text-3xl font-bold">12</p>
              </div>

              <div
                className={`p-6 rounded-2xl shadow-md ${
                  theme === "light" ? "bg-white text-gray-900" : "bg-gray-800 text-white"
                }`}
              >
                <h3 className="text-xl font-semibold mb-2">Active Bookings</h3>
                <p className="text-3xl font-bold">{orders.filter((o) => o.status !== "Cancelled").length}</p>
              </div>

              <div
                className={`p-6 rounded-2xl shadow-md ${
                  theme === "light" ? "bg-white text-gray-900" : "bg-gray-800 text-white"
                }`}
              >
                <h3 className="text-xl font-semibold mb-2">Pending Approvals</h3>
                <p className="text-3xl font-bold">{orders.filter((o) => o.status === "Cancellation Requested").length}</p>
              </div>
            </div>

            <div
              className={`mt-8 p-8 rounded-2xl shadow-md text-center ${
                theme === "light" ? "bg-white text-gray-900" : "bg-gray-800 text-white"
              }`}
            >
              <p className="text-lg">
                Welcome to your <strong>Agency Dashboard</strong>! Manage your cars,
                track bookings, and view insights — all in one place.
              </p>
            </div>
          </>
        );
    }
  };

  return (
    <div
      className={`min-h-screen flex flex-col lg:flex-row transition-all duration-300 ${
        theme === "light" ? "bg-gray-100 text-gray-900" : "bg-gray-900 text-gray-100"
      }`}
    >
      {/* Top Bar Mobile */}
      <div
        className={`lg:hidden flex justify-between items-center px-4 py-3 border-b ${
          theme === "light" ? "bg-white border-gray-200" : "bg-gray-800 border-gray-700"
        }`}
      >
        <h1 className="text-xl font-bold">🚗 GoDrive Agency</h1>
        <div className="flex gap-3">
          <button
            onClick={toggleTheme}
            className={`p-2 rounded-full ${
              theme === "light" ? "bg-gray-200 hover:bg-gray-300 text-black" : "bg-gray-700 hover:bg-gray-600 text-white"
            }`}
          >
            {theme === "light" ? <Moon size={20} /> : <Sun size={20} />}
          </button>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className={`p-2 rounded-md ${
              theme === "light" ? "bg-gray-200 hover:bg-gray-300 text-black" : "bg-gray-700 hover:bg-gray-600 text-white"
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
            theme === "light" ? "bg-white border-gray-200" : "bg-gray-800 border-gray-700"
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
                activeSection === item.key ? "bg-gradient-to-r from-purple-600 to-cyan-500 text-white shadow-md" : theme === "light" ? "hover:bg-gray-200" : "hover:bg-gray-700 hover:text-white"
              }`}
            >
              {item.icon}
              {item.label}
            </button>
          ))}
        </div>
      )}

      {/* Sidebar */}
      <aside className={`hidden lg:flex w-64 p-6 flex-col gap-6 border-r transition-all duration-300 ${theme === "light" ? "bg-white border-gray-300" : "bg-gray-800 border-gray-700"}`}>
        <h1 className="text-2xl font-bold text-center mb-4">🚗 GoDrive Agency</h1>

        <nav className="flex flex-col gap-4">
          {menuItems.map((item) => (
            <button
              key={item.key}
              onClick={() => setActiveSection(item.key)}
              className={`flex items-center gap-3 px-3 py-2 rounded-lg transition font-medium ${activeSection === item.key ? "bg-gradient-to-r from-purple-600 to-cyan-500 text-white shadow-md" : theme === "light" ? "hover:bg-gray-200" : "hover:bg-gray-700 hover:text-white"}`}
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
