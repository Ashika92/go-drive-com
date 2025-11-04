// src/features/orders/ordersSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: JSON.parse(localStorage.getItem("orders")) || [],
};

const ordersSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    // ✅ Add new order (each car gets its own entry but keeps same structure)
    addOrder: (state, action) => {
      const { items, totalAmount } = action.payload;

      const newOrders = items.map((car) => ({
        id: Date.now() + Math.floor(Math.random() * 10000),
        date: new Date().toLocaleDateString(),
        expectedDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toLocaleDateString(),
        status: "Ordered",
        price: car.price || totalAmount / items.length,
        cars: [car], // ✅ keep cars as array so your UI still works (and shows image)
      }));

      state.items.push(...newOrders);
      localStorage.setItem("orders", JSON.stringify(state.items));
    },

    // Request cancellation (from user)
    requestCancellation: (state, action) => {
      const { id, cancelReason } = action.payload;
      const order = state.items.find((o) => o.id === id);
      if (order && order.status === "Ordered") {
        order.status = "Cancellation Requested";
        order.cancelReason = cancelReason || "";
        localStorage.setItem("orders", JSON.stringify(state.items));
      }
    },

    // Confirm cancellation (agency)
    confirmCancellation: (state, action) => {
      const id = action.payload;
      const order = state.items.find((o) => o.id === id);
      if (order && (order.status === "Cancellation Requested" || order.status === "Ordered")) {
        order.status = "Cancelled";
        order.cancelledDate = new Date().toLocaleDateString();
        localStorage.setItem("orders", JSON.stringify(state.items));
      }
    },

    // Reject cancellation (agency)
    rejectCancellation: (state, action) => {
      const id = action.payload;
      const order = state.items.find((o) => o.id === id);
      if (order && order.status === "Cancellation Requested") {
        order.status = "Ordered";
        delete order.cancelReason;
        localStorage.setItem("orders", JSON.stringify(state.items));
      }
    },

    // Mark as delivered
    markAsDelivered: (state, action) => {
      const id = action.payload;
      const order = state.items.find((o) => o.id === id);
      if (order && order.status !== "Cancelled") {
        order.status = "Delivered";
        order.deliveredDate = new Date().toLocaleDateString();
        localStorage.setItem("orders", JSON.stringify(state.items));
      }
    },

    // Update order status
    updateOrderStatus: (state, action) => {
      const { id, newStatus } = action.payload;
      const order = state.items.find((o) => o.id === id);
      if (order) {
        order.status = newStatus;
        if (newStatus === "Delivered") {
          order.deliveredDate = new Date().toLocaleDateString();
        }
        localStorage.setItem("orders", JSON.stringify(state.items));
      }
    },

    // Clear all
    clearOrders: (state) => {
      state.items = [];
      localStorage.removeItem("orders");
    },
  },
});

export const {
  addOrder,
  clearOrders,
  updateOrderStatus,
  requestCancellation,
  confirmCancellation,
  rejectCancellation,
  markAsDelivered,
} = ordersSlice.actions;

export const selectOrders = (state) => state.orders.items || [];

export default ordersSlice.reducer;
