// Login.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Login({ setIsLoggedIn, setUserRole, theme }) {
  const [userRole, setRole] = useState("customer");
  const [isSignUp, setIsSignUp] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    username: "",
    agencyName: "",
    location: "",
    password: "",
  });

  const navigate = useNavigate();

  // 🔄 Clear fields when switching forms or roles
  useEffect(() => {
    setFormData({
      name: "",
      email: "",
      phone: "",
      username: "",
      agencyName: "",
      location: "",
      password: "",
    });
  }, [userRole, isSignUp]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ✨ Helper validation functions
  const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const isValidPhone = (phone) => /^[0-9]{10}$/.test(phone);

  const handleSubmit = (e) => {
    e.preventDefault();

    // ✅ Sign Up Validation
    if (isSignUp) {
      if (userRole === "customer") {
        if (!formData.name || !formData.email || !formData.phone || !formData.password) {
          alert("Please fill in all required fields.");
          return;
        }
        if (!isValidEmail(formData.email)) {
          alert("Please enter a valid email address.");
          return;
        }
        if (!isValidPhone(formData.phone)) {
          alert("Please enter a valid 10-digit phone number.");
          return;
        }
        if (formData.password.length < 4) {
          alert("Password must be at least 4 characters long.");
          return;
        }
      } else {
        if (
          !formData.username ||
          !formData.agencyName ||
          !formData.location ||
          !formData.phone ||
          !formData.password
        ) {
          alert("Please fill in all required fields.");
          return;
        }
        if (!isValidPhone(formData.phone)) {
          alert("Please enter a valid 10-digit phone number.");
          return;
        }
        if (formData.password.length < 4) {
          alert("Password must be at least 4 characters long.");
          return;
        }
      }
    }

    // ✅ Login Validation
    else {
      if (userRole === "customer") {
        if (!formData.email || !formData.password) {
          alert("Please enter your email or phone number and password.");
          return;
        }

        // check whether email or phone valid
        const isEmail = formData.email.includes("@");
        if (isEmail && !isValidEmail(formData.email)) {
          alert("Please enter a valid email address.");
          return;
        } else if (!isEmail && !isValidPhone(formData.email)) {
          alert("Please enter a valid 10-digit phone number.");
          return;
        }

        if (formData.password.length < 4) {
          alert("Password must be at least 4 characters long.");
          return;
        }
      } else {
        if (!formData.username || !formData.password) {
          alert("Please enter your username and password.");
          return;
        }
        if (formData.password.length < 4) {
          alert("Password must be at least 4 characters long.");
          return;
        }
      }
    }

    // ✅ Save login info
    setIsLoggedIn(true);
    setUserRole(userRole);
    localStorage.setItem("userRole", userRole);
    localStorage.setItem("isLoggedIn", "true");

    // ✅ Redirect after login
    const redirectPath = localStorage.getItem("redirectAfterLogin");
    if (redirectPath) {
      localStorage.removeItem("redirectAfterLogin");
      navigate(redirectPath);
    } else {
      navigate("/cars");
    }
  };

  return (
    <div
      className={`flex flex-col items-center justify-center min-h-screen px-4 transition-all duration-300 ${
        theme === "light"
          ? "bg-gradient-to-r from-purple-200 to-cyan-200 text-black"
          : "bg-gradient-to-r from-gray-800 to-gray-900 text-white"
      }`}
    >
      {/* 🔁 Toggle Role */}
      <button
        onClick={() => setRole((prev) => (prev === "customer" ? "agency" : "customer"))}
        className={`absolute top-6 right-6 px-4 py-2 rounded-md font-semibold shadow-md transition ${
          theme === "light"
            ? "bg-purple-500 text-white hover:bg-purple-600"
            : "bg-cyan-600 text-black hover:bg-cyan-500"
        }`}
      >
        {userRole === "customer" ? "Agency Login →" : "← Customer Login"}
      </button>

      {/* 🔒 Login / Signup Box */}
      <form
        onSubmit={handleSubmit}
        autoComplete="off"
        className={`p-8 rounded-2xl shadow-2xl w-full max-w-md transition-all duration-300 ${
          theme === "light" ? "bg-white text-black" : "bg-gray-800 text-white"
        }`}
      >
        <h2 className="text-2xl font-bold mb-4 text-center">
          {isSignUp ? "Sign Up" : "Login"} ({userRole === "customer" ? "Customer" : "Agency"})
        </h2>

        <div className="space-y-4">
          {/* ------------------ SIGN UP ------------------ */}
          {isSignUp ? (
            <>
              {userRole === "customer" ? (
                <>
                  <input
                    type="text"
                    name="name"
                    placeholder="Full Name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full p-2 border rounded-lg bg-transparent"
                  />
                  <input
                    type="email"
                    name="email"
                    placeholder="Email Address"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full p-2 border rounded-lg bg-transparent"
                  />
                  <input
                    type="text"
                    name="phone"
                    placeholder="Phone Number"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full p-2 border rounded-lg bg-transparent"
                  />
                  <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full p-2 border rounded-lg bg-transparent"
                  />
                </>
              ) : (
                <>
                  <input
                    type="text"
                    name="username"
                    placeholder="Username"
                    value={formData.username}
                    onChange={handleChange}
                    className="w-full p-2 border rounded-lg bg-transparent"
                  />
                  <input
                    type="text"
                    name="agencyName"
                    placeholder="Agency Name"
                    value={formData.agencyName}
                    onChange={handleChange}
                    className="w-full p-2 border rounded-lg bg-transparent"
                  />
                  <input
                    type="text"
                    name="location"
                    placeholder="Location"
                    value={formData.location}
                    onChange={handleChange}
                    className="w-full p-2 border rounded-lg bg-transparent"
                  />
                  <input
                    type="text"
                    name="phone"
                    placeholder="Phone Number"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full p-2 border rounded-lg bg-transparent"
                  />
                  <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full p-2 border rounded-lg bg-transparent"
                  />
                </>
              )}
            </>
          ) : (
            /* ------------------ LOGIN ------------------ */
            <>
              {userRole === "customer" ? (
                <>
                  <input
                    type="text"
                    name="email"
                    placeholder="Email or Phone Number"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full p-2 border rounded-lg bg-transparent"
                  />
                </>
              ) : (
                <>
                  <input
                    type="text"
                    name="username"
                    placeholder="Username"
                    value={formData.username}
                    onChange={handleChange}
                    className="w-full p-2 border rounded-lg bg-transparent"
                  />
                </>
              )}
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                className="w-full p-2 border rounded-lg bg-transparent"
              />
            </>
          )}
        </div>

        {/* 🔘 Submit */}
        <button
          type="submit"
          className="w-full mt-6 py-2 bg-gradient-to-r from-purple-400 to-cyan-300 text-black font-semibold rounded-lg hover:scale-105 transition"
        >
          {isSignUp ? "Sign Up" : "Login"}
        </button>

        {/* 🔁 Switch Login/Signup */}
        <p className="text-center mt-4">
          {isSignUp ? "Already have an account?" : "Don’t have an account?"}{" "}
          <span
            onClick={() => setIsSignUp(!isSignUp)}
            className="text-purple-400 cursor-pointer hover:underline"
          >
            {isSignUp ? "Login" : "Sign Up"}
          </span>
        </p>
      </form>
    </div>
  );
}
