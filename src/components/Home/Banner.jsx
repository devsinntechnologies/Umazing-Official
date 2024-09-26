import Link from "next/link";
import React from "react";
import { FaArrowRight } from "react-icons/fa";

export const Banner = () => {
  return (
    <div className="w-full grid grid-cols-1 gap-5   sm:grid-cols-2 lg:grid-cols-3 h-100 pt-5">
      <div className=" mydiv1 w-full bg-slate-400 flex justify-start items-center flex-col gap-5  pb-56  px-10 pt-10 rounded-xl bg-[url('/Images/bg1.png')] bg-cover	bg-bottom	 h-100">
        <p className="font-medium text-sm  text-white">Best Deals</p>
        <h1 className="font-semibold text-[24px] text-white  xl:text-[32px]">
          Sale of the Month
        </h1>
        <div className="flex items-center justify-center gap-3 count-down-main text-white">
          <div className="timer flex justify-center items-center flex-col text-2xl font-normal">
            30
            <div className="pr-1.5 pl-2 relative bg-indigo-50 w-max before:contents-[''] before:absolute before:h-full before:w-0.5 before:top-0 before:left-1/2 before:-translate-x-1/2 before:bg-white before:z-10 ">
              <h3 className="countdown-element days font-manrope font-semibold text-2xl text-indigo-600 tracking-[15.36px] max-w-[44px] text-center relative z-20"></h3>
            </div>
            <p className="text-xs font-normal  mt-1 text-center w-full text-white md:text-sm ">
              DAYS
            </p>
          </div>
          <h3 className="font-manrope font-semibold text-2xl text-white">:</h3>
          <div className="timer flex  justify-center items-center flex-col text-2xl font-normal">
            30
            <div className="pr-1.5 pl-2 relative bg-indigo-50 w-max before:contents-[''] before:absolute before:h-full before:w-0.5 before:top-0 before:left-1/2 before:-translate-x-1/2 before:bg-white before:z-10 ">
              <h3 className="countdown-element hours font-manrope font-semibold text-2xl text-indigo-600 tracking-[15.36px] max-w-[44px] text-center relative z-20"></h3>
            </div>
            <p className="text-xs font-normal  mt-1 text-center w-full text-white md:text-sm">
              HOURS
            </p>
          </div>
          <h3 className="font-manrope font-semibold text-2xl text-white">:</h3>
          <div className="timer flex justify-center items-center flex-col text-2xl font-normal ">
            30
            <div className="pr-1.5 pl-2 relative bg-indigo-50 w-max before:contents-[''] before:absolute before:h-full before:w-0.5 before:top-0 before:left-1/2 before:-translate-x-1/2 before:bg-white before:z-10 ">
              <h3 className="countdown-element minutes font-manrope font-semibold text-2xl text-indigo-600 tracking-[15.36px] max-w-[44px] text-center relative z-20"></h3>
            </div>
            <p className="text-xs font-normal  mt-1 text-center w-full text-white md:text-sm">
              MINUTES
            </p>
          </div>
          <h3 className="font-manrope font-semibold text-2xl text-white">:</h3>
          <div className="timer flex justify-center items-center flex-col text-2xl font-normal">
            30
            <div className="pr-1.5 pl-2 relative bg-indigo-50 w-max before:contents-[''] before:absolute before:h-full before:w-0.5 before:top-0 before:left-1/2 before:-translate-x-1/2 before:bg-white before:z-10 ">
              <h3 className="countdown-element seconds font-manrope font-semibold text-2xl text-indigo-600 tracking-[15.36px] max-w-[44px] text-center relative z-20"></h3>
            </div>
            <p className="text-xs font-normal  mt-1 text-center w-full text-white md:text-sm">
              SECONDS
            </p>
          </div>
        </div>

        <Link href={"/shop"}>
          {" "}
          <button className="flex gap-3 items-center bg-white rounded-full text-[#00B207] py-[14px] px-10 font-semibold text-sm">
            Shop Now
            <FaArrowRight />
          </button>
        </Link>
      </div>
      <div className=" mydiv2 w-full bg-slate-400 flex justify-start items-center flex-col gap-5  pb-56  px-10 pt-10 rounded-xl bg-[url('/Images/bg2.png')] bg-cover	bg-bottom	h-100">
        <p className="font-medium text-sm  text-white">85% Fat Free</p>
        <h1 className="font-semibold  text-[26px] text-white md:text-[32px]">
          Low-Fat Meat
        </h1>
        <p className="font-normal text-lg text-white">
          Started at <span className="text-[#FF8A00]">$79.99</span>
        </p>
        <div></div>
        <Link href={"/shop"}>
          {" "}
          <button className="flex gap-3 items-center bg-white rounded-full text-[#00B207] py-[14px] px-10 font-semibold text-sm">
            Shop Now
            <FaArrowRight />
          </button>
        </Link>
      </div>
      <div className="  w-full bg-slate-400 flex justify-start items-center flex-col gap-5  pb-56  px-10 pt-10 rounded-xl bg-[url('/Images/bg3.png')] bg-cover	bg-bottom h-100	">
        <p className="font-medium text-sm  text-black">Summer Sale</p>
        <h1 className="font-semibold text-[26px] xl:text-[32px] text-black">
          100% Fresh Fruit
        </h1>
        <div className="flex gap-4 justify-center items-center">
          <p className="font-normal text-lg text-black">Up to</p>
          <p className="bg-black text-[#FCC900] py-[6px] px-3 font-semibold text-xs rounded-md">
            64% OFF
          </p>
        </div>
        <div></div>
        <Link href={"/shop"}>
          {" "}
          <button className="flex gap-3 items-center bg-white rounded-full text-[#00B207] py-[14px] px-10 font-semibold text-sm">
            Shop Now
            <FaArrowRight />
          </button>
        </Link>
      </div>
    </div>
  );
};
