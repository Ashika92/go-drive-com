// src/components/Footer.jsx
import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-10 border-t border-gray-300 dark:border-gray-700 transition-colors duration-500">
      <div className="max-w-6xl mx-auto py-6 px-6 text-center">
        <p className="text-gray-700 dark:text-gray-300">
          <strong>Email:</strong> support@godrive.com |{" "}
          <strong>Phone:</strong> +91-1234567890
        </p>

        <div className="mt-3">
          <Link
            to="/terms"
            className="text-blue-600 dark:text-blue-400 underline hover:opacity-80"
          >
            Terms & Conditions
          </Link>
        </div>
      </div>

      <div className="text-center py-3 text-sm font-semibold text-gray-700 dark:text-gray-300">
        © {year} GoDrive.com — All rights reserved
      </div>
    </footer>
  );
}
