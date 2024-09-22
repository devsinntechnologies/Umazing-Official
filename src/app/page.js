"use client";
import "./globals.css";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBagShopping, faStar } from "@fortawesome/free-solid-svg-icons";
import { FaArrowRight } from "react-icons/fa";
import HeaderCategory from "@/components/Header/HeaderCategory";

import {
  FaFacebookF,
  FaTwitter,
  FaPinterest,
  FaInstagram,
} from "react-icons/fa";

import {
  faEye,
  faHeart,
  faPlay,
  faFacebookF,
  faTwitter,
  faPinterestP,
  faInstagram,
} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";


export default function Home() {
  // count-down TimeRanges
  // let dest = new Date("apr 25, 2024 10:00:00").getTime();
  // let x = setInterval(function () {
  //   let now = new Date().getTime();
  //   let diff = dest - now;

  //   // Check if the countdown has reached zero or negative
  //   if (diff <= 0) {
  //     clearInterval(x); // Stop the countdown
  //     return; // Exit the function
  //   }

  //   let days = Math.floor(diff / (1000 * 60 * 60 * 24));
  //   let hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  //   let minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  //   let seconds = Math.floor((diff % (1000 * 60)) / 1000);

  //   if (days < 10) {
  //     days = `0${days}`;
  //   }
  //   if (hours < 10) {
  //     hours = `0${hours}`;
  //   }
  //   if (minutes < 10) {
  //     minutes = `0${minutes}`;
  //   }
  //   if (seconds < 10) {
  //     seconds = `0${seconds}`;
  //   }

  //   // Get elements by class name
  //   let countdownElements =
  //     document.getElementsByClassName("countdown-element");

  //   // Loop through the elements and update their content
  //   for (let i = 0; i < countdownElements.length; i++) {
  //     let className = countdownElements[i].classList[1]; // Get the second class name
  //     switch (className) {
  //       case "days":
  //         countdownElements[i].innerHTML = days;
  //         break;
  //       case "hours":
  //         countdownElements[i].innerHTML = hours;
  //         break;
  //       case "minutes":
  //         countdownElements[i].innerHTML = minutes;
  //         break;
  //       case "seconds":
  //         countdownElements[i].innerHTML = seconds;
  //         break;
  //       default:
  //         break;
  //     }
  //   }
  // }, 1000);

  return (
    <div className="m-auto w-[95vw] my-5">
      {/*  */}
      <HeaderCategory/>
      {/* Banner Section Start*/}
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
          
        <Link href={'/shop'} >  <button className="flex gap-3 items-center bg-white rounded-full text-[#00B207] py-[14px] px-10 font-semibold text-sm">
            Shop Now
            <FaArrowRight />
          </button></Link>
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
       <Link href={'/shop'}>   <button className="flex gap-3 items-center bg-white rounded-full text-[#00B207] py-[14px] px-10 font-semibold text-sm">
            Shop Now
            <FaArrowRight />
          </button></Link>
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
        <Link href={'/shop'}>  <button className="flex gap-3 items-center bg-white rounded-full text-[#00B207] py-[14px] px-10 font-semibold text-sm">
            Shop Now
            <FaArrowRight />
          </button></Link>
        </div>
      </div>
      {/* Banner Section End  */}

      {/* Category Section Start  */}
      <div className="flex justify-center items-center flex-col gap-8 py-10 ">
        <p className="font-medium text-sm text-[#00B207]">Category</p>
        <h1 className="font-semibold text-xl sm:text-2xl md:text-3xlxl lg:text-4xl">
          Shop by Top Categories
        </h1>
        <div
          className="grid grid-cols-2 gap-4 w-full sm:grid-cols-3  md:grid-cols-4 lg:md:grid-cols-5
        xl:md:grid-cols-6  "
        >
          <div className=" border-[1px] border-solid border-[#E6E6E6] flex justify-center items-center flex-col gap-5 py-8 px-5 cursor-pointer transition-shadow duration-150	 ease-in-out  hover:border-[#2C742F]  hover:shadow-md hover:shadow-[#2c742e6d]">
            <Image
              className="w-[120px] h-[80px] break-inside-auto	"
              width={100}
              height={100}
              src={"/Images/FreshFruit.png"}
            ></Image>
            <p className="font-medium text-sm lg:text-base">Fresh Fruit</p>
          </div>
          <div className="  border-[1px] border-solid border-[#E6E6E6]  flex justify-center items-center flex-col gap-5 py-8  px-5 cursor-pointer transition-shadow duration-150	ease-in-out hover:border-[#2C742F]  hover:shadow-md hover:shadow-[#2c742e6d]">
            <Image
              className="w-[120px] h-[80px] break-inside-auto	"
              width={100}
              height={100}
              src={"/Images/FreshVegetables.png"}
            ></Image>
            <p className="font-medium text-sm lg:text-base">Fresh Vegetables</p>
          </div>
          <div className=" border-[1px] border-solid border-[#E6E6E6] flex justify-center items-center flex-col gap-5 py-8 px-5 cursor-pointer transition-shadow duration-150	 ease-in-out hover:border-[#2C742F]  hover:shadow-md hover:shadow-[#2c742e6d]">
            <Image
              className="w-[120px] h-[80px] break-inside-auto	"
              width={100}
              height={100}
              src={"/Images/MeatFish.png"}
            ></Image>
            <p className="font-medium text-sm lg:text-base">Meat & Fish</p>
          </div>
          <div className=" border-[1px] border-solid border-[#E6E6E6] flex justify-center items-center flex-col gap-5 py-8 px-5 cursor-pointer transition-shadow duration-150	 ease-in-out hover:border-[#2C742F]  hover:shadow-md hover:shadow-[#2c742e6d]">
            <Image
              className="w-[120px] h-[80px] break-inside-auto	"
              width={100}
              height={100}
              src={"/Images/Snacks.png"}
            ></Image>
            <p className="font-medium text-sm lg:text-base">Snacks</p>
          </div>
          <div className=" border-[1px] border-solid border-[#E6E6E6] flex justify-center items-center flex-col gap-5 py-8 px-5 cursor-pointer transition-shadow duration-150	 ease-in-out hover:border-[#2C742F]  hover:shadow-md hover:shadow-[#2c742e6d]">
            <Image
              className="w-[120px] h-[80px] break-inside-auto	"
              width={100}
              height={100}
              src={"/Images/Beverages.png"}
            ></Image>
            <p className="font-medium text-sm lg:text-base">Beverages</p>
          </div>
          <div className=" border-[1px] border-solid border-[#E6E6E6] flex justify-center items-center flex-col gap-5 py-8 px-5 cursor-pointer transition-shadow duration-150	 ease-in-out hover:border-[#2C742F]  hover:shadow-md hover:shadow-[#2c742e6d]">
            <Image
              className="w-[120px] h-[80px] break-inside-auto	"
              width={100}
              height={100}
              src={"/Images/BeautyHealth.png"}
            ></Image>
            <p className="font-medium text-sm lg:text-base">Beauty & Health</p>
          </div>
          <div className=" border-[1px] border-solid border-[#E6E6E6] flex justify-center items-center flex-col gap-5 py-8 px-5 cursor-pointer transition-shadow duration-150	 ease-in-out hover:border-[#2C742F]  hover:shadow-md hover:shadow-[#2c742e6d]">
            <Image
              className="w-[120px] h-[80px] break-inside-auto	"
              width={100}
              height={100}
              src={"/Images/BreadBakery.png"}
            ></Image>
            <p className="font-medium text-sm lg:text-base">Bread & Bakery</p>
          </div>
          <div className=" border-[1px] border-solid border-[#E6E6E6] flex justify-center items-center flex-col gap-5 py-8 px-5 cursor-pointer transition-shadow duration-150	 ease-in-out hover:border-[#2C742F]  hover:shadow-md hover:shadow-[#2c742e6d]">
            <Image
              className="w-[120px] h-[80px] break-inside-auto	"
              width={100}
              height={100}
              src={"/Images/BakingNeeds.png"}
            ></Image>
            <p className="font-medium text-sm lg:text-base">Baking Needs</p>
          </div>
          <div className=" border-[1px] border-solid border-[#E6E6E6] flex justify-center items-center flex-col gap-5 py-8 px-5 cursor-pointer transition-shadow duration-150	 ease-in-out hover:border-[#2C742F]  hover:shadow-md hover:shadow-[#2c742e6d]">
            <Image
              className="w-[120px] h-[80px] break-inside-auto	"
              width={100}
              height={100}
              src={"/Images/Cooking.png"}
            ></Image>
            <p className="font-medium text-sm lg:text-base">Cooking</p>
          </div>
          <div className=" border-[1px] border-solid border-[#E6E6E6] flex justify-center items-center flex-col gap-5 py-8 px-5 cursor-pointer transition-shadow duration-150	 ease-in-out hover:border-[#2C742F]  hover:shadow-md hover:shadow-[#2c742e6d]">
            <Image
              className="w-[120px] h-[80px] break-inside-auto	"
              width={100}
              height={100}
              src={"/Images/DiabeticFood.png"}
            ></Image>
            <p className="font-medium text-sm lg:text-base">Diabetic Food</p>
          </div>
          <div className=" border-[1px] border-solid border-[#E6E6E6] flex justify-center items-center flex-col gap-5 py-8 px-5 cursor-pointer transition-shadow duration-150	ease-in-out hover:border-[#2C742F]  hover:shadow-md hover:shadow-[#2c742e6d]">
            <Image
              className="w-[120px] h-[80px] break-inside-auto	"
              width={100}
              height={100}
              src={"/Images/DishDetergents.png"}
            ></Image>
            <p className="font-medium text-sm lg:text-base">Dish Detergents</p>
          </div>
          <div className=" border-[1px] border-solid border-[#E6E6E6] flex justify-center items-center flex-col gap-5 py-8 px-5 cursor-pointer transition-shadow duration-150	 ease-in-out hover:border-[#2C742F]  hover:shadow-md hover:shadow-[#2c742e6d]">
            <Image
              className="w-[120px] h-[80px] break-inside-auto	"
              width={100}
              height={100}
              src={"/Images/Oil.png"}
            ></Image>
            <p className="font-medium text-sm lg:text-base">Oil</p>
          </div>
        </div>
      </div>
      {/* Category Section End  */}
      {/* Products Section Start  */}
      <div className="flex justify-center items-center flex-col pb-10 gap-5">
        <p className="font-medium text-sm text-[#00B207]">Products</p>
        <h1 className="font-semibold text-xl sm:text-2xl md:text-3xlxl lg:text-4xl">
          Our Featured Products
        </h1>
        <div className="grid grid-cols-1 gap-3 w-full sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          <div className=" w-full bg-slate-400 flex justify-start items-center flex-col gap-5  pb-56  px-10 pt-10 rounded-xl bg-[url('/Images/bg3.png')] bg-cover	bg-bottom h-100	">
            <p className="font-medium text-sm  text-black">Summer Sale</p>
            <h1 className="font-semibold text-[32px] text-black">75% off</h1>

          <Link href={'/shop'}>  <button className="flex gap-3 items-center bg-white rounded-full text-[#00B207] py-[14px] px-5 font-semibold text-sm">
            Shop Now
            <FaArrowRight />
          </button></Link>
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
              <Link href={'/details'}>  <FontAwesomeIcon
                  icon={faBagShopping}
                  className="rounded-full bg-[#F2F2F2] border-[1px] border-solid border-[#F2F2F2] py-[18px] px-5 text-xl group-hover:bg-[#00B207]"
                /></Link>
              </div>
              <div className=" flex-col gap-4 absolute top-7 right-5 hidden group-hover:flex  ">
                <FontAwesomeIcon
                  icon={faEye}
                  className="rounded-full border-[1px] border-solid border-[#9a9292] p-3 text-sm"
                />
               <Link href={'/wishlist'}> <FontAwesomeIcon
                  icon={faHeart}
                  className="rounded-full border-[1px] border-solid border-[#9a9292] p-3 "
                /></Link>
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
                <Link href={'/details'}>  <FontAwesomeIcon
                  icon={faBagShopping}
                  className="rounded-full bg-[#F2F2F2] border-[1px] border-solid border-[#F2F2F2] py-[18px] px-5 text-xl group-hover:bg-[#00B207]"
                /></Link>
              </div>
              <div className=" flex-col gap-4 absolute top-7 right-5 hidden group-hover:flex  ">
                <FontAwesomeIcon
                  icon={faEye}
                  className="rounded-full border-[1px] border-solid border-[#9a9292] p-3 text-sm"
                />
                  <Link href={'/wishlist'}> <FontAwesomeIcon
                  icon={faHeart}
                  className="rounded-full border-[1px] border-solid border-[#9a9292] p-3 "
                /></Link>
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
                <Link href={'/details'}>  <FontAwesomeIcon
                  icon={faBagShopping}
                  className="rounded-full bg-[#F2F2F2] border-[1px] border-solid border-[#F2F2F2] py-[18px] px-5 text-xl group-hover:bg-[#00B207]"
                /></Link>
              </div>
              <div className=" flex-col gap-4 absolute top-7 right-5 hidden group-hover:flex  ">
                <FontAwesomeIcon
                  icon={faEye}
                  className="rounded-full border-[1px] border-solid border-[#9a9292] p-3 text-sm"
                />
                  <Link href={'/wishlist'}> <FontAwesomeIcon
                  icon={faHeart}
                  className="rounded-full border-[1px] border-solid border-[#9a9292] p-3 "
                /></Link>
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
                <Link href={'/details'}>  <FontAwesomeIcon
                  icon={faBagShopping}
                  className="rounded-full bg-[#F2F2F2] border-[1px] border-solid border-[#F2F2F2] py-[18px] px-5 text-xl group-hover:bg-[#00B207]"
                /></Link>
              </div>
              <div className=" flex-col gap-4 absolute top-7 right-5 hidden group-hover:flex  ">
                <FontAwesomeIcon
                  icon={faEye}
                  className="rounded-full border-[1px] border-solid border-[#9a9292] p-3 text-sm"
                />
                  <Link href={'/wishlist'}> <FontAwesomeIcon
                  icon={faHeart}
                  className="rounded-full border-[1px] border-solid border-[#9a9292] p-3 "
                /></Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Products Section End  */}
      {/* Deal Section Start  */}

      <div className="w-full grid gap-5 justify-between grid-cols-1 sm:grid-cols-2  xl:grid-cols-4">
        <div className="w-full flex flex-col gap-5">
          <h1 className="font-medium text-lg">Hot Deals</h1>
          <div className=" group col-span-4 bg-white cursor-pointer  transition-shadow duration-150	ease-in-out hover:border-[#2C742F]  hover:shadow-md hover:shadow-[#2c742e6d] ">
            <div className="flex gap-5 justify-center items-center border-solid border-[1px] py-3 border-[#E6E6E6] ">
              <Image
                className=" w-26 h-20 "
                width={100}
                height={100}
                src={"/Images/greenapple.png"}
              ></Image>

              <div className="flex flex-col gap-2 w-[50%] ">
                <h3 className="text-sm font-normal">Green Apple</h3>
                <h1 className="text-base font-medium group-hover:hidden">
                  $14.99
                </h1>
                <div className="flex gap-1 group-hover:hidden">
                  <FontAwesomeIcon icon={faStar} className="text-[#FF8A00]" />
                  <FontAwesomeIcon icon={faStar} className="text-[#FF8A00]" />
                  <FontAwesomeIcon icon={faStar} className="text-[#FF8A00]" />
                  <FontAwesomeIcon icon={faStar} className="text-[#FF8A00]" />
                  <FontAwesomeIcon icon={faStar} className="text-[#CCCCCC]" />
                </div>
                <div className="hidden  gap-3 group-hover:flex  items-center justify-center">
                 
                <Link href={'/details'}>  <FontAwesomeIcon
                  icon={faBagShopping}
                  className="rounded-full bg-[#F2F2F2] border-[1px] border-solid border-[#F2F2F2] py-[10px] px-3 text-xl group-hover:bg-[#00B207] flex justify-center items-center"
                /></Link>
                  <FontAwesomeIcon
                    icon={faEye}
                    className="rounded-full border-[1px] border-solid border-[#9a9292] py-3 px-[12px] text-[11px] flex justify-center items-center"
                  />
                   <Link href={'/wishlist'}> <FontAwesomeIcon
                  icon={faHeart}
                  className="rounded-full border-[1px] border-solid border-[#9a9292] py-3 px-[12px] text-[12px] flex justify-center items-center"
                /></Link>
                </div>
              </div>
            </div>
          </div>
          <div className=" group col-span-4 bg-white cursor-pointer  transition-shadow duration-150	ease-in-out hover:border-[#2C742F]  hover:shadow-md hover:shadow-[#2c742e6d] ">
            <div className="flex gap-5 justify-center items-center border-solid border-[1px] py-3 border-[#E6E6E6] ">
              <Image
                className=" w-26 h-20 "
                width={100}
                height={100}
                src={"/Images/Eggplant.png"}
              ></Image>

              <div className="flex flex-col gap-2 w-[50%] ">
                <h3 className="text-sm font-normal">Indian Malta</h3>
                <h1 className="text-base font-medium group-hover:hidden">
                  $14.99
                </h1>
                <div className="flex gap-1 group-hover:hidden">
                  <FontAwesomeIcon icon={faStar} className="text-[#FF8A00]" />
                  <FontAwesomeIcon icon={faStar} className="text-[#FF8A00]" />
                  <FontAwesomeIcon icon={faStar} className="text-[#FF8A00]" />
                  <FontAwesomeIcon icon={faStar} className="text-[#FF8A00]" />
                  <FontAwesomeIcon icon={faStar} className="text-[#CCCCCC]" />
                </div>
                <div className="hidden  gap-3 group-hover:flex  items-center justify-center">
                 
                <Link href={'/details'}>  <FontAwesomeIcon
                  icon={faBagShopping}
                  className="rounded-full bg-[#F2F2F2] border-[1px] border-solid border-[#F2F2F2] py-[10px] px-3 text-xl group-hover:bg-[#00B207] flex justify-center items-center"
                /></Link>
                  <FontAwesomeIcon
                    icon={faEye}
                    className="rounded-full border-[1px] border-solid border-[#9a9292] py-3 px-[12px] text-[11px] flex justify-center items-center"
                  />
                   <Link href={'/wishlist'}> <FontAwesomeIcon
                  icon={faHeart}
                  className="rounded-full border-[1px] border-solid border-[#9a9292] py-3 px-[12px] text-[12px] flex justify-center items-center"
                /></Link>
                </div>
              </div>
            </div>
          </div>
          <div className=" group col-span-4 bg-white cursor-pointer  transition-shadow duration-150	ease-in-out hover:border-[#2C742F]  hover:shadow-md hover:shadow-[#2c742e6d] ">
            <div className="flex gap-5 justify-center items-center border-solid border-[1px] py-3 border-[#E6E6E6] ">
              <Image
                className=" w-26 h-20 "
                width={100}
                height={100}
                src={"/Images/GreenLettuce.png"}
              ></Image>

              <div className="flex flex-col gap-2 w-[50%] ">
                <h3 className="text-sm font-normal">Green Lettuce</h3>
                <h1 className="text-base font-medium group-hover:hidden">
                  $14.99
                </h1>
                <div className="flex gap-1 group-hover:hidden">
                  <FontAwesomeIcon icon={faStar} className="text-[#FF8A00]" />
                  <FontAwesomeIcon icon={faStar} className="text-[#FF8A00]" />
                  <FontAwesomeIcon icon={faStar} className="text-[#FF8A00]" />
                  <FontAwesomeIcon icon={faStar} className="text-[#FF8A00]" />
                  <FontAwesomeIcon icon={faStar} className="text-[#CCCCCC]" />
                </div>
                <div className="hidden  gap-3 group-hover:flex  items-center justify-center">
                 
                 <Link href={'/details'}>  <FontAwesomeIcon
                   icon={faBagShopping}
                   className="rounded-full bg-[#F2F2F2] border-[1px] border-solid border-[#F2F2F2] py-[10px] px-3 text-xl group-hover:bg-[#00B207] flex justify-center items-center"
                 /></Link>
                   <FontAwesomeIcon
                     icon={faEye}
                     className="rounded-full border-[1px] border-solid border-[#9a9292] py-3 px-[12px] text-[11px] flex justify-center items-center"
                   />
                    <Link href={'/wishlist'}> <FontAwesomeIcon
                   icon={faHeart}
                   className="rounded-full border-[1px] border-solid border-[#9a9292] py-3 px-[12px] text-[12px] flex justify-center items-center"
                 /></Link>
                 </div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full flex flex-col gap-5">
          <h1 className="font-medium text-lg">Best Seller
          </h1>
          <div className=" group col-span-4 bg-white cursor-pointer  transition-shadow duration-150	ease-in-out hover:border-[#2C742F]  hover:shadow-md hover:shadow-[#2c742e6d] ">
            <div className="flex gap-5 justify-center items-center border-solid border-[1px] py-3 border-[#E6E6E6] ">
              <Image
                className=" w-26 h-20 "
                width={100}
                height={100}
                src={"/Images/Eggplant.png"}
              ></Image>

              <div className="flex flex-col gap-2 w-[50%] ">
                <h3 className="text-sm font-normal">Eggplant</h3>
                <h1 className="text-base font-medium group-hover:hidden">
                  $14.99
                </h1>
                <div className="flex gap-1 group-hover:hidden">
                  <FontAwesomeIcon icon={faStar} className="text-[#FF8A00]" />
                  <FontAwesomeIcon icon={faStar} className="text-[#FF8A00]" />
                  <FontAwesomeIcon icon={faStar} className="text-[#FF8A00]" />
                  <FontAwesomeIcon icon={faStar} className="text-[#FF8A00]" />
                  <FontAwesomeIcon icon={faStar} className="text-[#CCCCCC]" />
                </div>
                <div className="hidden  gap-3 group-hover:flex  items-center justify-center">
                 
                 <Link href={'/details'}>  <FontAwesomeIcon
                   icon={faBagShopping}
                   className="rounded-full bg-[#F2F2F2] border-[1px] border-solid border-[#F2F2F2] py-[10px] px-3 text-xl group-hover:bg-[#00B207] flex justify-center items-center"
                 /></Link>
                   <FontAwesomeIcon
                     icon={faEye}
                     className="rounded-full border-[1px] border-solid border-[#9a9292] py-3 px-[12px] text-[11px] flex justify-center items-center"
                   />
                    <Link href={'/wishlist'}> <FontAwesomeIcon
                   icon={faHeart}
                   className="rounded-full border-[1px] border-solid border-[#9a9292] py-3 px-[12px] text-[12px] flex justify-center items-center"
                 /></Link>
                 </div>
              </div>
            </div>
          </div>
          <div className=" group col-span-4 bg-white cursor-pointer  transition-shadow duration-150	ease-in-out hover:border-[#2C742F]  hover:shadow-md hover:shadow-[#2c742e6d] ">
            <div className="flex gap-5 justify-center items-center border-solid border-[1px] py-3 border-[#E6E6E6] ">
              <Image
                className=" w-26 h-20 "
                width={100}
                height={100}
                src={"/Images/Capsicum.png"}
              ></Image>

              <div className="flex flex-col gap-2 w-[50%] ">
                <h3 className="text-sm font-normal">Red Capsicum</h3>
                <h1 className="text-base font-medium group-hover:hidden">
                  $14.99
                </h1>
                <div className="flex gap-1 group-hover:hidden">
                  <FontAwesomeIcon icon={faStar} className="text-[#FF8A00]" />
                  <FontAwesomeIcon icon={faStar} className="text-[#FF8A00]" />
                  <FontAwesomeIcon icon={faStar} className="text-[#FF8A00]" />
                  <FontAwesomeIcon icon={faStar} className="text-[#FF8A00]" />
                  <FontAwesomeIcon icon={faStar} className="text-[#CCCCCC]" />
                </div>
                <div className="hidden  gap-3 group-hover:flex  items-center justify-center">
                 
                 <Link href={'/details'}>  <FontAwesomeIcon
                   icon={faBagShopping}
                   className="rounded-full bg-[#F2F2F2] border-[1px] border-solid border-[#F2F2F2] py-[10px] px-3 text-xl group-hover:bg-[#00B207] flex justify-center items-center"
                 /></Link>
                   <FontAwesomeIcon
                     icon={faEye}
                     className="rounded-full border-[1px] border-solid border-[#9a9292] py-3 px-[12px] text-[11px] flex justify-center items-center"
                   />
                    <Link href={'/wishlist'}> <FontAwesomeIcon
                   icon={faHeart}
                   className="rounded-full border-[1px] border-solid border-[#9a9292] py-3 px-[12px] text-[12px] flex justify-center items-center"
                 /></Link>
                 </div>
              </div>
            </div>
          </div>
          <div className=" group col-span-4 bg-white cursor-pointer  transition-shadow duration-150	ease-in-out hover:border-[#2C742F]  hover:shadow-md hover:shadow-[#2c742e6d] ">
            <div className="flex gap-5 justify-center items-center border-solid border-[1px] py-3 border-[#E6E6E6] ">
              <Image
                className=" w-26 h-20 "
                width={100}
                height={100}
                src={"/Images/Tomatos.png"}
              ></Image>

              <div className="flex flex-col gap-2 w-[50%] ">
                <h3 className="text-sm font-normal">Red Tomatos</h3>
                <h1 className="text-base font-medium group-hover:hidden">
                  $14.99
                </h1>
                <div className="flex gap-1 group-hover:hidden">
                  <FontAwesomeIcon icon={faStar} className="text-[#FF8A00]" />
                  <FontAwesomeIcon icon={faStar} className="text-[#FF8A00]" />
                  <FontAwesomeIcon icon={faStar} className="text-[#FF8A00]" />
                  <FontAwesomeIcon icon={faStar} className="text-[#FF8A00]" />
                  <FontAwesomeIcon icon={faStar} className="text-[#CCCCCC]" />
                </div>
                <div className="hidden  gap-3 group-hover:flex  items-center justify-center">
                 
                <Link href={'/details'}>  <FontAwesomeIcon
                  icon={faBagShopping}
                  className="rounded-full bg-[#F2F2F2] border-[1px] border-solid border-[#F2F2F2] py-[10px] px-3 text-xl group-hover:bg-[#00B207] flex justify-center items-center"
                /></Link>
                  <FontAwesomeIcon
                    icon={faEye}
                    className="rounded-full border-[1px] border-solid border-[#9a9292] py-3 px-[12px] text-[11px] flex justify-center items-center"
                  />
                   <Link href={'/wishlist'}> <FontAwesomeIcon
                  icon={faHeart}
                  className="rounded-full border-[1px] border-solid border-[#9a9292] py-3 px-[12px] text-[12px] flex justify-center items-center"
                /></Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full flex flex-col gap-5">
          <h1 className="font-medium text-lg">Top Rated</h1>
          <div className=" group col-span-4 bg-white cursor-pointer  transition-shadow duration-150	ease-in-out hover:border-[#2C742F]  hover:shadow-md hover:shadow-[#2c742e6d] ">
            <div className="flex gap-5 justify-center items-center border-solid border-[1px] py-3 border-[#E6E6E6] ">
              <Image
                className=" w-26 h-20 "
                width={100}
                height={100}
                src={"/Images/Potatos.png"}
              ></Image>

              <div className="flex flex-col gap-2 w-[50%] ">
                <h3 className="text-sm font-normal">Big Potatos</h3>
                <h1 className="text-base font-medium group-hover:hidden">
                  $14.99
                </h1>
                <div className="flex gap-1 group-hover:hidden">
                  <FontAwesomeIcon icon={faStar} className="text-[#FF8A00]" />
                  <FontAwesomeIcon icon={faStar} className="text-[#FF8A00]" />
                  <FontAwesomeIcon icon={faStar} className="text-[#FF8A00]" />
                  <FontAwesomeIcon icon={faStar} className="text-[#FF8A00]" />
                  <FontAwesomeIcon icon={faStar} className="text-[#CCCCCC]" />
                </div>
                <div className="hidden  gap-3 group-hover:flex  items-center justify-center">
                 
                 <Link href={'/details'}>  <FontAwesomeIcon
                   icon={faBagShopping}
                   className="rounded-full bg-[#F2F2F2] border-[1px] border-solid border-[#F2F2F2] py-[10px] px-3 text-xl group-hover:bg-[#00B207] flex justify-center items-center"
                 /></Link>
                   <FontAwesomeIcon
                     icon={faEye}
                     className="rounded-full border-[1px] border-solid border-[#9a9292] py-3 px-[12px] text-[11px] flex justify-center items-center"
                   />
                    <Link href={'/wishlist'}> <FontAwesomeIcon
                   icon={faHeart}
                   className="rounded-full border-[1px] border-solid border-[#9a9292] py-3 px-[12px] text-[12px] flex justify-center items-center"
                 /></Link>
                 </div>
              </div>
            </div>
          </div>
          <div className=" group col-span-4 bg-white cursor-pointer  transition-shadow duration-150	ease-in-out hover:border-[#2C742F]  hover:shadow-md hover:shadow-[#2c742e6d] ">
            <div className="flex gap-5 justify-center items-center border-solid border-[1px] py-3 border-[#E6E6E6] ">
              <Image
                className=" w-26 h-20 "
                width={100}
                height={100}
                src={"/Images/corn.png"}
              ></Image>

              <div className="flex flex-col gap-2 w-[50%] ">
                <h3 className="text-sm font-normal">Corn</h3>
                <h1 className="text-base font-medium group-hover:hidden">
                  $14.99
                </h1>
                <div className="flex gap-1 group-hover:hidden">
                  <FontAwesomeIcon icon={faStar} className="text-[#FF8A00]" />
                  <FontAwesomeIcon icon={faStar} className="text-[#FF8A00]" />
                  <FontAwesomeIcon icon={faStar} className="text-[#FF8A00]" />
                  <FontAwesomeIcon icon={faStar} className="text-[#FF8A00]" />
                  <FontAwesomeIcon icon={faStar} className="text-[#CCCCCC]" />
                </div>
                <div className="hidden  gap-3 group-hover:flex  items-center justify-center">
                 
                <Link href={'/details'}>  <FontAwesomeIcon
                  icon={faBagShopping}
                  className="rounded-full bg-[#F2F2F2] border-[1px] border-solid border-[#F2F2F2] py-[10px] px-3 text-xl group-hover:bg-[#00B207] flex justify-center items-center"
                /></Link>
                  <FontAwesomeIcon
                    icon={faEye}
                    className="rounded-full border-[1px] border-solid border-[#9a9292] py-3 px-[12px] text-[11px] flex justify-center items-center"
                  />
                   <Link href={'/wishlist'}> <FontAwesomeIcon
                  icon={faHeart}
                  className="rounded-full border-[1px] border-solid border-[#9a9292] py-3 px-[12px] text-[12px] flex justify-center items-center"
                /></Link>
                </div>
              </div>
            </div>
          </div>
          <div className=" group col-span-4 bg-white cursor-pointer  transition-shadow duration-150	ease-in-out hover:border-[#2C742F]  hover:shadow-md hover:shadow-[#2c742e6d] ">
            <div className="flex gap-5 justify-center items-center border-solid border-[1px] py-3 border-[#E6E6E6] ">
              <Image
                className=" w-26 h-20 "
                width={100}
                height={100}
                src={"/Images/cauliflower.png"}
              ></Image>

              <div className="flex flex-col gap-2 w-[50%] ">
                <h3 className="text-sm font-normal">Fresh cauliflower</h3>
                <h1 className="text-base font-medium group-hover:hidden">
                  $14.99
                </h1>
                <div className="flex gap-1 group-hover:hidden">
                  <FontAwesomeIcon icon={faStar} className="text-[#FF8A00]" />
                  <FontAwesomeIcon icon={faStar} className="text-[#FF8A00]" />
                  <FontAwesomeIcon icon={faStar} className="text-[#FF8A00]" />
                  <FontAwesomeIcon icon={faStar} className="text-[#FF8A00]" />
                  <FontAwesomeIcon icon={faStar} className="text-[#CCCCCC]" />
                </div>
                <div className="hidden  gap-3 group-hover:flex  items-center justify-center">
                 
                 <Link href={'/details'}>  <FontAwesomeIcon
                   icon={faBagShopping}
                   className="rounded-full bg-[#F2F2F2] border-[1px] border-solid border-[#F2F2F2] py-[10px] px-3 text-xl group-hover:bg-[#00B207] flex justify-center items-center"
                 /></Link>
                   <FontAwesomeIcon
                     icon={faEye}
                     className="rounded-full border-[1px] border-solid border-[#9a9292] py-3 px-[12px] text-[11px] flex justify-center items-center"
                   />
                    <Link href={'/wishlist'}> <FontAwesomeIcon
                   icon={faHeart}
                   className="rounded-full border-[1px] border-solid border-[#9a9292] py-3 px-[12px] text-[12px] flex justify-center items-center"
                 /></Link>
                 </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="   w-full flex justify-start items-center flex-col gap-5  pb-36 py-10  px-10 pt-10  bg-[url('/Images/bg3.png')] bg-cover	bg-bottom	">
          <p className="font-medium text-sm  text-black">HOt Sale</p>
          <h1 className="font-light text-[32px] text-black text-center">
            <span className="text-[34px] font-semibold "> Save 37% </span>on
            Every Order
          </h1>

        <Link href={'/shop'}>  <button className="flex gap-3 items-center bg-white rounded-full text-[#00B207] py-[14px] px-10 font-semibold text-sm">
            Shop Now
            <FaArrowRight />
          </button></Link>

        </div>
      </div>
      {/* Deal Section End  */}
      {/* Banner Section Start  */}
      <div className="flex flex-col gap-5  justify-center items-center w-full border-[1px] relative border-solid border-gray-500  h-96 my-10 bg-[url('/Images/bg-5.jpg')] bg-cover	bg-center before:content-['']	before:absolute before:left-0 before:top-0 before:h-full before:w-full before:bg-[#002C02B2] 	">
        <h1 className="p-5 w-[90%] text-white z-10 font-semibold leading-[30px]  text-center  text-[22px] md:leading-[50px] md:w-1/2">
          We’re the Best Organic Farm in the World
        </h1>
        <FontAwesomeIcon
          icon={faPlay}
          className="text-white z-10 text-3xl border-[1px] border-solid rounded-full py-[25px] px-[30px] cursor-pointer"
        />
      </div>
      {/* Banner Section End  */}
      {/* Team Section Start  */}
      <div className="flex justify-center items-center flex-col pb-10 gap-5">
        <div className="flex flex-col gap-5 justify-center items-center pb-5">
          {" "}
          <p className="font-medium text-sm text-[#00B207]">Team</p>
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
              />
            </div>

            <div className="flex flex-col gap-4 p-5  items-center sm:items-start ">
              <h1 className="font-medium text-lg">Jenny Wilson</h1>
              <p>Ceo & Founder</p>
            </div>

            <div className="absolute top-20 left-1/2 transform -translate-x-1/2 hidden gap-3 justify-center items-center text-white group-hover:flex opacity-0 transition-opacity duration-200 ease-in-out group-hover:opacity-100">
              <FaFacebookF className="rounded-full text-4xl p-2 hover:bg-[#00B207]" />
              <FaTwitter className="rounded-full text-4xl p-2 hover:bg-[#00B207]" />
              <FaPinterest className="rounded-full text-4xl p-2 hover:bg-[#00B207]" />
              <FaInstagram className="rounded-full text-4xl p-2 hover:bg-[#00B207]" />
            </div>
          </div>
          <div className="group relative w-full border-[1px] border-solid border-[#E6E6E6] cursor-pointer transition-shadow duration-200 ease-in-out hover:shadow-md hover:shadow-[#00000010]">
            <div className="relative group-hover:before:absolute group-hover:before:left-0 group-hover:before:top-0 group-hover:before:h-full group-hover:before:w-full group-hover:before:bg-[#02020231] ">
              <Image
                className="w-full"
                width={246}
                height={246}
                src={"/Images/farmer2.jpg"}
              />
            </div>

            <div className="flex flex-col gap-4 p-5 items-center sm:items-start ">
              <h1 className="font-medium text-lg">Jenny Wilson</h1>
              <p>Ceo & Founder</p>
            </div>

            <div className="absolute top-20 left-1/2 transform -translate-x-1/2 hidden gap-3 justify-center items-center text-white group-hover:flex opacity-0 transition-opacity ease-in-out group-hover:opacity-100 duration-300">
              <FaFacebookF className="rounded-full text-4xl p-2 transition-all hover:bg-[#00B207] " />
              <FaTwitter className="rounded-full text-4xl p-2 hover:bg-[#00B207]" />
              <FaPinterest className="rounded-full text-4xl p-2 hover:bg-[#00B207]" />
              <FaInstagram className="rounded-full text-4xl p-2 hover:bg-[#00B207]" />
            </div>
          </div>
          <div className="group relative w-full border-[1px] border-solid border-[#E6E6E6] cursor-pointer transition-shadow duration-200 ease-in-out hover:shadow-md hover:shadow-[#00000010]">
            <div className="relative group-hover:before:absolute group-hover:before:left-0 group-hover:before:top-0 group-hover:before:h-full group-hover:before:w-full group-hover:before:bg-[#02020231]">
              <Image
                className="w-full"
                width={246}
                height={246}
                src={"/Images/farmer4.jpg"}
              />
            </div>

            <div className="flex flex-col gap-4 p-5 items-center sm:items-start ">
              <h1 className="font-medium text-lg">Jenny Wilson</h1>
              <p>Ceo & Founder</p>
            </div>

            <div className="absolute top-20 left-1/2 transform -translate-x-1/2 hidden gap-3 justify-center items-center text-white group-hover:flex opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-100">
              <FaFacebookF className="rounded-full text-4xl p-2 hover:bg-[#00B207]" />
              <FaTwitter className="rounded-full text-4xl p-2 hover:bg-[#00B207]" />
              <FaPinterest className="rounded-full text-4xl p-2 hover:bg-[#00B207]" />
              <FaInstagram className="rounded-full text-4xl p-2 hover:bg-[#00B207]" />
            </div>
          </div>
          <div className="group relative w-full border-[1px] border-solid border-[#E6E6E6] cursor-pointer transition-shadow duration-200 ease-in-out hover:shadow-md hover:shadow-[#00000010]">
            <div className="relative group-hover:before:absolute group-hover:before:left-0 group-hover:before:top-0 group-hover:before:h-full group-hover:before:w-full group-hover:before:bg-[#02020231]">
              <Image
                className="w-full"
                width={246}
                height={246}
                src={"/Images/farmer.jpg"}
              />
            </div>

            <div className="flex flex-col gap-4 p-5 items-center sm:items-start ">
              <h1 className="font-medium text-lg">Jenny Wilson</h1>
              <p>Ceo & Founder</p>
            </div>

            <div className="absolute top-20 left-1/2 transform -translate-x-1/2 hidden gap-3 justify-center items-center text-white group-hover:flex opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-100">
              <FaFacebookF className="rounded-full text-4xl p-2 hover:bg-[#00B207]" />
              <FaTwitter className="rounded-full text-4xl p-2 hover:bg-[#00B207]" />
              <FaPinterest className="rounded-full text-4xl p-2 hover:bg-[#00B207]" />
              <FaInstagram className="rounded-full text-4xl p-2 hover:bg-[#00B207]" />
            </div>
          </div>
        </div>
      </div>
      {/* Team Section End  */}
      {/* testimonial Section Start  */}
      <div className="flex py-5 flex-wrap justify-center items-center flex-col px-2  gap-5 bg-[#F2F2F2] sm:p-5 lg:p-10 ">
        <div className="flex flex-col gap-5 justify-center items-center pb-5">
          {" "}
          <p className="font-medium text-sm text-[#00B207]">
            Client Testiomial
          </p>
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
      {/* testimonial Section End  */}
      {/* company logos Section start  */}
      <div className=" flex gap-20 flex-wrap justify-center items-center p-10 border-[1px] border-solid border-[#E6E6E6] my-10">
        <div className="border-r-2 border-solid w-40 ">
        <h1 className="italic text-2xl text-gray-400">Steps</h1>
                  </div>
        <div className="border-r-2 w-40">
        <h1 className="italic text-2xl text-gray-400">Mango</h1>
                  </div>
        <div className="border-r-2 w-40">
        <h1 className="italic text-2xl text-gray-400">Food</h1>
                  </div>
        <div className="border-r-2 w-40">
        <h1 className="italic text-2xl text-gray-400">Book Off</h1>
                  </div>
        <div className=" w-40 md:w-24">
     <h1 className="italic text-2xl text-gray-400">Series</h1>
                  </div>
       
     
     
   
      </div>
      {/* company logos Section End  */}

    </div>
  );
}
