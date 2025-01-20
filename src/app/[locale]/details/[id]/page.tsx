// @ts-nocheck
"use client";
import React, { useEffect, useState, Suspense } from "react";
import dynamic from "next/dynamic";
import { useGetAllProductsQuery, useGetProductByIdQuery } from "@/hooks/UseProducts";
import { useGetAllProductReviewsQuery } from "@/hooks/UseReview";
import ProductsCard from "@/components/ProductsCard";
import { Skeleton } from "@/components/ui/skeleton";
import { Minus, Plus, ShoppingCart, Heart, Loader2 } from "lucide-react";
import Head from "next/head";
import { useParams, useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import {
  useAddToFavouriteMutation,
  useRemoveFromFavouriteProductIdMutation,
} from "@/hooks/UseFavourite";
import { useAddToCartMutation } from "@/hooks/UseCart";
import { useSelector } from "react-redux";
import AuthDialog from "@/components/layout/auth/AuthDialog";
import Link from "next/link";
import { CURRENCY } from "@/lib/constants";
import ChatWithSeller from "@/components/singleProduct/ChatWithSeller";


// Dynamic imports for heavy components
const Gallery = dynamic(() => import("@/components/singleProduct/Gallery"), { ssr: false });
const TabComponent = dynamic(() => import("@/components/singleProduct/TabContent"), { ssr: false });
const Stars = dynamic(() => import("@/components/singleProduct/Stars"), { ssr: false });

const Page = () => {
  const router = useRouter()
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const { toast } = useToast();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const userId = useSelector((state: any) => state.authSlice?.user?.id);
  const isLoggedIn = useSelector((state: any) => state.authSlice.isLoggedIn);
  const [averageRating, setAverageRating] = useState(0);

  const [addToCart, { isLoading: addingToCart }] = useAddToCartMutation();
  const [addToFavourite, { isLoading: addingToFav }] = useAddToFavouriteMutation();
  const [removeFromFavourite, { isLoading: removingFromFav }] = useRemoveFromFavouriteProductIdMutation();

  const { data: productData, isLoading: productLoading, refetch, isError } = useGetProductByIdQuery(id);
  const { data: relatedData, isLoading: relatedLoading } = useGetAllProductsQuery({ pageNo: "1", pageSize: "8", CategoryId: product?.Category?.id });
  const { data: reviewData, isLoading: reviewLoading, refetch: refetchReview } = useGetAllProductReviewsQuery(id);

  useEffect(() => {
    if (productData) setProduct(productData.data);
    if (relatedData) setRelatedProducts(relatedData.data);
  }, [productData, relatedData, product]);


  const handleIncrement = () => setQuantity((prevQty) => prevQty + 1);
  const handleDecrement = () => setQuantity((prevQty) => (prevQty > 1 ? prevQty - 1 : 1));

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

    if (!product) {
      toast({
        title: "Error",
        description: "Product information not available.",
        variant: "destructive",
      });
      return;
    }

    if (product.baseQuantity < quantity || quantity <= 0) {
      toast({
        title: "Invalid Quantity",
        description: "Please select a valid quantity that is available in stock.",
        variant: "destructive",
      });
      return;
    }

    try {
      await addToCart({ ProductId: product.id, quantity });
      toast({
        title: "Success",
        description: "Item added to your cart.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add item to cart.",
        variant: "destructive",
      });
    }
  };

  const handleToggleFavorite = async () => {
    if (!isLoggedIn) {
      toast({
        title: "Not Logged In",
        description: "Please log in to manage favorites.",
        variant: "destructive",
      });
      setIsDialogOpen(true);
      return;
    }

    try {
      if (product.isFavorite) {
        await removeFromFavourite(product.id);
      } else {
        await addToFavourite({ ProductId: product.id });
      }
      refetch();

      toast({
        title: "Success",
        description: !product.isFavorite
          ? "Added to favorites"
          : "Removed from favorites",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update favorites.",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    if (reviewData?.data && Array.isArray(reviewData.data) && reviewData.data.length > 0) {

      const totalRating = reviewData.data.reduce((sum, review) => {

        const rating = Number(review.star) || 0;
        return sum + rating;
      }, 0);

      const avgRating = totalRating / reviewData.data.length;

      setAverageRating(Number(avgRating.toFixed(1)));
    } else {
      setAverageRating(0);
    }
  }, [reviewData]);

  useEffect(() => {
    if (product?.name) {
      document.title = `${product.name} | Umazing Official`;
    }
  }, [product]);

  const handleCheckout = () => {
    // Safeguard: Check if product exists
    if (!product || !product.id) {
      toast({
        title: "Error",
        description: "Product information not available.",
        variant: "destructive",
      });
      return;
    }

    // Safeguard: Validate quantity
    if (quantity > product.baseQuantity || quantity <= 0 || isNaN(quantity)) {
      toast({
        title: "Invalid Quantity",
        description: "Please select a valid quantity that is available in stock.",
        variant: "destructive",
      });
      return;
    }

    try {
      // Clear any existing selected items
      localStorage.removeItem("selectedItems");

      // Create and add the current product
      const selectedItem = [{ id: product.id, quantity }];
      localStorage.setItem("selectedItems", (selectedItem));

      // Confirm successful addition
      console.log("Added to localStorage:", localStorage.getItem("selectedItems"));

      // Navigate to the checkout page
      router.push("/checkout");
    } catch (error) {
      console.error("Error saving to localStorage:", error);
      toast({
        title: "Storage Error",
        description: "Unable to save product selection. Please try again.",
        variant: "destructive",
      });
    }
  };



  return (
    <>
      {isError ? <div className="flex flex-col items-center justify-center space-y-4 w-full h-[80vh]">
        <span class="text-4xl text-primary">Product not found!</span>
        <Link href="/">      <button class="px-6 py-2 bg-primary text-white rounded-full shadow-md hover:bg-primary-dark transition-all duration-200">Go to Home</button></Link>

      </div>
        :
        <>
          <AuthDialog isOpen={isDialogOpen} setIsOpen={setIsDialogOpen} useTrigger={false} />
          <Head>
            <title>{product?.name || "Loading..."}</title>
            <meta property="og:title" content={product?.name || "Product Details"} />
            <meta property="og:description" content={product?.description || ""} />
            <meta property="og:image" content={product?.images?.[0]?.imagePath || "/default-image.png"} />
            <meta property="og:url" content={`http://localhost:3000/details/${product?.id}`} />
            <meta name="description" content={product?.description || ""} />
            <meta name="robots" content="index, follow" />
          </Head>

          <div className="w-full flex flex-col gap-5 py-4 min-h-[80vh]">
            {/* Product Section */}
            <div className="gap-2 md:gap-5 w-full h-fit flex flex-col md:flex-row justify-center lg:justify-between">
              <div className="w-full md:w-[50%] h-[500px] overflow-hidden">
                {productLoading ? <Skeleton className="h-full w-full" /> : <Gallery data={product?.Product_Images} />}
              </div>

              <div className="w-full md:w-[50%] h-full space-y-5">
                <div className="flex justify-between">
                  <div className="rounded-[4px] text-primary text-2xl font-bold">
                    {productLoading ? <Skeleton className="h-6 w-3/4" /> : product?.name}
                  </div>
                  <button
                    onClick={handleToggleFavorite}
                    disabled={addingToFav || removingFromFav}
                  >
                    {addingToFav || removingFromFav ? (
                      <Loader2 className="animate-spin text-white" />
                    ) : (
                      <Heart
                        color="#007F80"
                        fill={product?.isFavorite ? "none" : "#007F80"}
                      />
                    )}
                  </button>
                </div>
                <div className="flex items-center gap-3 my-2">
                  {reviewLoading ? (
                    <Skeleton className="h-4 w-20" />
                  ) : (
                    <>
                      <Stars rating={averageRating} />
                      <p className="text-[#666666] text-[14px]">
                        {reviewData?.data?.length || 0} reviews
                      </p>
                    </>
                  )}
                </div>
                <div className="flex items-center gap-3">
                  <p className="text-[#2C742F] text-[24px] font-medium">
                    {productLoading ? <Skeleton className="h-6 w-16" /> : `${CURRENCY} ${product?.basePrice}`}
                  </p>
                  <div className="w-[75px] h-[27px] rounded-[30px] text-destructive text-[14px] py-[3px] px-[10px]">
                    {productLoading ? <Skeleton className="h-4 w-10" /> : `${product?.baseQuantity} Qty`}
                  </div>
                </div>
                <div className="my-4">
                  <h1 className="font-semibold text-md">Product Description</h1>
                  <p>{productLoading ? <Skeleton className="h-5 w-full" count={3} /> : product?.description}</p>
                </div>

                {/* Add to Cart Section */}
                <div className="flex items-center w-full justify-between space-x-2 px-1 lg:px-3">
                  <div className="h-[50px] w-[25%] border border-[#E6E6E6] p-[8px] rounded-[170px] flex gap-2 lg:gap-0 items-center justify-between py-2">
                    <button
                      className="w-[34px] h-[34px] bg-[#F2F2F2] rounded-full flex justify-center items-center"
                      onClick={handleDecrement}
                      disabled={addingToCart}
                    >
                      <Minus width={10} height={10} />
                    </button>
                    <div>{quantity}</div>
                    <button
                      className="w-[34px] h-[34px] bg-[#F2F2F2] rounded-full flex justify-center items-center"
                      onClick={handleIncrement}
                      disabled={quantity >= product?.baseQuantity}
                    >
                      <Plus width={10} height={10} />
                    </button>
                  </div>
                  <button
                    onClick={handleAddToCart}
                    disabled={addingToCart}
                    className="h-[51px] w-[55%] text-sm lg:w-[347px] bg-primary text-white text-[16px] font-semibold flex justify-center items-center gap-3 lg:gap-4 rounded-[43px]"
                  >
                    {addingToCart ? (
                      <Loader2 className="animate-spin" />
                    ) : (
                      <>
                        Add to Cart <ShoppingCart width={20} height={20} />
                      </>
                    )}
                  </button>
                  <button
                    onClick={handleCheckout}
                    disabled={addingToCart}
                    className="h-[51px] w-[55%] text-sm lg:w-[347px] bg-primary text-white text-[16px] font-semibold flex justify-center items-center gap-3 lg:gap-4 rounded-[43px]"
                  >
                    Buy Now
                  </button>
                </div>

                <div className="w-full lg:w-[647px] my-6 border border-[#E6E6E6]"></div>
                <ChatWithSeller />
                <div>
                  <p className="text-[14px] font-bold">
                    Category:{" "}
                    <span className="text-[#808080] font-normal">
                      {productLoading ? <Skeleton className="h-4 w-16" /> : product?.Category?.name}
                    </span>
                  </p>
                </div>
              </div>
            </div>

            {/* Tabs Section */}
            <div className="w-full flex justify-center">
              {productLoading || reviewLoading ? <Skeleton className="h-24 w-full" /> : <TabComponent product={product} review={reviewData} refetch={refetchReview} />}
            </div>

            {/* Related Products Section */}
            <div className="w-full mt-8">
              <h1 className="lg:text-[30px] text-[23px] font-medium md:font-bold text-center">Related Products</h1>
              {relatedLoading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-10">
                  {Array.from({ length: 4 }).map((_, i) => (
                    <Skeleton key={i} className="w-full group lg:h-[360px] rounded-xl sm:h-80" />
                  ))}
                </div>
              ) : (
                <div className="lg:h-auto w-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mt-8">
                  {relatedProducts?.map((product, index) => (
                    <ProductsCard key={product.id} product={product} index={index} setProducts={setRelatedProducts} products={relatedProducts} />
                  ))}
                </div>
              )}
            </div>
          </div>
        </>
      }

    </>
  );
};

export default Page;
