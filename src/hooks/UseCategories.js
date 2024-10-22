import { BASE_URL } from "@/lib/constants";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const categories = createApi({
  reducerPath: "categories",
  baseQuery: fetchBaseQuery({
    baseUrl: `${BASE_URL}/category/`,
    prepareHeaders: (headers, { getState, endpoint }) => {
      const token = localStorage.getItem("token"); // Fetch token from localStorage
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getCategories: builder.query({
      query: () => "/getAllCategories",
    }),

    // getProductById: builder.query({
    //   query: (id) => `getById/${id}`,
    // }),
  }),
});

export const { useGetCategoriesQuery } = categories;
