// App.jsx
import { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { Provider, useDispatch } from "react-redux";

import "./App.css";
import Home from "./pages/Home";
import Product from "./pages/Product";
import store from "./redux/store";

import LoginModal from "./components/LoginModal";
import { auth } from "./firebase";
import { onAuthStateChanged } from "firebase/auth";
import { setUser, logout } from "./redux/authSlice";

// 用一個子元件包裹路由與登入監聽，方便使用 hook
function AppWithAuth() {
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(
          setUser({
            name: user.displayName,
            email: user.email,
            photo: user.photoURL,
          })
        );
      } else {
        dispatch(logout());
      }
    });

    return () => unsubscribe();
  }, [dispatch]);

  return (
    <>
      <LoginModal />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="products">
          <Route path="category/:categoryName" element={<Home />} />
          <Route path="id/:productId" element={<Product />} />
        </Route>
      </Routes>
    </>
  );
}

function App() {
  return (
    <Provider store={store}>
      <HelmetProvider context={{}}>
        <BrowserRouter>
          <AppWithAuth />
        </BrowserRouter>
      </HelmetProvider>
    </Provider>
  );
}

export default App;