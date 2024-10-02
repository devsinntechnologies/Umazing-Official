'use client';
import BreadCrum from "@/components/BreadCrum";
import Image from "next/image";
import React, { useState } from "react";
import { MdOutlineCancel } from "react-icons/md";

import axios from "axios";
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

// Function to fetch wishlist items
const fetchWishlist = async () => {
  const userId = localStorage.getItem("userId");
  const response = await axios.get(`http://97.74.89.204:4000/favourite/getUserFavourite/${userId}`);
  
  if (response.data.success) {
    return response.data.data; // Return wishlist items
  } else {
    throw new Error('Failed to fetch wishlist items.');
  }
};

// Function to remove item from wishlist
const removeWishlistItem = async (favouriteId) => {
  const response = await axios.delete(
    `http://97.74.89.204:4000/favourite/removeFromFavourite/${favouriteId}`
  );
  if (response.data.success) {
    return favouriteId; // Return the removed item's ID for filtering out from UI
  } else {
    throw new Error('Failed to remove item.');
  }
};

const WishlistPage = () => {
  const queryClient = useQueryClient();

  // Fetch wishlist items using useQuery with object format
  const { data: wishlistItems, isLoading, isError } = useQuery({
    queryKey: ['wishlist'],
    queryFn: fetchWishlist,
  });

  // Mutate (remove) wishlist item using useMutation with object format
  const mutation = useMutation({
    mutationFn: removeWishlistItem,
    onSuccess: (favouriteId) => {
      // Update the cached wishlist data
      queryClient.setQueryData(['wishlist'], (oldWishlist) => 
        oldWishlist.filter(item => item.id !== favouriteId)
      );
    },
  });

  const handleRemove = (favouriteId) => {
    mutation.mutate(favouriteId); // Call mutation to remove item
  };

  // if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error fetching wishlist items</div>;

  return (
    <>
      <BreadCrum />
      <div>
        <main className="container md:w-[83%] mx-auto px-4 md:px-6 lg:px-8 py-8 mt-20">
          <h1 className="text-2xl font-semibold mb-6 text-center">My Wishlist</h1>

          <div id="overflow" className="shadow overflow-auto border-b border-gray-200 sm:rounded-lg">
            <table className="w-[95%] divide-y divide-gray-200 table-fixed">
              <thead>
                <tr>
                  <th className="w-[170px] md:w-1/3 px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                  <th className="w-[150px] md:w-1/4 table-cell px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                  <th className="w-[150px] md:w-1/4 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stock Status</th>
                  <th className="w-[150px] md:w-1/6 px-4 py-3"></th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {wishlistItems && wishlistItems.length > 0 ? (
                  wishlistItems.map(item => (
                    <tr key={item.id} className="text-sm sm:text-lg">
                      <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <img
                            className="h-10 w-10 rounded-full"
                            src={'http://97.74.89.204/uploads/products/3067216fdd3760ec9f46aa896ce48beb.jpeg'}
                            alt={item.Product.name}
                          />
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{item.Product.name}</div>
                          </div>
                        </div>
                      </td>
                      <td className=" table-cell px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">${item.Product.basePrice}</div>
                        {/* <div className="text-sm text-gray-500 line-through">
                          ${item.Product.originalPrice}
                        </div> */}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-md bg-green-100 text-green-700">
                          In Stock
                        </span>
                      </td>
                      <td className="px-4 py-4 text-right text-sm font-medium">
                        <button className="w-[115px] py-3 text-white px-4 rounded-full bg-[#00B207]">
                          Add to Cart
                        </button>
                      </td>
                      <td className="px-4 py-4 text-right text-sm font-medium">
                        <MdOutlineCancel size={24} color="gray"  onClick={() => handleRemove(item.id)}/>
                      
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="text-center py-4">No items in your wishlist.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </main>
      </div>
    </>
  );
};

export default WishlistPage;
