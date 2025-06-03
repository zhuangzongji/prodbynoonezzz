import { useState } from "react";
import { Link } from "react-router-dom";  // react-router-dom
import { useDispatch, useSelector } from "react-redux";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../firebase";  // 你的 firebase 設定
import { setUser, logout } from "../redux/authSlice";
import CartSummary from "./CartSummary";
import AuthButtons from "./AuthButtons";

function Header({ title, slogan }) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const [isOnTouch, setIsOnTouch] = useState(false);

  // 點擊 Sign In，呼叫 Firebase Google 登入
  const handleSignInClick = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      dispatch(setUser({
        name: user.displayName,
        email: user.email,
        photo: user.photoURL,
      }));
    } catch (error) {
      console.error("登入失敗:", error);
      alert("登入失敗，請稍後再試");
    }
  };

  // Sign Up 我們暫時同 Sign In（你可以另外做跳轉或別的流程）
  const handleSignUpClick = () => {
    handleSignInClick();
  };

  const handleLogoutClick = async () => {
    try {
      await auth.signOut();
      dispatch(logout());
    } catch (error) {
      console.error("登出失敗:", error);
      alert("登出失敗，請稍後再試");
    }
  };

  return (
    <header data-theme="luxury" className="text-center flex flex-col items-center header">
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

      <p
        className="text-gray-200 text-opacity-90 text-lg leading-relaxed xl:w-1/2 lg:w-3/4 mx-auto"
        style={{ fontFamily: "Orbitron, sans-serif" }}
      >
        {slogan}
      </p>

      <CartSummary />

      <div className="mt-6">
        {user ? (
          <div className="flex items-center space-x-4">
            <img
              src={user.photo}
              alt={user.name}
              className="w-10 h-10 rounded-full"
              title={user.name}
            />
            <button
              onClick={handleLogoutClick}
              className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
            >
              登出
            </button>
          </div>
        ) : (
          <AuthButtons
            onSignInClick={handleSignInClick}
            onSignUpClick={handleSignUpClick}
          />
        )}
      </div>

      <div className="flex mt-6 justify-center">
        <hr className="my-[25px] mx-auto w-[100px] border-0 border-t-[6px] opacity-100 rounded-full bg-gradient-to-r from-orange-400 via-yellow-500 to-pink-600" />
      </div>
    </header>
  );
}

export default Header;