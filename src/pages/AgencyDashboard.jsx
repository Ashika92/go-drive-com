import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Moon,
  Sun,
  Car,
  ClipboardList,
  PlusCircle,
  Settings,
  Menu,
  X,
} from "lucide-react";

import CarList from "../components/CarList";
import MyOrdersPage from "./MyOrdersPage";

export default function AgencyDashboard({ theme, toggleTheme }) {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState("overview");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const role = localStorage.getItem("userRole");
    if (role !== "agency") {
      alert("Unauthorized access! Please login as an agency.");
      navigate("/login");
    }
  }, [navigate]);

  const menuItems = [
    { icon: <Car size={18} />, label: "My Cars", key: "cars" },
    { icon: <ClipboardList size={18} />, label: "Bookings", key: "bookings" },
    { icon: <PlusCircle size={18} />, label: "Add New Car", key: "addCar" },
    { icon: <Settings size={18} />, label: "Settings", key: "settings" },
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
        return <MyOrdersPage mode="agency" />;

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
                <p className="text-3xl font-bold">5</p>
              </div>

              <div
                className={`p-6 rounded-2xl shadow-md ${
                  theme === "light" ? "bg-white text-gray-900" : "bg-gray-800 text-white"
                }`}
              >
                <h3 className="text-xl font-semibold mb-2">Pending Approvals</h3>
                <p className="text-3xl font-bold">3</p>
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
      {/* 📱 Top Bar for Mobile */}
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

      {/* 📱 Collapsible Menu for Mobile */}
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

      {/* 🧭 Sidebar for Desktop */}
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

      {/* 📋 Main Content */}
      <main className="flex-1 p-6 sm:p-8">{renderContent()}</main>
    </div>
  );
}
