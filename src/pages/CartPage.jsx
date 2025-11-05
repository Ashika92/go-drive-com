import React, { useState, useEffect } from "react"; // ✅ Added useEffect
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart, updateQuantity } from "../features/cart/cartSlice";
import { useNavigate } from "react-router-dom";
import { addToWishlist } from "../features/wishlist/wishlistSlice";
import { addOrder } from "../features/orders/ordersSlice";
import toast from "react-hot-toast";

const CheckoutPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartItems = useSelector((state) => state.cart.items);

  const [itemDetails, setItemDetails] = useState(
    cartItems.map(() => ({
      rentalType: "day",
      startDate: "",
      endDate: "",
      hours: 0,
    }))
  );

  const [paymentMethod, setPaymentMethod] = useState("upi");

  // Restore checkout info after login
  useEffect(() => {
    const savedCheckout = localStorage.getItem("pendingCheckout");
    if (savedCheckout) {
      const parsed = JSON.parse(savedCheckout);
      if (parsed.itemDetails) setItemDetails(parsed.itemDetails);
      if (parsed.paymentMethod) setPaymentMethod(parsed.paymentMethod);
      localStorage.removeItem("pendingCheckout");
    }
  }, []);

  const getDaysBetween = (start, end) => {
    if (!start || !end) return 0;
    const s = new Date(start);
    const e = new Date(end);
    const diff = e - s;
    if (isNaN(diff)) return 0;
    const days = Math.ceil(diff / (1000 * 60 * 60 * 24));
    return days > 0 ? days : 1;

  };
  const handleItemChange = (index, field, value) => {
    const updated = [...itemDetails];
    updated[index][field] = value;
    setItemDetails(updated);
  };

  const calculateItemTotal = (item, index) => {
    const { rentalType, startDate, endDate, hours } = itemDetails[index];

    const qty = Number(item.quantity) || 1;
    const pricePerDay = Number(item.pricePerDay) || Number(item.price) || 0;
    const pricePerHour = Number(item.pricePerHour) || 0;

    if (rentalType === "hour") {
      const hrs = Number(hours) || 0;
      return pricePerHour * hrs * qty;
    } else {
      const days = getDaysBetween(startDate, endDate);
      return pricePerDay * (days > 0 ? days : 1) * qty;
    }
  };

  const grandTotal = cartItems.reduce(
    (sum, item, index) => sum + calculateItemTotal(item, index),
    0
  );

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center bg-transparent text-gray-800 dark:text-gray-200 transition-colors duration-500">
        <h2 className="text-2xl font-semibold mb-3">Your Cart is Empty 🛒</h2>
        <button
          onClick={() => navigate("/cars")}
          className="px-6 py-2 bg-blue-800 hover:bg-blue-600 text-white rounded-lg transition"
        >
          Browse Cars
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 bg-transparent text-gray-800 dark:text-gray-200 transition-all duration-500">
      <div className="max-w-5xl mx-auto p-4">
        <h2 className="text-3xl font-bold text-center mb-6">🚗 Checkout Page</h2>

        {cartItems.map((item, index) => {
          const { rentalType, startDate, endDate, hours } = itemDetails[index];

          const itemTotal = calculateItemTotal(item, index);

          return (
            <div
              key={item.id}
              className="card-box p-4 mb-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-3"
            >

              <div className="flex items-center gap-3 flex-1">
                {/* Added clickable image redirect */}
                <img
                  onClick={() => navigate(`/cars/${item.id}`)}
                  // ✅
                  src={item.image || "/car-placeholder.png"}
                  alt={item.name}
                  className="w-24 h-20 object-cover rounded-md border border-gray-300 cursor-pointer hover:opacity-80 transition"
                  title="View Details"
                />

                <div className="text-sm">
                  <h3 className="text-lg text-black dark:text-white font-semibold">
                    {item.name}
                  </h3>
                  <p className="text-sm text-gray-600">
                    Fuel:{" "}
                    <span className="text-gray-600 dark:text-gray-200">
                      {item.fuel || "Not specified"}
                    </span>
                  </p>
                  <p className="text-gray-600 dark:text-gray-300">
                    ₹{item.pricePerHour || 0}/hour | ₹
                    {item.pricePerDay || item.price || 0}/day
                  </p>

                  {/* Quantity Selector */}
                  <div className="flex items-center gap-2 mt-1">
                    <button
                      onClick={() =>
                        dispatch(
                          updateQuantity({
                            id: item.id,
                            quantity: Math.max((item.quantity || 1) - 1, 1),
                          })
                        )
                      }
                      className="px-2 py-1 bg-gray-300 dark:bg-gray-600 rounded text-xs"
                    >
                      -
                    </button>
                    <span className="font-semibold text-black dark:text-white">
                      {item.quantity || 1}
                    </span>
                    <button
                      onClick={() =>
                        dispatch(
                          updateQuantity({
                            id: item.id,
                            quantity: (item.quantity || 1) + 1,
                          })
                        )
                      }
                      className="px-2 py-1 bg-gray-300 dark:bg-gray-600 rounded text-xs"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>

              {/* RIGHT: Booking Controls */}
              <div className="flex flex-col gap-2 text-sm w-40">
                <div>
                  <label className="text-xs font-medium">Type</label>
                  <select
                    value={rentalType}
                    onChange={(e) =>
                      handleItemChange(index, "rentalType", e.target.value)
                    }
                    className="p-1 border rounded bg-gray-100 dark:bg-gray-700 dark:text-white text-xs w-full"
                  >
                    <option value="day">Per Day</option>
                    <option value="hour">Per Hour</option>
                  </select>
                </div>

                {rentalType === "hour" ? (
                  <>
                    <div>
                      <label className="text-xs font-medium">Date</label>
                      <input
                        type="date"
                        value={startDate}
                        onChange={(e) =>
                          handleItemChange(index, "startDate", e.target.value)
                        }
                        className="p-1 border rounded bg-gray-100 dark:bg-gray-700 dark:text-white text-xs w-full"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-medium">Hours</label>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() =>
                            handleItemChange(
                              index,
                              "hours",
                              hours > 0 ? hours - 1 : 0
                            )
                          }
                          className="px-2 py-1 bg-gray-300 dark:bg-gray-600 rounded text-xs"
                        >
                          -
                        </button>
                        <span className="font-semibold text-black">
                          {hours}
                        </span>
                        <button
                          onClick={() =>
                            handleItemChange(index, "hours", hours + 1)
                          }
                          className="px-2 py-1 bg-gray-300 dark:bg-gray-600 rounded text-xs"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <div>
                      <label className="text-xs font-medium">Start</label>
                      <input
                        type="date"
                        value={startDate}
                        onChange={(e) =>
                          handleItemChange(index, "startDate", e.target.value)
                        }
                        className="p-1 border rounded bg-gray-100 dark:bg-gray-700 dark:text-white text-xs w-full"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-medium">End</label>
                      <input
                        type="date"
                        value={endDate}
                        onChange={(e) =>
                          handleItemChange(index, "endDate", e.target.value)
                        }
                        className="p-1 border rounded bg-gray-100 dark:bg-gray-700 dark:text-white text-xs w-full"
                      />
                    </div>
                  </>
                )}

                <p className="text-sm font-semibold text-black dark:text-white mt-1">
                  ₹{itemTotal.toFixed(2)}
                </p>

                <div className="flex gap-2 mt-1">
                  <button
                    onClick={() => dispatch(removeFromCart(item.id))}
                    className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-md text-xs transition"
                  >
                    Remove
                  </button>

                  <button
                    onClick={() => {
                      dispatch(addToWishlist(item));
                      dispatch(removeFromCart(item.id));
                      toast.success(`${item.name} moved to Wishlist 💜`);
                    }}
                    className="bg-purple-700 hover:bg-purple-600 text-white px-3 py-1 rounded-md text-xs transition"
                  >
                    Wishlist
                  </button>
                </div>
              </div>
            </div>
          );
        })}

        {/* Payment Section */}
        <div className="card-box p-4 mt-5">
          <h3 className="text-lg text-black dark:text-white font-semibold mb-3">
            💳 Payment Method
          </h3>
          <div className="flex flex-col gap-2 text-sm">
            {["upi", "card", "cod"].map((method) => (
              <label key={method} className="flex items-center gap-2">
                <input
                  type="radio"
                  name="payment"
                  value={method}
                  checked={paymentMethod === method}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
                {method === "upi"
                  ? "UPI / Google Pay"
                  : method === "card"
                    ? "Credit / Debit Card"
                    : "Pay on Delivery"}
              </label>
            ))}
          </div>
        </div>

        {/* Summary Section */}
        <div className="flex flex-col md:flex-row justify-between items-center mt-6 gap-3 text-sm">
          <h3 className="text-lg font-semibold">
            Total Amount: ₹{grandTotal.toFixed(2)}
          </h3>
          <button
            onClick={() => {
              const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

              for (let i = 0; i < cartItems.length; i++) {
                const { rentalType, startDate, endDate, hours } =
                  itemDetails[i];

                if (!rentalType) {
                  toast.error(
                    `Please select rental type for ${cartItems[i].name}`
                  );
                  return;
                }

                if (rentalType === "hour") {
                  if (!startDate) {
                    toast.error(`Please select date for ${cartItems[i].name}`);
                    return;
                  }
                  if (hours <= 0) {
                    toast.error(
                      `Please set valid hours for ${cartItems[i].name}`
                    );
                    return;
                  }
                } else {
                  if (!startDate || !endDate) {
                    toast.error(
                      `Please select start and end dates for ${cartItems[i].name}`
                    );
                    return;
                  }

                  const start = new Date(startDate);
                  const end = new Date(endDate);
                  if (end < start) {
                    toast.error(
                      `End date cannot be before start date for ${cartItems[i].name}`
                    );
                    return;
                  }

                }
              }

              if (!paymentMethod) {
                toast.error("Please select a payment method before checkout");
                return;
              }


              if (!isLoggedIn) {
                const checkoutData = {
                  itemDetails,
                  paymentMethod,
                };
                localStorage.setItem(
                  "pendingCheckout",
                  JSON.stringify(checkoutData)
                );
                localStorage.setItem("redirectAfterLogin", "/cart");

                toast.error("Please login before proceeding to checkout!");
                navigate("/login");
                return;
              }


              alert("Booking Confirmed! ✅");


              dispatch(
                addOrder({
                  items: cartItems.map((item, index) => ({
                    ...item,
                    ...itemDetails[index],
                    total: calculateItemTotal(item, index),
                  })),
                  totalAmount: grandTotal,
                })
              );


              localStorage.removeItem("pendingCheckout");
              dispatch({ type: "cart/clearCart" });
              navigate("/my-orders");

            }}
            className="px-5 py-2 bg-green-700 hover:bg-green-600 text-white rounded-lg font-medium transition"
          >
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
