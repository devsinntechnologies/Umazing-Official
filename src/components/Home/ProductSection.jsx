import React from "react";
import Link from "next/link";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBagShopping, faStar } from "@fortawesome/free-solid-svg-icons";
import { faEye, faHeart } from "@fortawesome/free-solid-svg-icons";
import { FaArrowRight } from "react-icons/fa";

import Image from "next/image";
export const ProductSection = () => {
  return (
    <div className="flex justify-center items-center flex-col pb-10 gap-5">
      <p className="font-medium text-sm text-[#00B207]">Products</p>
      <h1 className="font-semibold text-xl sm:text-2xl md:text-3xlxl lg:text-4xl">
        Our Featured Products
      </h1>
      <div className="grid grid-cols-1 gap-3 w-full sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        <div className=" w-full bg-slate-400 flex justify-start items-center flex-col gap-5  pb-56  px-10 pt-10 rounded-xl bg-[url('/Images/bg3.png')] bg-cover	bg-bottom h-100	">
          <p className="font-medium text-sm  text-black">Summer Sale</p>
          <h1 className="font-semibold text-[32px] text-black">75% off</h1>

          <Link href={"/shop"}>
            {" "}
            <button className="flex gap-3 items-center bg-white rounded-full text-[#00B207] py-[14px] px-5 font-semibold text-sm">
              Shop Now
              <FaArrowRight />
            </button>
          </Link>
        </div>
        <div className=" group w-full border-[1px] border-solid border-[#E6E6E6] flex flex-col justify-center relative  gap-5   py-5 cursor-pointer transition-shadow duration-150	ease-in-out hover:border-[#2C742F]  hover:shadow-md hover:shadow-[#2c742e6d] ">
          <Image
            className="w-full"
            width={246}
            height={246}
            src={"/Images/Lettuce.png"}
          ></Image>
          <div className="px-4">
            <h3 className="text-sm font-normal">Chanise Cabbage</h3>
            <div className="flex justify-between w-full">
              <div className="flex flex-col gap-2">
                <h1 className="text-base font-medium">$14.99</h1>
                <div className="flex gap-1">
                  <FontAwesomeIcon icon={faStar} className="text-[#FF8A00]" />
                  <FontAwesomeIcon icon={faStar} className="text-[#FF8A00]" />
                  <FontAwesomeIcon icon={faStar} className="text-[#FF8A00]" />
                  <FontAwesomeIcon icon={faStar} className="text-[#FF8A00]" />
                  <FontAwesomeIcon icon={faStar} className="text-[#CCCCCC]" />
                </div>
              </div>
              <Link href={"/details"}>
                {" "}
                <FontAwesomeIcon
                  icon={faBagShopping}
                  className="rounded-full bg-[#F2F2F2] border-[1px] border-solid border-[#F2F2F2] py-[18px] px-5 text-xl group-hover:bg-[#00B207]"
                />
              </Link>
            </div>
            <div className=" flex-col gap-4 absolute top-7 right-5 hidden group-hover:flex  ">
              <FontAwesomeIcon
                icon={faEye}
                className="rounded-full border-[1px] border-solid border-[#9a9292] p-3 text-sm"
              />
              <Link href={"/wishlist"}>
                {" "}
                <FontAwesomeIcon
                  icon={faHeart}
                  className="rounded-full border-[1px] border-solid border-[#9a9292] p-3 "
                />
              </Link>
            </div>
          </div>
        </div>
        <div className=" group w-full border-[1px] border-solid border-[#E6E6E6] flex flex-col justify-center relative  gap-5   py-5 cursor-pointer transition-shadow duration-150	ease-in-out hover:border-[#2C742F]  hover:shadow-md hover:shadow-[#2c742e6d] ">
          <Image
            className=" w-full 	"
            width={246}
            height={246}
            src={"/Images/Chili.png"}
          ></Image>
          <div className="px-4">
            <h3 className="text-sm font-normal">Green Chili</h3>
            <div className="flex justify-between w-full">
              <div className="flex flex-col gap-2">
                <h1 className="text-base font-medium">$14.99</h1>
                <div className="flex gap-1">
                  <FontAwesomeIcon icon={faStar} className="text-[#FF8A00]" />
                  <FontAwesomeIcon icon={faStar} className="text-[#FF8A00]" />
                  <FontAwesomeIcon icon={faStar} className="text-[#FF8A00]" />
                  <FontAwesomeIcon icon={faStar} className="text-[#FF8A00]" />
                  <FontAwesomeIcon icon={faStar} className="text-[#CCCCCC]" />
                </div>
              </div>
              <Link href={"/details"}>
                {" "}
                <FontAwesomeIcon
                  icon={faBagShopping}
                  className="rounded-full bg-[#F2F2F2] border-[1px] border-solid border-[#F2F2F2] py-[18px] px-5 text-xl group-hover:bg-[#00B207]"
                />
              </Link>
            </div>
            <div className=" flex-col gap-4 absolute top-7 right-5 hidden group-hover:flex  ">
              <FontAwesomeIcon
                icon={faEye}
                className="rounded-full border-[1px] border-solid border-[#9a9292] p-3 text-sm"
              />
              <Link href={"/wishlist"}>
                {" "}
                <FontAwesomeIcon
                  icon={faHeart}
                  className="rounded-full border-[1px] border-solid border-[#9a9292] p-3 "
                />
              </Link>
            </div>
          </div>
        </div>
        <div className=" group w-full border-[1px] border-solid border-[#E6E6E6] flex flex-col justify-center relative  gap-5   py-5 cursor-pointer transition-shadow duration-150	ease-in-out hover:border-[#2C742F]  hover:shadow-md hover:shadow-[#2c742e6d] ">
          <Image
            className=" w-full 	"
            width={246}
            height={246}
            src={"/Images/corn.png"}
          ></Image>
          <div className="px-4">
            <h3 className="text-sm font-normal">Corn</h3>
            <div className="flex justify-between w-full">
              <div className="flex flex-col gap-2">
                <h1 className="text-base font-medium">$14.99</h1>
                <div className="flex gap-1">
                  <FontAwesomeIcon icon={faStar} className="text-[#FF8A00]" />
                  <FontAwesomeIcon icon={faStar} className="text-[#FF8A00]" />
                  <FontAwesomeIcon icon={faStar} className="text-[#FF8A00]" />
                  <FontAwesomeIcon icon={faStar} className="text-[#FF8A00]" />
                  <FontAwesomeIcon icon={faStar} className="text-[#CCCCCC]" />
                </div>
              </div>
              <Link href={"/details"}>
                {" "}
                <FontAwesomeIcon
                  icon={faBagShopping}
                  className="rounded-full bg-[#F2F2F2] border-[1px] border-solid border-[#F2F2F2] py-[18px] px-5 text-xl group-hover:bg-[#00B207]"
                />
              </Link>
            </div>
            <div className=" flex-col gap-4 absolute top-7 right-5 hidden group-hover:flex  ">
              <FontAwesomeIcon
                icon={faEye}
                className="rounded-full border-[1px] border-solid border-[#9a9292] p-3 text-sm"
              />
              <Link href={"/wishlist"}>
                {" "}
                <FontAwesomeIcon
                  icon={faHeart}
                  className="rounded-full border-[1px] border-solid border-[#9a9292] p-3 "
                />
              </Link>
            </div>
          </div>
        </div>
        <div className=" group w-full border-[1px] border-solid border-[#E6E6E6] flex flex-col justify-center relative  gap-5   py-5 cursor-pointer transition-shadow duration-150	ease-in-out hover:border-[#2C742F]  hover:shadow-md hover:shadow-[#2c742e6d] ">
          <Image
            className=" w-full   	"
            width={246}
            height={246}
            src={"/Images/GreenLettuce.png"}
          ></Image>
          <div className="px-4">
            <h3 className="text-sm font-normal">Chanise Cabbage</h3>
            <div className="flex justify-between w-full">
              <div className="flex flex-col gap-2">
                <h1 className="text-base font-medium">$14.99</h1>
                <div className="flex gap-1">
                  <FontAwesomeIcon icon={faStar} className="text-[#FF8A00]" />
                  <FontAwesomeIcon icon={faStar} className="text-[#FF8A00]" />
                  <FontAwesomeIcon icon={faStar} className="text-[#FF8A00]" />
                  <FontAwesomeIcon icon={faStar} className="text-[#FF8A00]" />
                  <FontAwesomeIcon icon={faStar} className="text-[#CCCCCC]" />
                </div>
              </div>
              <Link href={"/details"}>
                {" "}
                <FontAwesomeIcon
                  icon={faBagShopping}
                  className="rounded-full bg-[#F2F2F2] border-[1px] border-solid border-[#F2F2F2] py-[18px] px-5 text-xl group-hover:bg-[#00B207]"
                />
              </Link>
            </div>
            <div className=" flex-col gap-4 absolute top-7 right-5 hidden group-hover:flex  ">
              <FontAwesomeIcon
                icon={faEye}
                className="rounded-full border-[1px] border-solid border-[#9a9292] p-3 text-sm"
              />
              <Link href={"/wishlist"}>
                {" "}
                <FontAwesomeIcon
                  icon={faHeart}
                  className="rounded-full border-[1px] border-solid border-[#9a9292] p-3 "
                />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
