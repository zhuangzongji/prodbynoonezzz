import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signInWithPopup, signOut } from "firebase/auth";
import { auth, provider } from "../firebase";
import { setUser, logout } from "../redux/authSlice";
import CartSummary from "./CartSummary";
import AuthButtons from "./AuthButtons";
import MobileMenu from "./MobileMenu";

// 打字機效果，只打出 "Are you sure ?"
function useTypewriterEffect(text, speed = 120) {
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      if (index < text.length) {
        setDisplayedText((prev) => prev + text.charAt(index));
        index++;
      } else {
        clearInterval(interval);
      }
    }, speed);
    return () => clearInterval(interval);
  }, [text, speed]);

  return displayedText;
}

function Header({ title, slogan }) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const [hovered, setHovered] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const typewriterText = useTypewriterEffect("Are you sure ?", 120);

  const handleSignInClick = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      dispatch(
        setUser({
          name: user.displayName,
          email: user.email,
          photo: user.photoURL,
        })
      );
    } catch (error) {
      if (error.code === "auth/popup-closed-by-user") {
        console.warn("使用者關閉登入視窗");
      } else {
        console.error("登入失敗:", error);
        alert("登入失敗，請稍後再試");
      }
    }
  };

  const handleConfirmLogout = async () => {
    try {
      await signOut(auth);
      dispatch(logout());
      setShowLogoutModal(false);
    } catch (error) {
      console.error("登出失敗:", error);
      alert("登出失敗，請稍後再試");
    }
  };

  const handleCancelLogout = () => {
    setShowLogoutModal(false);
  };

  const handleAvatarClick = () => {
    setShowLogoutModal(true);
  };

  return (
    <header className="relative text-center flex flex-col items-center header">
      {/* 桌面版：右上角 Login + Cart */}
      <div className="hidden md:flex fixed top-4 right-4 gap-4 z-50">
        {user ? (
          <div
            onClick={handleAvatarClick}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            className="cursor-pointer"
          >
            <div className="relative flex flex-col items-center justify-center w-[80px] h-[80px]">
              <div
                className={`transition-transform duration-300 ${
                  hovered ? "scale-110" : "scale-90"
                }`}
              >
                <img
                  src={user.photo}
                  alt={user.name}
                  className="w-10 h-10 rounded-full object-cover"
                  title={user.name}
                />
              </div>
              <div
                className={`absolute top-[63px] text-m font-semibold text-white transition-all duration-300 ${
                  hovered
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-2 pointer-events-none"
                }`}
                style={{
                  fontFamily: "Orbitron, sans-serif",
                }}
              >
                LOGOUT
              </div>
            </div>
          </div>
        ) : (
          <AuthButtons onSignInClick={handleSignInClick} />
        )}
        <CartSummary />
      </div>

      {/* 手機版：右上角 dropdown */}
      <div className="md:hidden fixed top-4 right-4 z-50">
        <MobileMenu onSignInClick={handleSignInClick} />
      </div>

      {/* 網站標題 */}
      <Link to="/">
        <h2
          className="pt-5 pb-2 font-extrabold text-white transition-transform duration-300 hover:scale-110"
          style={{
            fontFamily: "Orbitron, sans-serif",
            fontSize: "clamp(1.5rem, 6vw, 3rem)",
          }}
        >
          {title}
        </h2>
      </Link>

      {/* 副標 */}
      <p
        className="text-gray-200 text-opacity-90 text-lg leading-relaxed xl:w-1/2 lg:w-3/4 mx-auto"
        style={{ fontFamily: "Orbitron, sans-serif" }}
      >
        {slogan}
      </p>

      {/* 漸層分隔線 */}
      <div className="flex mt-6 justify-center">
        <hr className="my-[25px] mx-auto w-[100px] border-0 border-t-[6px] opacity-100 rounded-full bg-gradient-to-r from-orange-400 via-yellow-500 to-pink-600" />
      </div>

      {/* 登出確認 Modal */}
      {showLogoutModal && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black bg-opacity-70">
          <div className="bg-black border-2 border-orange-400 rounded-xl shadow-2xl p-6 w-[90%] max-w-md text-center">
            <p
              className="text-white text-lg mb-6"
              style={{ fontFamily: "Orbitron, sans-serif" }}
            >
              {typewriterText}
            </p>
            <div className="flex justify-center gap-6">
              <button
                onClick={handleConfirmLogout}
                className="text-white font-semibold transition-transform hover:scale-110 hover:text-orange-400"
                style={{ fontFamily: "Orbitron, sans-serif" }}
              >
                YES
              </button>
              <button
                onClick={handleCancelLogout}
                className="text-white font-semibold transition-transform hover:scale-110 hover:text-orange-400"
                style={{ fontFamily: "Orbitron, sans-serif" }}
              >
                NO
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

export default Header;