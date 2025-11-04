import { configureStore } from '@reduxjs/toolkit'
import counterReducer from '../features/counter/counterSlice'
import cartReducer from '../features/cart/cartSlice' 
import wishlistReducer from "../features/wishlist/wishlistSlice";
import ordersReducer from "../features/orders/ordersSlice" 
import bookingsReducer from "../features/bookings/bookingsSlice"; // 🆕 add this line

export default configureStore({
  reducer: {
    counter: counterReducer,
    cart: cartReducer,
    wishlist: wishlistReducer,
    orders: ordersReducer, 
    bookings: bookingsReducer,   // 🆕 add this line
  }
})

