import { BASE_URL } from '@/lib/constants';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Define a service using a base URL and expected endpoints
export const favourite = createApi({
  reducerPath: 'favourite',
  baseQuery: fetchBaseQuery({
    baseUrl: `${BASE_URL}/favourite/`,
    prepareHeaders: (headers, { getState, endpoint }) => {
      // Only add the token if the endpoint is not 'login' or 'signup'
      if (endpoint !== 'login' && endpoint !== 'signup') {
        const token = localStorage.getItem('token'); // Fetch token from localStorage
        if (token) {
          headers.set('Authorization', `Bearer ${token}`);
        }
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getUserFavourite: builder.query({
      query: (userId) => `getUserFavourite/${userId}`,
    }),
    addToFavourite: builder.mutation({
      query: (favData) => ({
        url: 'addToFavourite',
        method: 'POST',
        body: favData,
      }),
    }),
    removeFromFavourite: builder.mutation({
      query: (id) => ({
        url: `removeFromFavourite/${id}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useGetUserFavouriteQuery,
  useAddToFavouriteMutation,
  useRemoveFromFavouriteMutation,
} = favourite;
