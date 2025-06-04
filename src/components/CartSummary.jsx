import { useState } from "react";
import { useSelector } from "react-redux";
import { ShoppingBasket } from "lucide-react";
import { selectCartItems } from "../redux/cartSlice";
import BasketModal from "./BasketModal";

function CartSummary() {
  const [isOpen, setIsOpen] = useState(false);
  const [hovered, setHovered] = useState(false);
  const cartItems = useSelector(selectCartItems);
  const count = cartItems.reduce((sum, item) => sum + item.qty, 0);
  const toggleModal = () => setIsOpen(!isOpen);

  return (
    <>
      <nav
        onClick={toggleModal}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className="absolute top-4 right-4 md:right-8 cursor-pointer z-50"
      >
        <div className="relative flex flex-col items-center justify-center w-[80px] h-[80px]">
          {/* 未來感 Badge */}
          {count > 0 && (
            <span
              className="absolute -top-1 -right-1 bg-gradient-to-r from-yellow-400 to-orange-500 text-black text-xs font-bold px-2 py-0.5 rounded-full shadow-md"
              style={{ fontFamily: "Orbitron, sans-serif" }}
            >
              {count}
            </span>
          )}

          {/* 購物籃圖示 */}
          <div
            className={`p-2 bg-black bg-opacity-50 rounded-2xl shadow-lg  transition-transform duration-300 ${
              hovered ? "scale-175" : "scale-150"
            }`}
          >
            <ShoppingBasket
              strokeWidth={1.8}
              className="w-7 h-7 text-white transition-colors"
            />
          </div>

          {/* 滑出 CART 字樣 */}
          <div
            className={`absolute top-[60px] text-m font-semibold text-white bg-black px-3 py-1 rounded-full transition-all duration-300 ${
              hovered
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-2 pointer-events-none"
            }`}
            style={{
              fontFamily: "Orbitron, sans-serif",
            }}
          >
            CART
          </div>
        </div>
      </nav>

      <BasketModal isOpen={isOpen} toggleModal={toggleModal} />
    </>
  );
}

export default CartSummary;