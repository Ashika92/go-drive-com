// components/Footer.jsx
import React from "react";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="py-10 mt-10">
      <div className="max-w-6xl mx-auto py-4 px-6 text-center">
        <p>
          <strong>Email:</strong> support@godrive.com |{" "}
          <strong>Phone:</strong> +91-1234567890
        </p>
      </div>
      <div className="text-center py-2 text-sm font-semibold">
        © {year} GoDrive.com — All rights reserved
      </div>
    </footer>
  );
}
