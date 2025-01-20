import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import Categories from "@/components/Home/Categories";
import HeaderSlider from "@/components/Home/HeaderSlider";
import ProductSection from "@/components/Home/ProductSection";

export default function HomePage() {
  const t = useTranslations("HomePage");

  return (
    <div className="w-full">
      <div className="w-full mt-4 flex justify-center items-center gap-2 h-[220px] sm:h-[260px] md:h-[340px] lg:h-[400px]">
        <HeaderSlider />
      </div>
      <div className="text-center mt-8">
        <h1>{t("title")}</h1>
        <Link href="/about" className="text-blue-500 underline">
          {t("about")}
        </Link>
      </div>
      <Categories />
      <ProductSection />
    </div>
  );
}
