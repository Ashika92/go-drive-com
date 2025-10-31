// App.jsx
import React, { useState, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import About from "./pages/About";
import Cars from "./components/CarList";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Footer from "./components/Footer";
import CarDetails from "./components/CarDetails";
import AgencyDashboard from "./pages/AgencyDashboard";
import CartPage from "./pages/CartPage";
import "./index.css";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const location = useLocation();

  // 🌙 Theme state (persisted in localStorage)
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  // Apply theme to <html> element
  useEffect(() => {
    const html = document.documentElement;
    if (theme === "dark") {
      html.classList.add("dark");
    } else {
      html.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  // Toggle light/dark mode
  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  // Hide Navbar & Footer on Login page
  const hideLayout = location.pathname === "/login";

  return (
    <div
      className={`min-h-screen flex flex-col transition-all duration-500 ${
        theme === "light"
          ? "bg-gradient-to-r from-purple-300 to-cyan-200 text-black"
          : "bg-gradient-to-r from-gray-900 via-gray-950 to-black text-white"
      }`}
    >
      {/* Navbar */}
      {!hideLayout && (
        <Navbar
          isLoggedIn={isLoggedIn}
          setIsLoggedIn={setIsLoggedIn}
          theme={theme}
          toggleTheme={toggleTheme}
        />
      )}

      {/* Page Routes */}
      <div className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/cars" element={<Cars />} />
          <Route path="/contact" element={<Contact />} />
          <Route
            path="/login"
            element={<Login setIsLoggedIn={setIsLoggedIn} />}
          />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/cars/:id" element={<CarDetails />} />
          <Route path="/agency-dashboard" element={<AgencyDashboard />} />
        </Routes>
      </div>

      {/* Footer */}
      {!hideLayout && <Footer />}
    </div>
  );
}

export default App;
