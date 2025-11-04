// src/features/orders/ordersSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: JSON.parse(localStorage.getItem("orders")) || [],
};

const ordersSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    // Add new order (called when user clicks Proceed to Pay)
    addOrder: (state, action) => {
      const { items, totalAmount } = action.payload;

      const newOrder = {
        id: Date.now(),
        date: new Date().toLocaleDateString(),
        expectedDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toLocaleDateString(), // example 5 days later
        status: "Ordered",
        price: totalAmount,
        cars: items, // include all car details here
      };

      state.items.push(newOrder);
      localStorage.setItem("orders", JSON.stringify(state.items));
    },

    // Request cancellation (from user side) — accepts payload { id, cancelReason }
    requestCancellation: (state, action) => {
      const { id, cancelReason } = action.payload;
      const order = state.items.find((o) => o.id === id);
      if (order && order.status === "Ordered") {
        order.status = "Cancellation Requested";
        order.cancelReason = cancelReason || "";
        localStorage.setItem("orders", JSON.stringify(state.items));
      }
    },

    // Confirm cancellation (from agency side)
    confirmCancellation: (state, action) => {
  const id = action.payload;
  const order = state.items.find((o) => o.id === id);
  if (order && (order.status === "Cancellation Requested" || order.status === "Ordered")) {
    order.status = "Cancelled";
    order.cancelledDate = new Date().toLocaleDateString(); // ✅ Add cancellation date
    localStorage.setItem("orders", JSON.stringify(state.items));
  }
},

    // Reject a cancellation request (agency denies) - revert to Ordered and remove cancelReason
    rejectCancellation: (state, action) => {
      const id = action.payload;
      const order = state.items.find((o) => o.id === id);
      if (order && order.status === "Cancellation Requested") {
        order.status = "Ordered";
        // optional: keep a history or remove reason — here we remove the cancelReason
        delete order.cancelReason;
        localStorage.setItem("orders", JSON.stringify(state.items));
      }
    },

    // Mark order as delivered (from agency side)
    markAsDelivered: (state, action) => {
  const id = action.payload;
  const order = state.items.find((o) => o.id === id);
  if (order && order.status !== "Cancelled") {
    order.status = "Delivered";
    order.deliveredDate = new Date().toLocaleDateString(); // ✅ Add delivery date
    localStorage.setItem("orders", JSON.stringify(state.items));
  }
},

    // Update order status (for any custom changes) - accepts { id, newStatus }
    updateOrderStatus: (state, action) => {
      const { id, newStatus } = action.payload;
      const order = state.items.find((o) => o.id === id);
      if (order) {
        order.status = newStatus;
        // set deliveredDate if applicable
        if (newStatus === "Delivered") {
          order.deliveredDate = new Date().toLocaleDateString();
        }
        localStorage.setItem("orders", JSON.stringify(state.items));
      }
    },

    // Clear all order history
    clearOrders: (state) => {
      state.items = [];
      localStorage.removeItem("orders");
    },
  },
});

// Export actions
export const {
  addOrder,
  clearOrders,
  updateOrderStatus,
  requestCancellation,
  confirmCancellation,
  rejectCancellation,
  markAsDelivered,
} = ordersSlice.actions;

// Selector for AgencyDashboard and other components
export const selectOrders = (state) => state.orders.items || [];

export default ordersSlice.reducer;
