"use client";
import { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetAllProductsQuery } from "@/hooks/UseProducts";
import ProductsCard from "../ProductsCard";
import Pagination from "@/components/Pagination";
import { useSearchParams, useRouter } from "next/navigation";
import { Loader2 } from "lucide-react"; // Assuming you have the lucide-react library installed
import EmptyInbox from "../misc/EmptyInbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const FilterProducts = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Extract query parameters from the URL
  const name = searchParams.get("name") || "";
  const pageNo = parseInt(searchParams.get("pageNo") || "1");
  const pageSize = parseInt(searchParams.get("pageSize") || "12");
  const condition = searchParams.get("condition") || "";
  const city = searchParams.get("city") || "";
  const minPrice = searchParams.get("minPrice") || "";
  const maxPrice = searchParams.get("maxPrice") || "";
  const claim = searchParams.get("claim") || "";
  const onlyOfferProducts = searchParams.get("onlyOfferProducts") || "";
  const priceSort = searchParams.get("priceSort") || "";
  const CategoryId = searchParams.get("categoryId") || "";
  const offerId = searchParams.get("offerId") || "";

  const queryParams = {
    pageNo,
    pageSize,
  };

  // Conditionally add query parameters to avoid undefined values
  if (name) queryParams.name = name;
  if (condition) queryParams.condition = condition;
  if (city) queryParams.city = city;
  if (minPrice) queryParams.minPrice = minPrice;
  if (maxPrice) queryParams.maxPrice = maxPrice;
  if (claim) queryParams.claim = claim;
  if (onlyOfferProducts) queryParams.onlyOfferProducts = onlyOfferProducts;
  if (priceSort) queryParams.priceSort = priceSort;
  if (CategoryId) queryParams.CategoryId = CategoryId;
  if (offerId) queryParams.offerId = offerId;

  // Use the custom hook to fetch products
  const { data, isLoading, isError } = useGetAllProductsQuery(queryParams);

  const products = data?.data || [];

  // Handle error state
  if (isError) {
    return (
      <div className="flex items-center justify-center text-2xl md:text-lg py-6">
        Failed to Fetch
      </div>
    );
  }

  return (
    <div className="flex-1 space-y-4 overflow-y-scroll">
      {isLoading ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {Array.from({ length: pageSize }).map((_, index) => (
            <Skeleton key={index} className="w-full h-[250px]" />
          ))}
        </div>
      ) : (
        <>
          {/* If no products found, show message */}
          {products.length === 0 ? (
            <div className="flex items-center justify-center h-full">
              <div className="space-y-3 flex items-center justify-center flex-col">
                <EmptyInbox />
                <p className="text-xl font-semibold">No Products Found</p>
              </div>
            </div>
          ) : (
            <div>
              <div className="w-full mb-4 h-full overflow-hidden flex justify-between items-center">
                <div>
                  <h1 className="font-semibold text-3xl">Results</h1>
                  <p className="text-gray-600">
                    Showing {products?.length} products
                  </p>
                </div>
                <Select>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Featured" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="light">Ascending</SelectItem>
                    <SelectItem value="dark">Descending</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {products.map((product) => (
                  <ProductsCard key={product.id} product={product} />
                ))}
              </div>

              {/* Show pagination only if there are products */}
              {data?.total > pageSize && (
                <Pagination
                  total={data?.total || 0}
                  currentPage={pageNo}
                  pageSize={pageSize}
                  onPageChange={(newPage) => {
                    router.push({
                      pathname: router.pathname,
                      query: { ...searchParams, pageNo: newPage },
                    });
                  }}
                />
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default FilterProducts;
