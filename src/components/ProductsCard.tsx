// @ts-nocheck
"use client";
import { useToast } from "@/hooks/use-toast";
import {
  useAddToFavouriteMutation,
  useRemoveFromFavouriteProductIdMutation,
} from "@/hooks/UseFavourite";
import { Trash2, Heart, Loader2, ShoppingCart } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { usePathname } from "next/navigation";
import AuthDialog from "@/components/layout/auth/AuthDialog";
import { useAddToCartMutation, useGetUserCartQuery } from "@/hooks/UseCart";
import Link from "next/link";

const ProductsCard = ({ product, onDelete, index, setProducts, products }) => {
  const { toast } = useToast();
  const userId = useSelector((state:any) => state.authSlice?.user?.id);
  const isLoggedIn = useSelector((state:any) => state.authSlice.isLoggedIn);
  const pathname = usePathname();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const quantity = 1;
  console.log(product);

  const [addToCart, { isSuccess: cartSuccess, isLoading: addingToCart, isError: cartError }] = useAddToCartMutation();
  const [addToFavourite, { isSuccess: addSuccess, isLoading: addingToFav, isError: addError }] = useAddToFavouriteMutation();
  const [removeFromFavourite, { isSuccess: removeSuccess, isLoading: removingFromFav, isError: removeError }] = useRemoveFromFavouriteProductIdMutation();

  useEffect(() => {
    if (isLoggedIn) {
      setProducts((prevProducts) => {
        const updatedProducts = [...prevProducts];
        updatedProducts[index] = { ...updatedProducts[index], isFavorite: product.isFavorite };
        return updatedProducts;
      });
    } else {
      setProducts((prevProducts) => {
        const updatedProducts = [...prevProducts];
        updatedProducts[index] = { ...updatedProducts[index], isFavorite: false };
        return updatedProducts;
      });
    }
    if(cartSuccess){
      toast({
        title: "Added to Cart",
        description: "Item added to your cart.",
      });
    }
  }, [isLoggedIn, index, setProducts, product.isFavorite, cartSuccess, toast]);

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
      duration: 1000,
    });

    try {
        await addToCart({ ProductId: product.id, quantity });
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
      duration: 1000
    });

    try {
      await addToFavourite({ UserId: userId, ProductId: product.id });

      console.log(products[index].isFavorite);



      setProducts((prevProducts) => {
        const updatedProducts = [...prevProducts];
        updatedProducts[index] = { ...updatedProducts[index], isFavorite: true };
        return updatedProducts;
      });


      // refetchFavourites();
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

    toast({
      title: "Removing",
      description: "Removing item from your wishlist...",
      duration: 1000
    });

    try {
      await removeFromFavourite(product.id);

      setProducts((prevProducts) => {
        const updatedProducts = [...prevProducts];
        updatedProducts[index] = { ...updatedProducts[index], isFavorite: false };
        return updatedProducts;
      });

    } catch (error) {
      console.error("Failed to remove from wishlist:", error);
    }
  };

  const isSeller = pathname === "/seller" || pathname === "/seller/products";

  return (
    <div className="w-full h-auto relative hover:shadow-lg border border-border rounded-md overflow-hidden hover:border-primary">
      <Link href={`/details/${product.id}`} className="w-full flex flex-col">
        <AuthDialog isOpen={isDialogOpen} setIsOpen={setIsDialogOpen} useTrigger={false} />
        <Image
          className="w-full h-[140px] md:h-[160px] lg:h-[200px] object-cover"
          width={500}
          height={300}
          src={product?.Product_Images[0]?.imageUrl ? `http://97.74.89.204/${product?.Product_Images[0]?.imageUrl}` : ""}
          alt={product.name}
        />
        <div className="w-full space-y-2 p-2">
          <h3 className="text-xs md:text-sm font-semibold h-8 md:h-10 transition duration-200 text-primary truncate-multiline">{product.name}</h3>
          <p className="text-xs md:text-sm text-gray-600">Rs. {product.basePrice}</p>
        </div>
      </Link>
      {/* Add to Cart button */}
      {!isSeller && (
        <button
          className="w-full text-xs lg:text-sm bg-primary py-2 lg:py-3 text-white rounded-b-sm flex items center justify-center gap-2"
          onClick={handleAddToCart} // Add to Cart functionality
          disabled={addingToCart} // Disable while loading
        >
          {addingToCart ? (
            <Loader2 size={20} className="animate-spin text-white" />
          ) : (
            <div className="flex items-center justify-center gap-3"><ShoppingCart className="size-3 md:size-4"/> add To Cart</div>
          )}
        </button>
      )}
      <div className="absolute top-2 right-2 flex items-center">
        {isSeller && (
          <button
            className="p-2 bg-gray-200 rounded-full"
            onClick={onDelete}
            aria-label={`Delete ${product.name}`}
          >
            <Trash2 size={20} className="text-destructive" />
          </button>
        )}
        {!isSeller && (
          <button
            className="p-2 rounded-full bg-gray-200"
            onClick={product.isFavorite ? handleRemove : handleAddToFavorites}
          >
            {/* Show loader while adding/removing */}
            {addingToFav || removingFromFav ? (
              <Loader2 size={20} className="animate-spin text-gray-500" />
            ) : product.isFavorite ? (
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
