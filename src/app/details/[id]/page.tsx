// @ts-nocheck
"use client";
import ProductsCard from "@/components/ProductsCard";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton"; // Skeleton loader import
import { Minus, Plus, ShoppingCart, Star, Instagram, Facebook, Twitter, Heart } from "lucide-react";
import SelectSize from "@/components/singleProduct/SelectSize";
import SelectColor from "@/components/singleProduct/SelectColor";
import { useGetAllProductsQuery, useGetProductByIdQuery, } from "@/hooks/UseProducts";
import TabComponent from "@/components/singleProduct/TabContent";
import Gallery from "@/components/singleProduct/Gallery";
import Stars from "@/components/singleProduct/Stars";
import { useGetAllProductReviewsQuery } from "@/hooks/UseReview";
import Head from "next/head";

const Page = ({ params }) => {
  const { id } = params;
  const pageNo = "1";
  const pageSize = "8";
  const categoryId = "4051eb3ece5de28e4b7521a0a42957eb";
  const queryParams = {
    pageNo,
    pageSize,
    categoryId,
  };
  const { data: item, isLoading, isError } = useGetAllProductsQuery(queryParams);
  const { data: productData, isError: productError, isLoading: productLoading } = useGetProductByIdQuery(id);
  const { data: reviewData, isError: reviewError, isLoading: reviewLoading } = useGetAllProductReviewsQuery(id);

  console.log("Arslan", reviewData);
  const [products, setProducts] = useState(null);
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (productData) {
      setProduct(productData.data);
    }
    if (item) {
      setProducts(item.data)
    }
  }, [productData, item]);

  const handleIncrement = () => setQuantity((prevQty) => prevQty + 1);
  const handleDecrement = () =>
    setQuantity((prevQty) => (prevQty > 0 ? prevQty - 1 : prevQty));

  return (
    <>
    <Head>
        <title>{product?.name || "Loading..."}</title>
        <meta property="og:title" content={product?.name} />
        <meta property="og:description" content={product?.description} />
        <meta property="og:image" content={product?.images?.[0]?.imagePath || "/default-image.png"} />
        <meta property="og:url" content={`http://localhost:3000/details/${product?.id}`} />
        <meta name="description" content={product?.description} />
        <meta name="robots" content="index, follow" />
      </Head>
        <div className="w-full flex flex-col gap-5 py-4">
          <div className="gap-2 md:gap-5 w-full h-fit flex md:flex-row flex-col justify-center lg:justify-between">
            <div className="w-full md:w-[50%] h-[500px] overflow-hidden ">
              <Gallery data={product} />
            </div>

            {/* Product Information */}
            <div className="w-full md:w-[50%] h-full space-y-5">
              <div className="rounded-[4px] text-primary text-2xl font-bold ">
                {product?.name}
              </div>
              {/* Ratings and other product details */}
              <div className="flex items-center gap-3 my-2">
                <Stars />
                <p className="text-[#666666] text-[14px]">4 review</p>
                  {/* <p className="text-[14px]">
                    SKU : <span className="text-[#666666]">213,234,3</span>
                  </p> */}

              </div>


              {/* Pricing */}
              <div className="flex items-center gap-3 ">
                {/* <p className="text-[#666666] text-[18px] font-normal line-through ">
                  $48.00
                </p> */}
                <p className="text-[#2C742F] text-[24px] font-medium">
                  ${product?.basePrice}
                </p>
                <div className="w-[75px] h-[27px] rounded-[30px] bg-[#EA4B481A] text-[#EA4B48] text-[14px] py-[3px] px-[10px]">
                  In Stock
                </div>
              </div>
              <div className="my-4">
                <h1 className="font-semibold text-md ">Product Description</h1>
                <p>{product?.description}</p>
              </div>
              {/* <div className="w-full lg:w-[647px] my-5 border border-[#E6E6E6]"></div>
              <div className=" space-y-4 px-3 gap-4">
                <SelectSize />
                <SelectColor />
              </div> */}
              <div className="w-full lg:w-[647px] my-5 border border-[#E6E6E6]"></div>

              {/* Add to cart */}
              <div className="flex items-center w-full justify-between space-x-2 px-1 lg:px-3">
                <div className="h-[50px] w-[25%] border border-[#E6E6E6] p-[8px] rounded-[170px] flex gap-2 lg:gap-0 items-center justify-between py-2">
                  <button
                    className="w-[34px] h-[34px] bg-[#F2F2F2] rounded-full flex justify-center items-center"
                    onClick={handleDecrement}
                    disabled={quantity === 1}
                  >
                    <Minus width={10} height={10} />
                  </button>
                  <div>{quantity}</div>
                  <button
                    className="w-[34px] h-[34px] bg-[#F2F2F2] rounded-full flex justify-center items-center"
                    onClick={handleIncrement}
                  >
                    <Plus width={10} height={10} />
                  </button>
                </div>
                <button className="h-[51px] w-[55%] text-sm lg:w-[347px] bg-primary text-white text-[16px] font-semibold flex justify-center items-center gap-3 lg:gap-4 rounded-[43px]">
                  Add to Cart
                  <ShoppingCart width={20} height={20} />
                </button>
                <div className="bg-primary h-[51px] w-[20%] flex justify-center items-center rounded-[43px]"><Heart
                  color="white"
                /></div>
              </div>

              <div className="w-full lg:w-[647px] my-6 border border-[#E6E6E6]"></div>

              {/* Category and Tags */}
              <div>
                <p className="text-[14px] font-bold">
                  Category:
                  <span className="text-[#808080] font-normal"> {product?.Category.name}</span>
                </p>
              </div>
            </div>
          </div>

          <div className="w-full   flex justify-center">
            <TabComponent product={product} review={reviewData} />
          </div>

          {/* Related Products */}
          <div className=" w-full mt-8">
            <h1 className="lg:text-[30px] text-[23px] font-medium md:font-bold text-center">
              Related Products
            </h1>
            {/* Products */}
            {isLoading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-10">
                {Array.from({ length: 4 }).map((_, i) => (
                  <Skeleton
                    key={i}
                    className="w-full group lg:h-[360px] rounded-xl sm:h-80"
                    active
                  />
                ))}
              </div>
            ) : (
              <div className="lg:h-auto w-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5  gap-4 mt-8">
                {products?.map((product, index) => (
                  <ProductsCard key={product.id} product={product} index={index} setProducts={setProducts} products={products} />
                ))}
              </div>
            )}
          </div>
        </div>
        </>
  );
};

export default Page;
