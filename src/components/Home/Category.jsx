import React from "react";
import Image from "next/image";

const Category = () => {
  return (
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
  );
};

export default Category;
