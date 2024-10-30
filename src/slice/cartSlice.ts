import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define types for cart items
interface CartItem {
  id: string; // Change to the appropriate type for your ID
  quantity: number;
}

// Define the initial state type
interface CartState {
  items: CartItem[];
  cartId: string | null;
}

const initialState: CartState = {
  items: [],
  cartId: null,
};

export const cartSlice = createSlice({
  name: 'cartSlice',
  initialState,
  reducers: {
    setCartData(state, action: PayloadAction<{ items: CartItem[]; cartId: string | null }>) {
      state.items = action.payload.items;
      state.cartId = action.payload.cartId;
    },
    updateCartItem(state, action: PayloadAction<{ id: string; quantity: number }>) {
      const { id, quantity } = action.payload;
      const item = state.items.find((item) => item.id === id);
      if (item) {
        item.quantity = quantity;
      }
    },
    removeCartItem(state, action: PayloadAction<string>) {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
    clearCart(state) {
      state.items = [];
      state.cartId = null;
    },
  },
});

// Export actions
export const { setCartData, updateCartItem, removeCartItem, clearCart } = cartSlice.actions;

// Export the reducer
export default cartSlice.reducer;
