"use client";

import { useEffect, useState } from "react";
import axios from "axios"; // Import axios
import Image from "next/image";

export default function Categories() {
  const [data, setData] = useState([]);

  const loadCategories = async () => {
    try {
      const response = await axios.get(
        `http://97.74.89.204:4000/category/getAllCategories+`
      );
      setData(response.data.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  useEffect(() => {
    loadCategories();
  }, []);

  return (
    <div className="flex justify-center items-center flex-col gap-8 py-10">
      <p className="font-medium text-sm text-[#00B207]">Category</p>
      <h1 className="font-semibold text-xl sm:text-2xl md:text-3xlxl lg:text-4xl">
        Shop by Top Categories
      </h1>
      <ul className="grid grid-cols-2 sm:grid-cols-4 xl:grid-cols-8 justify-center gap-3 items-center w-[95%] mx-auto my-5">
        {data.map((product, index) => (
          <li
            key={index}
            className="border-[1px] border-solid border-[#E6E6E6] flex justify-center items-center flex-col gap-3 py-4  cursor-pointer transition-shadow duration-150 ease-in-out hover:border-[#2C742F] hover:shadow-md hover:shadow-[#2c742e6d]"
          >
            <Image
              src={
                product.imageUrl
                  ? `http://97.74.89.204/${product.imageUrl}`
                  : "/placeholder-image.jpg"
              }
              alt={product.name || "No name available"}
              width={100}
              height={100}
              className="object-cover rounded-md mb-2 w-8"
            />
            <h3 className="text-sm">{product.name || "Unknown Category"}</h3>
          </li>
        ))}
      </ul>
    </div>
  );
}
