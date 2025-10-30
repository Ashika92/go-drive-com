import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Navbar({ isLoggedIn, setIsLoggedIn, theme, toggleTheme }) {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    setIsLoggedIn(false);
    navigate("/");
  };

  return (
    <nav
      className={`${
        theme === "light"
          ? "bg-gradient-to-r from-purple-300 to-cyan-200 text-black"
          : "bg-gradient-to-r from-gray-800 to-gray-900 text-white"
      } py-4 shadow-md transition-all duration-300`}
    >
      <div className="max-w-6xl mx-auto flex justify-between items-center px-4 md:px-6">
        {/* Logo */}
        <h1
          className="text-2xl sm:text-3xl font-semibold cursor-pointer"
          onClick={() => navigate("/")}
        >
          🚗 GoDrive.com
        </h1>

        {/* Hamburger Button (Mobile only) */}
        <button
          className="md:hidden text-2xl focus:outline-none"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? "" : "☰"}
        </button>

        {/* Links (hidden on mobile) */}
        <div
  className={`flex-col md:flex md:flex-row md:items-center md:space-x-6 text-lg font-medium absolute md:static left-0 w-full md:w-auto 
  ${theme === "light" ? "bg-gradient-to-r from-purple-300 to-cyan-200 text-black" : "bg-gradient-to-r from-gray-900 via-gray-950 to-black text-white"}
  md:bg-transparent md:from-none md:to-none md:bg-none
  p-5 md:p-0 z-50 transition-all duration-300 ease-in-out ${
    menuOpen ? "top-16 opacity-100" : "-top-96 opacity-0 md:opacity-100"
  }`}
>

          <Link
            to="/"
            className="block py-2 md:py-0 hover:text-purple-600 dark:hover:text-cyan-300 transition duration-300"
            onClick={() => setMenuOpen(false)}
          >
            Home
          </Link>
          <Link
            to="/about"
            className="block py-2 md:py-0 hover:text-purple-600 dark:hover:text-cyan-300 transition duration-300"
            onClick={() => setMenuOpen(false)}
          >
            About Us
          </Link>
          <Link
            to="/cars"
            className="block py-2 md:py-0 hover:text-purple-600 dark:hover:text-cyan-300 transition duration-300"
            onClick={() => setMenuOpen(false)}
          >
            Cars
          </Link>
          <Link
            to="/contact"
            className="block py-2 md:py-0 hover:text-purple-600 dark:hover:text-cyan-300 transition duration-300"
            onClick={() => setMenuOpen(false)}
          >
            Contact Us
          </Link>

          {isLoggedIn ? (
            <button
              onClick={() => {
                handleLogout();
                setMenuOpen(false);
              }}
              className="mt-2 md:mt-0 px-4 py-1 bg-green-800 text-white rounded hover:bg-green-600 transition"
            >
              Logout
            </button>
          ) : (
            <Link
              to="/login"
              onClick={() => setMenuOpen(false)}
              className="mt-2 md:mt-0 px-4 py-1 bg-green-800 text-white rounded hover:bg-green-600 transition"
            >
              Login
            </Link>
          )}

          {/* Theme Toggle */}
          <button
  onClick={() => {
    toggleTheme();
    setMenuOpen(false);
  }}
  className={`mt-3 md:mt-0 px-3 py-1 rounded transition duration-300 
  ${theme === "light" 
    ? "bg-blue-900 text-white hover:bg-blue-900" 
    : "bg-gray-200 text-black hover:bg-gray-300"}`}
>
  {theme === "light" ? "🌙" : "☀️"}
</button>

        </div>
      </div>
    </nav>
  );
}

export default Navbar;
