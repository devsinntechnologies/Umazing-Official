"use client";
import { useToast } from "@/hooks/use-toast";
import {
  useGetUserFavouriteQuery,
  useAddToFavouriteMutation,
  useRemoveFromFavouriteMutation,
} from "@/hooks/UseFavourite";
import { Trash2, Heart } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { usePathname } from "next/navigation";

const ProductsCard = ({ product }) => {
  const { toast } = useToast();
  const userId = useSelector((state) => state.authSlice?.user?.id);
  const isLoggedIn = useSelector((state) => state.authSlice.isLoggedIn);
  const pathname = usePathname();

  // Fetch user favourites
  const { data: favouriteData, refetch: refetchFavourites } = useGetUserFavouriteQuery(userId, {
    skip: !isLoggedIn,
  });

  const [addToFavourite, { isSuccess: addSuccess, isError: addError }] = useAddToFavouriteMutation();
  const [removeFromFavourite, { isSuccess: removeSuccess, isError: removeError }] = useRemoveFromFavouriteMutation();

  const [isProductInWishlist, setIsProductInWishlist] = useState(false);
  const [favouriteId, setFavouriteId] = useState(null);

  // Check if the product is in the user's wishlist and set the favouriteId
  useEffect(() => {
    if (favouriteData && favouriteData.data) {
      const favourite = favouriteData.data.find(item => item.Product.id === product.id);
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

    try {
      await removeFromFavourite(favouriteId);
      refetchFavourites();
    } catch (error) {
      console.error("Failed to remove from wishlist:", error);
    }
  };

  const handleAddToFavorites = async () => {
    if (!isLoggedIn) {
      toast.warn("Please log in to add to your wishlist.");
      return;
    }

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
      <Image
        className="w-full h-[200px] object-cover"
        width={500}
        height={300}
        src={product.Product_Images[0]?.imageUrl ? `http://97.74.89.204/${product.Product_Images[0]?.imageUrl}` : ""}
        alt={product.name}
      />
      <div className="w-full space-y-2 px-3 py-2">
      <h3 className="text-base font-semibold transition duration-200 text-primary">{product.name}</h3>
      <p className="text-gray-600">${product.basePrice}</p>
      {/* Add to Cart button */}
      {!showTrashIcon && (
        <button
          className="w-fit text-sm px-3 py-2 bg-primary text-white rounded-full "
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
            <Trash2 size={20} className="text-destructive"/>
          </button>
        )}
        <button
          className="p-2 rounded-full bg-gray-200"
          onClick={isProductInWishlist ? handleRemove : handleAddToFavorites}
        >
          {isProductInWishlist ? (
            <Heart size={20} color="red" fill="red"/>
          ) : (
            <Heart size={20} color="gray" />
          )}
        </button>
      </div>
    </div>
  );
};

export default ProductsCard;
