"use client";
import React, { useEffect, useState } from "react";
import ProductsCard from "@/components/ProductsCard"; // Ensure this path is correct
import Pagination from "@/components/Pagination"; // Ensure this path is correct
import { useGetUserProductsQuery } from "@/hooks/UseProducts"; // Adjust the path as needed
import { Skeleton } from "@/components/ui/skeleton"; // Adjust the path as needed
import withAuth from "@/components/hoc/withAuth";
import Link from "next/link";

const Page = () => {
  const [products, setProducts] = useState([]);
  const [pageNo, setPageNo] = useState(1); // Current page number
  const pageSize = 12; // Number of products to show per page
  const [totalPages, setTotalPages] = useState(1); // Total pages for pagination

  const queryParams = {
    pageNo,
    pageSize,
  };

  const { data: productsData, isLoading, isError } = useGetUserProductsQuery(queryParams);

  useEffect(() => {
    if (productsData?.success) {
      setProducts(productsData.data);
      setTotalPages(productsData.totalPages); // Assuming your API provides total pages
    }
  }, [productsData]);

  // Calculate the starting and ending index for the products to display
  const startIndex = (pageNo - 1) * pageSize;
  const endIndex = startIndex + pageSize;

  return (
    <div className="flex flex-col gap-5 justify-center w-full">
      <h1 className="text-3xl font-bold text-primary">All Products</h1>

      {/* Loading & Error States */}
      {isLoading && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {[...Array(pageSize)].map((_, index) => (
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
      {!isLoading && !isError && products.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {products.slice(startIndex, endIndex).map((product) => (
            <ProductsCard key={product.id} product={product} />
          ))}
        </div>
      )}

{products.length === 0 && 
      <div className="w-full flex items-center justify-center gap-4 flex-col py-5">
        <p className="text-base">No products found.</p>
        <Link href="/seller/addProduct" className="bg-primary px-3 py-1.5 rounded-full text-white">
            Add Products
          </Link>
      </div>
      }

      {/* Pagination Component */}
      {products.length > 0 &&
      <div className="flex justify-center items-center my-10">
        <Pagination
          totalPages={totalPages} // Total pages for pagination
          currentPage={pageNo}
          onPageChange={(page) => setPageNo(page)} // Update pageNo when a new page is selected
        />
      </div>
      }
    </div>
  );
};

export default withAuth(Page);
