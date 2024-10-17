import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import Image from "next/image";
import { useGetAllOffersQuery } from "@/hooks/UseOffers";
import { Skeleton } from "@/components/ui/skeleton"; // Assuming you're using Shadcn's Skeleton

const HeaderSlider = () => {
  const { data: offers, isLoading, isError } = useGetAllOffersQuery();

  if (isLoading) {
    return (
      <div className="w-full">
        <Skeleton className="w-full h-full" />
      </div>
    );
  }

  if (isError || !offers?.data?.length) {
    return <p className="text-center text-red-500">Failed to load offers.</p>;
  }

  return (
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
      modules={[Pagination, Autoplay]}
      className="mySwiper w-full h-full"
    >
      {offers.data.map((offer) => (
        <SwiperSlide
          key={offer.id}
          className="relative flex items-center justify-between bg-primary p-8 lg:p-16 w-full h-full"
        >
          {/* Text Content */}
          <div className="max-w-lg pt-3 md:pt-0 text-white flex-1 h-full">
            <h1 className="text-lg md:text-4xl lg:text-5xl font-bold leading-tight mb-4">
              {offer.offerName}
            </h1>
            <p className="text-sm md:text-lg lg:text-xl text-white mb-6">
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

            {/* <Link href="/shop">
              <button className="mt-4 flex items-center gap-2 px-3 py-1 md:px-6 md:py-3 bg-green-500 text-white text-sm md:text-lg font-medium rounded-full hover:bg-green-600 transition duration-300">
                Shop now <span className="rotate-45">→</span>
              </button>
            </Link> */}
          </div>

          {/* Image Content */}
          <div className="absolute top-0 right-0 z-[-10] w-full h-full">
            <Image
              src={`http://97.74.89.204/${offer.imageUrl}`}
              alt={offer.offerName}
              fill
              className="object-cover opacity-95"
              priority
            />
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default HeaderSlider;
