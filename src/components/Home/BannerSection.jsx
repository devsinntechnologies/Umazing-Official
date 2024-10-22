import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay } from "@fortawesome/free-solid-svg-icons";
import { Play } from "lucide-react";

export const BannerSection = () => {
  return (
    <div className="w-[95vw] mx-auto  flex flex-col gap-5  justify-center items-center border-[1px] relative border-solid border-gray-500  h-96 my-10 bg-[url('/Images/bg-5.jpg')] bg-cover	bg-center before:content-['']	before:absolute before:left-0 before:top-0 before:h-full before:w-full before:bg-[#002C02B2] 	">
      <h1 className="p-5 w-[90%] text-white z-10 font-semibold leading-[30px]  text-center  text-[22px] md:leading-[50px] md:w-1/2">
        We’re the Best Organic Farm in the World
      </h1>
      <div className="rounded-full z-10 border-2 border-solid border-white p-4">
        <Play color="white" />
      </div>
    </div>
  );
};
