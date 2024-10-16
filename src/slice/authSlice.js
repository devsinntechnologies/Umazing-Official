import { decodeToken } from '@/lib/utils';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const getTokenFromLocalStorage = () => {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('token');
    if (token) {
      const decoded = decodeToken(token);
      if (decoded) {
        return { 
          token, 
          user: { id: decoded.id, email: decoded.email }, 
          isLoggedIn: true 
        };
      }
    }
  }
  return { token: null, user: null, isLoggedIn: false };
};

const initialState = getTokenFromLocalStorage();

console.log(initialState);
export const authSlice = createSlice({
  name: 'authSlice',
  initialState,
  reducers: {
    setLogin: (state, action) => {
      state.token = action.payload.token;
      localStorage.setItem('token', action.payload.token);
      const decoded = decodeToken(action.payload.token);

      if (decoded) {
        state.user = {
          id: decoded.id,
          email: decoded.email,
        };
        state.isLoggedIn = true;
      } else {
        state.isLoggedIn = false;
        state.user = null;
      }
    },
    logOut: (state) => {
      state.token = null;
      state.user = null;
      state.isLoggedIn = false;
      localStorage.removeItem('token');
    },
  },
});

export const { setLogin, logOut } = authSlice.actions;
export default authSlice.reducer;
