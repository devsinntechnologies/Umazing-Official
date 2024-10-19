"use client";
import Link from "next/link";
import { Package, Users, ShoppingBasket } from "lucide-react";
import ProductsCard from "@/components/ProductsCard"; // Ensure this path is correct
import axios from "axios";
import { useEffect, useState } from "react";

const Page = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch products from the API
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          "http://97.74.89.204:4000/product/getAllProducts"
        );
        setProducts(response.data.data); // Adjust based on actual API structure
      } catch (err) {
        setError("Failed to fetch products.");
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="flex flex-col  gap-5 ">
      {/* Header Section */}
      <h1 className="text-3xl font-semibold text-primary items-start">
        Welcome Back, Admin
      </h1>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
        <div className="flex gap-5 bg-[#f3f4f6] py-5 pl-6 pr-20 w-full rounded-md items-center">
          <div className="p-4 bg-primary rounded-full">
            <Package color="white" />
          </div>
          <div>
            <h1 className="text-xl font-semibold">29</h1>
            <h2 className="text-lg font-medium">Total Products</h2>
          </div>
        </div>
        <div className="flex gap-5 bg-[#f3f4f6] py-5 pl-6 pr-20 w-full rounded-md items-center">
          <div className="p-4 bg-primary rounded-full">
            <Users color="white" />
          </div>
          <div>
            <h1 className="text-xl font-semibold">120</h1>
            <h2 className="text-lg font-medium">Total Users</h2>
          </div>
        </div>
        <div className="flex gap-5 bg-[#f3f4f6] py-5 pl-6 pr-20 w-full rounded-md items-center">
          <div className="p-4 bg-primary rounded-full">
            <ShoppingBasket color="white" />
          </div>
          <div>
            <h1 className="text-xl font-semibold">46</h1>
            <h2 className="text-lg font-medium">Total Orders</h2>
          </div>
        </div>
      </div>

      {/* Recent Products Section */}
      <h1 className="text-3xl font-bold text-primary items-start">
        Recent Products
      </h1>

      {/* Error Message */}
      {error && <div>{error}</div>}

      {/* Products Grid */}
      {!error && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 ">
          {products.slice(0, 6).map((product) => (
            <ProductsCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Page;
