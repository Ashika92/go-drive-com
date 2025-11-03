/* eslint-disable */
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { clearOrders } from "../features/orders/ordersSlice";

const MyOrdersPage = ({ mode = "user" }) => {
  const dispatch = useDispatch();
  const orders = useSelector((state) => state.orders.items); // ✅ Fetch from Redux

  const [selectedOrder, setSelectedOrder] = useState(null);
  const [trackOrder, setTrackOrder] = useState(null);
  const [toast, setToast] = useState(null);

  const showToast = (message, type = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 2500);
  };

  const progressSteps = [
    "Ordered",
    "Order Confirmed",
    "Ready for Delivery",
    "Delivered",
  ];
  const getProgressIndex = (progress) =>
    progressSteps.indexOf(progress) + 1 || 0;

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
                <h3 className="text-lg text-black dark:text-white font-semibold">
                  Booking ID: {order.id}
                </h3>
                <p className="text-gray-800 dark:text-gray-300">
                  Booked On: {order.date}
                </p>
                <p className="text-gray-800 dark:text-gray-300">
                  Expected Delivery: {order.expectedDate}
                </p>
                <p className="text-gray-800 dark:text-gray-300">
                  Status:{" "}
                  <span className="font-semibold text-black dark:text-white">
                    {order.status || "Ordered"}
                  </span>
                </p>
                <p className="text-gray-800 dark:text-gray-300">
                  Total Amount: ₹{order.price}
                </p>

                {/* ✅ List Cars in This Order */}
                {order.cars && order.cars.length > 0 && (
                  <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {order.cars.map((car) => (
                      <div
                        key={car.id}
                        className="flex items-center gap-3 border p-2 rounded-md bg-gray-50 dark:bg-gray-800"
                      >
                        <img
                          src={car.image || "/car-placeholder.png"}
                          alt={car.name}
                          className="w-20 h-16 object-cover rounded"
                        />
                        <div>
                          <h4 className="font-semibold text-black dark:text-white">
                            {car.name}
                          </h4>
                          <p className="text-sm text-gray-700 dark:text-gray-300">
                            Type: {car.rentalType}
                          </p>
                          <p className="text-sm text-gray-700 dark:text-gray-300">
                            {car.rentalType === "day"
                              ? `${car.startDate} → ${car.endDate}`
                              : `${car.hours} hour(s)`}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="flex flex-col gap-2">
                {mode === "user" && (
                  <>
                    <button
                      onClick={() => setSelectedOrder(order)}
                      className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-sm"
                    >
                      View Details
                    </button>

                    <button
                      onClick={() => setTrackOrder(order)}
                      className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded text-sm"
                    >
                      Track Order
                    </button>
                  </>
                )}
              </div>
            </div>
          ))
        )}

        {orders.length > 0 && mode === "user" && (
          <div className="flex justify-center mt-8">
            <button
              onClick={() => {
                dispatch(clearOrders());
                showToast("Order history cleared 🧹");
              }}
              className="px-20 py-2 bg-gradient-to-r from-purple-600 to-cyan-500 dark:from-purple-700 dark:to-cyan-600 text-gray-900 dark:text-white font-semibold rounded-full shadow-md hover:shadow-lg transition-transform transform hover:scale-105"
            >
              Clear History
            </button>
          </div>
        )}
      </div>

      {/* ✅ View Details Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50 p-4">
          <div className="bg-white dark:bg-gray-900 rounded-lg p-6 max-w-lg w-full shadow-lg">
            <h3 className="text-2xl font-semibold mb-4 text-center text-black dark:text-white">
              Booking Details
            </h3>
            <p>📦 Booking ID: {selectedOrder.id}</p>
            <p>📅 Booked On: {selectedOrder.date}</p>
            <p>🚚 Expected Delivery: {selectedOrder.expectedDate}</p>
            <p>💰 Total Amount: ₹{selectedOrder.price}</p>
            <p>📍 Status: {selectedOrder.status}</p>

            <h4 className="font-semibold mt-4 mb-2">Car Details:</h4>
            {selectedOrder.cars?.map((car) => (
              <div key={car.id} className="border p-2 rounded mb-2">
                <p>🚗 {car.name}</p>
                <p>Type: {car.rentalType}</p>
                <p>
                  {car.rentalType === "day"
                    ? `${car.startDate} → ${car.endDate}`
                    : `${car.hours} hour(s)`}
                </p>
              </div>
            ))}

            <button
              onClick={() => setSelectedOrder(null)}
              className="mt-4 w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* ✅ Track Order Modal */}
      {trackOrder && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50 p-4">
          <div className="bg-white dark:bg-gray-900 rounded-lg p-6 max-w-md w-full shadow-lg">
            <h3 className="text-2xl font-semibold mb-4 text-center text-black dark:text-white">
              Track Order
            </h3>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              Booking ID: {trackOrder.id}
            </p>

            {/* Progress bar */}
            <div className="flex justify-between text-sm mb-2">
              {progressSteps.map((step, index) => (
                <div
                  key={index}
                  className={`flex-1 text-center ${
                    index + 1 <= getProgressIndex(trackOrder.status)
                      ? "text-green-500 font-semibold"
                      : "text-gray-500"
                  }`}
                >
                  {step}
                </div>
              ))}
            </div>

            <div className="w-full h-2 bg-gray-300 dark:bg-gray-700 rounded-full">
              <div
                className="h-2 bg-green-500 rounded-full transition-all duration-500"
                style={{
                  width: `${
                    (getProgressIndex(trackOrder.status) /
                      progressSteps.length) *
                    100
                  }%`,
                }}
              ></div>
            </div>

            <button
              onClick={() => setTrackOrder(null)}
              className="mt-6 w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* ✅ Toast */}
      {toast && (
        <div
          className={`fixed bottom-5 right-5 px-4 py-2 rounded text-white ${
            toast.type === "error" ? "bg-red-600" : "bg-green-600"
          }`}
        >
          {toast.message}
        </div>
      )}
    </div>
  );
};

export default MyOrdersPage;
