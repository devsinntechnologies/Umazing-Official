"use client";
import React from "react";
// import cartimage from "../public/Images/cartimage.jpg"; // Ensure this path is correct
import { House } from "lucide-react";

import CartSection from "./CartSection";
import BreadCrum from "@/components/BreadCrum";

const Page = () => {
  return (
    <div className="w-[95vw] mx-auto">
      <BreadCrum />
      {/* Cart Content */}
      <div>
        <h1 className="text-3xl font-semibold text-center mt-6 text-black">
          My Shopping Cart
        </h1>
        <CartSection />
      </div>
    </div>
  );
};

export default Page;
