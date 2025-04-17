import { useState } from "react";
import { useSelector } from "react-redux";
import { ShoppingBasket } from "lucide-react";
import { selectCartItems } from "../redux/cartSlice";
import BasketModal from "./BasketModal";

function CartSummary() {
    const [isOpen, setIsOpen] = useState(false);
    const cartItems = useSelector(selectCartItems);
    const count = cartItems.reduce((sum, item) => sum + item.qty, 0);
    const toggleModal = () => setIsOpen(!isOpen);

    return (
        <>
            <nav
                onClick={toggleModal}
                className="absolute top-4 right-4 md:right-8 cursor-pointer z-50"
            >
                <div className="relative flex flex-col items-center">
                    {/* 未來感 Badge */}
                    {count > 0 && (
                        <span className="absolute -top-2 -right-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-black text-xs font-bold px-2 py-0.5 rounded-full shadow-md" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                            {count}
                        </span>
                    )}

                    {/* 購物籃圖示外框 */}
                    <div className="p-1 bg-black bg-opacity-50 rounded-xl shadow-lg backdrop-blur-lg hover:scale-105 transition-transform">
                        <ShoppingBasket
                            strokeWidth={1.8}
                            className="w-7 h-7 text-white"
                        />
                    </div>

                    {/* Shopping Bag 文字：無背景 */}
                    <p className="text-[10px] text-white text-center mt-1 opacity-80 tracking-wide" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                        Shopping Bag
                    </p>
                </div>
            </nav>

            <BasketModal isOpen={isOpen} toggleModal={toggleModal} />
        </>
    );
}

export default CartSummary;