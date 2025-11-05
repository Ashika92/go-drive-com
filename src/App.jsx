// App.jsx
import React, { useState, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import About from "./pages/About";
import CarList from "./components/CarList";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Footer from "./components/Footer";
import CarDetails from "./components/CarDetails";
import AgencyDashboard from "./pages/AgencyDashboard";
import CartPage from "./pages/CartPage";
import WishlistPage from "./pages/WishlistPage";
import MyOrdersPage from "./pages/MyOrdersPage";
import Terms from "./pages/Terms";

import "./index.css";

function App() {
  // 🧠 Persistent states
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("isLoggedIn") === "true"
  );
  const [userRole, setUserRole] = useState(
    localStorage.getItem("userRole") || "customer"
  );
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const location = useLocation();

  // 🌓 Apply theme
  useEffect(() => {
    const html = document.documentElement;
    if (theme === "dark") html.classList.add("dark");
    else html.classList.remove("dark");
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () =>
    setTheme((prev) => (prev === "light" ? "dark" : "light"));

  // 💾 Keep login + role persistent
  useEffect(() => {
    localStorage.setItem("isLoggedIn", isLoggedIn);
    localStorage.setItem("userRole", userRole);
  }, [isLoggedIn, userRole]);

  // 🚫 Hide Navbar & Footer on login page
  const hideLayout = location.pathname === "/login";

  return (
    <div
      className={`min-h-screen flex flex-col transition-all duration-500 ${
        theme === "light"
          ? "bg-gradient-to-r from-purple-300 to-cyan-200 text-black"
          : "bg-gradient-to-r from-gray-900 via-gray-950 to-black text-white"
      }`}
    >
      {/* 🧭 Navbar */}
      {!hideLayout && (
        <Navbar
          isLoggedIn={isLoggedIn}
          setIsLoggedIn={setIsLoggedIn}
          theme={theme}
          toggleTheme={toggleTheme}
          userRole={userRole}
          setUserRole={setUserRole} // ✅ Added line
        />
      )}

      {/* 🗺️ Page Routes */}
      <div className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />

          {/* 🚘 Role-based /cars route */}
          <Route
            path="/cars"
            element={
              userRole === "agency" ? (
                <AgencyDashboard
                  theme={theme}
                  toggleTheme={toggleTheme}
                  userRole={userRole}
                />
              ) : (
                <CarList userRole={userRole} theme={theme} />
              )
            }
          />

          <Route path="/contact" element={<Contact />} />

          <Route
            path="/login"
            element={
              <Login
                setIsLoggedIn={setIsLoggedIn}
                setUserRole={setUserRole}
                theme={theme}
              />
            }
          />

          <Route path="/cart" element={<CartPage />} />
          <Route path="/wishlist" element={<WishlistPage />} />
          <Route path="/my-orders" element={<MyOrdersPage />} />
          <Route path="/cars/:id" element={<CarDetails />} />
          <Route path="/terms" element={<Terms theme={theme} />} />
        </Routes>
      </div>

      {!hideLayout && <Footer theme={theme} />}
    </div>
  );
}

export default App;
