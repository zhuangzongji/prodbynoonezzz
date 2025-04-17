import { useState } from "react";
import { ShoppingBasket } from "lucide-react";
import { useDispatch } from "react-redux";
import { addCartItems } from "../redux/cartSlice";

export default function AddToBasket({ product, qty }) {
  const dispatch = useDispatch();
  const [showToast, setShowToast] = useState(false);

  const addToCart = () => {
    setShowToast(true);
    dispatch(addCartItems({
      id: product.id,
      name: product.title,
      image: product.cover,
      price: product.price,
      countInStock: product.stock,
      qty,
    }));
    setTimeout(() => {
      setShowToast(false);
    }, 2000);
  };

  return (
    <>
      <div className="flex justify-center mt-4">
  <button
    onClick={addToCart}
    className="flex items-center justify-center bg-gradient-to-r from-purple-700 via-purple-500 to-orange-500 text-white px-6 py-3 rounded-xl shadow-xl hover:scale-105 transition-all duration-300"
    style={{ fontFamily: 'Orbitron, sans-serif' }}
  >
    <ShoppingBasket
      strokeWidth={1.5}
      className="w-5 h-5 md:w-6 md:h-6 text-white"
    />
    <span className="ml-3 text-sm md:text-base tracking-wide">ADD TO BASKET</span>
  </button>
</div>

      {showToast && (
        <div className="toast toast-end z-50">
          <div className="alert bg-black bg-opacity-80 border border-purple-400 text-white backdrop-blur-md rounded-lg shadow-lg px-4 py-3 transition-all duration-300">
            <span
              style={{ fontFamily: 'Orbitron, sans-serif' }}
              className="text-sm"
            >
              {qty} {qty > 1 ? "pieces" : "piece"} of <strong>{product.title}</strong> {qty > 1 ? "have" : "has"} been added to your cart.
            </span>
          </div>
        </div>
      )}
    </>
  );
}