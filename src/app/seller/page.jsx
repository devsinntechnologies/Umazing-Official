"use client";
import Link from "next/link";
import { Package, Users, ShoppingBasket } from "lucide-react";
import ProductsCard from "@/components/ProductsCard"; // Ensure this path is correct
import { useEffect, useState } from "react";
import withAuth from "@/components/hoc/withAuth";
import { useSelector } from "react-redux";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetAllProductsQuery } from "@/hooks/UseProducts";

const Page = () => {
  const userName = useSelector((state) => state.authSlice.userProfile.name);
  const pageNo = "1";        //number
  const pageSize = "12";   //number
  const queryParams = {
    pageNo,
    pageSize,
  };
  const { data: productsData, isLoading, isError } = useGetAllProductsQuery(queryParams);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    if (productsData?.success) {
      setProducts(productsData.data);
    }
  }, [productsData]);

  return (
    <div className="flex flex-col gap-5">
      {/* Header Section */}
      <h1 className="text-2xl font-semibold text-primary">
        {`Welcome Back, ${userName}`}
      </h1>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
        <StatCard
          icon={<Package color="white" />}
          stat="29"
          label="Total Products"
        />
        <StatCard
          icon={<Users color="white" />}
          stat="120"
          label="Total Users"
        />
        <StatCard
          icon={<ShoppingBasket color="white" />}
          stat="46"
          label="Total Orders"
        />
      </div>

      {/* Recent Products Section */}
      <h1 className="text-2xl font-semibold text-primary">Recent Products</h1>

      {/* Loading & Error States */}
      {isLoading && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {[...Array(6)].map((_, index) => (
            <Skeleton key={index} className="w-full h-[200px]" />
          ))}
        </div>
      )}

      {isError && (
        <div className="text-red-500 text-lg">
          Error loading products. Please try again.
        </div>
      )}

      {/* Products Grid */}
      {products.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {products.slice(0, 5).map((product) => (
            <ProductsCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

const StatCard = ({ icon, stat, label }) => (
  <div className="flex gap-5 bg-[#f3f4f6] py-5 px-6 w-full rounded-md items-center shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out">
    <div className="p-4 bg-primary rounded-full">
      {icon}
    </div>
    <div>
      <h1 className="text-xl font-semibold">{stat}</h1>
      <h2 className="text-lg font-medium">{label}</h2>
    </div>
  </div>
);

export default withAuth(Page);
