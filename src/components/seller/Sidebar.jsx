"use client";

import Link from "next/link";
import { LayoutDashboard, Package, PackagePlus } from "lucide-react";
import { usePathname } from "next/navigation";

const Sidebar = () => {
  const pathname = usePathname();

  const getLinkClass = (path) =>
    pathname === path
      ? "bg-primary text-white w-full rounded-md py-1"
      : "hover:bg-primary hover:text-white w-full rounded-md py-1";

  return (
    <div className="w-[230px] flex flex-col gap-3 bg-[#f3f4f6] mt-10 lg:mt-0 py-3 text-start shadow-sm shadow-primary border-[1px] border-solid border-primary rounded-md px-2">
      <h1 className="text-2xl font-semibold px-3">Seller</h1>
      <Link href="/seller" className={getLinkClass("/seller")}>
        <div className="flex gap-3 px-3 py-1">
          <LayoutDashboard />
          Dashboard
        </div>
      </Link>
      <Link href="/seller/products" className={getLinkClass("/seller/products")}>
        <div className="flex gap-3 px-3 py-1">
          <Package />
          All Products
        </div>
      </Link>
      <Link href="/seller/addProduct" className={getLinkClass("/seller/addProduct")}>
        <div className="flex gap-3 px-3 py-1">
          <PackagePlus />
          Add Products
        </div>
      </Link>
    </div>
  );
};

export default Sidebar;
