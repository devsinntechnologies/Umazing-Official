// @ts-nocheck
"use client";
import React, { useEffect, useState, Suspense } from "react";
import dynamic from "next/dynamic";
import { useGetAllProductsQuery, useGetProductByIdQuery } from "@/hooks/UseProducts";
import { useGetAllProductReviewsQuery } from "@/hooks/UseReview";
import ProductsCard from "@/components/ProductsCard";
import { Skeleton } from "@/components/ui/skeleton";
import { Minus, Plus, ShoppingCart, Heart } from "lucide-react";
import Head from "next/head";
import { useParams } from "next/navigation";

// Dynamic imports for heavy components
const Gallery = dynamic(() => import("@/components/singleProduct/Gallery"), { ssr: false });
const TabComponent = dynamic(() => import("@/components/singleProduct/TabContent"), { ssr: false });
const Stars = dynamic(() => import("@/components/singleProduct/Stars"), { ssr: false });

const Page = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState(null);
  const [quantity, setQuantity] = useState(1);

  const { data: productData, isLoading: productLoading } = useGetProductByIdQuery(id);
  const { data: relatedData, isLoading: relatedLoading } = useGetAllProductsQuery({ pageNo: "1", pageSize: "8", categoryId: "4051eb3ece5de28e4b7521a0a42957eb" });
  const { data: reviewData, isLoading: reviewLoading } = useGetAllProductReviewsQuery(id);

  useEffect(() => {
    if (productData) setProduct(productData.data);
    if (relatedData) setRelatedProducts(relatedData.data);
  }, [productData, relatedData]);

  const handleIncrement = () => setQuantity((prevQty) => prevQty + 1);
  const handleDecrement = () => setQuantity((prevQty) => (prevQty > 1 ? prevQty - 1 : 1));

  const handleAddToCart = () => {
    console.log("Adding to cart", { product, quantity });
  };

  return (
    <>
      <Head>
        <title>{product?.name || "Loading..."}</title>
        <meta property="og:title" content={product?.name || "Product Details"} />
        <meta property="og:description" content={product?.description || ""} />
        <meta property="og:image" content={product?.images?.[0]?.imagePath || "/default-image.png"} />
        <meta property="og:url" content={`http://localhost:3000/details/${product?.id}`} />
        <meta name="description" content={product?.description || ""} />
        <meta name="robots" content="index, follow" />
      </Head>

      <div className="w-full flex flex-col gap-5 py-4">
        {/* Product Section */}
        <div className="gap-2 md:gap-5 w-full h-fit flex flex-col md:flex-row justify-center lg:justify-between">
          <div className="w-full md:w-[50%] h-[500px] overflow-hidden">
            {productLoading ? <Skeleton className="h-full w-full" /> : <Gallery data={product} />}
          </div>

          <div className="w-full md:w-[50%] h-full space-y-5">
            <div className="rounded-[4px] text-primary text-2xl font-bold">
              {productLoading ? <Skeleton className="h-6 w-3/4" /> : product?.name}
            </div>
            <div className="flex items-center gap-3 my-2">
              <Stars />
              <p className="text-[#666666] text-[14px]">
                {reviewLoading ? <Skeleton className="h-4 w-10" /> : `${reviewData?.data.length || 0} reviews`}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <p className="text-[#2C742F] text-[24px] font-medium">
                {productLoading ? <Skeleton className="h-6 w-16" /> : `Rs. ${product?.basePrice}`}
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
                <button className="w-[34px] h-[34px] bg-[#F2F2F2] rounded-full flex justify-center items-center" onClick={handleDecrement}>
                  <Minus width={10} height={10} />
                </button>
                <div>{quantity}</div>
                <button className="w-[34px] h-[34px] bg-[#F2F2F2] rounded-full flex justify-center items-center" onClick={handleIncrement}>
                  <Plus width={10} height={10} />
                </button>
              </div>
              <button onClick={handleAddToCart} className="h-[51px] w-[55%] text-sm lg:w-[347px] bg-primary text-white text-[16px] font-semibold flex justify-center items-center gap-3 lg:gap-4 rounded-[43px]">
                Add to Cart <ShoppingCart width={20} height={20} />
              </button>
              <div className="bg-primary h-[51px] w-[20%] flex justify-center items-center rounded-[43px]">
                <Heart color="white" />
              </div>
            </div>

            <div className="w-full lg:w-[647px] my-6 border border-[#E6E6E6]"></div>

            <div>
              <p className="text-[14px] font-bold">
                Category:
                <span className="text-[#808080] font-normal">
                  {productLoading ? <Skeleton className="h-4 w-16" /> : product?.Category?.name}
                </span>
              </p>
            </div>
          </div>
        </div>

        {/* Tabs Section */}
        <div className="w-full flex justify-center">
          {productLoading || reviewLoading ? <Skeleton className="h-24 w-full" /> : <TabComponent product={product} review={reviewData} />}
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
  );
};

export default Page;
