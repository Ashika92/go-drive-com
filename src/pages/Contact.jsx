// pages/Contact.jsx
import React from "react";

export default function Contact() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center ">
      <h1 className="text-4xl font-bold mb-8 text-center">Contact Us</h1>

      <div className="shadow-lg p-8 max-w-xl w-full">
        <p className="mb-4 text-lg">
          Have questions or need assistance with your car rental? Our team is here to help!
        </p>

        <div className="mb-4">
          <strong>Address:</strong>
          <p>GoDrive Rentals Pvt. Ltd., 45 Connaught Place, New Delhi, Delhi 110001, India</p>
        </div>

        <div className="mb-4">
          <strong>Email:</strong>
          <p>support@godrive.com</p>
        </div>

        <div className="mb-4">
          <strong>Phone:</strong>
          <p>+91-1234567890</p>
        </div>

        <div>
          <strong>Working Hours:</strong>
          <p>Mon – Sun: 9:00 AM – 9:00 PM</p>
        </div>
      </div>
    </div>
  );
}

