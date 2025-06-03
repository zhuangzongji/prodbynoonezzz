// components/LoginButton.jsx
import { useDispatch, useSelector } from 'react-redux';
import { auth, provider } from '../firebase';
import { signInWithPopup, signOut } from 'firebase/auth';
import { setUser, logout, toggleLoginModal } from '../redux/authSlice';
function LoginButton() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  const handleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      dispatch(setUser({
        name: user.displayName,
        email: user.email,
        photo: user.photoURL,
      }));
      dispatch(toggleLoginModal(false));
    } catch (error) {
      console.error('登入失敗：', error);
    }
  };

  const handleLogout = () => {
    signOut(auth)
      .then(() => dispatch(clearUser()))
      .catch((error) => console.error('登出失敗：', error));
  };

  if (user) {
    return (
      <button
        onClick={handleLogout}
        className="text-white bg-red-500 px-4 py-2 rounded-xl hover:bg-red-600"
      >
        登出
      </button>
    );
  }

  return (
    <button
      onClick={handleLogin}
      className="text-white bg-green-500 px-4 py-2 rounded-xl hover:bg-green-600"
    >
      使用 Google 登入
    </button>
  );
}

export default LoginButton;