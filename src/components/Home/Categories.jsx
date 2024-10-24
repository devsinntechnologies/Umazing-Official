"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetCategoriesQuery } from "@/hooks/UseCategories";

const Categories = () => {
  const { data: categoriesData, isLoading, isError } = useGetCategoriesQuery(); // Use the hook for fetching categories
  const [showAll, setShowAll] = useState(false); // State to toggle between showing limited and all categories

  // Determine categories to display
  const categoriesToDisplay = showAll ? categoriesData?.data : categoriesData?.data?.slice(0, 6);

  return (
    <div className="w-full flex justify-center items-center flex-col gap-8 py-10">
      <div className="w-full flex justify-between items-center px-4 ">
        <p></p>
        <p className="font-bold text-2xl flex justify-center text-center text-primary">Category</p>
        {/* View All button to toggle showing all categories */}
        {categoriesData?.data?.length > 6 && (
          <button
            onClick={() => setShowAll(!showAll)}
            className="text-sm text-primary font-medium hover:underline"
          >
            {showAll ? "View Less" : "View All"}
          </button>
        )}
      </div>
      <h1 className="font-semibold text-xl sm:text-2xl md:text-3xl lg:text-4xl">
        Shop by Top Categories
      </h1>

      {/* Conditionally render loading state or categories */}
      {isLoading ? (
        <div className="grid grid-cols-2 sm:grid-cols-4 xl:grid-cols-8 items-center gap-3 w-full ">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="w-full h-28 rounded-full relative">
              <Skeleton className="w-full h-full" />
            </div>
          ))}
        </div>
      ) : isError ? (
        <p className="text-red-500">Error loading categories. Please try again.</p>
      ) : (
        <ul className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 justify-center gap-3 items-center w-full mx-auto my-5">
          {categoriesToDisplay?.map((category, index) => (
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
};

export default Categories;
