"use client";

import Link from "next/link";
import { LayoutDashboard, Package, PackagePlus } from "lucide-react";
import { usePathname } from "next/navigation";

const Sidebar = () => {
  const pathname = usePathname();

  const getLinkClass = (path) =>
    pathname === path
      ? "lg:bg-primary lg:text-white text-primary border border-solid-primary lg:border-hidden rounded-full lg:rounded-md py-1"
      : "hover:bg-primary hover:text-white rounded-full lg:rounded-md py-1";

  return (
    <div className="lg:w-[230px] w-full flex  lg:flex-col gap-3 lg:bg-[#f3f4f6] mt-0 lg:mt-0 py-1 text-start lg:shadow-sm lg:shadow-primary lg:border-[1px] lg:border-solid lg:border-primary lg:rounded-md md:px-2">
      <h1 className="text-2xl font-semibold lg:flex hidden md:px-3">Seller</h1> 
      <Link href="/seller" className={getLinkClass("/seller")}>
        <div className="flex md:gap-3 text-md text-center lg:text-lg sm:text-md text-xs gap-2 md:px-3 py-1 px-2 items-center ">
          <LayoutDashboard className="hidden sm:flex" />
          Dashboard
        </div>
      </Link>
      <Link href="/seller/products" className={getLinkClass("/seller/products")}>
        <div className="flex md:gap-3 text-md text-center lg:text-lg sm:text-md text-xs gap-2 md:px-3 py-1 px-2 items-center ">
          <Package className="hidden sm:flex"/>
          All Products
        </div>
      </Link>
      <Link href="/seller/addProduct" className={getLinkClass("/seller/addProduct")}>
        <div className="flex md:gap-3 text-md text-center lg:text-lg sm:text-md text-xs gap-2 md:px-3 py-1 px-2 items-center">
          <PackagePlus className="hidden sm:flex"/>
          Add Products
        </div>
      </Link>
    </div>
  );
};

export default Sidebar;
