import { BASE_URL } from '@/lib/constants';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Define a service using a base URL and expected endpoints
export const auth = createApi({
  reducerPath: 'auth',
  baseQuery: fetchBaseQuery({
    baseUrl: `${BASE_URL}/auth/`,
    prepareHeaders: (headers, { endpoint }) => {
      // Only add the token if the endpoint is not 'getAllUsers'
      if (endpoint !== 'login') {
        const token = localStorage.getItem('token');
        if (token) {
          headers.set('Authorization', `Bearer ${token}`);
        }
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (login) => ({
        url: 'login',
        method: 'POST',
        body: login,
      }),
    }),

    getUserProfile: builder.query({
      query: (id) => `/get-user-profile/${id}`,
    }),

    getAllUsers: builder.query({
      query: () => '/getAllUsers',
    }),

    blockUser: builder.mutation({
      query: (id) => ({
        url: `/blockUser/${id}`,
        method: 'POST',
      }),
    }),

    deleteUser: builder.mutation({
      query: (id) => ({
        url: `/deleteUser/${id}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useGetUserProfileQuery,
  useGetAllUsersQuery,
  useBlockUserMutation,
  useDeleteUserMutation,
} = auth;
