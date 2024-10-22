import { BASE_URL } from "@/lib/constants";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define a service using a base URL and expected endpoints
export const notifications = createApi({
  reducerPath: "notifications",
  baseQuery: fetchBaseQuery({
    baseUrl: `${BASE_URL}/notification/`,
    prepareHeaders: (headers, { getState, endpoint }) => {
      const token = localStorage.getItem("token");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getNotifications: builder.query({
      query: () => "/getAllNotifications",
    }),

    getNotificationById: builder.query({
      query: (id) => `/getNotificationById/${id}`,
    }),
    deleteNotificationById: builder.mutation({
      query: (id) => ({
        url: `/deleteNotificationById/${id}`,
        method: "DELETE",
      }),
    }),

    addNotification: builder.mutation({
      query: (notification) => ({
        url: "/addNotification",
        method: "POST",
        body: notification,
      }),
    }),
  }),
});

export const {
  useGetNotificationsQuery,
  useGetNotificationByIdQuery,
  useDeleteNotificationByIdMutation,
  useAddNotificationMutation,
} = notifications;
