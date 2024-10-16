// src/components/ShopComponent.jsx
"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { fetchShopData } from "@/Services";
import FilterBar from "@/components/FilterBar";
import Pagination from "@/components/Pagination";
import ProductsCard from "@/components/ProductsCard";
import { Skeleton } from "@/components/ui/skeleton";

const ShopComponent = ({ categoryId }) => {
  const [loader, setLoader] = useState(true);
  const [data, setData] = useState([]);
  const [getCategoryValue, setGetCategoryValue] = useState(categoryId || "");
  const [pageNo, setPageNo] = useState(1); // Pagination state
  const pageSize = 10; // You can change this to control how many products to show per page

  useEffect(() => {
    const fetchData = async () => {
      setLoader(true);
      try {
        const fetchedData = await fetchShopData(
          getCategoryValue,
          pageNo,
          pageSize
        );
        setData(fetchedData.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoader(false);
      }
    };

    fetchData();
  }, [getCategoryValue, pageNo]); // Fetch data again when category or page changes

  const filterProducts = data || [];

  return (
    <>
      <section className="flex md:flex-row flex-col my-6 w-[95vw] mx-auto">
        <FilterBar setGetCategoryValue={setGetCategoryValue} />
        <main className="w-full md:w-[75%] h-full mt-2 md:mt-0">
          <div className="flex justify-between items-center mb-3 px-3 h-[45px]">
            <div className="flex gap-2 items-center">
              <p className="text-[#808080] text-[14px] hidden md:block">
                Sort By :
              </p>
              <select className="px-[17px] text-[14px] rounded border border-gray-400 bg-transparent h-[41px] w-[170px] outline-none pl-1">
                <option>latest</option>
              </select>
            </div>
            <div className="flex gap-2">
              <p className="font-bold text-sm md:text-base">
                {filterProducts.length}
              </p>
              <p className="text-gray-500 text-sm md:text-base">
                Results Found
              </p>
            </div>
          </div>

          {loader ? (
            <div className="pl-5 grid-cols-1 sm:grid-cols-2 grid md:grid-cols-3  gap-3">
              {Array.from({ length: 12 }).map((_, i) => (
                <Skeleton
                  key={i}
                  className="w-full group lg:h-[360px] rounded-xl sm:h-80"
                ></Skeleton>
              ))}
            </div>
          ) : (
            <section className="flex justify-center items-center gap-5 flex-wrap md:ml-7 mt-5">
              {filterProducts && filterProducts.length > 0 ? (
                filterProducts.map((product) => (
                  <ProductsCard key={product.id} product={product} />
                ))
              ) : (
                <p>No products found</p>
              )}
            </section>
          )}
        </main>
      </section>

      <div className="flex justify-center items-center my-10">
        <Pagination
          totalPages={21} // Adjust based on API response
          currentPage={pageNo}
          onPageChange={(page) => setPageNo(page)}
        />
      </div>
    </>
  );
};

export default ShopComponent;
