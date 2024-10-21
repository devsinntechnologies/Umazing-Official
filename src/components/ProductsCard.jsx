"use client";
import { useToast } from "@/hooks/use-toast";
import {
  useGetUserFavouriteQuery,
  useAddToFavouriteMutation,
  useRemoveFromFavouriteMutation,
} from "@/hooks/UseFavourite";
import { Trash2, Heart, Loader2 } from "lucide-react"; // Loader icon from Lucide
import Image from "next/image";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { usePathname } from "next/navigation";
import AuthDialog from "./auth/AuthDialog";

const ProductsCard = ({ product }) => {
  const { toast } = useToast();
  const userId = useSelector((state) => state.authSlice?.user?.id);
  const isLoggedIn = useSelector((state) => state.authSlice.isLoggedIn);
  const pathname = usePathname();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Fetch user favourites
  const { data: favouriteData, refetch: refetchFavourites } = useGetUserFavouriteQuery(userId, {
    skip: !isLoggedIn,
  });

  const [addToFavourite, { isSuccess: addSuccess, isLoading: addingToFav, isError: addError }] = useAddToFavouriteMutation();
  const [removeFromFavourite, { isSuccess: removeSuccess, isLoading: removingFromFav, isError: removeError }] = useRemoveFromFavouriteMutation();

  const [isProductInWishlist, setIsProductInWishlist] = useState(false);
  const [favouriteId, setFavouriteId] = useState(null);

  // Check if the product is in the user's wishlist and set the favouriteId
  useEffect(() => {
    if (favouriteData && favouriteData.data) {
      const favourite = favouriteData.data.find((item) => item.Product.id === product.id);
      if (favourite) {
        setIsProductInWishlist(true);
        setFavouriteId(favourite.id); // Set the favourite ID from the data
      } else {
        setIsProductInWishlist(false);
        setFavouriteId(null);
      }
    }
  }, [favouriteData, product.id]);

  const handleRemove = async () => {
    if (!favouriteId) return;

    toast({
      title: "Removing",
      description: "Removing item from your wishlist...",
      status: "loading", // Show loading toast
    });

    try {
      await removeFromFavourite(favouriteId);
      refetchFavourites();
    } catch (error) {
      console.error("Failed to remove from wishlist:", error);
    }
  };

  const handleAddToFavorites = async () => {
    if (!isLoggedIn) {
      toast({
        title: "Not Logged In",
        description: "Please log in",
        vatiant:"destructive"
      });
      setIsDialogOpen(true);
      return;
    }

    toast({
      title: "Adding",
      description: "Adding item to your wishlist...",
      status: "loading", // Show loading toast
    });

    try {
      await addToFavourite({ UserId: userId, ProductId: product.id });
      refetchFavourites();
    } catch (error) {
      console.error("Failed to add to wishlist:", error);
    }
  };

  const handleAddToCart = () => {
    console.log(`Adding product to cart with ID: ${product.Product.id}`); // Log product ID
    // Implement the add to cart functionality here if needed
  };

  // Handle toast notifications for add/remove success and errors
  useEffect(() => {
    if (addSuccess) {
      toast({
        title: "Added",
        description: "Item added to your wishlist successfully.",
        status: "success",
      });
    }

    if (removeSuccess) {
      toast({
        title: "Removed",
        description: "Item removed from your wishlist successfully.",
        status: "success",
      });
    }

    if (addError || removeError) {
      toast({
        title: "Error",
        description: "Failed to update wishlist. Please try again.",
        status: "error",
      });
    }
  }, [addSuccess, removeSuccess, addError, removeError, toast]);

  const handleDelete = () => {
    console.log(`Deleting product with ID: ${product.id}`);
  };

  const showTrashIcon = pathname === "/seller" || pathname === "/seller/products";

  return (
    <div className="hover:shadow-lg h-auto border border-border rounded-sm relative hover:border-primary w-full flex flex-col">
        <AuthDialog isOpen={isDialogOpen} setIsOpen={setIsDialogOpen} useTrigger={false} />
      <Image
        className="w-full h-[200px] object-cover"
        width={500}
        height={300}
        src={product?.Product_Images[0]?.imageUrl ? `http://97.74.89.204/${product?.Product_Images[0]?.imageUrl}` : ""}
        alt={product.name}
      />
      <div className="w-full space-y-2 text-center pt-3">
        <h3 className="text-sm font-semibold transition duration-200 text-primary">{product.name}</h3>
        <p className="text-gray-600">${product.basePrice}</p>
        {/* Add to Cart button */}
        {!showTrashIcon && (
          <button
            className="w-full text-sm  bg-primary py-3 text-white rounded-b-sm "
            onClick={handleAddToCart} // Add to Cart functionality
          >
            Add to cart
          </button>
        )}
      </div>
      <div className="absolute top-2 right-2 flex items-center">
        {showTrashIcon && (
          <button
            className="p-2 rounded-full bg-gray-200 mr-2"
            onClick={handleDelete}
          >
            <Trash2 size={20} className="text-destructive" />
          </button>
        )}
        <button
          className="p-2 rounded-full bg-gray-200"
          onClick={isProductInWishlist ? handleRemove : handleAddToFavorites}
        >
          {/* Show loader while adding/removing */}
          {addingToFav || removingFromFav ? (
            <Loader2 size={20} className="animate-spin text-gray-500" />
          ) : isProductInWishlist ? (
            <Heart size={20} color="red" fill="red" />
          ) : (
            <Heart size={20} color="gray" />
          )}
        </button>
      </div>
    </div>
  );
};

export default ProductsCard;
