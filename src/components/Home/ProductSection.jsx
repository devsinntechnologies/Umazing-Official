"use client";
import React, { useEffect, useState } from "react";
import ProductsCard from "@/components/ProductsCard";
import Pagination from "@/components/Pagination";
import { useGetAllProductsQuery } from "@/hooks/UseProducts";
import { Skeleton } from "@/components/ui/skeleton";

const ProductSection = () => {
  const [products, setProducts] = useState([]);
  const [pageNo, setPageNo] = useState(1); // Default to the first page
  const pageSize = 20; // Custom page size
  const [totalPages, setTotalPages] = useState(1);

  // Log pageNo to verify it's updating correctly
  console.log("Current Page:", pageNo);

  // Fetch products using the query hook with pageNo and pageSize
  const { data: productsData, isLoading, isError, refetch } = useGetAllProductsQuery({ pageNo, pageSize });

  // Update products and totalPages when the API response is successful
  useEffect(() => {
    if (productsData?.success) {
      setProducts(productsData.data);
      const pages = Math.ceil(productsData.total / pageSize); // Calculate total pages
      setTotalPages(pages); // Set total number of pages
    }
  }, [productsData]);

  // Refetch products when pageNo changes
  useEffect(() => {
    refetch(); // Ensure refetch is triggered when pageNo changes
  }, [pageNo, refetch]);

  return (
    <div className="flex flex-col gap-5 justify-center w-full">
      <div className="w-full flex justify-center items-center px-4">
        <p className="font-bold text-2xl text-center text-primary">Products</p>
        {/* View All button to toggle showing all categories */}
        {/* {categoriesData?.data?.length > 6 && (
          <button
            onClick={() => setShowAll(!showAll)}
            className="text-sm text-primary font-medium hover:underline"
          >
            View All
          </button>
        )} */}
      </div>
      <h1 className="font-semibold text-xl sm:text-2xl md:text-3xl lg:text-4xl">
      Our Featured Products
      </h1>


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
          {products.map((product, index) => (
            <ProductsCard key={product.id} product={product} index={index} setProducts={setProducts} products={products} />
          ))}
        </div>
      )}

      {/* Pagination Component */}
      <div className="flex justify-center items-center my-10">
        <Pagination
          totalPages={totalPages}
          currentPage={pageNo}
          onPageChange={(page) => setPageNo(page)} // Update pageNo when a new page is selected
        />
      </div>
    </div>
  );
};

export default ProductSection;
