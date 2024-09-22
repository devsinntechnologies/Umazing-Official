"use client";

import BreadCrum from "@/components/BreadCrum";
import FilterBar from "@/components/FilterBar";
import Pagination from "@/components/Pagination";
import ProductsCard from "@/components/ProductsCard";

export default function Shop() {
  const products = [
    {
      name: "Big Potatoes",
      price: 14.99,
      image: "/Image.png",
    },
    {
      name: "Big Potatoes",
      price: 14.99,
      image: "/tomato.png",
    },
    {
      name: "Big Potatoes",
      price: 14.99,
      image: "/apple.png",
    },
    {
      name: "Big Potatoes",
      price: 14.99,
      image: "/culi.png",
    },
    {
      name: "Big Potatoes",
      price: 14.99,
      image: "/bhindi.png",
    },
    {
      name: "Big Potatoes",
      price: 14.99,
      image: "/brinjal.png",
    },
    {
      name: "Big Potatoes",
      price: 14.99,
      image: "/preview.png",
    },
    {
      name: "Big Potatoes",
      price: 14.99,
      image: "/japani.png",
    },
    {
      name: "Big Potatoes",
      price: 14.99,
      image: "/mirch.png",
    },
    {
      name: "Big Potatoes",
      price: 14.99,
      image: "/peach.png",
    },
    {
      name: "Big Potatoes",
      price: 14.99,
      image: "/redmirch.png",
    },
    {
      name: "Big Potatoes",
      price: 14.99,
      image: "/salad.png",
    },
    {
      name: "Big Potatoes",
      price: 14.99,
      image: "/shimla.png",
    },
    {
      name: "Big Potatoes",
      price: 14.99,
      image: "/tomato.png",
    },
    {
      name: "Big Potatoes",
      price: 14.99,
      image: "/brinjal.png",
    },
  ];

  return (
    <>
      <section class="flex md:flex-row flex-col my-6">
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
            {/* <!-- Cards --> */}

            {products.map((item, index) => [
              <ProductsCard key={index} product={item} />,
            ])}
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
