// src/app/shop/page.jsx
"use client";
import FilterProducts from "@/components/filter/FilterProducts";
import FilterBar from "@/components/filter/FilterBar";
import { useParams } from "next/navigation";

const Page = () => {
  const { categoryId } = useParams;
  return (
    <div className="w-full flex py-4 gap-4 h-screen overflow-hidden">
      <FilterBar/>
      <FilterProducts categoryId={categoryId} />
    </div>
);
};

export default Page;
