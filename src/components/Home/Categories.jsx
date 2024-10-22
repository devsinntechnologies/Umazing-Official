"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetCategoriesQuery } from "@/hooks/UseCategories";

const Categories = ()=> {
  const { data: categoriesData, isLoading, isError } = useGetCategoriesQuery(); // Use the hook for fetching categories

  return (
    <div className="w-full flex justify-center items-center flex-col gap-8 py-10">
      <p className="font-medium text-xl text-primary">Category</p>
      <h1 className="font-semibold text-xl sm:text-2xl md:text-3xl lg:text-4xl">
        Shop by Top Categories
      </h1>

      {/* Conditionally render loading state or categories */}
      {isLoading ? (
        <div className="grid grid-cols-2 sm:grid-cols-4 xl:grid-cols-8 gap-3 w-full mx-auto">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="w-full h-28 rounded-xl relative">
              <Skeleton className="w-full h-full" />
            </div>
          ))}
        </div>
      ) : isError ? (
        <p className="text-red-500">Error loading categories. Please try again.</p>
      ) : (
        <ul className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 justify-center gap-3 items-center w-full mx-auto my-5">
          {categoriesData?.data?.map((category, index) => (
            <Link key={index} href={`/shop/${category.id}`}>
              <div className="w-[148px] flex items-center flex-col justify-center space-y-3">
                <div className="rounded-full bg-secondary px-4 py-4 border border-border gap-6 cursor-pointer size-32 transition-shadow duration-150 ease-in-out hover:border-primary">
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
                <h3 className="text-sm w-full text-center">
                  {category.name || "Unknown Category"}
                </h3>
              </div>
            </Link>
          ))}
        </ul>
      )}
    </div>
  );
}
export default Categories
