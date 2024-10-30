import Categories from "@/components/Home/Categories";
import HeaderSlider from "@/components/Home/HeaderSlider";
import ProductSection from "@/components/Home/ProductSection";

export default function Home() {
  return (
    <div className="w-full">
      <div className="w-full mt-4 flex justify-center items-center gap-2 h-[260px] md:h-[340px] lg:h-[400px]">
        <HeaderSlider />
      </div>
      <Categories />
      <ProductSection />
    </div>
  );
}
