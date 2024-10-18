// Home.js
"use client";
import HeaderCategory from "@/components/Header/HeaderCategory";
import { Banner } from "@/components/Home/Banner";
import { ProductSection } from "@/components/Home/ProductSection";
import DealSection from "@/components/Home/DealSection";
import { BannerSection } from "@/components/Home/BannerSection";
import { Team } from "@/components/Home/Team";
import { Companylogos } from "@/components/Home/Companylogos";
import Categories from "@/components/Home/Categories";
import Testimonial from "@/components/Home/Testimonial";

export default function Home() {
  return (
    <div className="w-full">
      <HeaderCategory />
      <Banner />
      <Categories />
      <ProductSection />
      <DealSection />
      <BannerSection />
      <Testimonial/>
      <Team />
      <Companylogos />
    </div>
  );
}
