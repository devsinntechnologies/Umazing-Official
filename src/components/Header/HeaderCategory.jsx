"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { fetchCategories } from "@/services";
import HeaderSlider from "./HeaderSlider";
import Link from "next/link"; // Import Link from Next.js
import { Skeleton } from "@/components/ui/skeleton"; // Import skeleton loader

export default function HeaderCategory() {
  const [data, setData] = useState([]);
  const [loader, setLoader] = useState(true);

  const loadCategories = async () => {
    setLoader(true);
    try {
      const response = await fetchCategories();
      setData(response); // Set fetched data
    } catch (error) {
      console.error("Error fetching categories:", error);
    } finally {
      setLoader(false);
    }
  };

  useEffect(() => {
    loadCategories(); // Call fetch on component mount
  }, []);

  return (
    <div className="w-full mt-4 flex justify-center items-center gap-2 h-[260px] md:h-[340px] lg:h-[400px]">
      {/* Conditionally render loader or category list */}
      <ul className="hidden w-[19vw] h-full overflow-scroll lg:flex flex-col gap-2 justify-center border-[1px] border-solid border-black py-2 px-2">
        {loader ? (
          // Render skeletons while data is loading
          <div className="flex flex-col gap-2">
            {Array.from({ length: 8 }).map((_, i) => (
              <li key={i} className="w-full border-[#E6E6E6] px-2">
                <Skeleton className="w-full h-10 rounded-md" />
              </li>
            ))}
          </div>
        ) : (
          // Render categories after loading is complete
          data &&
          data.map((category, index) => (
            <Link href={`/shop/${category.id}`} key={index}>
              <li className="w-full border-[#E6E6E6] flex justify-around items-center px-2 gap-6 cursor-pointer transition-shadow duration-150 ease-in-out hover:bg-primary hover:rounded-md hover:text-white">
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
                <h3 className="text-sm text-left flex-grow">
                  {category.name || "Unknown Category"}
                </h3>
              </li>
            </Link>
          ))
        )}
      </ul>
      <HeaderSlider />
    </div>
  );
}
