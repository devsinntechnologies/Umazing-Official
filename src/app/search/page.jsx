// src/app/shop/page.jsx
"use client";
import FilterProducts from "@/components/filter/FilterProducts";
import FilterBar from "@/components/filter/FilterBar";
import { useParams } from "next/navigation";

const Page = () => {
  return (
    <div className="flex-col md:flex-row w-full flex py-4 gap-4 h-screen overflow-hidden">
      <FilterBar/>
      <FilterProducts />
    </div>
);
};

export default Page;
