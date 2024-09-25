import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEye,
  faStar,
  faHeart,
  faBagShopping,
} from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";
const DealSection = () => {
  return (
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
                <Link href={"/details"}>
                  {" "}
                  <FontAwesomeIcon
                    icon={faBagShopping}
                    className="rounded-full bg-[#F2F2F2] border-[1px] border-solid border-[#F2F2F2] py-[10px] px-3 text-xl group-hover:bg-[#00B207] flex justify-center items-center"
                  />
                </Link>
                <FontAwesomeIcon
                  icon={faEye}
                  className="rounded-full border-[1px] border-solid border-[#9a9292] py-3 px-[12px] text-[11px] flex justify-center items-center"
                />
                <Link href={"/wishlist"}>
                  {" "}
                  <FontAwesomeIcon
                    icon={faHeart}
                    className="rounded-full border-[1px] border-solid border-[#9a9292] py-3 px-[12px] text-[12px] flex justify-center items-center"
                  />
                </Link>
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
                <Link href={"/details"}>
                  {" "}
                  <FontAwesomeIcon
                    icon={faBagShopping}
                    className="rounded-full bg-[#F2F2F2] border-[1px] border-solid border-[#F2F2F2] py-[10px] px-3 text-xl group-hover:bg-[#00B207] flex justify-center items-center"
                  />
                </Link>
                <FontAwesomeIcon
                  icon={faEye}
                  className="rounded-full border-[1px] border-solid border-[#9a9292] py-3 px-[12px] text-[11px] flex justify-center items-center"
                />
                <Link href={"/wishlist"}>
                  {" "}
                  <FontAwesomeIcon
                    icon={faHeart}
                    className="rounded-full border-[1px] border-solid border-[#9a9292] py-3 px-[12px] text-[12px] flex justify-center items-center"
                  />
                </Link>
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
                <Link href={"/details"}>
                  {" "}
                  <FontAwesomeIcon
                    icon={faBagShopping}
                    className="rounded-full bg-[#F2F2F2] border-[1px] border-solid border-[#F2F2F2] py-[10px] px-3 text-xl group-hover:bg-[#00B207] flex justify-center items-center"
                  />
                </Link>
                <FontAwesomeIcon
                  icon={faEye}
                  className="rounded-full border-[1px] border-solid border-[#9a9292] py-3 px-[12px] text-[11px] flex justify-center items-center"
                />
                <Link href={"/wishlist"}>
                  {" "}
                  <FontAwesomeIcon
                    icon={faHeart}
                    className="rounded-full border-[1px] border-solid border-[#9a9292] py-3 px-[12px] text-[12px] flex justify-center items-center"
                  />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full flex flex-col gap-5">
        <h1 className="font-medium text-lg">Best Seller</h1>
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
                <Link href={"/details"}>
                  {" "}
                  <FontAwesomeIcon
                    icon={faBagShopping}
                    className="rounded-full bg-[#F2F2F2] border-[1px] border-solid border-[#F2F2F2] py-[10px] px-3 text-xl group-hover:bg-[#00B207] flex justify-center items-center"
                  />
                </Link>
                <FontAwesomeIcon
                  icon={faEye}
                  className="rounded-full border-[1px] border-solid border-[#9a9292] py-3 px-[12px] text-[11px] flex justify-center items-center"
                />
                <Link href={"/wishlist"}>
                  {" "}
                  <FontAwesomeIcon
                    icon={faHeart}
                    className="rounded-full border-[1px] border-solid border-[#9a9292] py-3 px-[12px] text-[12px] flex justify-center items-center"
                  />
                </Link>
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
                <Link href={"/details"}>
                  {" "}
                  <FontAwesomeIcon
                    icon={faBagShopping}
                    className="rounded-full bg-[#F2F2F2] border-[1px] border-solid border-[#F2F2F2] py-[10px] px-3 text-xl group-hover:bg-[#00B207] flex justify-center items-center"
                  />
                </Link>
                <FontAwesomeIcon
                  icon={faEye}
                  className="rounded-full border-[1px] border-solid border-[#9a9292] py-3 px-[12px] text-[11px] flex justify-center items-center"
                />
                <Link href={"/wishlist"}>
                  {" "}
                  <FontAwesomeIcon
                    icon={faHeart}
                    className="rounded-full border-[1px] border-solid border-[#9a9292] py-3 px-[12px] text-[12px] flex justify-center items-center"
                  />
                </Link>
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
                <Link href={"/details"}>
                  {" "}
                  <FontAwesomeIcon
                    icon={faBagShopping}
                    className="rounded-full bg-[#F2F2F2] border-[1px] border-solid border-[#F2F2F2] py-[10px] px-3 text-xl group-hover:bg-[#00B207] flex justify-center items-center"
                  />
                </Link>
                <FontAwesomeIcon
                  icon={faEye}
                  className="rounded-full border-[1px] border-solid border-[#9a9292] py-3 px-[12px] text-[11px] flex justify-center items-center"
                />
                <Link href={"/wishlist"}>
                  {" "}
                  <FontAwesomeIcon
                    icon={faHeart}
                    className="rounded-full border-[1px] border-solid border-[#9a9292] py-3 px-[12px] text-[12px] flex justify-center items-center"
                  />
                </Link>
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
                <Link href={"/details"}>
                  {" "}
                  <FontAwesomeIcon
                    icon={faBagShopping}
                    className="rounded-full bg-[#F2F2F2] border-[1px] border-solid border-[#F2F2F2] py-[10px] px-3 text-xl group-hover:bg-[#00B207] flex justify-center items-center"
                  />
                </Link>
                <FontAwesomeIcon
                  icon={faEye}
                  className="rounded-full border-[1px] border-solid border-[#9a9292] py-3 px-[12px] text-[11px] flex justify-center items-center"
                />
                <Link href={"/wishlist"}>
                  {" "}
                  <FontAwesomeIcon
                    icon={faHeart}
                    className="rounded-full border-[1px] border-solid border-[#9a9292] py-3 px-[12px] text-[12px] flex justify-center items-center"
                  />
                </Link>
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
                <Link href={"/details"}>
                  {" "}
                  <FontAwesomeIcon
                    icon={faBagShopping}
                    className="rounded-full bg-[#F2F2F2] border-[1px] border-solid border-[#F2F2F2] py-[10px] px-3 text-xl group-hover:bg-[#00B207] flex justify-center items-center"
                  />
                </Link>
                <FontAwesomeIcon
                  icon={faEye}
                  className="rounded-full border-[1px] border-solid border-[#9a9292] py-3 px-[12px] text-[11px] flex justify-center items-center"
                />
                <Link href={"/wishlist"}>
                  {" "}
                  <FontAwesomeIcon
                    icon={faHeart}
                    className="rounded-full border-[1px] border-solid border-[#9a9292] py-3 px-[12px] text-[12px] flex justify-center items-center"
                  />
                </Link>
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
                <Link href={"/details"}>
                  {" "}
                  <FontAwesomeIcon
                    icon={faBagShopping}
                    className="rounded-full bg-[#F2F2F2] border-[1px] border-solid border-[#F2F2F2] py-[10px] px-3 text-xl group-hover:bg-[#00B207] flex justify-center items-center"
                  />
                </Link>
                <FontAwesomeIcon
                  icon={faEye}
                  className="rounded-full border-[1px] border-solid border-[#9a9292] py-3 px-[12px] text-[11px] flex justify-center items-center"
                />
                <Link href={"/wishlist"}>
                  {" "}
                  <FontAwesomeIcon
                    icon={faHeart}
                    className="rounded-full border-[1px] border-solid border-[#9a9292] py-3 px-[12px] text-[12px] flex justify-center items-center"
                  />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="   w-full flex justify-start items-center flex-col gap-5  pb-36 py-10  px-10 pt-10  bg-[url('/Images/bg3.png')] bg-cover	bg-bottom	">
        <p className="font-medium text-sm  text-black">HOt Sale</p>
        <h1 className="font-light text-[32px] text-black text-center">
          <span className="text-[34px] font-semibold "> Save 37% </span>on Every
          Order
        </h1>

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

export default DealSection;
