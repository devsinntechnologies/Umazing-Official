"use client";

import BreadCrum from "@/components/BreadCrum";
import FilterBar from "@/components/FilterBar";
import Pagination from "@/components/Pagination";
import ProductsCard from "@/components/ProductsCard";
import Image from "next/image";
import axios from 'axios';
import { useEffect, useState } from 'react';

export default function Shop() {
 
  const [data, setData] = useState([]);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://97.74.89.204:4000/product/allProducts?pageNo=1&pageSize=100');
      setData(response.data.data);
      console.log(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);


 
  return (
    <>
      <section class="flex md:flex-row flex-col my-6 w-[95vw] mx-auto">
        {/* <!-- Sidebar --> */}

        <FilterBar />

        <main class="w-full md:w-[75%] h-full mt-2 md:mt-0">
          <div class="flex justify-between items-center mb-3 px-3 h-[45px]">
            <div class="flex gap-2 items-center">
              <p class="text-[#808080] text-[14px] hidden md:block">
                Sort By :
              </p>
              <select class="px-[17px] text-[14px] rounded  border border-gray-400 bg-transparent h-[41px] w-[170px] outline-none pl-1">
                <option>latest</option>
              </select>
            </div>

            <div class="flex gap-2">
              <p class="font-bold text-sm md:text-base">52</p>
              <p class="text-gray-500 text-sm md:text-base">Results Found</p>
            </div>
          </div>

          {/* <!-- Products --> */}

          <section class=" flex justify-center items-center gap-5 flex-wrap md:ml-7 mt-5 ">
         

            {
          data.map((product) => (
            <ProductsCard key= {product.id} product = {product} />
          ))
        }
          
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