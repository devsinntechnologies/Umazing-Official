import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectFade, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/pagination";
import "swiper/css/navigation";
import Image from "next/image";
import salad from "../../../public/Images/salad.png";
import Link from "next/link";
const HeaderSlider = () => {
  return (
    <Swiper
      spaceBetween={30}
      effect="fade"
      centeredSlides={true}
      autoplay={{
        delay: 3000,
        disableOnInteraction: false,
      }}
      pagination={{
        clickable: true,
      }}
      modules={[EffectFade, Pagination, Autoplay]}
      className="mySwiper w-full " // Ensure full width
    >
      <SwiperSlide className=" relative  items-center justify-between bg-primary p-8 lg:p-16 w-full">
        {/* Text Content */}
        <div className="max-w-lg pt-3 md:pt-0 text-white flex-1">
          <h1 className="text-lg md:text-4xl lg:text-5xl font-bold leading-tight mb-4">
            Fresh & Healthy <br /> Organic Food
          </h1>
          <p className="text-sm md:text-lg lg:text-xl text-white mb-6">
            SALE UP TO <br />
            <span className="text-lg md:text-4xl lg:text-5xl font-bold">
              48% OFF
            </span>
          </p>
          <Link href={"/shop"}>
            {" "}
            <button className="shadow-2xl mt-4 flex items-center gap-2 px-3 py-1 md:px-6 md:py-3 bg-primary text-white text-sm md:text-lg font-medium rounded-full hover:bg-primary transition duration-300">
              Shop now <span className="rotate-45">→</span>
            </button>{" "}
          </Link>
        </div>

        {/* Image Content */}
        <div className="top-7 md:top-0 z-[-10] lg:top-4 right-0 absolute">
          <Image
            src={salad}
            alt="Organic Food"
            className={`max-w-xs w-[200px]  md:w-[500px] lg:max-w-sm object-contain rounded-lg`}
            priority
          />
        </div>
      </SwiperSlide>

      <SwiperSlide className="flex relative  items-center justify-between bg-primary p-8 lg:p-16 w-full">
        {/* Text Content */}
        <div className="max-w-lg pt-3 md:pt-0 text-white flex-1">
          <h1 className="text-lg md:text-4xl lg:text-5xl font-bold leading-tight mb-4">
            Salad <br /> Organic Food
          </h1>
          <p className="text-sm md:text-lg lg:text-xl text-white mb-6">
            SALE UP TO <br />
            <span className="text-lg md:text-4xl lg:text-5xl font-bold">
              48% OFF
            </span>
          </p>
          <Link href={"/shop"}>
            {" "}
            <button className="shadow-2xl mt-4 flex items-center gap-2 px-3 py-1 md:px-6 md:py-3 bg-primary text-white text-sm md:text-lg font-medium rounded-full hover:bg-primary transition duration-300">
              Shop now <span className="rotate-45">→</span>
            </button>
          </Link>
        </div>

        {/* Image Content */}
        <div className="top-7 md:top-0 z-[-10] lg:top-4 right-0 absolute">
          <Image
            src={salad}
            alt="Organic Food"
            className={`max-w-xs w-[200px]  md:w-[500px] lg:max-w-sm object-contain rounded-lg`}
            priority
          />
        </div>
      </SwiperSlide>
    </Swiper>
  );
};

export default HeaderSlider;
