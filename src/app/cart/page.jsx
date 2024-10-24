"use client";
import CartSection from "../../components/cart/CartSection";
import BreadCrum from "@/components/BreadCrum";

const Page = () => {
  return (
    <div className="w-full">
      <BreadCrum />
      {/* Cart Content */}
      <div>
        <h1 className="text-xl md:text-3xl font-semibold text-center text-black">
          My Shopping Cart
        </h1>
        <CartSection />
      </div>
    </div>
  );
};

export default Page;
