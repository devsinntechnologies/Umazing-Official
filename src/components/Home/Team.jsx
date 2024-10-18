import React from "react";
import {
  FaFacebookF,
  FaTwitter,
  FaPinterest,
  FaInstagram,
} from "react-icons/fa";
import { Facebook, Twitter, Instagram } from "lucide-react";

import Image from "next/image";

export const Team = () => {
  return (
    <>
      <div className=" w-[95vw] mx-auto   flex justify-center items-center flex-col pb-10 gap-5">
        <div className="flex flex-col gap-5 justify-center items-center pb-5">
          <p className="font-medium text-sm text-primary">Team</p>
          <h1 className="font-semibold text-xl sm:text-2xl md:text-3xl lg:text-4xl">
            Our Professional Members
          </h1>
        </div>

        <div className="w-full  grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          <div className="group relative w-full border-[1px] border-solid border-[#E6E6E6] cursor-pointer transition-shadow duration-200 ease-in-out hover:shadow-md hover:shadow-[#00000010] ">
            <div className="relative group-hover:before:absolute group-hover:before:left-0 group-hover:before:top-0 group-hover:before:h-full group-hover:before:w-full group-hover:before:bg-[#02020231]">
              <Image
                className="w-full"
                width={246}
                height={246}
                src={"/Images/farmer.jpg"}
                alt="farmer"
              />
            </div>

            <div className="flex flex-col gap-4 p-5  items-center sm:items-start ">
              <h1 className="font-medium text-lg">Jenny Wilson</h1>
              <p>Ceo & Founder</p>
            </div>

            <div className="absolute top-20 left-1/2 transform -translate-x-1/2 hidden gap-3 justify-center items-center text-white group-hover:flex opacity-0 transition-opacity duration-200 ease-in-out group-hover:opacity-100">
              <div className="rounded-full  hover:bg-[teal]  p-[6px] ">
                <Facebook className=" rounded-full text-4xl  " />
              </div>
              <div className="rounded-full  hover:bg-[teal]  p-[6px] ">
                <Twitter className=" rounded-full text-4xl  " />
              </div>
              <div className="rounded-full  hover:bg-[teal] p-[6px] ">
                <Instagram className=" rounded-full text-4xl  " />
              </div>
            </div>
          </div>
          <div className="group relative w-full border-[1px] border-solid border-[#E6E6E6] cursor-pointer transition-shadow duration-200 ease-in-out hover:shadow-md hover:shadow-[#00000010]">
            <div className="relative group-hover:before:absolute group-hover:before:left-0 group-hover:before:top-0 group-hover:before:h-full group-hover:before:w-full group-hover:before:bg-[#02020231] ">
              <Image
                className="w-full"
                width={246}
                height={246}
                src={"/Images/farmer2.jpg"}
                alt="farmer"
              />
            </div>

            <div className="flex flex-col gap-4 p-5 items-center sm:items-start ">
              <h1 className="font-medium text-lg">Jenny Wilson</h1>
              <p>Ceo & Founder</p>
            </div>

            <div className="absolute top-20 left-1/2 transform -translate-x-1/2 hidden gap-3 justify-center items-center text-white group-hover:flex opacity-0 transition-opacity duration-200 ease-in-out group-hover:opacity-100">
              <div className="rounded-full  hover:bg-[teal]  p-[6px] ">
                <Facebook className=" rounded-full text-4xl  " />
              </div>
              <div className="rounded-full  hover:bg-[teal]  p-[6px] ">
                <Twitter className=" rounded-full text-4xl  " />
              </div>
              <div className="rounded-full  hover:bg-[teal] p-[6px] ">
                <Instagram className=" rounded-full text-4xl  " />
              </div>
            </div>
          </div>
          <div className="group relative w-full border-[1px] border-solid border-[#E6E6E6] cursor-pointer transition-shadow duration-200 ease-in-out hover:shadow-md hover:shadow-[#00000010]">
            <div className="relative group-hover:before:absolute group-hover:before:left-0 group-hover:before:top-0 group-hover:before:h-full group-hover:before:w-full group-hover:before:bg-[#02020231]">
              <Image
                className="w-full"
                width={246}
                height={246}
                src={"/Images/farmer4.jpg"}
                alt="farmer"
              />
            </div>

            <div className="flex flex-col gap-4 p-5 items-center sm:items-start ">
              <h1 className="font-medium text-lg">Jenny Wilson</h1>
              <p>Ceo & Founder</p>
            </div>

            <div className="absolute top-20 left-1/2 transform -translate-x-1/2 hidden gap-3 justify-center items-center text-white group-hover:flex opacity-0 transition-opacity duration-200 ease-in-out group-hover:opacity-100">
              <div className="rounded-full  hover:bg-[teal]  p-[6px] ">
                <Facebook className=" rounded-full text-4xl  " />
              </div>
              <div className="rounded-full  hover:bg-[teal]  p-[6px] ">
                <Twitter className=" rounded-full text-4xl  " />
              </div>
              <div className="rounded-full  hover:bg-[teal] p-[6px] ">
                <Instagram className=" rounded-full text-4xl  " />
              </div>
            </div>
          </div>
          <div className="group relative w-full border-[1px] border-solid border-[#E6E6E6] cursor-pointer transition-shadow duration-200 ease-in-out hover:shadow-md hover:shadow-[#00000010]">
            <div className="relative group-hover:before:absolute group-hover:before:left-0 group-hover:before:top-0 group-hover:before:h-full group-hover:before:w-full group-hover:before:bg-[#02020231]">
              <Image
                className="w-full"
                width={246}
                height={246}
                src={"/Images/farmer.jpg"}
                alt="farmer"
              />
            </div>

            <div className="flex flex-col gap-4 p-5 items-center sm:items-start ">
              <h1 className="font-medium text-lg">Jenny Wilson</h1>
              <p>Ceo & Founder</p>
            </div>

            <div className="absolute top-20 left-1/2 transform -translate-x-1/2 hidden gap-3 justify-center items-center text-white group-hover:flex opacity-0 transition-opacity duration-200 ease-in-out group-hover:opacity-100">
              <div className="rounded-full  hover:bg-[teal]  p-[6px] ">
                <Facebook className=" rounded-full text-4xl  " />
              </div>
              <div className="rounded-full  hover:bg-[teal]  p-[6px] ">
                <Twitter className=" rounded-full text-4xl  " />
              </div>
              <div className="rounded-full  hover:bg-[teal] p-[6px] ">
                <Instagram className=" rounded-full text-4xl  " />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
