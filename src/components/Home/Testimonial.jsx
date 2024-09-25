import React from "react";

const Testimonial = () => {
  return (
    <div className="flex py-5 flex-wrap justify-center items-center flex-col px-2  gap-5 bg-[#F2F2F2] sm:p-5 lg:p-10 ">
      <div className="flex flex-col gap-5 justify-center items-center pb-5">
        {" "}
        <p className="font-medium text-sm text-[#00B207]">Client Testiomial</p>
        <h1 className="font-semibold text-xl">What our Client Says</h1>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 ">
        <div className=" flex flex-col gap-5  shadow-sm shadow-[#00260314] border-[#E6E6E6]  p-5  bg-white">
          <p className="font-normal text-sm">
            Pellentesque eu nibh eget mauris congue mattis mattis nec tellus.
            Phasellus imperdiet elit eu magna dictum, bibendum cursus velit
            sodales. Donec sed neque eget
          </p>

          <div className="flex justify-between items-center flex-wrap gap-5">
            <div className="flex gap-5">
              <Image
                className="  w-10 h-10 rounded-full sm:w-14 sm:h-full	"
                width={246}
                height={246}
                src={"/Images/test1.webp"}
              ></Image>
              <div className="flex flex-col">
                <h1 className="font-medium text-base">Robert Fox</h1>
                <p className="font-normal text-sm">Customer</p>
              </div>
            </div>
            <div className="flex gap-1">
              <FontAwesomeIcon icon={faStar} className="text-[#FF8A00]" />
              <FontAwesomeIcon icon={faStar} className="text-[#FF8A00]" />
              <FontAwesomeIcon icon={faStar} className="text-[#FF8A00]" />
              <FontAwesomeIcon icon={faStar} className="text-[#FF8A00]" />
              <FontAwesomeIcon icon={faStar} className="text-[#FF8A00]" />
            </div>
          </div>
        </div>
        <div className=" flex flex-col gap-5  shadow-sm shadow-[#00260314] border-[#E6E6E6]  p-5 bg-white">
          <p className="font-normal text-sm">
            Pellentesque eu nibh eget mauris congue mattis mattis nec tellus.
            Phasellus imperdiet elit eu magna dictum, bibendum cursus velit
            sodales. Donec sed neque eget
          </p>

          <div className="flex justify-between items-center flex-wrap gap-5">
            <div className="flex gap-5">
              <Image
                className=" w-10 h-10 rounded-full sm:w-14 sm:h-full	"
                width={246}
                height={246}
                src={"/Images/test1.webp"}
              ></Image>
              <div className="flex flex-col">
                <h1 className="font-medium text-base">Robert Fox</h1>
                <p className="font-normal text-sm">Customer</p>
              </div>
            </div>
            <div className="flex gap-1">
              <FontAwesomeIcon icon={faStar} className="text-[#FF8A00]" />
              <FontAwesomeIcon icon={faStar} className="text-[#FF8A00]" />
              <FontAwesomeIcon icon={faStar} className="text-[#FF8A00]" />
              <FontAwesomeIcon icon={faStar} className="text-[#FF8A00]" />
              <FontAwesomeIcon icon={faStar} className="text-[#FF8A00]" />
            </div>
          </div>
        </div>
        <div className=" flex flex-col gap-5  shadow-sm shadow-[#00260314] border-[#E6E6E6]  p-5 bg-white">
          <p className="font-normal text-sm">
            Pellentesque eu nibh eget mauris congue mattis mattis nec tellus.
            Phasellus imperdiet elit eu magna dictum, bibendum cursus velit
            sodales. Donec sed neque eget
          </p>

          <div className="flex justify-between items-center flex-wrap gap-5">
            <div className="flex gap-5 items-center">
              <Image
                className=" w-10 h-10 rounded-full sm:w-14 sm:h-full	"
                width={246}
                height={246}
                src={"/Images/test1.webp"}
              ></Image>
              <div className="flex flex-col">
                <h1 className="font-medium text-base">Robert Fox</h1>
                <p className="font-normal text-sm">Customer</p>
              </div>
            </div>
            <div className="flex gap-1">
              <FontAwesomeIcon icon={faStar} className="text-[#FF8A00]" />
              <FontAwesomeIcon icon={faStar} className="text-[#FF8A00]" />
              <FontAwesomeIcon icon={faStar} className="text-[#FF8A00]" />
              <FontAwesomeIcon icon={faStar} className="text-[#FF8A00]" />
              <FontAwesomeIcon icon={faStar} className="text-[#FF8A00]" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Testimonial;
f;
