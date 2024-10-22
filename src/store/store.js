import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query/react';
import { products } from '@/hooks/UseProducts';
import { auth } from '@/hooks/UseAuth';
import { authSlice } from '@/slice/authSlice';
import { categories } from '@/hooks/UseCategories';
import { attribute } from '@/hooks/UseAttributes';
import { notifications } from '@/hooks/UseNotifications';
import { offer } from '@/hooks/UseOffers';
import { favourite } from '@/hooks/UseFavourite';
import { cart } from '@/hooks/UseCart';

export const makeStore = () => {
  return configureStore({
    reducer: {
      authSlice: authSlice.reducer,
      [auth.reducerPath]: auth.reducer,
      [products.reducerPath]: products.reducer,
      [categories.reducerPath]: categories.reducer,
      [attribute.reducerPath]: attribute.reducer,
      [offer.reducerPath]: offer.reducer,
      [notifications.reducerPath]: notifications.reducer,
      [favourite.reducerPath]: favourite.reducer,
      [cart.reducerPath]: cart.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(auth.middleware, offer.middleware, products.middleware, categories.middleware, attribute.middleware, notifications.middleware, favourite.middleware, cart.middleware),
  });
};

setupListeners(makeStore().dispatch);

export default makeStore;
