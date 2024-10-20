// Home.js
"use client";
import ProductSection from "@/components/Home/ProductSection";
import Categories from "@/components/Home/Categories";
import HeaderSlider from "@/components/Header/HeaderSlider";

export default function Home() {
  return (
    <div className="w-full">
      <div className="w-full mt-4 flex justify-center items-center gap-2 h-[260px] md:h-[340px] lg:h-[400px]">
      <HeaderSlider />
    </div>
      {/* <Banner /> */}
      <Categories />
      <ProductSection />
      {/* <DealSection /> */}
      {/* <BannerSection /> */}
      {/* <Testimonial/> */}
      {/* <Companylogos /> */}
    </div>
  );
}
