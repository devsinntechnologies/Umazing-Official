// @ts-nocheck
"use client";
import React, { useEffect, useState } from "react";
import ProductsCard from "@/components/ProductsCard";
import Pagination from "@/components/Pagination";
import { useGetAllProductsQuery } from "@/hooks/UseProducts";
import { Skeleton } from "@/components/ui/skeleton";
import { Product } from "@/lib/types"; // Assuming you have a Product type defined

const ProductSection: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [pageNo, setPageNo] = useState<number>(1); // Default to the first page
  const pageSize = 20; // Custom page size
  const [totalPages, setTotalPages] = useState<number>(1);

  const { data: productsData, isLoading, isError, refetch } = useGetAllProductsQuery({ pageNo, pageSize });

  useEffect(() => {
    if (productsData?.success) {
      setProducts(productsData.data);
      const pages = Math.ceil(productsData.total / pageSize);
      setTotalPages(pages);
    }
  }, [productsData]);

  useEffect(() => {
    refetch();
  }, [pageNo, refetch]);

  return (
    <div className="flex flex-col gap-5 justify-center w-full">
      <div className="w-full flex items-center justify-center space-y-3 flex-col">
        <p className="font-medium text-sm text-primary">Products</p>
        <h1 className="font-semibold text-xl sm:text-2xl md:text-3xl">
          Our Featured Products
        </h1>
      </div>

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

      {!isLoading && !isError && products.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {products.map((product, index) => (
            <ProductsCard key={product.id} product={product} index={index} setProducts={setProducts} products={products} />
          ))}
        </div>
      )}

      <div className="flex justify-center items-center my-10">
        <Pagination
          totalPages={totalPages}
          currentPage={pageNo}
          onPageChange={(page: number) => setPageNo(page)}
        />
      </div>
    </div>
  );
};

export default ProductSection;
