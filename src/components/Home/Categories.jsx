"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetCategoriesQuery } from "@/hooks/UseCategories";

const Categories = () => {
  const { data: categoriesData, isLoading, isError } = useGetCategoriesQuery(); // Use the hook for fetching categories

  return (
    <div className="w-full flex justify-center items-center flex-col gap-8 py-10">
      <div className="w-full flex justify-center items-center px-4">
        <p className="font-bold text-2xl text-center text-primary">Category</p>
        {/* View All button to toggle showing all categories */}
        {/* {categoriesData?.data?.length > 6 && (
          <button
            onClick={() => setShowAll(!showAll)}
            className="text-sm text-primary font-medium hover:underline"
          >
            View All
          </button>
        )} */}
      </div>
      <h1 className="font-semibold text-xl sm:text-2xl md:text-3xl lg:text-4xl">
        Shop by Top Categories
      </h1>

      {/* Conditionally render loading state or categories */}
      {isLoading ? (
       <div className="w-full overflow-x-scroll">
         <div className="flex items-center justify-center gap-3 md:gap-5 lg:gap-6 min-w-fit">
          {Array.from({ length: 6 }).map((_, i) => (
              <Skeleton key={i} className="size-16 sm:size-20 md:size-28 lg:size-36 rounded-full" />
          ))}
       </div>
        </div>
      ) : isError ? (
        <p className="text-red-500">Error loading categories. Please try again.</p>
      ) : (
        <div className="w-full overflow-x-scroll">
         <div className="flex items-center justify-center gap-5 lg:gap-6 min-w-fit flex-nowrap">
         {categoriesData?.data?.map((category, index) => (
            <Link key={index} href={`/search?categoryId=${category.id}`}>
              <div className="flex items-between flex-col justify-center h-full w-max space-y-3">
                <div className="size-16 sm:size-20 md:size-28 lg:size-36 rounded-full bg-secondary p-4 border border-border gap-6 cursor-pointer">
                  <Image
                    src={
                      category.imageUrl
                        ? `http://97.74.89.204/${category.imageUrl}`
                        : "/placeholder-image.jpg"
                    }
                    alt={category.name || "No name available"}
                    width={80}
                    height={80}
                    className="object-cover w-full h-full size-20"
                  />
                </div>
                <h3 className=" text-xs md:text-sm w-full text-center">
                  {category.name || "Unknown Category"}
                </h3>
              </div>
            </Link>
          ))}
         </div>
        </div>
      )}
    </div>
  );
};

export default Categories;
