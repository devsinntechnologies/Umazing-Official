"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { fetchCategories } from "@/services";
import Link from "next/link"; // Import Link from Next.js
import { Skeleton } from "@/components/ui/skeleton"; // Skeleton loader import

export default function Categories() {
  const [data, setData] = useState([]);
  const [loader, setLoader] = useState(true); // Loader state

  const loadCategories = async () => {
    setLoader(true); // Start loader
    try {
      const response = await fetchCategories();
      setData(response); // Set fetched data
    } catch (error) {
      console.error("Error fetching categories:", error);
    } finally {
      setLoader(false); // Stop loader after fetch completes or error occurs
    }
  };
  useEffect(() => {
    loadCategories(); // Call fetch on component mount
  }, []);

  return (
    <div className="w-full flex justify-center items-center flex-col gap-8 py-10">
      <p className="font-medium text-xl text-primary">Category</p>
      <h1 className="font-semibold text-xl sm:text-2xl md:text-3xlxl lg:text-4xl">
        Shop by Top Categories
      </h1>

      {/* Conditionally render loader or category list */}
      {loader ? (
        <div className="grid grid-cols-2 sm:grid-cols-4 xl:grid-cols-8 gap-3 w-full mx-auto">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="w-full h-28 rounded-xl relative">
              <Skeleton className="w-full h-full" />
            </div>
          ))}
        </div>
      ) : (
        <ul className="overflow-x-scroll grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 justify-center gap-3 items-center w-full mx-auto my-5">
          {data &&
            data.map((category, index) => (
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
