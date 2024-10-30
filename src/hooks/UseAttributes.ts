import { BASE_URL } from "@/lib/constants";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define a service using a base URL and expected endpoints
export const attribute = createApi({
  reducerPath: "attribute",
  baseQuery: fetchBaseQuery({
    baseUrl: `${BASE_URL}/attribute/`,
    prepareHeaders: (headers, { getState, endpoint }) => {
      const token = localStorage.getItem("token"); // Fetch token from localStorage
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getAllAttributes: builder.query({
      query: () => "/getAllAttributes",
    }),

    addAttribute: builder.mutation({
      query: (attribute) => ({
        url: "/addAttribute",
        method: "POST",
        body: attribute,
      }),
    }),

    getAllAttributeValues: builder.query({
      query: () => "/getAllAttributeValues",
    }),

    addAttributeValue: builder.mutation({
      query: (attributeVal) => ({
        url: "/addAttributeValue",
        method: "POST",
        body: attributeVal,
      }),
    }),
  }),
});

export const {
  useGetAllAttributesQuery,
  useAddAttributeMutation,
  useGetAllAttributeValuesQuery,
  useAddAttributeValueMutation,
} = attribute;
