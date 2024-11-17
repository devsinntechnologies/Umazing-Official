// @ts-nocheck
"use client";
import { useToast } from "@/hooks/use-toast";
import {
  useAddToFavouriteMutation,
  useRemoveFromFavouriteProductIdMutation,
} from "@/hooks/UseFavourite";
import { Trash2, Heart, Loader2, ShoppingCart, Star } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { usePathname } from "next/navigation";
import AuthDialog from "@/components/layout/auth/AuthDialog";
import { useAddToCartMutation, useGetUserCartQuery } from "@/hooks/UseCart";
import Link from "next/link";
import Stars from "./singleProduct/Stars";

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
    <div className="w-full h-auto p-1 relative hover:shadow-lg shadow-md rounded-md overflow-hidden border-gray-400 ">
      <Link href={`/details/${product.id}`} className="w-full flex flex-col">
        <AuthDialog isOpen={isDialogOpen} setIsOpen={setIsDialogOpen} useTrigger={false} />
        <Image
          className="w-full rounded h-[140px] md:h-[160px] lg:h-[180px] xl:h-[200px] object-cover"
          width={500}
          height={300}
          src={product?.Product_Images[0]?.imageUrl ? `http://97.74.89.204/${product?.Product_Images[0]?.imageUrl}` : ""}
          alt={product.name}
        />
        <div className="w-full space-y-2 p-2">
          <h3 className="text-sm md:text-lg font-bold transition duration-200 text-primary  tracking-wide capitalize truncate-multiline-1">{product.name}</h3>
        <div className="w-full flex justify-between items-center">
        <p className="text-sm md:text-base xl:text-xl font-semibold text-black">Rs.
            <span className="text-base md:text-lg lg:text-xl xl:text-2xl font-bold "> {product.basePrice}</span>
          </p>
          <p className="text-sm md:text-base xl:text-lg font-semibold text-black">Qty:
            <span className="text-sm md:text-base xl:text-lg  "> {product.baseQuantity}</span>
          </p>
        </div>
        </div>
      </Link>
      {/* Add to Cart button */}
        <div className="w-full flex items-center justify-between md:p-3 p-1 !pt-0">
          <div className="h-fit flex items-end justify-center gap-1 text-sm">
          <Stars rating={product.review}/>
          <p className="size-auto">({product.totalReview})</p>
          </div>
          {!isSeller && (
          <button
          className="md:p-3 p-1.5 rounded-full  flex items-center justify-center"
          onClick={handleAddToCart} // Add to Cart functionality
          disabled={addingToCart} // Disable while loading
        >
          {addingToCart ? (
            <Loader2 className="animate-spin size-6 md:size-8 " />
          ) : (
            <ShoppingCart className="size-6 md:size-8"/>
          )}
        </button>
      )}
        </div>
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
