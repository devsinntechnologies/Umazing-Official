import React from "react";
import cartimage from "../images/cartimage.jpg"; // Ensure this path is correct
import { CiHome } from "react-icons/ci";
import CartSection from "./CartSection";

const Page = () => {
  return (
    <div className="w-[95vw] mx-auto">
      <div className="relative  h-20 mt-1">
        {/* Background Image */}
        <div
          className="w-full h-full bg-cover bg-left-top"
          style={{ backgroundImage: `url(${cartimage.src})` }}
          aria-label="Cart Banner"
        />

        {/* Overlay for Background */}
        <div className="absolute top-0 w-full h-full bg-black opacity-60 overlay" />

        {/* Breadcrumb Navigation */}
        <div className="absolute left-6 inset-0 flex items-center gap-3 text-white">
          <span className="flex items-center gap-1">
            <CiHome size={20} />
            <p className="text-lg text-gray-400">{">"}</p>
          </span>
          <span className="text-green-500">Shopping cart</span>
        </div>
      </div>

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
