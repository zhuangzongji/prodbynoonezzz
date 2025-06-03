// components/LoginModal.jsx
import { useDispatch, useSelector } from 'react-redux';
import { toggleLoginModal } from '../redux/authSlice';
import LoginButton from './LoginButton';

function LoginModal() {
  const dispatch = useDispatch();
  const isOpen = useSelector((state) => state.auth.showLoginModal);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
      <div className="bg-white p-6 rounded-xl shadow-lg w-80 text-center">
        <h2 className="text-xl font-bold mb-4">登入</h2>
        <LoginButton />
        <button
          className="mt-4 text-sm text-gray-500 hover:underline"
          onClick={() => dispatch(toggleLoginModal(false))}
        >
          取消
        </button>
      </div>
    </div>
  );
}

export default LoginModal;