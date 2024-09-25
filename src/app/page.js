"use client";
import "./globals.css";
import HeaderCategory from "@/components/Header/HeaderCategory";
import { Banner } from "@/components/Home/Banner";
import Category from "@/components/Home/Category";
import { ProductSection } from "@/components/Home/ProductSection";
import DealSection from "@/components/Home/DealSection";
import { BannerSection } from "@/components/Home/BannerSection";
import {Team}  from "@/components/Home/Team";
import { Companylogos } from "@/components/Home/Companylogos";


export default function Home() {
    return (
    <div className="m-auto w-[95vw] my-5">
      <HeaderCategory/>
      <Banner/>
      <Category/>
      <ProductSection/>
      <DealSection/>
      <BannerSection/>
      <Team/>
      <Companylogos/>      
    </div>
  );
}
