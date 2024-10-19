"use client";
import React from "react";
import Link from "next/link";
import { IoIosHome } from "react-icons/io";
import { FaAngleRight } from "react-icons/fa6";
import BreadCrum from "@/components/BreadCrum";

const Contact = () => {
  return (
    <>
      <BreadCrum />
      <div className=" w-full ">
        <div className="flex w-full justify-center gap-6 py-12 flex-wrap-reverse ">
          <div className="bg-white w-full rounded-lg shadow-md px-5 py-6 flex flex-col gap-10 md:w-[40vw] xl:w-[35vw] ">
            <div className="w-full">
              <img
                className="w-full"
                src="https://pickbazar-react.vercel.app/_next/static/media/contact-illustration.2f6adc05.svg"
              ></img>
            </div>
            <div className="address flex flex-col gap-3">
              <h3 className="text-lg font-medium	text-slate-950">Address</h3>
              <p className="text-sm font-normal text-slate-950">
                NY State Thruway, New York, USA
              </p>
            </div>
            <div className=" flex flex-col gap-3">
              <h3 className="text-lg font-medium	text-slate-950">Phone</h3>
              <p className="text-sm font-normal text-slate-950">
                +129290122122
              </p>
            </div>
            <div className="flex flex-col gap-3">
              <h3 className="text-lg font-medium	text-slate-950">
                Email Address
              </h3>
              <p className="text-sm font-normal text-slate-950">
                demo@demo.com
              </p>
            </div>
            <div className=" flex flex-col gap-3">
              <h3 className="text-lg font-medium	text-slate-950">Website</h3>
              <p className="text-sm font-normal text-slate-950">
                https://redq.io
              </p>
            </div>
            <div className="flex flex-col gap-3">
              <h3 className="text-lg font-medium	text-slate-950">Follow Us</h3>
              <div className="flex gap-3 cursor-pointer text-slate-950">
                <i class="fa-brands fa-facebook"></i>
                <i class="fa-brands fa-twitter"></i>
                <i class="fa-brands fa-instagram"></i>
              </div>
            </div>
          </div>
          <div className="bg-white w-full rounded-lg shadow-md px-5 py-6 flex flex-col gap-0  sm::w-[40vw] md:w-[50vw] lg:w-[52vw]  xl:w-[45vw]  ">
            <h2 className="text-xl font-bold  md:text-start md:text-2xl">
              How can we improve your experience?
            </h2>
            <div className="pt-5 flex flex-col gap-6 w-full">
              <div class="flex flex-col gap-3">
                <label for="name">Name</label>
                <input
                  className="w-full p-2 border-[1px] border-solid border-slate-400 rounded-lg focus:outline-none "
                  type="text"
                  id="name"
                  name="name"
                ></input>
              </div>

              <div class="flex flex-col gap-3">
                <label for="email">Email</label>
                <input
                  className="w-full p-2 border-[1px] border-solid border-slate-400 rounded-lg focus:outline-none"
                  type="email"
                  id="email"
                ></input>
              </div>

              <div class="flex flex-col gap-3">
                <label for="subject">Subject</label>
                <input
                  className="w-full p-2 border-[1px] border-solid border-slate-400 rounded-lg focus:outline-none"
                  type="text"
                  id="subject"
                ></input>
              </div>

              <div class="flex flex-col gap-3">
                <label for="message">Message</label>
                <textarea
                  className="w-full p-2 border-[1px] border-solid border-slate-400 rounded-lg focus:outline-none h-32"
                  id="message"
                ></textarea>
              </div>
              <button className="py-3 px-4 text-xl bg-primary w-1/2 text-white rounded-lg">
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact;
