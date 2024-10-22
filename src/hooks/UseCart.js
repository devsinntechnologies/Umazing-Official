import { BASE_URL } from '@/lib/constants';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Define a service using a base URL and expected endpoints
export const cart = createApi({
  reducerPath: 'cart',
  baseQuery: fetchBaseQuery({
    baseUrl: `${BASE_URL}/cart/`,
    prepareHeaders: (headers, { getState, endpoint }) => {
        const token = localStorage.getItem('token');
        if (token) {
          headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getUserCart: builder.query({
      query: (userId) => `getUserCart/${userId}`,
    }),
    addToCart: builder.mutation({
      query: (cartData) => ({
        url: 'addToCart',
        method: 'POST',
        body: cartData,
      }),
    }),
    updateCartItem: builder.mutation({
      query: ({ id, cartData }) => ({
        url: `updateCartItem/${id}`,
        method: 'PATCH',
        body: cartData,
      }),
    }),
    removeFromCart: builder.mutation({
      query: (id) => ({
        url: `removeFromcart/${id}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useGetUserCartQuery,
  useAddToCartMutation,
  useUpdateCartItemMutation,
  useRemoveFromCartMutation,
} = cart;
