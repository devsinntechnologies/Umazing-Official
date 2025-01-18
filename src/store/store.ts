import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query/react';
import { chat } from '@/hooks/useChat';
import messagesReducer from '@/slice/messagesSlice';
import { auth } from '@/hooks/UseAuth';
import { authSlice } from '@/slice/authSlice';
import { cartSlice } from '@/slice/cartSlice';
import { products } from '@/hooks/UseProducts';
import { categories } from '@/hooks/UseCategories';
import { attribute } from '@/hooks/UseAttributes';
import { notifications } from '@/hooks/UseNotifications';
import { offer } from '@/hooks/UseOffers';
import { favourite } from '@/hooks/UseFavourite';
import { cart } from '@/hooks/UseCart';
import { review } from '@/hooks/UseReview';
import { orders } from '@/hooks/UseOrders';

export const makeStore = () => {
  return configureStore({
    reducer: {
      messages: messagesReducer,
      authSlice: authSlice.reducer,
      cartSlice: cartSlice.reducer,
      [chat.reducerPath]: chat.reducer,
      [auth.reducerPath]: auth.reducer,
      [products.reducerPath]: products.reducer,
      [categories.reducerPath]: categories.reducer,
      [attribute.reducerPath]: attribute.reducer,
      [offer.reducerPath]: offer.reducer,
      [notifications.reducerPath]: notifications.reducer,
      [favourite.reducerPath]: favourite.reducer,
      [cart.reducerPath]: cart.reducer,
      [review.reducerPath]: review.reducer,
      [orders.reducerPath]: orders.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(
        auth.middleware,
        chat.middleware,
        offer.middleware,
        products.middleware,
        categories.middleware,
        attribute.middleware,
        notifications.middleware,
        favourite.middleware,
        cart.middleware,
        review.middleware,
        orders.middleware
      ),
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];

// Automatically set up listeners to enable caching and refetching
setupListeners(makeStore().dispatch);

export default makeStore;
