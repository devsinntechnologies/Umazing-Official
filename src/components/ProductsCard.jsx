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
import { useAddToCartMutation, useGetUserCartQuery, useUpdateCartItemMutation } from "@/hooks/UseCart";
import Link from "next/link";

const ProductsCard = ({ product }) => {
  const { toast } = useToast();
  const userId = useSelector((state) => state.authSlice?.user?.id);
  const isLoggedIn = useSelector((state) => state.authSlice.isLoggedIn);
  const pathname = usePathname();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isProductInCart, setIsProductInCart] = useState(false);
  const [cartItemId, setCartItemId] = useState(null);
  const [isProductInWishlist, setIsProductInWishlist] = useState(false);
  const [favouriteId, setFavouriteId] = useState(null);
  const quantity = 1;

  // Fetch user favourites
  const { data: favouriteData, refetch: refetchFavourites } = useGetUserFavouriteQuery(userId, {
    skip: !isLoggedIn,
  });

  const { data: cartData, refetch: refetchCart } = useGetUserCartQuery(userId, {
    skip: !isLoggedIn,
  });

  const [addToCart, { isSuccess: cartSuccess, isLoading: addingToCart, isError: cartError }] = useAddToCartMutation();
  const [updateData, { isSuccess: cartUpdateSuccess, isLoading: updatingCart, isError: updateCartError }] = useUpdateCartItemMutation();
  const [addToFavourite, { isSuccess: addSuccess, isLoading: addingToFav, isError: addError }] = useAddToFavouriteMutation();
  const [removeFromFavourite, { isSuccess: removeSuccess, isLoading: removingFromFav, isError: removeError }] = useRemoveFromFavouriteMutation();

  // Check if the product is already in the cart and set cart item ID
  useEffect(() => {
    if (isLoggedIn && cartData) {
      const cartItem = cartData.data?.find(item => item.Product.id === product.id);
      if (cartItem) {
        setIsProductInCart(true);
        setCartItemId(cartItem.id); // Store the cart item ID for updates
      } else {
        setIsProductInCart(false);
        setCartItemId(null);
      }
    }
  }, [cartData, product.id, isLoggedIn]);

  // Check if the product is in the user's wishlist
  useEffect(() => {
    if (isLoggedIn && favouriteData?.data) {
      const favourite = favouriteData.data.find(item => item.Product.id === product.id);
      if (favourite) {
        setIsProductInWishlist(true);
        setFavouriteId(favourite.id); // Store the favourite ID
      } else {
        setIsProductInWishlist(false);
        setFavouriteId(null);
      }
    }
  }, [favouriteData, product.id, isLoggedIn]);

  // Add to cart functionality
  const handleAddToCart = async () => {
    if (!isLoggedIn) {
      toast({
        title: "Not Logged In",
        description: "Please log in to add items to the cart.",
        variant: "destructive",
      });
      setIsDialogOpen(true);
      return;
    }

    toast({
      title: "Processing",
      description: "Updating your cart...",
      status: "loading",
    });

    try {
      if (isProductInCart) {
        // Update quantity if product is already in the cart
        const existingItem = cartData.data.find(item => item.Product.id === product.id);
        const newQuantity = existingItem.quantity + 1; // Increment quantity
        await updateData({ cartItemId, quantity: newQuantity });
      } else {
        // Add product to cart if not in the cart
        await addToCart({ ProductId: product.id, UserId: userId, quantity });
      }
      refetchCart();
    } catch (error) {
      console.error("Error updating cart:", error);
    }
  };

  // Add to favorites
  const handleAddToFavorites = async () => {
    if (!isLoggedIn) {
      toast({
        title: "Not Logged In",
        description: "Please log in",
        variant: "destructive",
      });
      setIsDialogOpen(true);
      return;
    }

    toast({
      title: "Adding",
      description: "Adding item to your wishlist...",
      status: "loading",
    });

    try {
      await addToFavourite({ UserId: userId, ProductId: product.id });
      refetchFavourites();
    } catch (error) {
      console.error("Failed to add to wishlist:", error);
    }
  };

  // Remove from favorites
  const handleRemove = async () => {
    if (!isLoggedIn) {
      toast({
        title: "Not Logged In",
        description: "Please log in",
        variant: "destructive",
      });
      setIsDialogOpen(true);
      return;
    }

    if (!favouriteId) return;

    toast({
      title: "Removing",
      description: "Removing item from your wishlist...",
      status: "loading",
    });

    try {
      await removeFromFavourite(favouriteId);
      refetchFavourites();
    } catch (error) {
      console.error("Failed to remove from wishlist:", error);
    }
  };

  const handleDelete = () => {
    console.log(`Deleting product with ID: ${product.id}`);
  };

  const isSeller = pathname === "/seller" || pathname === "/seller/products";

  return (
    <div className="w-full h-auto relative hover:shadow-lg border border-border rounded-sm hover:border-primary">
     <Link href={`details/${product.id}`} className="w-full flex flex-col">
     <AuthDialog isOpen={isDialogOpen} setIsOpen={setIsDialogOpen} useTrigger={false} />
      <Image
        className="w-full h-[200px] object-cover"
        width={500}
        height={300}
        src={product?.Product_Images[0]?.imageUrl ? `http://97.74.89.204/${product?.Product_Images[0]?.imageUrl}` : ""}
        alt={product.name}
      />
      <div className="w-full space-y-2 p-2">
        <h3 className="text-sm font-semibold h-10 transition duration-200 text-primary truncate-multiline">{product.name}</h3>
        <p className="text-gray-600">${product.basePrice}</p>
      </div>
     </Link>
       {/* Add to Cart button */}
       {!isSeller && (
          <button
            className="w-full text-sm bg-primary py-3 text-white rounded-b-sm"
            onClick={handleAddToCart} // Add to Cart functionality
            disabled={addingToCart || updatingCart} // Disable while loading
          >
            {addingToCart || updatingCart ? (
              <Loader2 size={20} className="animate-spin text-white" />
            ) : (
              isProductInCart ? "Update Cart" : "Add to Cart"
            )}
          </button>
        )}
     <div className="absolute top-2 right-2 flex items-center">
        {isSeller && (
          <button
            className="p-2 rounded-full bg-gray-200 mr-2"
            onClick={handleDelete}
          >
            <Trash2 size={20} className="text-destructive" />
          </button>
        )}
        {!isSeller && (
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
        )}
      </div>
    </div>
  );
};

export default ProductsCard;
