"use client";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { fetchShopData } from "@/Services"; // Import the fetchShopData function
import BreadCrum from "@/components/BreadCrum";
import FilterBar from "@/components/FilterBar";
import Pagination from "@/components/Pagination";
import ProductsCard from "@/components/ProductsCard";

export default function Shop() {
  const [data, setData] = useState([]);
  const [getCategoryValue, setGetCategoryValue] = useState("");
  const searchParams = useSearchParams();
  const viewAll = searchParams.get("viewAll");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedData = await fetchShopData(viewAll === "true");
        setData(fetchedData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    // Call fetchData when viewAll changes
    fetchData();
  }, [viewAll]); // Dependency on viewAll to re-run the fetchData when it changes

  // Filter products by selected category value
  const filterProducts = getCategoryValue
    ? data.filter((item) => item.Category?.id == getCategoryValue) // Optional chaining for Category
    : data;

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

          <section className="flex justify-center items-center gap-5 flex-wrap md:ml-7 mt-5">
            {filterProducts && filterProducts.length > 0 ? (
              filterProducts.map((product) => (
                <ProductsCard key={product.id} product={product} />
              ))
            ) : (
              <p>No products found</p>
            )}
          </section>
        </main>
      </section>

      <div className="flex justify-center items-center my-10">
        <Pagination
          totalPages={21}
          currentPage={3}
          onPageChange={(page) => console.log("Go to page", page)}
        />
      </div>
    </>
  );
}
