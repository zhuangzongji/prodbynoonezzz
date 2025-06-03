// App.jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom'; // ←修正成 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async';
import { Provider } from "react-redux";

import './App.css';
import Home from './pages/Home';
import Product from './pages/Product';
import store from './redux/store';

import LoginModal from './components/LoginModal'; // ⬅️新增登入彈窗

function App() {
  return (
    <Provider store={store}>
      <HelmetProvider context={{}}>
        <BrowserRouter>
          <LoginModal /> {/* ⬅️ 加入登入視窗元件 */}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="products">
              <Route path="category/:categoryName" element={<Home />} />
              <Route path="id/:productId" element={<Product />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </HelmetProvider>
    </Provider>
  );
}

export default App;