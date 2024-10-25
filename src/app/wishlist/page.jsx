"use client";
import BreadCrum from "@/components/BreadCrum";
import withAuth from "@/components/hoc/withAuth";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";
import {
  useGetUserFavouriteQuery,
  useRemoveFromFavouriteMutation,
} from "@/hooks/UseFavourite";
import { Trash2 } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const Page = () => {
  const { toast } = useToast();
  const userId = useSelector((state) => state.authSlice?.user?.id);
  const isLoggedIn = useSelector((state) => state.authSlice.isLoggedIn);
  const [triggerFetch, setTriggerFetch] = useState(false);
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    if (userId && isLoggedIn) {
      setTriggerFetch(true);
    }
  }, [userId, isLoggedIn]);

  const {
    data: wishlistItems,
    isLoading,
    isError,
    refetch,
  } = useGetUserFavouriteQuery(userId, {
    skip: !triggerFetch,
  });

  const [
    removeFromFavourite,
    {
      isSuccess: removeSuccess,
      isError: removeError,
      isLoading: removeLoading,
    },
  ] = useRemoveFromFavouriteMutation();

  useEffect(() => {
    if (wishlistItems?.data) {
      setWishlist(wishlistItems.data);
    }
  }, [wishlistItems]);

  const handleRemove = (favouriteId) => {
    setWishlist((prevWishlist) =>
      prevWishlist.filter((item) => item.id !== favouriteId)
    );
    removeFromFavourite(favouriteId);
  };

  useEffect(() => {
    if (removeLoading) {
      toast({
        title: "Removing",
        description: "Product is removing from your wishlist",
      });
    }
    if (removeSuccess) {
      toast({
        title: "Removed",
        description: "Item removed from your wishlist successfully.",
      });
      refetch();
    }

    if (removeError) {
      toast({
        title: "Error",
        description: "Failed to remove item from wishlist. Please try again.",
      });

      refetch();
    }
  }, [removeSuccess, removeLoading, removeError, toast, refetch]);
  

  if (isError) {
    return <div> Failed To fetch </div>
  }
  return (
    <>
      <BreadCrum />
      <div className="w-full py-6">
        <h1 className="text-lg md:text-xl lg:text-2xl font-semibold mb-6 text-center">
          My Wishlist
        </h1>
        <div className="shadow-sm shadow-primary border-b border-gray-200 rounded-lg w-[85%] mx-auto">
          {isLoading ?
            <div className="w-full divide-y divide-gray-200 p-2 flex flex-col gap-3">
              {Array.from({ length: 4 }).map((_, index) => (
                <Skeleton key={index} className="w-full rounded-md h-12 text-primary" />
              ))}
            </div>
            :
            <table className="w-full divide-y divide-gray-200 ">
              <thead>
                <tr>
                  <th className="w-[170px] md:w-1/3 px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Product
                  </th>
                  <th className="w-[150px] md:w-1/4 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Price
                  </th>
                  <th className="w-[150px] md:w-1/4 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                    Stock Status
                  </th>
                  <th className="w-[150px] md:w-1/6 px-4 py-3"></th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {wishlist.length > 0 ? (
                  wishlist.map((item) => (
                    <tr key={item.id} className="text-sm sm:text-lg">
                      <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center overflow-hidden xl:overflow-visible">
                          <Image
                            className="size-10 rounded-full"
                            src={`http://97.74.89.204/${item.Product.Product_Images[0]?.imageUrl}`}
                            alt={item.Product.name}
                            width={40}
                            height={40}
                          />
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">
                              {item.Product.name}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          Rs. {item.Product.basePrice}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-md bg-green-100 text-primary">
                          {item.Product.baseQuantity > 0 ? "In Stock" : "No Stock"}
                        </span>
                      </td>
                      <td className="py-4 whitespace-nowrap">
                        <div className="flex gap-3 w-full">
                          <button className="w-full py-2 text-white px-3 rounded-full bg-primary text-sm">
                            Add to Cart
                          </button>
                          <div className="mt-2 flex justify-end pr-7">
                            <Trash2
                              className="text-destructive cursor-pointer"
                              size={24}
                              onClick={() => handleRemove(item.id)}
                            />
                          </div>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="text-center py-4">
                      No items in your wishlist.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          }
        </div>
      </div>
    </>
  );
};

export default withAuth(Page);
