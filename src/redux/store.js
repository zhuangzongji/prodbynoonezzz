import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './cartSlice';
import authReducer from './authSlice';  // 新增這行，確保路徑正確

const store = configureStore({
  reducer: {
    cart: cartReducer,
    auth: authReducer,    // 加上 auth reducer
  },
  devTools: process.env.NODE_ENV !== 'production',
});

export default store;