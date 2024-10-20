"use client";

import ProductsCard from "@/components/ProductsCard";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { fetchProductById } from "@/services";
import { Skeleton } from "@/components/ui/skeleton"; // Skeleton loader import
import { Minus, Plus, ShoppingCart, Star, Instagram, Facebook, Twitter, Heart } from "lucide-react";
import Swiper from "@/components/Swiper";


const ProductDetails = ({ params }) => {
  const { id } = params;
  console.log(id);

  const [selectedImage, setSelectedImage] = useState("/preview.png");
  const [quantity, setQuantity] = useState(1[]);
  const [product, setProduct] = useState([]);
  const [loader, setLoader] = useState(true);

  useEffect(() => {
    const getProductDetails = async () => {
      setLoader(true);
      try {
        const productData = await fetchProductById(id);
        setProduct(productData);
        setSelectedImage(productData.image);
      } catch (error) {
        console.error("Error fetching product details:", error.message);
      } finally {
        setLoader(false);
      }
    };

    getProductDetails();
  }, [id]);

  console.log(product);

  const images = [
    "/preview.png",
    "/cabbage1.png",
    "/cabbage2.png",
    "/cabbage.png",
  ];

  const products = [
    {
      name: "Big Potatoes",
      price: 14.99,
      rating: 4,
      image: "/brinjal.png",
    },
    {
      name: "Big Potatoes",
      price: 14.99,
      rating: 4,
      image: "/preview.png",
    },
    {
      name: "Big Potatoes",
      price: 14.99,
      rating: 3,
      image: "/japani.png",
    },
    {
      name: "Big Potatoes",
      price: 14.99,
      rating: 5,
      image: "/mirch.png",
    },
  ];

  const handleIncrement = () => setQuantity((prevQty) => prevQty + 1);
  const handleDecrement = () =>
    setQuantity((prevQty) => (prevQty > 0 ? prevQty - 1 : prevQty));

  console.log(selectedImage);

  return (
    <main className="w-full flex justify-center items-center overflow-hidden  my-10">
      <section className="my-6 w-[90vw]">
        {/* Product Details */}

        <div className="flex md:flex-row flex-col gap-5">
          <div className="w-full md:w-1/2 h-auto lg:h-[558px] flex lg:flex-row flex-col-reverse justify-center items-center lg:justify-between">
            {/* Thumbnails */}

            {/* <div className="w-[70px] lg:w-[80px] flex lg:flex-col justify-center gap-8 lg:gap-4">
              {images.map((img, index) => (
                <Image
                  key={index}
                  className={`cursor-pointer ${
                    selectedImage === img ? "border-primary border" : ""
                  }`}
                  src={img}
                  alt=""
                  width={70}
                  height={70}
                  onClick={() => setSelectedImage(img)}
                />
              ))}
            </div> */}

            {/* Preview Image */}
            {/* <div className="w-[350px] sm:w-[400px] lg:w-[556px] ml-6">
              <Image
                src={
                  "http://97.74.89.204/uploads/products/3067216fdd3760ec9f46aa896ce48beb.jpeg"
                }
                alt="Preview Image"
                width={506}
                height={506}
              />
            </div> */}
            <Swiper/>
          </div>

          {/* Product Information */}
          <div className="w-full md:w-1/2 h-auto lg:h-[501px]">
            <div className="flex items-center gap-3">
              {/* <h1 className="text-[25px] lg:text-[36px] font-semibold">
                {product.name}
              </h1> */}
             <div className="flex justify-between w-full">
             <div className="w-[71px] h-[29px] rounded-[4px] bg-primary text-white text-[14px] py-[4px] px-[8px]">
                In Stock
              </div>
              <div><Heart /></div>
             </div>
            </div>

            {/* Ratings and other product details */}
            <div className="flex items-center gap-3 my-2">
              <div className="flex">
              <Star
            size={12}
            color= "#4D4D4D" 
            />
              <Star
            size={12}
            color= "#4D4D4D" 
            />
               <Star
            size={12}
            color= "#4D4D4D" 
            />
               <Star
            size={12}
            color= "#4D4D4D" 
            />
               <Star
            size={12}
            color= "#4D4D4D" 
            />
              </div>
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
                ${product.basePrice}
              </p>
              <div className="w-[75px] h-[27px] rounded-[30px] bg-[#EA4B481A] text-[#EA4B48] text-[14px] py-[3px] px-[10px]">
                In Stock
              </div>
            </div>

            {/* Other product information */}
            <div className="w-full lg:w-[647px] my-5 border border-[#E6E6E6]"></div>

            <div className="flex flex-col lg:flex-row justify-between px-3 gap-4 lg:gap-0">
              <div className="flex items-center gap-2">
                <p className="text-[14px]">Brand :</p>
                <Image src="/brand.png" alt="" width={40} height={40} />
              </div>
              <div className="flex items-center gap-3">
                <p className="text-[14px]">Share item :</p>
                <div className="flex items-center gap-5">
                  <Facebook width={20} height={20} className="hover:w-[40px] hover:h-[40px] hover:px-2 hover:py-2 hover:rounded-full hover:bg-primary" />
                                   <Instagram width={20} height={20} className="hover:w-[40px] hover:h-[40px] hover:px-2 hover:py-2 hover:rounded-full hover:bg-primary"/>
                  <Twitter width={20} height={20} className="hover:w-[40px] hover:h-[40px] hover:px-2 hover:py-2 hover:rounded-full hover:bg-primary"/>
                </div>
              </div>
            </div>
            <div className="w-full lg::w-[568px] mt-4">
              <p className="text-[14px] md:text-[16px] text-[#808080]">
                {product.longDescription}
              </p>
            </div>

            <div className="w-full lg:w-[647px] my-5 border border-[#E6E6E6]"></div>

            {/* Add to cart */}
            <div className="flex items-center justify-between space-x-2 px-1 lg:px-3">
              <div className="h-[50px] w-[124px] border border-[#E6E6E6] p-[8px] rounded-[170px] flex gap-2 lg:gap-0 items-center justify-between py-2">
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
                 <Plus width={10} height={10}/>
                </button>
              </div>
              <button className="h-[51px] w-[300px] text-sm lg:w-[447px] bg-primary text-white text-[16px] font-semibold flex justify-center items-center gap-3 lg:gap-4 rounded-[43px]">
                Add to Cart
                <ShoppingCart width={20} height={20} />
              </button>
              {/* <div className="w-[40px] h-[40px] rounded-full border border-[#F2F2F2] bg-[#F2F2F2] flex justify-center items-center">
                <Image src="/Heart.png" alt="" width={20} height={20} />
              </div> */}
            </div>

            <div className="w-full lg:w-[647px] my-6 border border-[#E6E6E6]"></div>

            {/* Category and Tags */}
            <div>
              <p className="text-[14px] font-bold">
                Category :
                <span className="text-[#808080] font-normal"> Vegetables</span>
              </p>
              <div className="flex gap-2 mt-3">
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
              </div>
            </div>
          </div>
        </div>

        <div className="container mx-auto mt-10 md:pl-8 lg:mt-0">
          {/* Tabs Section */}
          <div className="border-b border-gray-200">
            <nav className="flex justify-center items-center space-x-4 text-center">
              <a
                href="#"
                className=" border-b-2 border-primary py-2 font-bold text-sm lg:text-base"
              >
                Descriptions
              </a>
              <a href="#" className="text-gray-500 py-2 text-sm lg:text-base">
                Additional Information
              </a>
              <a href="#" className="text-gray-500 py-2 text-sm lg:text-base">
                Customer Feedback
              </a>
            </nav>
          </div>

          {/* Content Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 my-10">
            {/* Left Text Content */}
            <div className="text-gray-700">
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

              {/* Bullet Points */}
              <ul className="mt-4 space-y-2">
                <li className="flex items-start space-x-2">
                  <span className="w-[18px] h-[18px] rounded-full bg-primary flex justify-center items-center">
                    <Image
                      width={10}
                      height={10}
                      src="/check.png"
                      alt="check"
                    />
                  </span>
                  <span className="text-[14px] md:text-[16px]">
                    100 g of fresh leaves provided.
                  </span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="w-[18px] h-[18px] rounded-full bg-primary flex justify-center items-center">
                    <Image width={10} height={10} src="/check.png" alt="heck" />
                  </span>
                  <span className="text-[14px] md:text-[16px]">
                    Aliquam ac est at augue volutpat elementum.
                  </span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="w-[18px] h-[18px] rounded-full bg-primary flex justify-center items-center">
                    <Image width={10} height={10} src="/check.png" alt="heck" />
                  </span>
                  <span className="text-[14px] md:text-[16px]">
                    Quisque nec enim eget sapien molestie.
                  </span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="w-[18px] h-[18px] rounded-full bg-primary flex justify-center items-center">
                    <Image width={10} height={10} src="/check.png" alt="heck" />
                  </span>
                  <span className="text-[14px] md:text-[16px]">
                    Proin convallis odio volutpat finibus posuere.
                  </span>
                </li>
              </ul>
              <p className="text-[14px] md:text-[16px] mt-3">
                Lorem ipsum kwjife rw,nfiorw fiwlrdolor sixercixcepturi eligendi
                ratione, consectetur quos, asperiores cumque?
              </p>
            </div>

            {/* Right Image Content */}
            <div className="relative lg:w-[536px]">
              <Image
                width={800}
                height={800}
                src="/shop.png"
                alt="Product"
                className="rounded-lg w-full h-[300px]"
              />

              {/* Discount & Organic Info */}
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
            </div>
          </div>
        </div>

        {/* Related Products */}
        <div className=" w-full mt-16">
          <h1 className="lg:text-[30px] text-[23px] font-medium md:font-bold text-center">
            Related Products
          </h1>
          {/* Products */}
          {loader ? (
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
            <div className="lg:h-[407px] w-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5  gap-4 mt-8">
              {products.map((item, index) => (
                <ProductsCard key={index} product={item} />
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
};

export default ProductDetails;
