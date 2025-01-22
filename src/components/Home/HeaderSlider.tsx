// @ts-nocheck
"use client"
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay, Navigation, Mousewheel, Keyboard } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import Image from "next/image";
import { useGetAllOffersQuery } from "@/hooks/UseOffers";
import { Skeleton } from "@/components/ui/skeleton";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { BASE_IMAGE } from "@/lib/constants";

const HeaderSlider = () => {
  const router = useRouter();
  const { data: offers, isLoading, isError } = useGetAllOffersQuery();

  if (isLoading) {
    return <Skeleton className="w-full h-full" />;
  }

  if (isError || !offers?.data?.length) {
    return <p className="text-center text-destructive">Failed to load offers.</p>;
  }
  console.log(BASE_IMAGE + offers.data[0].imageUrl)

  return (
    <div className="relative w-full h-full">
      {/* Swiper Component */}
      <Swiper
        spaceBetween={30}
        loop={true} // Enables continuous loop
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={false} // Keep this true to enable navigation but handle it with custom buttons
        keyboard={true}
        modules={[Navigation, Pagination, Mousewheel, Keyboard, Autoplay]}
        className="mySwiper w-full h-full rounded-lg"
      >
        {offers.data.map((offer) => (
          <SwiperSlide
            key={offer.id}
            className="relative flex items-center justify-between shadow-md p-6 md:p-10 lg:p-20 w-full h-full"
            onClick={() => router.push(`/search?offerId=${offer.id}`)}
          >
            {/* Text Content */}
            <div className="z-[10] max-w-lg pt-3 md:pt-0 space-y-5 text-white flex-1 h-full">
              <h1 className="text-2xl md:text-4xl  lg:text-5xl font-bold leading-tight mb-4">
                {offer.offerName}
              </h1>
              <p className="text-sm  md:text-lg lg:text-xl text-white mb-6">
                {offer.description} <br />
                <span className="text-lg md:text-2xl lg:text-3xl font-bold">
                  Expires on:{" "}
                  {new Date(offer.expiryTime).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
              </p>
            </div>

            {/* Image Content */}
            <div className="absolute top-0 right-0 z-[-1] w-full h-full opacity-95">
              <Image
                src={`${BASE_IMAGE}${offer.imageUrl}`}
                alt={offer.offerName}
                width={1000}
                height={420}
                className="object-cover opacity-95 size-full"
                // priority
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Custom Navigation Buttons */}
      <button
        onClick={() => {
          const swiper = document.querySelector('.mySwiper').swiper; // Access the Swiper instance directly
          swiper.slidePrev(); // Navigate to the previous slide
        }}
        className="hidden sm:block absolute top-1/2 left-4 z-10 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-3 rounded-full hover:bg-opacity-80 transition"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button
        onClick={() => {
          const swiper = document.querySelector('.mySwiper').swiper; // Access the Swiper instance directly
          swiper.slideNext(); // Navigate to the next slide
        }}
        className="hidden sm:block absolute top-1/2 right-4 z-10 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-3 rounded-full hover:bg-opacity-80 transition"
      >
        <ChevronRight className="w-6 h-6" />
      </button>
    </div>
  );
};

export default HeaderSlider;
