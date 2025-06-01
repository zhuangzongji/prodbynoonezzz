import { createSlice } from '@reduxjs/toolkit';

// 取得 localStorage 裡已儲存的購物車資料
const savedCartItems = localStorage.getItem('cartItems');

// Part1: Define Slice (including reducers and actions)
const initialState = {
  cartItems: savedCartItems ? JSON.parse(savedCartItems) : [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addCartItems: (state, action) => {
      const item = action.payload;
      const product = state.cartItems.find((x) => x.id === item.id);
      if (!!product) {
        const cartItems = state.cartItems.map((x) =>
          x.id === product.id ? item : x
        );
        state.cartItems = cartItems;
      } else {
        state.cartItems = [...state.cartItems, item];
      }
      // 同步更新 localStorage
      localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
    },
    removeCartItems: (state, action) => {
      state.cartItems = state.cartItems.filter((item) => item.id !== action.payload);
      // 同步更新 localStorage
      localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
    },
    clearCart: (state) => {
      state.cartItems = [];
      localStorage.removeItem('cartItems');
    },
  },
});

// export state to global
export const selectCartItems = (state) => state.cart.cartItems;

// export actions to global
export const { addCartItems, removeCartItems, clearCart } = cartSlice.actions;

// export reducer to global
export default cartSlice.reducer;