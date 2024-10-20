"use client";

import ProductsCard from "@/components/ProductsCard";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton"; // Skeleton loader import
import { Minus, Plus, ShoppingCart, Star, Instagram, Facebook, Twitter, Heart } from "lucide-react";
import Swiper from "@/components/Swiper";


const ProductDetails = ({ params }) => {
  const { id } = params;
  console.log(id);
  return(
    <>
    Give to Azan
    </>
  );
};

export default ProductDetails;
