"use client"; // Add this line at the top

import React, { useState } from "react";
import { IoCameraOutline } from "react-icons/io5";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const Profile = () => {
  const [name, setName] = useState("Hassaan Mehboob");
  const [email, setEmail] = useState("hassaan78@gmail.com");
  const [birthday, setBirthday] = useState("00-00-00");

  return (
    <div className="w-[100vw] mx-auto py-10 flex flex-col gap-8 px-5 md:w-[80vw] md:px-0">
      <div className="flex items-center gap-5 flex-col md:flex-row">
        <div className="bg-slate-300 rounded-full flex justify-center items-center w-[40vw] h-[40vw] xs:w-[30vw] xs:h-[30vw] sm:w-[20vw] sm:h-[20vw] md:w-[15vw] md:h-[15vw] lg:w-[10vw] lg:h-[10vw]">
          <IoCameraOutline className="text-4xl" />
        </div>
        <h3 className="font-semibold text-center md:text-left">{name}</h3>
      </div>

      <div className="flex flex-col gap-4">
        <h1 className="font-bold text-2xl sm:text-3xl">Account</h1>

        {/* Name Section */}
        <div className="flex justify-between items-center px-3 border-b-[1px] border-solid border-black pb-3 pt-4 sm:pt-6">
          <div className="flex flex-col sm:flex-row">
            <h3 className="font-semibold text-base sm:text-lg">Name: &nbsp;</h3>
            <h3 className="text-base sm:text-lg">{name}</h3>
          </div>
          <p className="text-[#008080] font-semibold text-sm sm:text-base cursor-pointer">
            Edit
          </p>
        </div>

        {/* Email Section */}
        <div className="flex justify-between items-center px-3 border-b-[1px] border-solid border-black pb-3 pt-4 sm:pt-6">
          <div className="flex flex-col sm:flex-row">
            <h3 className="font-semibold text-base sm:text-lg">
              Email: &nbsp;
            </h3>
            <h3 className="text-base sm:text-lg">{email}</h3>
          </div>
          <p className="text-[#008080] font-semibold text-sm sm:text-base cursor-pointer">
            Edit
          </p>
        </div>

        {/* Accordion Section */}
        <Accordion
          type="single"
          collapsible
          className="border-b-[1px] border-solid border-black"
        >
          <AccordionItem value="item-1 " className="px-3">
            <AccordionTrigger className="text-base sm:text-lg">
              Address
            </AccordionTrigger>
            <AccordionContent>
              <div className="flex justify-between items-center flex-col gap-4">
                {/* Address Section */}
                <div className="flex justify-between items-center py-3 sm:py-4 bg-slate-100 px-3 rounded-lg w-full">
                  <h3 className="font-normal text-sm sm:text-base">
                    Lahore, Pakistan
                  </h3>
                  <p className="text-[#008080] font-semibold text-sm sm:text-base cursor-pointer">
                    Edit
                  </p>
                </div>

                {/* Add More Button */}
                <button className="mt-4 sm:mt-6 px-4 py-2 sm:px-5 sm:py-3 bg-green-500 text-white rounded-lg hover:bg-green-600">
                  Add More
                </button>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        <div className="flex justify-between items-center px-3 border-b-[1px] border-solid border-black pb-3 pt-4 sm:pt-6">
          <div className="flex flex-col sm:flex-row">
            <h3 className="font-semibold text-base sm:text-lg">
              Birthday: &nbsp;
            </h3>
            <h3 className="text-base sm:text-lg">{birthday}</h3>
          </div>
          <p className="text-[#008080] font-semibold text-sm sm:text-base cursor-pointer">
            Edit
          </p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
