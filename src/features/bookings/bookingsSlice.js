// src/features/bookings/bookingsSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  bookings: JSON.parse(localStorage.getItem("bookings")) || [
    {
      id: "BK20251104-001",
      carName: "Honda City",
      customer: "Arjun Menon",
      startDate: "2025-11-02",
      endDate: "2025-11-05",
      pickup: "Palakkad",
      dropoff: "Kochi",
      status: "Ongoing",
      total: "₹4,500",
      paymentStatus: "Paid",
    },
    {
      id: "BK20251103-002",
      carName: "Maruti Swift",
      customer: "Diya Raj",
      startDate: "2025-11-01",
      endDate: "2025-11-02",
      pickup: "Kozhikode",
      dropoff: "Palakkad",
      status: "Completed",
      total: "₹2,000",
      paymentStatus: "Paid",
    },
  ],
};

const bookingsSlice = createSlice({
  name: "bookings",
  initialState,
  reducers: {
    addBooking: (state, action) => {
      state.bookings.push(action.payload);
      localStorage.setItem("bookings", JSON.stringify(state.bookings)); // ✅ Persist
    },
    updateBookingStatus: (state, action) => {
      const { id, newStatus } = action.payload;
      const booking = state.bookings.find((b) => b.id === id);
      if (booking) booking.status = newStatus;
      localStorage.setItem("bookings", JSON.stringify(state.bookings)); // ✅ Persist update
    },
    deleteBooking: (state, action) => {
      state.bookings = state.bookings.filter((b) => b.id !== action.payload);
      localStorage.setItem("bookings", JSON.stringify(state.bookings)); // ✅ Persist delete
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