"use client";

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getSocket } from "@/lib/socket";
import { BASE_URL_SOCKET } from "@/lib/constants";

export const chat = createApi({
  reducerPath: "chat",
  baseQuery: fetchBaseQuery({
    baseUrl: `${BASE_URL_SOCKET}/chat/`,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("token");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    // Fetch all chat rooms
    fetchChats: builder.query({
      query: () => `/chat_rooms/`,
    }),

    // Fetch details of a single chat room
    fetchChatRoom: builder.query({
      query: (roomId) => `/chat_room/${roomId}`,
    }),

    // Send a message via WebSocket
    sendMessage: builder.mutation({
      queryFn: async (messageData) => {
        try {
          const socket = getSocket();

          return new Promise((resolve) => {
            socket.emit("sendMessage", messageData, (response: any) => {
              if (response?.success) {
                resolve({ data: { success: true, message: response.message } });
              } else {
                resolve({
                  error: {
                    status: 500,
                    data: { message: response?.message || "Failed to send message." },
                  },
                });
              }
            });
          });
        } catch (error) {
          return {
            error: {
              status: 500,
              data: { message: "WebSocket error while sending the message." },
            },
          };
        }
      },
    }),
  }),
});

export const {
  useFetchChatsQuery,
  useFetchChatRoomQuery,
  useSendMessageMutation,
} = chat;
