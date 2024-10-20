"use client";

import Link from "next/link";
import { LayoutDashboard, Package, PackagePlus } from "lucide-react";
import { usePathname } from "next/navigation";

const Sidebar = () => {
  const pathname = usePathname();

  const getLinkClass = (path) =>
    pathname === path
      ? "bg-primary text-white w-full rounded-full py-1"
      : "hover:bg-primary hover:text-white w-full rounded-md py-1";

  return (
    <div className="md:w-[230px] w-full flex justify-start  md:flex-col gap-3 md:bg-[#f3f4f6] mt-0 lg:mt-0 py-3 text-start md:shadow-sm md:shadow-primary md:border-[1px] md:border-solid md:border-primary md:rounded-md md:px-2">
      <h1 className="text-2xl font-semibold md:flex hidden md:px-3">Seller</h1> 
      <Link href="/seller" className={getLinkClass("/seller")}>
        <div className="flex md:gap-3 text-md text-center sm:text-lg gap-2 md:px-3 py-1 px-2  ">
          <LayoutDashboard className="hidden sm:flex" />
          Dashboard
        </div>
      </Link>
      <Link href="/seller/products" className={getLinkClass("/seller/products")}>
        <div className="flex md:gap-3 gap-2  text-md sm:text-lg md:px-3 py-1 px-2">
          <Package className="hidden sm:flex"/>
          All Products
        </div>
      </Link>
      <Link href="/seller/addProduct" className={getLinkClass("/seller/addProduct")}>
        <div className="flex md:gap-3 gap-2 text-md sm:text-lg md:px-3 py-1 px-2">
          <PackagePlus className="hidden sm:flex"/>
          Add Products
        </div>
      </Link>
    </div>
  );
};

export default Sidebar;
