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
import "./index.css";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const location = useLocation();

  // 🌗 Theme state
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  // Apply theme to <body>
  useEffect(() => {
    document.body.className = theme;
    localStorage.setItem("theme", theme);
  }, [theme]);

  // Toggle dark/light mode
  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  // Hide Navbar & Footer only on the Login page
  const hideLayout = location.pathname === "/login";

  return (
    <div className="min-h-screen flex flex-col">
      {!hideLayout && (
        <Navbar
          isLoggedIn={isLoggedIn}
          setIsLoggedIn={setIsLoggedIn}
          theme={theme}
          toggleTheme={toggleTheme}
        />
      )}

      <div className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/cars" element={<Cars />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
          <Route path="/cars/:id" element={<CarDetails />} />
          <Route path="/agency-dashboard" element={<AgencyDashboard />} />
        </Routes>
      </div>

      {!hideLayout && <Footer />}
    </div>
  );
}

export default App;
