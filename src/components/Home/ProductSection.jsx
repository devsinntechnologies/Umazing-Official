"use client";
import React, { useEffect, useState } from "react";
import ProductsCard from "@/components/ProductsCard";
import Pagination from "@/components/Pagination";
import { useGetAllProductsQuery } from "@/hooks/UseProducts";
import { Skeleton } from "@/components/ui/skeleton";

const ProductSection = () => {
  const [products, setProducts] = useState([]);
  const [pageNo, setPageNo] = useState(1);
  const pageSize = 20;
  const [totalPages, setTotalPages] = useState(1);

  const queryParams = {
    pageNo,
    pageSize,
  };

  const { data: productsData, isLoading, isError } = useGetAllProductsQuery(queryParams);  

  useEffect(() => {
    if (productsData?.success) {
      setProducts(productsData.data);
      setTotalPages(productsData.totalPages);
    }
  }, [productsData]);

  const startIndex = (pageNo - 1) * pageSize;
  const endIndex = startIndex + pageSize;

  return (
    <div className="flex flex-col gap-5 justify-center w-full">
     <div className="w-full flex items-center justify-center space-y-3 flex-col">
     <p className="font-medium text-sm text-primary">Products</p>
      <h1 className="font-semibold text-xl sm:text-2xl md:text-3xl">
        Our Featured Products
      </h1>
     </div>
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

      {/* Pagination Component */}
      <div className="flex justify-center items-center my-10">
        <Pagination
          totalPages={totalPages} // Total pages for pagination
          currentPage={pageNo}
          onPageChange={(page) => setPageNo(page)} // Update pageNo when a new page is selected
        />
      </div>
    </div>
  );
};

export default ProductSection;
