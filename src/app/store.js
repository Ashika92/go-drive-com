import { configureStore } from '@reduxjs/toolkit'
import counterReducer from '../features/counter/counterSlice'
import cartReducer from '../features/cart/cartSlice' 
import wishlistReducer from "../features/wishlist/wishlistSlice";  // 🆕 add this line

export default configureStore({
  reducer: {
    counter: counterReducer,
    cart: cartReducer,
    wishlist: wishlistReducer,   // 🆕 add this line
  }
})

