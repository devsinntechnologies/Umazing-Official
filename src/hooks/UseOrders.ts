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

    getAllOrders: builder.query({
      query: () => 'allOrders'
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
    // updateProduct: builder.mutation({
    //   query: (updateProduct) => ({
    //     url: "/updateProduct",
    //     method: "POST",
    //     body: updateProduct,
    //   }),
    // }),
    // deleteProductById: builder.mutation({
    //   query: (id) => ({
    //     url: `/deleteById/${id}`,
    //     method: "DELETE",
    //   }),
    // }),
  }),
});

export const {
  useGetAllOrdersQuery,
  useGetSingleOrderQuery,
  useCreateOrderMutation,
  // useUpdateProductMutation,
  // useDeleteProductByIdMutation,
} = orders;
