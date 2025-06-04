import { useState } from "react";
import { Menu, X } from "lucide-react";
import CartSummary from "./CartSummary";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/authSlice";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import AuthButtons from "./AuthButtons";

function MobileMenu({ onSignInClick }) {
  const [open, setOpen] = useState(false);
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();

  const handleLogoutClick = async () => {
    try {
      await signOut(auth);
      dispatch(logout());
    } catch (error) {
      console.error("登出失敗:", error);
      alert("登出失敗，請稍後再試");
    }
  };

  return (
    <div className="md:hidden z-50 relative">
      {/* Hamburger / Close */}
      <button
        onClick={() => setOpen(!open)}
        className="text-white p-2 focus:outline-none"
      >
        {open ? <X size={28} /> : <Menu size={28} />}
      </button>

      {/* Dropdown */}
      {open && (
        <div className="absolute right-0 mt-2 w-48 bg-black rounded-lg shadow-lg py-2 px-4 space-y-4 text-white text-sm" style={{ fontFamily: "Orbitron, sans-serif" }}>
          {user ? (
            <div className="flex items-center justify-between">
              <img
                src={user.photo}
                alt={user.name}
                className="w-8 h-8 rounded-full"
              />
              <button onClick={handleLogoutClick} className="hover:underline">
                Logout
              </button>
            </div>
          ) : (
            <AuthButtons onSignInClick={onSignInClick} />
          )}

          <div className="border-t border-gray-600 pt-2">
            <CartSummary />
          </div>
        </div>
      )}
    </div>
  );
}

export default MobileMenu;