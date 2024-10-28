import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  cartId: null,
};

export const cartSlice = createSlice({
  name: "cartSlice",
  initialState,
  reducers: {
    setCartData(state, action) {
      state.items = action.payload.items;
      state.cartId = action.payload.cartId;
    },
    updateCartItem(state, action) {
      const { id, quantity } = action.payload;
      const item = state.items.find((item) => item.id === id);
      if (item) {
        item.quantity = quantity;
      }
    },
    removeCartItem(state, action) {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
    clearCart(state) {
      state.items = [];
      state.cartId = null;
    },
  },
});

export const { setCartData, updateCartItem, removeCartItem, clearCart } = cartSlice.actions;

export default cartSlice.reducer;
