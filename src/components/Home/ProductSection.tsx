// @ts-nocheck
"use client";
import React, { useEffect, useState } from "react";
import ProductsCard from "@/components/ProductsCard";
import { useGetAllProductsQuery } from "@/hooks/UseProducts";
import { Skeleton } from "@/components/ui/skeleton";
import { Product } from "@/lib/types";
import InfiniteScroll from "react-infinite-scroll-component";
import {useTranslations} from "next-intl"


const ProductSection: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [pageNo, setPageNo] = useState<number>(1);
  const pageSize = 15;
  const [hasMore, setHasMore] = useState<boolean>(true);
  const t = useTranslations();

  const { data: productsData, isLoading, isError } = useGetAllProductsQuery({
    pageNo,
    pageSize,
  });

  useEffect(() => {
    if (productsData?.success) {
      setProducts((prev) => [...prev, ...productsData.data]);
      setHasMore(pageNo < Math.ceil(productsData.total / pageSize));
    }
    if (isError) setHasMore(false);
  }, [productsData, isError]);

  const fetchData = () => {
    if (hasMore) {
      setPageNo((prevPage) => prevPage + 1);
    }
  };

  return (
    <div className="flex flex-col gap-5 justify-center w-full py-2">
      <div className="w-full flex items-center justify-center space-y-2 md:space-y-3 flex-col">
        <p className="font-bold text-lg sm:text-xl md:text-2xl text-center text-primary">
        {t("products")}
        </p>
        <h1 className="font-semibold text-xl sm:text-2xl md:text-3xl">
          Our Featured Products
        </h1>
      </div>

      {isLoading && products.length === 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 py-2">
          {[...Array(pageSize)].map((_, index) => (
            <Skeleton key={index} className="w-full h-[256px]" />
          ))}
        </div>
      )}

      {!isLoading && isError && (
        <div className="text-destructive text-lg">
          Error loading products. Please try again.
        </div>
      )}

      {!isLoading && !isError && products.length > 0 && (
        <InfiniteScroll
          dataLength={products.length}
          next={fetchData}
          hasMore={hasMore}
          loader={
            hasMore && (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 py-4">
                {[...Array(4)].map((_, index) => (
                  <Skeleton key={index} className="w-full h-[256px]" />
                ))}
              </div>
            )
          }
          endMessage={
            !hasMore && (
              <p className="text-lg text-center text-gray-700 mt-4">
              No more products!
              </p>
            )
          }
        >
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {products.map((product, index) => (
              <ProductsCard
                key={product.id}
                product={product}
                index={index}
                setProducts={setProducts}
                products={products}
              />
            ))}
          </div>
        </InfiniteScroll>
      )}
    </div>
  );
};

export default ProductSection;