import { BASE_URL } from "@/lib/constants";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define a service using a base URL and expected endpoints
export const orders = createApi({
  reducerPath: "orders",
  baseQuery: fetchBaseQuery({
    baseUrl: `${BASE_URL}/orders/`,
    prepareHeaders: (headers, { getState, endpoint }) => {
      const token = localStorage.getItem("token");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({

    getBuyerOrders: builder.query({
      query: () => 'getBuyerOrders'
    }),
    getSellerOrders: builder.query({
      query: () => 'getSellerOrders'
    }),

    getSingleOrder: builder.query({
      query: (id) => {
        return `singleOrder/${id}`;
      },
    }),

    createOrder: builder.mutation({
      query: (data) => ({
        url: "/createOrder",
        method: "POST",
        body: data,
      }),
    }),
    updateOrder: builder.mutation({
      query: ({ id, status }) => ({
        url: `/updateOrder/${id}`,
        method: "PATCH",
        body: { status },
      }),
    }),
    // deleteProductById: builder.mutation({
    //   query: (id) => ({
    //     url: `/deleteById/${id}`,
    //     method: "DELETE",
    //   }),
    // }),
  }),
});

export const {
  useGetBuyerOrdersQuery,
  useGetSellerOrdersQuery,
  useGetSingleOrderQuery,
  useCreateOrderMutation,
  useUpdateOrderMutation,
  // useDeleteProductByIdMutation,
} = orders;
