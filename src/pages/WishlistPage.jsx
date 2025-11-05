import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeFromWishlist } from "../features/wishlist/wishlistSlice";
import { addToCart } from "../features/cart/cartSlice";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const WishlistPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const wishlist = useSelector((state) => state.wishlist.items);

  if (wishlist.length === 0) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center bg-transparent text-gray-800 dark:text-gray-200 transition">
        <h2 className="text-2xl font-semibold mb-3">Your Wishlist is Empty </h2>
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
    <div className="min-h-screen pt-24 max-w-5xl mx-auto p-4 text-gray-800 dark:text-gray-200 transition-all duration-500">
      <h2 className="text-3xl font-bold text-center mb-6"> My Wishlist</h2>

      {wishlist.map((item) => (
        <div
          key={item.id}
          className="card-box p-4 mb-4 flex justify-between items-center flex-col md:flex-row gap-3"
        >
          <div className="flex items-center gap-4 flex-1">
            {/*Added clickable image */}
            <img
              onClick={() => navigate(`/cars/${item.id}`)}
 
              src={item.image || "/car-placeholder.png"}
              alt={item.name}
              className="w-24 h-20 object-cover rounded-md border border-gray-300 cursor-pointer hover:opacity-80 transition" 
              title="View Details"
            />

            <div>
              <h3 className="text-lg text-black font-semibold">{item.name}</h3>
              <p className="text-gray-800">
                ₹{item.pricePerDay || item.price}/day
              </p>
            </div>
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => {
                dispatch(addToCart(item));
                dispatch(removeFromWishlist(item.id));
                toast.success(`${item.name} moved to Cart 🛒`);
              }}
              className="bg-green-700 hover:bg-green-600 text-white px-3 py-1 rounded text-sm transition"
            >
              Add to Cart
            </button>

            <button
              onClick={() => dispatch(removeFromWishlist(item.id))}
              className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-sm"
            >
              Remove
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default WishlistPage;
