import { BASE_URL } from '@/lib/constants';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Define a service using a base URL and expected endpoints
export const auth = createApi({
  reducerPath: 'auth',
  baseQuery: fetchBaseQuery({
    baseUrl: `${BASE_URL}/auth/`,
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
    login: builder.mutation({
      query: (loginData) => ({
        url: 'login',
        method: 'POST',
        body: loginData,
      }),
    }),
    signup: builder.mutation({
      query: (signupData) => ({
        url: 'signup',
        method: 'POST',
        body: signupData,
      }),
    }),
    forgotPassword: builder.mutation({
      query: (forgotPasswordData) => ({
        url: 'forgot-password',
        method: 'POST',
        body: forgotPasswordData,
      }),
    }),
    checkOtp: builder.mutation({
      query: (otpData) => ({
        url: 'check-otp',  // Use kebab-case for consistency
        method: 'POST',
        body: otpData,
      }),
    }),
    resetPassword: builder.mutation({
      query: (resetPasswordData) => ({
        url: 'reset-password',
        method: 'POST',
        body: resetPasswordData,
      }),
    }),
    getUserProfile: builder.query({
      query: (id) => `get-user-profile/${id}`,
    }),
    addUserAddress: builder.mutation({
      query: (addressData) => ({
        url: 'add-user-address',  // Use kebab-case for consistency
        method: 'POST',
        body: addressData,
      }),
    }),
    deleteAddressById: builder.mutation({
      query: (id) => ({
        url: `delete-address/${id}`,  // Use consistent URL formatting
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useSignupMutation,
  useForgotPasswordMutation,
  useCheckOtpMutation,
  useResetPasswordMutation,
  useGetUserProfileQuery,
  useAddUserAddressMutation,
  useDeleteAddressByIdMutation,
} = auth;
