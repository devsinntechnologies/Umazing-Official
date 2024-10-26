"use client";

import ProductsCard from "@/components/ProductsCard";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton"; // Skeleton loader import
import { Minus, Plus, ShoppingCart, Star, Instagram, Facebook, Twitter, Heart } from "lucide-react";
import SelectSize from "@/components/singleProduct/SelectSize";
import SelectColor from "@/components/singleProduct/SelectColor";
import { useGetAllProductsQuery, useGetProductByIdQuery,  } from "@/hooks/UseProducts";
import TabComponent from "@/components/singleProduct/TabContent";
import Gallery from "@/components/singleProduct/Gallery";
import Stars from "@/components/singleProduct/Stars";

const ProductDetails = ({ params }) => {
  const { id } = params;
  console.log(id);
  const pageNo = "1";
  const pageSize = "8";
  const categoryId = "4051eb3ece5de28e4b7521a0a42957eb";
  const queryParams = {
    pageNo,
    pageSize,
    categoryId,
  };
  const { data: item, isLoading, isError } = useGetAllProductsQuery(queryParams);
  const { data: productData, isError:productError, isLoading:productLoading } = useGetProductByIdQuery(id);

  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(0);


  console.log(product);
useEffect(() => {
  if(productData){
    setProduct(productData.data);
  }
}, [productData]);

  const handleIncrement = () => setQuantity((prevQty) => prevQty + 1);
  const handleDecrement = () =>
    setQuantity((prevQty) => (prevQty > 0 ? prevQty - 1 : prevQty));

  return (
    <main className="w-full flex justify-center items-center overflow-hidden">
      <section className="my-3 w-[90%]">

        <div className="flex flex-col gap-5">
          <div className="gap-5 w-full h-auto flex md:flex-row flex-col justify-center  lg:justify-between">
            <div className="w-full md:w-[50%] h-auto border  shadow-md ">
              <Gallery data={product} />
            </div>

            {/* Product Information */}
            <div className="w-full md:w-[50%] h-auto lg:h-[501px] space-y-5 my-5">
              <div className="rounded-[4px] text-primary text-2xl font-bold ">
                {product?.name}
              </div>
              {/* Ratings and other product details */}
              <div className="flex items-center gap-3 my-2">
               <Stars/>
                <p className="text-[#666666] text-[14px]">4 review</p>
                <p className="text-[14px]">
                  SKU : <span className="text-[#666666]">213,234,3</span>
                </p>
                 
        </div>
              

              {/* Pricing */}
              <div className="flex items-center gap-3 ">
                <p className="text-[#666666] text-[18px] font-normal line-through ">
                  $48.00
                </p>
                <p className="text-[#2C742F] text-[24px] font-medium">
                  ${product?.basePrice}
                </p>
                <div className="w-[75px] h-[27px] rounded-[30px] bg-[#EA4B481A] text-[#EA4B48] text-[14px] py-[3px] px-[10px]">
                  In Stock
                </div>
              </div>

              {/* Other product information */}
              {/* <div className="w-full lg:w-[647px] my-5 border border-[#E6E6E6]"></div>

              <div className="flex flex-col lg:flex-row justify-between px-3 gap-4 lg:gap-0">
                <div className="flex items-center gap-2">
                  <p className="text-[14px]">Brand :</p>
                  <Image src="/brand.png" alt="" width={40} height={40} />
                </div>
                <div className="flex items-center gap-3">
                  <p className="text-[14px]">Share item :</p>
                  <div className="flex items-center gap-5">
                    <Facebook width={20} height={20} className="hover:shadow-lg" />
                    <Instagram width={20} height={20} className="hover:shadow-lg" />
                    <Twitter width={20} height={20} className="hover:shadow-lg" />
                  </div>
                </div>
              </div> */}
              <div className="my-4">
                <h1 className="font-semibold text-md ">Product Description</h1>
                <p>{product?.description}</p>
              </div>
              {/* <div className="w-full lg:w-[647px] my-5 border border-[#E6E6E6]"></div>
              <div className=" space-y-4 px-3 gap-4">
                <SelectSize />
                <SelectColor />

              </div> */}
              {/* <div className="w-full lg::w-[568px] mt-4">
                <p className="text-[14px] md:text-[16px] text-[#808080]">
                  {product.longDescription}
                </p>
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
                {/* <div className="w-[40px] h-[40px] rounded-full border border-[#F2F2F2] bg-[#F2F2F2] flex justify-center items-center">
                <Image src="/Heart.png" alt="" width={20} height={20} />
              </div> */}
              </div>

              <div className="w-full lg:w-[647px] my-6 border border-[#E6E6E6]"></div>

              {/* Category and Tags */}
              <div>
                <p className="text-[14px] font-bold">
                  Category: 
                  <span className="text-[#808080] font-normal"> {product?.Category.name}</span>
                </p>
                {/* <div className="flex gap-2 mt-3">
                  <p className="text-[14px] font-bold">Tags :</p>
                  <div className="space-x-1">
                    <span className="text-[#808080] font-normal text-[14px]">
                      Vegetables
                    </span>
                    <span className="text-[#808080] font-normal text-[14px]">
                      Healthy
                    </span>
                    <span className="font-semibold underline text-[14px]">
                      Chinese
                    </span>
                    <span className="text-[#808080] font-normal text-[14px]">
                      Cabbage
                    </span>
                  </div>
                </div> */}
              </div>
            </div>
          </div>

          <div className="w-full   flex justify-center">
            {/* Tabs Section */}
            {/* <div className="border-b border-gray-200">
              <nav className="flex justify-center items-center space-x-4 text-center">
                <a
                  href="#"
                  className=" border-b-2 border-primary py-2 font-bold text-sm lg:text-base"
                >
                  Descriptions
                </a>
                            <a href="#" className="text-gray-500 py-2 text-sm lg:text-base">
                  Customer Feedback
                </a>
              </nav>
            </div> */}
            <TabComponent data={product}/>
            {/* Content Section */}

            {/* Left Text Content */}
            {/* <div className="text-gray-700 w-full py-10">
                <p className="text-[14px] md:text-[16px]">
                  Sed commodo aliquam dui ac porta. Fusce ipsum felis, imperdiet
                  at posuere ac, viverra at mauris. Maecenas tincidunt ligula a
                  sem vestibulum pharetra. Maecenas auctor tortor lacus, nec
                  laoreet nisi porttitor vel.
                </p>
                <p className="mt-2 text-[14px] md:text-[16px]">
                  Nulla mauris tellus, feugiat quis pharetra sed, gravida ac dui.
                  Sed iaculis, metus faucibus elementum tincidunt, turpis mi
                  viverra velit, pellentesque tristique neque mi eget nulla.
                </p>

                <p className="text-[14px] md:text-[16px] mt-3">
                  Lorem ipsum kwjife rw,nfiorw fiwlrdolor sixercixcepturi eligendi
                  ratione, consectetur quos, asperiores cumque?
                </p>
              </div> */}

            {/* Right Image Content */}
            {/* <div className="relative lg:w-[536px]">
                <Image
                  width={800}
                  height={800}
                  src="/shop.png"
                  alt="Product"
                  className="rounded-lg w-full h-[300px]"
                />

               
                <div className="mt-4 flex lg:space-x-8 space-x-0 border rounded-lg py-4 md:p-4 p-0 w-full">
                  <div className="flex items-center space-x-2">
                    <Image
                      width={40}
                      height={40}
                      src="/price-tag.png"
                      alt="price"
                    />
                    <div>
                      <p className="text-gray-800 font-medium md:font-bold">
                        64% Discount
                      </p>
                      <p className="text-gray-500 text-sm">
                        Save your 64% money with us
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Image width={40} height={40} src="/leaf.png" alt="leaf" />
                    <div>
                      <p className="text-gray-800 font-medium md:font-bold">
                        100% Organic
                      </p>
                      <p className="text-gray-500 text-sm">
                        100% Organic Vegetables
                      </p>
                    </div>
                  </div>
                </div>
              </div> */}

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
                {item?.data?.map((item, index) => (
                  <ProductsCard key={index} product={item} />
                ))}
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  );
};

export default ProductDetails;
