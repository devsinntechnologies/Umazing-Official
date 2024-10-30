import { BASE_URL } from "@/lib/constants";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define a service using a base URL and expected endpoints
export const offer = createApi({
  reducerPath: "offer",
  baseQuery: fetchBaseQuery({
    baseUrl: `${BASE_URL}/offer/`,
    prepareHeaders: (headers, { getState, endpoint }) => {
      const token = localStorage.getItem("token");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getOfferById: builder.query({
      query: (id) => `/getOfferById/${id}`,
    }),

    getAllOffers: builder.query({
      query: () => "/getAllOffers",
    }),

    deleteOfferById: builder.mutation({
      query: (id) => ({
        url: `/deleteOfferById/${id}`,
        method: "DELETE",
      }),
    }),

    addOffer: builder.mutation({
      query: (offer) => ({
        url: "/addOffer",
        method: "POST",
        body: offer,
      }),
    }),

    updateOfferById: builder.mutation({
      query: ({ id, updateOffer }) => ({
        url: `/updateOfferById/${id}`,
        method: "POST",
        body: updateOffer,
      }),
    }),

    addOfferProduct: builder.mutation({
      query: (offerProduct) => ({
        url: "/addOfferProduct",
        method: "POST",
        body: offerProduct,
      }),
    }),
  }),
});

export const {
  useGetAllOffersQuery,
  useGetOfferByIdQuery,
  useDeleteOfferByIdMutation,
  useAddOfferMutation,
  useUpdateOfferByIdMutation,
  useAddOfferProductMutation,
} = offer;
