// src/pages/Terms.jsx
import React from "react";

const Terms = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200 pt-24 p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        <h1 className="text-3xl font-bold text-center mb-4">Terms & Conditions</h1>
        <p>
          Welcome to <strong>GoDrive.com</strong>. By accessing or using our services,
          you agree to comply with the following terms and conditions. Please
          read them carefully before using our website.
        </p>

        <h2 className="text-xl font-semibold mt-4">1. Booking Policy</h2>
        <p>
          All car bookings made through our platform are subject to
          availability. The booking is confirmed only after successful payment
          and verification.
        </p>

        <h2 className="text-xl font-semibold mt-4">2. Cancellations & Refunds</h2>
        <p>
          Users can request order cancellations prior to dispatch. Once the car
          is delivered, cancellations will not be accepted. Refunds (if
          applicable) will be processed within 7–10 business days.
        </p>

        <h2 className="text-xl font-semibold mt-4">3. User Responsibilities</h2>
        <p>
          Users are responsible for providing accurate information during
          booking. Any misuse, false claims, or policy violations may lead to
          account suspension.
        </p>

        <h2 className="text-xl font-semibold mt-4">4. Privacy Protection</h2>
        <p>
          We value your privacy. All user information is stored securely and
          will not be shared with third parties without consent.
        </p>

        <h2 className="text-xl font-semibold mt-4">5. Modifications</h2>
        <p>
          GoDrive.com reserves the right to modify these terms at any time.
          Continued use of the platform implies acceptance of the updated terms.
        </p>

        <p className="mt-8 text-center text-sm text-gray-500">
          Last updated: {new Date().toLocaleDateString()}
        </p>
      </div>
    </div>
  );
};

export default Terms;
