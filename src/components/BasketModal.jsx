import { Link } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { addCartItems, removeCartItems, selectCartItems } from "../redux/cartSlice";
import { ShoppingBasket } from "lucide-react";

export default function BasketModal({ isOpen, toggleModal }) {
   const dispatch = useDispatch();
   const cartItems = useSelector(selectCartItems);

   const handleCancel = () => toggleModal(!isOpen);
   const getTotalPrice = () => {
      return cartItems.length > 0
         ? cartItems.reduce((sum, item) => sum + item.price * item.qty, 0)
         : 0;
   };

   return (
      <>
         {isOpen && (
            <div className="modal modal-open bg-black bg-opacity-70 backdrop-blur-sm z-50">
               <div className="modal-box max-w-2xl p-6 rounded-2xl shadow-2xl border border-purple-700 bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] text-white relative" style={{ fontFamily: 'Orbitron, sans-serif' }}>

                  {/* Modal 標題 */}
                  <h3 className="text-2xl text-yellow-400 mb-4">
                     Shopping Basket
                  </h3>

                  {/* 購物車內容 */}
                  {cartItems.length === 0 ? (
                     <div className="text-center text-gray-400 tracking-wide">
                        Your cart is empty.
                     </div>
                  ) : (
                     <ul className="space-y-5 max-h-[55vh] overflow-y-auto pr-1">
                        {cartItems.map(item => (
                           <li
                              key={item.id}
                              className="flex items-center justify-between bg-black bg-opacity-30 rounded-xl p-3 border border-gray-700 shadow-inner"
                           >
                              {/* 左側圖片 */}
                              <Link
                                 to={`/products/id/${item.id}?qtyFromBasket=${item.qty}`}
                                 onClick={handleCancel}
                              >
                                 <img
                                    className="w-16 h-16 rounded-md object-cover hover:scale-105 transition-transform"
                                    src={item.image}
                                    alt={item.name}
                                 />
                              </Link>

                              {/* 商品資訊 */}
                              <div className="flex-1 mx-4">
                                 <div className="text-base mb-1">{item.name}</div>
                                 <div className="flex items-center space-x-2 text-sm text-gray-300">
                                    <span>Quantity:</span>
                                    <span className="text-white">1</span> {/* 固定顯示數量為 1 */}
                                 </div>
                              </div>

                              {/* 價格與移除 */}
                              <div className="text-right">
                                 <div className="text-yellow-300 font-bold">${item.price * item.qty}</div>
                                 <button
                                    className="text-red-500 text-2xl mt-1 hover:scale-110 transition-transform p-2 "
                                    onClick={() => dispatch(removeCartItems(item.id))}
                                 >
                                    ×
                                 </button>
                              </div>
                           </li>
                        ))}
                     </ul>
                  )}

                  {/* 總計 */}
                  <div className="flex justify-between items-center mt-6 text-lg text-white border-t border-gray-600 pt-4">
                     <span>Total</span>
                     <span className="text-yellow-400">${getTotalPrice()}</span>
                  </div>

                  {/* 結帳按鈕 */}
                  <button
                     className="w-full mt-6 py-3 rounded-xl bg-gradient-to-r from-yellow-400 via-pink-500 to-red-500 text-white tracking-wider shadow-md hover:scale-105 transition-transform flex items-center justify-center"
                  >
                     <ShoppingBasket className="w-5 h-5 mr-3" />
                     START CHECKOUT
                  </button>

                  {/* 關閉按鈕 */}
                  <button
                     onClick={handleCancel}
                     className="absolute top-3 right-4 text-gray-300 hover:text-red-400 transition-colors text-2xl p-3 bg-brown-200 bg-opacity-10"
                  >
                     ✕
                  </button>
               </div>
            </div>
         )}
      </>
   );
}