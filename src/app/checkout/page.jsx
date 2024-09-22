import React from "react";
import { MdHome } from "react-icons/md";
import { FaAngleRight } from "react-icons/fa6";
import Image from "next/image";
import Link from "next/link";

const Checkout = () => {
  return (
    <>
      <div className="h-20 w-[95vw] mt-1 mx-auto bg-gray-400 bg-[url('/Images/banner.jpg')] bg-cover bg-bottom flex justify-start text-[#999999] items-center px-5 lg:px-10 ">
        <div className="flex gap-4 items-center justify-center  ">
          <MdHome className="text-2xl cursor-pointer" />
          <p className="font-normal text-base cursor-pointer">Shopping Cart</p>
          <FaAngleRight />
          <p className="font-normal text-base text-[#00B207] cursor-pointer">
            Checkout
          </p>
        </div>
      </div>
      <div className="flex w-full p-5 gap-10 flex-wrap md:flex-nowrap lg:px-10">
        <div className="w-full flex flex-col gap-5 md:w-[60%]">
          <h1 className="font-medium text-2xl">Billing Information</h1>
          <div className="grid grid-cols-1 gap-4  xl:grid-cols-3">
            <div className="flex flex-col gap-2">
              <label htmlFor="firstname" className="text-sm font-normal">
                First Name
              </label>
              <input
                type="text"
                placeholder="Your first name"
                id="firstname"
                className="border-[1px] border-solid border-[#cbc9c9] rounded-md p-2 px-3 placeholder:text-base placeholder:font-normal focus:outline-none"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="lastname" className="text-sm font-normal">
                Last Name
              </label>
              <input
                type="text"
                placeholder="Your last name"
                id="lastname"
                className="border-[1px] border-solid border-[#cbc9c9] rounded-md p-2 px-3 placeholder:text-base placeholder:font-normal focus:outline-none"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="company" className="text-sm font-normal">
                Company Name <span className="text-[#7e7d7d]">(optional)</span>
              </label>
              <input
                type="text"
                placeholder="Company name"
                id="company"
                className="border-[1px] border-solid border-[#cbc9c9] rounded-md p-2 px-3 placeholder:text-base placeholder:font-normal focus:outline-none"
              />
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="email" className="text-sm font-normal">
              Street Address
            </label>
            <input
              type="email"
              placeholder="Email"
              id="email"
              className="border-[1px] border-solid border-[#cbc9c9] rounded-md p-2 px-3 placeholder:text-base placeholder:font-normal focus:outline-none"
            />
          </div>
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
            <div className="flex flex-col gap-2 ">
              <label htmlFor="firstname" className="text-sm font-normal">
                Country / Region
              </label>

              <select
                name="choice"
                className="w-full border-[1px] border-solid border-[#cbc9c9] rounded-md p-2 px-3 focus:outline-none "
              >
                <option defaultValue="first">Select</option>
                <option value="second">First Value</option>
                <option value="third">Second Value</option>
                <option value="fourth">Third Value</option>
              </select>
            </div>
            <div className="flex flex-col gap-2 ">
              <label htmlFor="firstname" className="text-sm font-normal">
                States
              </label>
              <select
                name="choice"
                className="border-[1px] border-solid border-[#cbc9c9] rounded-md p-2 px-3 focus:outline-none "
              >
                <option defaultValue="first">Select</option>
                <option value="second">First Value</option>
                <option value="third">Second Value</option>
                <option value="fourth">Third Value</option>
              </select>
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="zip" className="text-sm font-normal">
                Zip Code{" "}
              </label>
              <input
                type="teaxt"
                placeholder="Zip Code"
                id="zip"
                className="border-[1px] border-solid border-[#cbc9c9] rounded-md p-2 px-3 placeholder:text-base placeholder:font-normal focus:outline-none"
              />
            </div>
          </div>
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            <div className="flex flex-col gap-2">
              <label htmlFor="email2" className="text-sm font-normal">
                Email
              </label>
              <input
                type="email"
                placeholder="Email Address"
                id="email2"
                className="border-[1px] border-solid border-[#cbc9c9] rounded-md p-2 px-3 placeholder:text-base placeholder:font-normal focus:outline-none"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="phone" className="text-sm font-normal">
                Phone
              </label>
              <input
                type="text"
                placeholder="Phone number"
                id="phone"
                className="border-[1px] border-solid border-[#cbc9c9] rounded-md p-2 px-3 placeholder:text-base placeholder:font-normal focus:outline-none"
              />
            </div>
          </div>
          <div className="flex gap-3">
            <input type="checkbox" id="check" />
            <label htmlFor="check">Ship to a different address</label>
          </div>
          <hr />
          <div className="flex flex-col gap-5">
            <h1 className="font-medium text-2xl"> Additional Info</h1>
            <h3>Order Notes (Optional)</h3>
            <textarea
              placeholder="Notes about your order, e.g. special notes for delivery"
              className="w-full h-28 border-[1px] border-solid border-[#cbc9c9] rounded-md p-2 px-3 placeholder:text-base placeholder:font-normal focus:outline-none"
            ></textarea>
          </div>
        </div>
        <div className="border-[1px] border-solid border-[#E6E6E6] h-full  p-5 flex flex-wrap flex-col gap-5 w-[100%] md:w-[40%]  rounded-lg ">
          <h1 className="font-medium text-xl">Order Summery</h1>
          <div className="flex flex-col gap-4">
            <div className="flex justify-between items-center  flex-wrap">
              <div className="flex gap-2 items-center flex-wrap">
                <Image
                  className="w-[30px] h-[30px] break-inside-auto lg:w-[50px] lg:h-[50px]	"
                  width={100}
                  height={100}
                  src={"/Images/apple.png"}
                ></Image>
                <h1 className="font-normal text-sm">Green Capsicum</h1>
                <h1 className="font-normal text-sm">x5</h1>
              </div>
              <div>
                <h1 className="font-medium text-sm">$70.00</h1>
              </div>
            </div>
            <div className="flex justify-between items-center  flex-wrap">
              <div className="flex gap-2 items-center flex-wrap">
                <Image
                  className="w-[30px] h-[30px] break-inside-auto lg:w-[50px] lg:h-[50px]	"
                  width={100}
                  height={100}
                  src={"/Images/Capsicum.png"}
                ></Image>
                <h1 className="font-normal text-sm">Red Capsicum</h1>
                <h1 className="font-normal text-sm">x1</h1>
              </div>
              <div>
                <h1 className="font-medium text-sm">$14.00</h1>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-4 ">
            <div className="flex justify-between items-center flex-wrap ">
              <div className="flex gap-2 items-center flex-wrap">
                <h1 className="font-normal text-sm">Subtotal:</h1>
              </div>
              <div>
                <h1 className="font-medium text-sm">$84.00</h1>
              </div>
            </div>
            <hr />
            <div className="flex justify-between items-center flex-wrap ">
              <div className="flex gap-2 items-center flex-wrap">
                <h1 className="font-normal text-sm">Shipping:</h1>
              </div>
              <div>
                <h1 className="font-medium text-sm">Free</h1>
              </div>
            </div>
            <hr />

            <div className="flex justify-between items-center flex-wrap ">
              <div className="flex gap-2 items-center flex-wrap">
                <h1 className="font-normal text-base">Total:</h1>
              </div>
              <div>
                <h1 className="font-semibold text-lg">$84.00</h1>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <h1 className="font-medium text-xl">Payment Method</h1>
            <div className="flex gap-3 flex-wrap">
              <input type="radio" id="cash" name="payment" />
              <label htmlFor="cash" className="font-normal text-sm">
                Cash on Delivery
              </label>
            </div>
            <div className="flex gap-3 flex-wrap">
              <input type="radio" id="paypal" name="payment" />
              <label htmlFor="paypal" className="font-normal text-sm">
                Paypal
              </label>
            </div>
            <div className="flex gap-3 flex-wrap">
              <input type="radio" id="pay" name="payment" />
              <label htmlFor="pay" className="font-normal text-sm">
                Amazon Pay
              </label>
            </div>

            <button className="py-3 bg-[#00B207] text-white rounded-full">
              Place Order
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Checkout;
