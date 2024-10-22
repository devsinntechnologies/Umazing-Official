import { BASE_URL } from "@/lib/constants";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define a service using a base URL and expected endpoints
export const products = createApi({
  reducerPath: "products",
  baseQuery: fetchBaseQuery({
    baseUrl: `${BASE_URL}/product/`,
    prepareHeaders: (headers, { getState, endpoint }) => {
      const token = localStorage.getItem("token");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: () => "/getAllProducts",
    }),

    getAllProducts: builder.query({
      query: (params) => {
        const queryString = new URLSearchParams(params).toString();
        console.log("API Route Products", queryString);
        return `allProducts?${queryString}`;
      },
    }),
    getUserProducts: builder.query({
      query: (params) => {
        const queryString = new URLSearchParams(params).toString();
        // console.log("API Route Products", queryString);
        return `getUserProducts?${queryString}`;
      },
    }),

    getProductById: builder.query({
      query: (id) => `/getById/${id}`,
    }),
    deleteProductById: builder.mutation({
      query: (id) => ({
        url: `/deleteById//${id}`,
        method: "DELETE",
      }),
    }),
    getAllVariants: builder.query({
      query: () => `getAllVariants`,
    }),

    addProduct: builder.mutation({
      query: (product) => ({
        url: "/addProduct",
        method: "POST",
        body: product,
      }),
    }),
    updateProduct: builder.mutation({
      query: (updateProduct) => ({
        url: "/updateProduct",
        method: "POST",
        body: updateProduct,
      }),
    }),
  }),
});

export const {
  useGetAllProductsQuery,
  useGetUserProductsQuery,
  useGetProductsQuery,
  useGetProductByIdQuery,
  useDeleteProductByIdMutation,
  useGetAllVariantsQuery,
  useAddProductMutation,
  useUpdateProductMutation,
} = products;
