"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation"; // Import useSearchParams
import axios from "axios";
import BreadCrum from "@/components/BreadCrum";
import FilterBar from "@/components/FilterBar";
import Pagination from "@/components/Pagination";
import ProductsCard from "@/components/ProductsCard";

export default function Shop() {
  const [data, setData] = useState([]);
  const searchParams = useSearchParams(); // Get query parameters
  const viewAll = searchParams.get("viewAll"); // Extract the "viewAll" query parameter

  const fetchData = async (isViewAll) => {
    try {
      // Modify the API call based on viewAll
      const endpoint = isViewAll
        ? "http://97.74.89.204:4000/category/getAllCategories?pageNo=1&pageSize=100"
        : "http://97.74.89.204:4000/product/allProducts?pageNo=1&pageSize=200";

      const response = await axios.get(endpoint);
      setData(response.data.data);
      // console.log(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    // Pass viewAll parameter to fetchData to trigger different API behavior
    fetchData(viewAll === "true");
  }, [viewAll]);

  return (
    <>
      <section className="flex md:flex-row flex-col my-6 w-[95vw] mx-auto">
        <FilterBar />
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
              <p className="font-bold text-sm md:text-base">{data.length}</p>
              <p className="text-gray-500 text-sm md:text-base">
                Results Found
              </p>
            </div>
          </div>

          <section className="flex justify-center items-center gap-5 flex-wrap md:ml-7 mt-5">
            {data.map((product) => (
              <ProductsCard key={product.id} product={product} />
            ))}
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
