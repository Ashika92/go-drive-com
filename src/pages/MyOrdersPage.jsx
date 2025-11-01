/* eslint-disable */

import React, { useState } from "react";

const MyOrdersPage = ({ mode = "user" }) => {
  const [orders, setOrders] = useState([
    {
      id: 1,
      name: "Honda City",
      status: "Order Confirmed",
      price: 3500,
      date: "2025-10-30",
      expectedDate: "2025-11-02",
      details: "Pickup from Palakkad, Drop at Coimbatore",
      progress: "Order Confirmed",
      deliveredDate: null,
    },
    {
      id: 2,
      name: "Maruti Swift",
      status: "Delivered",
      price: 2800,
      date: "2025-10-25",
      expectedDate: "2025-10-27",
      details: "Pickup from Palakkad, Drop at Kochi",
      progress: "Delivered",
      deliveredDate: "2025-10-27",
    },
  ]);

  const [selectedOrder, setSelectedOrder] = useState(null);
  const [cancelReason, setCancelReason] = useState("");
  const [cancelOrderId, setCancelOrderId] = useState(null);
  const [trackOrder, setTrackOrder] = useState(null);
  const [toast, setToast] = useState(null);
  const [commandText, setCommandText] = useState("");

  const showToast = (message, type = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 2500);
  };

  const handleCancelSubmit = () => {
    if (!cancelReason.trim()) return alert("Please enter a reason!");
    setOrders((prev) =>
      prev.map((o) =>
        o.id === cancelOrderId
          ? { ...o, status: "Cancelled ❌", progress: "Cancelled" }
          : o
      )
    );
    showToast("Order cancelled successfully.", "error");
    setCancelOrderId(null);
    setCancelReason("");
  };

  const progressSteps = [
    "Ordered",
    "Order Confirmed",
    "Ready for Delivery",
    "Delivered",
  ];

  const getProgressIndex = (progress) =>
    progressSteps.indexOf(progress) + 1 || 0;

  const advanceTracking = (id) => {
    setOrders((prev) =>
      prev.map((o) => {
        if (o.id === id && o.progress !== "Delivered") {
          const nextStep =
            progressSteps[getProgressIndex(o.progress)] || "Delivered";
          const isDelivered = nextStep === "Delivered";
          return {
            ...o,
            progress: nextStep,
            status: nextStep,
            deliveredDate: isDelivered
              ? new Date().toISOString().slice(0, 10)
              : o.deliveredDate,
          };
        }
        return o;
      })
    );
    showToast("Booking status updated ✅");
  };

  const handleCommandSubmit = (orderId) => {
    if (!commandText.trim()) return;
    showToast("Message sent successfully ✅");
    setCommandText("");
  };

  return (
    <div className="min-h-screen pt-24 bg-transparent text-gray-800 dark:text-gray-200 transition-all duration-500 relative">
      <div className="max-w-5xl mx-auto p-4">
        <h2 className="text-3xl font-bold text-center mb-6">
          {mode === "agency" ? "🏢 Booking Dashboard" : "🚘 My Orders"}
        </h2>

        {orders.length === 0 ? (
          <p className="text-center text-gray-500">No car bookings yet.</p>
        ) : (
          orders.map((order) => (
            <div
              key={order.id}
              className="p-4 mb-4 flex justify-between items-center flex-col md:flex-row gap-3 
              border dark:border-gray-700 rounded-lg shadow-md 
              bg-white dark:bg-gray-900 transition-all duration-300"
            >
              <div className="w-full md:w-2/3">
                <h3 className="text-lg text-black font-semibold">
                  {order.name}
                </h3>
                <p className="text-gray-800">Booked On: {order.date}</p>
                <p className="text-gray-800">
                  Expected Delivery: {order.expectedDate}
                </p>
                {order.deliveredDate && (
                  <p className="text-green-800 font-medium">
                    Delivered On: {order.deliveredDate}
                  </p>
                )}
                <p className="text-gray-800">Total: ₹{order.price}</p>
                <p className="font-semibold text-black">
                  Status: {order.status}
                </p>
              </div>

              <div className="flex flex-col gap-2">
                {/* USER MODE BUTTONS */}
                {mode === "user" && (
                  <>
                    <button
                      onClick={() => setSelectedOrder(order)}
                      className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-sm"
                    >
                      View Details
                    </button>

                    {order.status === "Order Confirmed" && (
                      <button
                        onClick={() => setCancelOrderId(order.id)}
                        className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-sm"
                      >
                        Cancel Order
                      </button>
                    )}

                    {order.status !== "Cancelled ❌" && (
                      <button
                        onClick={() => setTrackOrder(order)}
                        className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded text-sm"
                      >
                        Track Order
                      </button>
                    )}
                  </>
                )}

                {/* 🌟 AGENCY MODE BUTTONS (gradient-styled) */}
                {mode === "agency" && (
                  <div className="flex flex-wrap gap-3 mt-3">
                    {/* View Details button (gradient style) */}
                    <button
                      onClick={() => setSelectedOrder(order)}
                      className="bg-gradient-to-r from-purple-600 to-cyan-500 hover:from-purple-700 hover:to-cyan-600 text-white px-3 py-1 rounded-full text-sm font-semibold shadow-md hover:shadow-lg transition-transform transform hover:scale-105"
                    >
                      View Details
                    </button>

                    {/* Order Request button */}
                    <button
                      onClick={() => advanceTracking(order.id)}
                      className="bg-gradient-to-r from-purple-600 to-cyan-500 hover:from-purple-700 hover:to-cyan-600 text-white px-3 py-1 rounded-full text-sm font-semibold shadow-md hover:shadow-lg transition-transform transform hover:scale-105"
                    >
                      Order Request
                    </button>

                    {/* Cancel Request button */}
                    <button
                      onClick={() => handleCancelSubmit(order.id)}
                      className="bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white px-3 py-1 rounded-full text-sm font-semibold shadow-md hover:shadow-lg transition-transform transform hover:scale-105"
                    >
                      Cancel Request
                    </button>

                    {/* Track Request button */}
                    <button
                      onClick={() => setTrackOrder(order)}
                      className="bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600 text-white px-3 py-1 rounded-full text-sm font-semibold shadow-md hover:shadow-lg transition-transform transform hover:scale-105"
                    >
                      Track Request
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))
        )}

        {orders.length > 0 && mode === "user" && (
          <div className="flex justify-center mt-8">
            <button
              onClick={() => {
                setOrders([]);
                showToast("Order history cleared 🧹");
              }}
              className="px-20 py-2 bg-gradient-to-r from-purple-600 to-cyan-500 dark:from-purple-700 dark:to-cyan-600 text-gray-900 dark:text-white font-semibold rounded-full shadow-md hover:shadow-lg transition-transform transform hover:scale-105"
            >
              Clear History
            </button>
          </div>
        )}
      </div>

      {/* (Modals & Toast stay unchanged here) */}
    </div>
  );
};

export default MyOrdersPage;
