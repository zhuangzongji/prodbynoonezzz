// redux/authSlice.js
import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    showLoginModal: false,
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    logout: (state) => {
      state.user = null;
    },
    toggleLoginModal: (state, action) => {
      state.showLoginModal = action.payload;
    },
  },
});

export const { setUser, logout, toggleLoginModal } = authSlice.actions;
export default authSlice.reducer;