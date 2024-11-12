// @ts-nocheck
"use client";
import BreadCrumb from "@/components/BreadCrumb";
import withAuth from "@/components/hoc/withAuth";
import { useToast } from "@/hooks/use-toast";
import {
  useGetUserFavouriteQuery,
  useRemoveFromFavouriteMutation,
} from "@/hooks/UseFavourite";
import { Trash2 } from "lucide-react";
import { DataTable } from "@/components/DataTable";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { ColumnDef } from "@tanstack/react-table";
import { useAddToCartMutation } from "@/hooks/UseCart";

interface WishlistItem {
  id: string;
  Product: {
    Product_Images: { imageUrl: string }[];
    name: string;
    basePrice: number;
    baseQuantity: number;
  };
}

const Page: React.FC = () => {
  const { toast } = useToast();
  const userId = useSelector((state: any) => state.authSlice?.user?.id);
  const isLoggedIn = useSelector((state: any) => state.authSlice.isLoggedIn);
  const [triggerFetch, setTriggerFetch] = useState(false);
  const [wishlist, setWishlist] = useState<WishlistItem[]>([]);
  const quantity = 1;

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
    { isSuccess: removeSuccess, isError: removeError, isLoading: removeLoading },
  ] = useRemoveFromFavouriteMutation();

  const [addToCart, { isSuccess: cartSuccess, isLoading: addingToCart, isError: cartError }] = useAddToCartMutation();

  useEffect(() => {
    if (wishlistItems?.data) {
      setWishlist(wishlistItems.data);
    }
  }, [wishlistItems]);

  const handleRemove = (favouriteId: string) => {
    setWishlist((prevWishlist) => prevWishlist.filter((item) => item.id !== favouriteId));
    removeFromFavourite(favouriteId);
  };

  const handleAddToCart = async (productId: string) => {
    if (!isLoggedIn) {
      toast({
        title: "Not Logged In",
        description: "Please log in to add items to the cart.",
        variant: "destructive",
      });
      return;
    }
    toast({
      title: "Processing",
      description: "Updating your cart...",
      duration: 1000,
    });

    try {
      await addToCart({ ProductId: productId, quantity });
    } catch (error) {
      console.error("Error updating cart:", error);
    }
  };

  useEffect(() => {
    if (removeLoading) {
      toast({
        title: "Removing",
        description: "Product is being removed from your wishlist",
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
    if (cartSuccess) {
      toast({
        title: "Added to Cart",
        description: "Item added to your cart.",
      });
    }
  }, [removeSuccess, removeLoading, removeError, toast, refetch, cartSuccess]);

  if (isError) {
    return <div>Failed To fetch</div>;
  }

  // Define columns for DataTable
  const columns: ColumnDef<WishlistItem>[] = [
    {
      accessorKey: "Product.Product_Images",
      header: "Product",
      cell: ({ row }) => (
        <div className="flex items-center">
          <Image
            className="size-10 rounded-full"
            src={`http://97.74.89.204/${row.original.Product.Product_Images[0]?.imageUrl}`}
            alt={row.original.Product.name}
            width={40}
            height={40}
          />
          <span className="ml-4 font-medium text-gray-900">{row.original.Product.name}</span>
        </div>
      ),
    },
    {
      accessorKey: "Product.basePrice",
      header: "Price",
      cell: ({ getValue }) => <span>Rs. {getValue()}</span>,
    },
    {
      accessorKey: "Product.baseQuantity",
      header: "Stock Status",
      cell: ({ getValue }) =>
        getValue() > 0 ? (
          <span className="px-2 py-1 text-xs font-semibold rounded-md bg-green-100 text-primary">
            In Stock
          </span>
        ) : (
          <span className="px-2 py-1 text-xs font-semibold rounded-md bg-red-100 text-destructive">
            No Stock
          </span>
        ),
    },
    {
      id: "actions",
      header: "",
      cell: ({ row }) => (
        <div className="flex gap-5 px-3 items-center">
          <button
            className="w-full py-2 text-white px-3 rounded-full bg-primary text-sm"
            onClick={() => handleAddToCart(row.original.Product.id)}
            disabled={addingToCart}
          >
            Add to Cart
          </button>
          <Trash2
            className="text-destructive cursor-pointer"
            size={24}
            onClick={() => handleRemove(row.original.id)}
          />
        </div>
      ),
    },
  ];

  return (
    <>
      <BreadCrumb />
      <div className="w-full py-6">
        <h1 className="text-lg md:text-xl lg:text-2xl font-semibold mb-6 text-center">
          My Wishlist
        </h1>
        <div className="shadow-sm shadow-primary text-xs border-b border-gray-200 rounded-lg md:w-[85%] w-[95%] mx-auto">
          <DataTable columns={columns} data={wishlist} isLoading={isLoading} />
        </div>
      </div>
    </> 
  );
};

export default withAuth(Page);
