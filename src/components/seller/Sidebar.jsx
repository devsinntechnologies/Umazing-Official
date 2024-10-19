import Link from "next/link";
import { LayoutDashboard, Package, PackagePlus } from "lucide-react";

const Sidebar = () => {
  return (
    <div className=" w-[230px]  flex flex-col gap-3 bg-[#f3f4f6] mt-10 lg:mt-0 py-5 text-start shadow-sm shadow-primary border-[1px] border-solid border-primary rounded-md px-5">
      <h1 className="text-2xl font-semibold px-3">Seller</h1>
      <Link href="/seller/">
        <div className=" flex gap-3 hover:bg-primary w-full  hover:text-white rounded-md py-1 px-3 ">
          <LayoutDashboard />
          Dashboard
        </div>
      </Link>
      <Link
        href="/seller/products"
        className="hover:bg-primary w-full  hover:text-white rounded-md py-1"
      >
        <div className=" flex gap-3 hover:bg-primary w-full  hover:text-white rounded-md py-1 px-3 ">
          <Package />
          All Products
        </div>
      </Link>
      <Link
        href="/seller/addProduct"
        className="hover:bg-primary w-full  hover:text-white rounded-md py-1"
      >
        <div className=" flex gap-3 hover:bg-primary w-full  hover:text-white rounded-md py-1 px-3 ">
          <PackagePlus />
          Add Products
        </div>
      </Link>
    </div>
  );
};

export default Sidebar;
