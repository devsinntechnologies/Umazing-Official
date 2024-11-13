"use client";
import BreadCrumb from "@/components/BreadCrumb";
import { Facebook, Instagram, Twitter } from "lucide-react";
const Page = () => {
  return (
    <>
      <BreadCrumb />
      <div className=" w-full ">
        <div className="flex w-full justify-center gap-6 py-12 flex-wrap-reverse ">
          <div className="bg-white w-full rounded-lg shadow-md px-5 py-6 flex flex-col gap-10 md:w-[40vw] xl:w-[35vw] ">
            <div className="w-full">
              {/* <Image
                className="w-full"
                src="https://pickbazar-react.vercel.app/_next/static/media/contact-illustration.2f6adc05.svg"
                alt="Contact Illustration"
              /> */}
            </div>
            <div className="address flex flex-col gap-3">
              <h3 className="text-lg	text-primary font-bold">Address</h3>
              <p className="text-sm font-normal text-slate-950">
                NY State Thruway, New York, USA
              </p>
            </div>
            <div className=" flex flex-col gap-3">
              <h3 className="text-lg	text-primary font-bold">Phone</h3>
              <p className="text-sm font-normal text-slate-950">
                +92 315 4031364
              </p>
            </div>
            <div className="flex flex-col gap-3">
              <h3 className="text-lg	text-primary font-bold">
                Email Address
              </h3>
              <p className="text-sm font-normal text-slate-950">
                umazingofficial@gmail.com
              </p>
            </div>
            {/* <div className=" flex flex-col gap-3">
              <h3 className="text-lg font-medium	text-slate-950">Website</h3>
              <p className="text-sm font-normal text-slate-950">
                https://redq.io
              </p>
            </div> */}
            <div className="flex flex-col gap-3">
              <h3 className="text-lg	text-primary font-bold">Follow Us</h3>
              <div className="flex gap-3 cursor-pointer flex text-slate-950">
              <Facebook />
              <Instagram />
              <Twitter />
              
              </div>
            </div>
          </div>
          <div className="bg-white w-full rounded-lg shadow-md px-5 py-6 flex flex-col gap-0  sm::w-[40vw] md:w-[50vw] lg:w-[52vw]  xl:w-[45vw]  ">
            <h2 className="text-xl font-bold  text-primary md:text-start md:text-2xl">
              How can we improve your experience?
            </h2>
            <div className="pt-5 flex flex-col gap-6 w-full">
              <div className="flex flex-col gap-3">
                <label htmlFor="name">Name</label>
                <input
                  className="w-full p-2 border-[1px] border-solid border-slate-400 rounded-lg focus:outline-none "
                  type="text"
                  id="name"
                  name="name"
                ></input>
              </div>

              <div className="flex flex-col gap-3">
                <label htmlFor="email">Email</label>
                <input
                  className="w-full p-2 border-[1px] border-solid border-slate-400 rounded-lg focus:outline-none"
                  type="email"
                  id="email"
                ></input>
              </div>

              <div className="flex flex-col gap-3">
                <label htmlFor="subject">Subject</label>
                <input
                  className="w-full p-2 border-[1px] border-solid border-slate-400 rounded-lg focus:outline-none"
                  type="text"
                  id="subject"
                ></input>
              </div>

              <div className="flex flex-col gap-3">
                <label htmlFor="message">Message</label>
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

export default Page;
