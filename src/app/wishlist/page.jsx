"use client"
import BreadCrum from "@/components/BreadCrum";
import withAuth from "@/components/hoc/withAuth";
import { useToast } from "@/hooks/use-toast";
import { useGetUserFavouriteQuery, useRemoveFromFavouriteMutation } from "@/hooks/UseFavourite";
import { Trash2 } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const Page = () => {
  const { toast } = useToast(); // Initialize toast notifications
  const userId = useSelector((state) => state.authSlice?.user?.id);
  const isLoggedIn = useSelector((state) => state.authSlice.isLoggedIn);
  const [triggerFetch, setTriggerFetch] = useState(false);
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    if (userId && isLoggedIn) {
      setTriggerFetch(true);
    }
  }, [userId, isLoggedIn]);

  const { isSuccess: fetchSuccess, isError: fetchError, data: wishlistItems, isLoading: fetchLoading, refetch } = useGetUserFavouriteQuery(userId, {
    skip: !triggerFetch,
  });

  const [removeFromFavourite, { isSuccess: removeSuccess, isError: removeError, isLoading: removeLoading }] = useRemoveFromFavouriteMutation();

  // Update the wishlist when new items are fetched
  useEffect(() => {
    if (wishlistItems?.data) {
      setWishlist(wishlistItems.data);
    }
  }, [wishlistItems]);

  // Handle removal from wishlist
  const handleRemove = (favouriteId) => {
    // Optimistically remove the item from the wishlist
    setWishlist((prevWishlist) => prevWishlist.filter((item) => item.id !== favouriteId));
    // Trigger the mutation to remove from favourite
    removeFromFavourite(favouriteId);
  };

  // useEffect to handle toast notifications for removal success and error
  useEffect(() => {
    if (removeSuccess) {
      // Show success toast when item is successfully removed
      toast({
        title: "Removed",
        description: "Item removed from your wishlist successfully.",
        status: "success",
      });

      // Refetch the updated wishlist
      refetch();
    }
    
    if (removeError) {
      // Show error toast if there's an error during removal
      toast({
        title: "Error",
        description: "Failed to remove item from wishlist. Please try again.",
        status: "error",
      });

      // Optionally refetch to restore the correct state
      refetch();
    }
  }, [removeSuccess, removeError, toast, refetch]);

  if (fetchLoading) {
    return (
      <div>
        {/* Skeleton Loading UI */}
      </div>
    );
  }

  if (fetchError) {
    return <div>Error fetching wishlist items</div>;
  }

  return (
    <>
      <BreadCrum />
      <div>
        <main className="container md:w-[83%] mx-auto px-4 md:px-6 lg:px-8 py-8 mt-20">
          <h1 className="text-2xl font-semibold mb-6 text-center">My Wishlist</h1>

          <div id="overflow" className="shadow-sm shadow-primary overflow-auto border-b border-gray-200 sm:rounded-lg ">
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
                  wishlist.map((item) => (
                    <tr key={item.id} className="text-sm sm:text-lg">
                      <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
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
                      <td className="table-cell px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          ${item.Product.basePrice}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-md bg-green-100 text-green-700">
                          In Stock
                        </span>
                      </td>
                      <td className="p-4 text-right ">
                        <button className="py-2 text-white px-4 rounded-full bg-primary text-sm">
                          Add to Cart
                        </button>
                      </td>
                      <td className="px-4 py-4 text-right text-sm font-medium text-destructive">
                        <Trash2
                          size={24}
                          onClick={() => handleRemove(item.id)}
                        />
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
          </div>
        </main>
      </div>
    </>
  );
};

export default withAuth(Page);
