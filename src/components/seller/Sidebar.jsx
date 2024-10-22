"use client";

import Link from "next/link";
import { LayoutDashboard, Package, PackagePlus } from "lucide-react";
import { usePathname } from "next/navigation";

const Sidebar = () => {
  const pathname = usePathname();

  const getLinkClass = (path) =>
    pathname === path
      ? "bg-primary text-white w-full rounded-sm py-1"
      : "hover:bg-primary hover:text-white w-full rounded-sm py-1";

  return (
    <div className="lg:w-[230px] w-full flex justify-start items-center  lg:flex-col gap-3 bg-[#f3f4f6] mt-0 lg:mt-0 py-3 text-start shadow-sm shadow-primary border-[1px] border-solid border-primary rounded-md px-2 overflow-x-auto whitespace-nowrap  ">
      <h1 className="text-2xl font-semibold lg:flex hidden md:px-3 ">Seller</h1>
      <Link href="/seller" className={getLinkClass("/seller")}>
        <div className="flex md:gap-3 text-md text-center sm:text-lg gap-2 md:px-3 py-1 px-2  items-center justify-center lg:items-start lg:justify-start ">
          <LayoutDashboard />
          Dashboard
        </div>
      </Link>
      <Link
        href="/seller/products"
        className={getLinkClass("/seller/products")}
      >
        <div className="flex md:gap-3 text-md text-center sm:text-lg gap-2 md:px-3 py-1 px-2  items-center justify-center lg:items-start lg:justify-start">
          <Package />
          All Products
        </div>
      </Link>
      <Link
        href="/seller/addProduct"
        className={getLinkClass("/seller/addProduct")}
      >
        <div className="flex md:gap-3 text-md text-center sm:text-lg gap-2 md:px-3 py-1 px-2  items-center justify-center lg:items-start lg:justify-start">
          <PackagePlus />
          Add Products
        </div>
      </Link>
    </div>
  );
};

export default Sidebar;
