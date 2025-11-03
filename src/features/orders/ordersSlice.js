// src/features/orders/ordersSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: JSON.parse(localStorage.getItem("orders")) || [],
};

const ordersSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    // ✅ Add new order (called when user clicks Proceed to Pay)
    addOrder: (state, action) => {
      const { items, totalAmount } = action.payload;

      const newOrder = {
        id: Date.now(),
        date: new Date().toLocaleDateString(),
        expectedDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toLocaleDateString(), // example 5 days later
        status: "Ordered",
        price: totalAmount,
        cars: items, // ✅ include all car details here
      };

      state.items.push(newOrder);
      localStorage.setItem("orders", JSON.stringify(state.items));
    },

    // ✅ Update status (for agency dashboard tracking)
    updateOrderStatus: (state, action) => {
      const { id, newStatus } = action.payload;
      const order = state.items.find((o) => o.id === id);
      if (order) {
        order.status = newStatus;
        localStorage.setItem("orders", JSON.stringify(state.items));
      }
    },

    // ✅ Clear order history
    clearOrders: (state) => {
      state.items = [];
      localStorage.removeItem("orders");
    },
  },
});

export const { addOrder, clearOrders, updateOrderStatus } = ordersSlice.actions;
export default ordersSlice.reducer;
