"use client";
import CartSection from "../../components/cart/CartSection";
import BreadCrumb from "@/components/BreadCrumb";
import {useTranslations} from "next-intl"

const Page = () => {
  const t = useTranslations();
  return (
    <div className="w-full min-h-[60vh]">
      <BreadCrumb />
      {/* Cart Content */}
      <div>
        <h1 className="text-xl md:text-3xl font-semibold text-center text-black">
         {t("myShopingCart")}
        </h1>
        <CartSection />
      </div>
    </div>
  );
};

export default Page;
