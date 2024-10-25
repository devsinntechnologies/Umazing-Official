"use client";
import { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetAllProductsQuery } from "@/hooks/UseProducts";
import ProductsCard from "../ProductsCard";
import Pagination from "@/components/Pagination";
import { useSearchParams, useRouter } from "next/navigation";
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
  const [products, setProducts] = useState([]);
  const [pageNo, setPageNo] = useState(1);
  const pageSize = 20;
  const [totalPages, setTotalPages] = useState(1);
  const [priceSort, setPriceSort] = useState(""); // Add state for priceSort

  // Extract query parameters from the URL
  const name = searchParams.get("name") || "";
  const condition = searchParams.get("condition") || "";
  const city = searchParams.get("city") || "";
  const minPrice = searchParams.get("minPrice") || "";
  const maxPrice = searchParams.get("maxPrice") || "";
  const claim = searchParams.get("claim") || "";
  const onlyOfferProducts = searchParams.get("onlyOfferProducts") || "";
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
  if (CategoryId) queryParams.CategoryId = CategoryId;
  if (offerId) queryParams.offerId = offerId;

  // Only add priceSort if it's not "Default"
  if (priceSort && priceSort !== "Default") {
    queryParams.priceSort = priceSort === "Ascending" ? "ASC" : "DESC";
  }

  // Use the custom hook to fetch products
  const { data: productsData, isLoading, isError, refetch } = useGetAllProductsQuery(queryParams);

  useEffect(() => {
    if (productsData?.success) {
      setProducts(productsData.data);
      const pages = Math.ceil(productsData.total / pageSize);
      setTotalPages(pages);
    }
  }, [productsData]);

  // Refetch products when pageNo changes
  useEffect(() => {
    refetch(); // Ensure refetch is triggered when pageNo changes
  }, [pageNo, refetch]);

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
            <div className="flex items-center justify-center h-4/5">
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
                <Select
                  className="outline-none"
                  value={priceSort}
                  onValueChange={(value) => {
                    setPriceSort(value); // Update priceSort state
                    setPageNo(1); // Reset to first page when sorting changes
                  }}
                >
                  <SelectTrigger className="w-[180px] outline-none">
                    <SelectValue placeholder="Sort" />
                  </SelectTrigger>
                  <SelectContent className="outline-none">
                    <SelectItem value="Ascending">Ascending</SelectItem>
                    <SelectItem value="Descending">Descending</SelectItem>
                    <SelectItem value="Default">Default</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {products.map((product) => (
                  <ProductsCard key={product.id} product={product} />
                ))}
              </div>
            </div>
          )}
          {/* Pagination Component */}
          {products.length > 0 && (
            <div className="flex justify-center items-center my-10">
              <Pagination
                totalPages={totalPages}
                currentPage={pageNo}
                onPageChange={(page) => setPageNo(page)} // Update pageNo when a new page is selected
              />
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default FilterProducts;
