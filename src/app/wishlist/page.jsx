'use client'
import React, { useState, useEffect } from "react";
import BreadCrum from "@/components/BreadCrum";
import Image from "next/image";
import axios from "axios"; // Axios to make API calls

const WishlistPage = () => {
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    // Fetch user's wishlist from the API
    const fetchWishlist = async () => {
      try {
        const response = await axios.get(`http://97.74.89.204:4000/favourite/getUserFavourite/288d377a734af1556882821db39f7a32`);
        console.log(response.data);
        
        setWishlist(response.data); // Assuming response contains wishlist data
      } catch (error) {
        console.error("Error fetching wishlist:", error);
      }
    };

    fetchWishlist();
  }, []);

  return (
    <>
      <BreadCrum />
      <div>
        <main className="container md:w-[83%] mx-auto px-4 md:px-6 lg:px-8 py-8 mt-20">
          <h1 className="text-2xl font-semibold mb-6 text-center">
            My Wishlist
          </h1>

          <div
            id="overflow"
            className="shadow overflow-auto border-b border-gray-200 sm:rounded-lg"
          >
            <table className="w-[95%] divide-y divide-gray-200 table-fixed">
              <thead>
                <tr>
                  <th className="w-[170px] md:w-1/3 px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Product
                  </th>
                  <th className="w-[150px] md:w-1/4 table-cell px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Price
                  </th>
                  <th className="w-[150px] md:w-1/4 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Stock Status
                  </th>
                  <th className="w-[150px] md:w-1/6 px-4 py-3"></th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {wishlist.length > 0 ? (
                  wishlist.map((item, index) => (
                    <tr key={index} className="text-sm sm:text-lg">
                      <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <img className="h-10 w-10 rounded-full" src={item.imageUrl} alt={item.name} />
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{item.name}</div>
                          </div>
                        </div>
                      </td>
                      <td className="table-cell px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">${item.basePrice}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-md ${item.inStock ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                          {item.inStock ? "In Stock" : "Out of Stock"}
                        </span>
                      </td>
                      <td className="px-4 py-4 text-right text-sm font-medium">
                        <button className={`w-[115px] py-3 text-white px-4 rounded-full ${item.inStock ? 'bg-[#00B207]' : 'bg-gray-300'}`} disabled={!item.inStock}>
                          Add to Cart
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="text-center py-4">
                      No items in the wishlist.
                    </td>
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
