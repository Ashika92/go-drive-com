import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function Navbar({ isLoggedIn, setIsLoggedIn, theme, toggleTheme, userRole = "customer", setUserRole }) {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const totalQuantity = useSelector((state) => state.cart.totalQuantity);

  // ✅ Updated logout logic (fixed)
  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserRole && setUserRole("customer"); // reset role safely
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userRole");
    navigate("/");
  };

  const isAgency = userRole === "agency";
  const isCustomer = userRole === "customer";

  return (
    <nav
      className={`${
        theme === "light"
          ? "bg-gradient-to-r from-purple-300 to-cyan-200 text-black"
          : "bg-gradient-to-r from-gray-800 to-gray-900 text-white"
      } py-3 shadow-md transition-all duration-300 relative z-50`}
    >
      <div className="max-w-6xl mx-auto flex justify-between items-center px-4 md:px-6">
        {/* Logo */}
        <h1
          className="text-[26px] sm:text-[32px] font-semibold cursor-pointer"
          onClick={() => navigate("/")}
        >
          🚗 GoDrive.com
        </h1>

        {/* Hamburger (mobile) */}
        <button
          className="md:hidden text-2xl focus:outline-none"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? "" : "☰"}
        </button>

        {/* Mobile Menu */}
        <div
          className={`md:hidden absolute left-0 w-full p-4 transition-all duration-300 ease-in-out z-40
            ${
              menuOpen
                ? "top-16 opacity-100"
                : "-top-96 opacity-0 pointer-events-none"
            }
            ${
              theme === "light"
                ? "bg-gradient-to-r from-purple-300 to-cyan-200 text-black"
                : "bg-gradient-to-r from-gray-900 via-gray-950 to-black text-white"
            }`}
        >
          <NavbarLinks
            isLoggedIn={isLoggedIn}
            isAgency={isAgency}
            isCustomer={isCustomer}
            handleLogout={handleLogout}
            theme={theme}
            toggleTheme={toggleTheme}
            totalQuantity={totalQuantity}
            navigate={navigate}
            closeMenu={() => setMenuOpen(false)}
          />
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex md:items-center md:space-x-5 text-[15px] font-medium bg-transparent">
          <NavbarLinks
            isLoggedIn={isLoggedIn}
            isAgency={isAgency}
            isCustomer={isCustomer}
            handleLogout={handleLogout}
            theme={theme}
            toggleTheme={toggleTheme}
            totalQuantity={totalQuantity}
            navigate={navigate}
          />
        </div>
      </div>
    </nav>
  );
}

function NavbarLinks({
  isLoggedIn,
  isAgency,
  isCustomer,
  handleLogout,
  theme,
  toggleTheme,
  totalQuantity,
  navigate,
  closeMenu,
}) {
  const commonLinkClass =
    "block py-1 md:py-0 hover:text-purple-600 dark:hover:text-cyan-300 transition duration-300";

  return (
    <>
      {/* Always visible links */}
      <Link to="/" className={commonLinkClass} onClick={closeMenu}>
        Home
      </Link>
      <Link to="/about" className={commonLinkClass} onClick={closeMenu}>
        About Us
      </Link>

      {/* Agency or Customer or Default */}
      {isAgency ? (
        <>
          <Link to="/cars" className={commonLinkClass} onClick={closeMenu}>
            Agency Dashboard
          </Link>
        </>
      ) : (
        <>
          <Link to="/cars" className={commonLinkClass} onClick={closeMenu}>
            Cars
          </Link>
        </>
      )}

      {/* Contact Us – always visible */}
      <Link to="/contact" className={commonLinkClass} onClick={closeMenu}>
        Contact Us
      </Link>

      {/* 🛒 Cart – visible for default (logged-out) and customers */}
      {(!isLoggedIn || isCustomer) && (
        <div
          className="relative cursor-pointer md:ml-2 mt-2 md:mt-0"
          onClick={() => {
            navigate("/cart");
            closeMenu && closeMenu();
          }}
          role="button"
          aria-label="Go to cart"
        >
          <span className="text-3xl">🛒</span>
          {totalQuantity > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full px-2 text-xs font-semibold">
              {totalQuantity}
            </span>
          )}
        </div>
      )}

      {/* Customer-only options (after contact + cart) */}
      {isLoggedIn && isCustomer && (
        <>
          <Link to="/wishlist" className={commonLinkClass} onClick={closeMenu}>
            Wishlist
          </Link>
          <Link to="/my-orders" className={commonLinkClass} onClick={closeMenu}>
            My Orders
          </Link>
        </>
      )}

      {/* Login / Logout */}
      {isLoggedIn ? (
        <button
          onClick={() => {
            handleLogout();
            closeMenu && closeMenu();
          }}
          className="mt-2 md:mt-0 px-3 py-1 bg-green-800 text-white rounded text-base hover:bg-green-600 transition"
        >
          Logout
        </button>
      ) : (
        <Link
          to="/login"
          onClick={closeMenu}
          className="mt-2 md:mt-0 px-3 py-1 bg-green-800 text-white rounded text-base hover:bg-green-600 transition"
        >
          Login
        </Link>
      )}

      {/* Theme Toggle */}
      <button
        onClick={() => {
          toggleTheme();
          closeMenu && closeMenu();
        }}
        className={`mt-2 md:mt-0 px-3 py-1 rounded text-base transition duration-300 
          ${
            theme === "light"
              ? "bg-blue-900 text-white hover:bg-blue-800"
              : "bg-gray-200 text-black hover:bg-gray-300"
          }`}
        aria-label="Toggle theme"
      >
        {theme === "light" ? "🌙" : "☀️"}
      </button>
    </>
  );
}

export default Navbar;
