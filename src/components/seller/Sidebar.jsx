import Link from "next/link";

const Sidebar = () => {
  return (
    // Gray Color: #f3f4f6
    <div className="w-[230px]  flex flex-col gap-3 bg-[#f3f4f6] py-5 text-start hover:shadow-xl shadow-primary border-2 border-solid border-primary rounded-md px-5">
      <h1 className="text-2xl font-semibold ">Account</h1>
      <Link
        href="/seller/"
        className="hover:bg-primary w-full px-3 hover:text-white rounded-md py-1 "
      >
        Dashboard
      </Link>
      <Link
        href="/seller/products"
        className="hover:bg-primary w-full px-3 hover:text-white rounded-md py-1"
      >
        All Products
      </Link>
      <Link
        href="/seller/addProduct"
        className="hover:bg-primary w-full px-3 hover:text-white rounded-md py-1"
      >
        Add Product
      </Link>
    </div>
  );
};

export default Sidebar;
