import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login({ setIsLoggedIn }) {
  const [userType, setUserType] = useState("individual"); // "individual" or "agency"
  const [isSignUp, setIsSignUp] = useState(false); // Toggle between Sign In / Sign Up

  // Common fields
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    username: "",
    agencyName: "",
    location: "",
    password: "",
  });

  const navigate = useNavigate();

  // ✅ handleChange to update input fields
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ✅ handleSubmit to validate and navigate
  const handleSubmit = (e) => {
    e.preventDefault();

    // Simple field validation
    if (isSignUp) {
      if (userType === "individual") {
        if (!formData.firstName || !formData.email || !formData.phone) {
          alert("Please fill in all the required fields.");
          return;
        }
      } else if (userType === "agency") {
        if (!formData.agencyName || !formData.phone || !formData.location) {
          alert("Please fill in all the required fields.");
          return;
        }
      }
    } else {
      // Login validation
      if (userType === "individual") {
        if (!formData.email || !formData.password) {
          alert("Please enter your email and password.");
          return;
        }
      } else {
        if (!formData.username || !formData.password) {
          alert("Please enter your username and password.");
          return;
        }
      }
    }

    // Simulate login success
    setIsLoggedIn(true);

    // ✅ Redirect based on user type
    if (userType === "individual") {
      navigate("/"); // Home page for individuals
    } else {
      navigate("/agency-dashboard"); // Agency page
    }
  };

  return (
    <div className="flex items-center justify-center text-black min-h-screen bg-gradient-to-r from-purple-200 to-cyan-200 dark:from-gray-800 dark:to-gray-900 transition-all duration-300">
      <form
        onSubmit={handleSubmit}
        className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl w-full max-w-md"
      >
        {/* Title */}
        <h2 className="text-2xl font-bold mb-4 text-center text-gray-800 dark:text-white">
          {isSignUp ? "Sign Up" : "Login"} (
          {userType === "individual" ? "Individual" : "Agency"})
        </h2>

        {/* Switch User Type */}
        <div className="flex justify-center gap-4 mb-6">
          <button
            type="button"
            onClick={() => setUserType("individual")}
            className={`px-4 py-2 rounded-lg ${
              userType === "individual"
                ? "bg-purple-500 text-white"
                : "bg-gray-200 dark:bg-gray-700 dark:text-gray-300"
            }`}
          >
            Individual
          </button>
          <button
            type="button"
            onClick={() => setUserType("agency")}
            className={`px-4 py-2 rounded-lg ${
              userType === "agency"
                ? "bg-purple-500 text-white"
                : "bg-gray-200 dark:bg-gray-700 dark:text-gray-300"
            }`}
          >
            Agency
          </button>
        </div>

        {/* Input Fields */}
        <div className="space-y-4">
          {isSignUp ? (
            <>
              {userType === "individual" ? (
                <>
                  <input
                    type="text"
                    name="firstName"
                    placeholder="First Name"
                    value={formData.firstName}
                    onChange={handleChange}
                    className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:text-white"
                  />
                  <input
                    type="text"
                    name="lastName"
                    placeholder="Last Name"
                    value={formData.lastName}
                    onChange={handleChange}
                    className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:text-white"
                  />
                  <input
                    type="email"
                    name="email"
                    placeholder="Email Address"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:text-white"
                  />
                  <input
                    type="text"
                    name="phone"
                    placeholder="Phone Number"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:text-white"
                  />
                </>
              ) : (
                <>
                  <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:text-white"
                  />
                  <input
                    type="text"
                    name="agencyName"
                    placeholder="Agency Name"
                    value={formData.agencyName}
                    onChange={handleChange}
                    className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:text-white"
                  />
                  <input
                    type="text"
                    name="phone"
                    placeholder="Phone Number"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:text-white"
                  />
                  <input
                    type="text"
                    name="location"
                    placeholder="Location"
                    value={formData.location}
                    onChange={handleChange}
                    className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:text-white"
                  />
                </>
              )}
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:text-white"
              />
            </>
          ) : (
            <>
              {userType === "individual" ? (
                <input
                  type="text"
                  name="email"
                  placeholder="Email or Mobile Number"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:text-white"
                />
              ) : (
                <input
                  type="text"
                  name="username"
                  placeholder="Username"
                  value={formData.username}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:text-white"
                />
              )}
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:text-white"
              />
            </>
          )}
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full mt-6 py-2 bg-gradient-to-r from-purple-400 to-cyan-300 text-black font-semibold rounded-lg hover:scale-105 transition duration-300"
        >
          {isSignUp ? "Sign Up" : "Login"}
        </button>

        {/* Switch Sign Up / Login */}
        <p className="text-center text-gray-700 dark:text-gray-300 mt-4">
          {isSignUp ? "Already have an account?" : "Don’t have an account?"}{" "}
          <span
            onClick={() => setIsSignUp(!isSignUp)}
            className="text-purple-600 cursor-pointer hover:underline"
          >
            {isSignUp ? "Login" : "Sign Up"}
          </span>
        </p>
      </form>
    </div>
  );
}
