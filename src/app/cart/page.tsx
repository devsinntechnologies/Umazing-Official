"use client";
import CartSection from "../../components/cart/CartSection";
import BreadCrumb from "@/components/BreadCrumb";

const Page = () => {
  return (
    <div className="w-full">
      <BreadCrumb />
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
