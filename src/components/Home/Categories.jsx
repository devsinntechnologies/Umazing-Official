"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { fetchCategories } from "@/Services";
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
    <div className=" w-[95vw] mx-auto  flex justify-center items-center flex-col gap-8 py-10">
      <p className="font-medium text-sm text-[#00B207]">Category</p>
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
        <ul className="grid grid-cols-2 sm:grid-cols-4 xl:grid-cols-8 justify-center gap-3 items-center w-[95%] mx-auto my-5">
          {data &&
            data.map((category, index) => (
              <Link key={index} href={`/shop/${category.id}`}>
                <li className="border-[1px] border-solid border-[#E6E6E6] flex justify-center items-center flex-col gap-3 py-4 cursor-pointer transition-shadow duration-150 ease-in-out hover:border-[#2C742F] hover:shadow-md hover:shadow-[#2c742e6d]">
                  <Image
                    src={
                      category.imageUrl
                        ? `http://97.74.89.204/${category.imageUrl}`
                        : "/placeholder-image.jpg"
                    }
                    alt={category.name || "No name available"}
                    width={100}
                    height={100}
                    className="object-cover rounded-md mb-2 w-8"
                  />
                  <h3 className="text-sm">
                    {category.name || "Unknown Category"}
                  </h3>
                </li>
              </Link>
            ))}
        </ul>
      )}
    </div>
  );
}
