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
      <HeaderSlider />
    </div>
  );
}
