// src/features/bookings/bookingsSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  bookings: JSON.parse(localStorage.getItem("bookings")) || [], // 
};

const bookingsSlice = createSlice({
  name: "bookings",
  initialState,
  reducers: {
    addBooking: (state, action) => {
      state.bookings.push(action.payload);
      localStorage.setItem("bookings", JSON.stringify(state.bookings)); // 
    },
    updateBookingStatus: (state, action) => {
      const { id, newStatus } = action.payload;
      const booking = state.bookings.find((b) => b.id === id);
      if (booking) booking.status = newStatus;
      localStorage.setItem("bookings", JSON.stringify(state.bookings)); // 
    },
    deleteBooking: (state, action) => {
      state.bookings = state.bookings.filter((b) => b.id !== action.payload);
      localStorage.setItem("bookings", JSON.stringify(state.bookings)); // 
    },
    clearBookings: (state) => {
      state.bookings = [];
      localStorage.removeItem("bookings"); // ✅ Clear only bookings
    },
  },
});

export const {
  addBooking,
  updateBookingStatus,
  deleteBooking,
  clearBookings,
} = bookingsSlice.actions;

export default bookingsSlice.reducer;
