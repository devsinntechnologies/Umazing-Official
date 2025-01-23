"use client";

import Link from "next/link";
import { LayoutDashboard, Package, PackagePlus } from "lucide-react";
import { usePathname } from "next/navigation";
import {useTranslations} from "next-intl"

const Sidebar: React.FC = () => {
  const pathname = usePathname();
  const t = useTranslations();
  const getLinkClass = (path: string) =>
    pathname === path
      ? "lg:bg-primary lg:text-white text-primary border border-solid-primary lg:border-hidden rounded-sm lg:rounded-md py-1"
      : "hover:bg-primary hover:text-white rounded-full lg:rounded-sm py-1";

  return (
    <div className="lg:w-[230px] w-full flex h-fit lg:flex-col gap-3 lg:bg-[#f3f4f6] py-3 text-start lg:shadow-sm lg:shadow-primary lg:border-[1px] lg:border-solid lg:border-primary lg:rounded-md md:px-2">
      <h1 className="text-2xl font-semibold lg:flex hidden md:px-3">Seller</h1>
      <Link href="/seller" className={getLinkClass("/seller")}>
        <div className="flex md:gap-3 text-md text-center lg:text-lg sm:text-md text-xs gap-2 md:px-3 py-1 px-2 items-center ">
          <LayoutDashboard className="hidden sm:flex" />
          {t("dashboard")}
        </div>
      </Link>
      <Link href="/seller/products" className={getLinkClass("/seller/products")}>
        <div className="flex md:gap-3 text-md text-center lg:text-lg sm:text-md text-xs gap-2 md:px-3 py-1 px-2 items-center ">
          <Package className="hidden sm:flex" />
         {t("allProducts")}
        </div>
      </Link>
      <Link href="/seller/addProduct" className={getLinkClass("/seller/addProduct")}>
        <div className="flex md:gap-3 text-md text-center lg:text-lg sm:text-md text-xs gap-2 md:px-3 py-1 px-2 items-center">
          <PackagePlus className="hidden sm:flex" />
         {t("addProduct")}
        </div>
      </Link>
      <Link href="/seller/orders" className={getLinkClass("/seller/orders")}>
        <div className="flex md:gap-3 text-md text-center lg:text-lg sm:text-md text-xs gap-2 md:px-3 py-1 px-2 items-center">
          <Package className="hidden sm:flex" />
          {t("orders")}
        </div>
      </Link>
    </div>
  
  );
};

export default Sidebar;
