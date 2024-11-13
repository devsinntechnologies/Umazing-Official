import React from "react";
// import pay from "../../../public/Images/cards";
import Image from "next/image";

const FooterBottomSection = () => {
  return (
    <div className="bg-white w-full border-t border-gray-200">
      <div className="w-full flex flex-col md:flex-row items-center justify-between py-2 ">
        {/* Copyright Text */}
        <div className="w-full flex justify-center">
        <p className="text-gray-500  text-sm text-center">
          Umazing Official © 2024. All Rights Reserved
        </p>
        </div>
        {/* Payment Icons */}
        <div className="flex items-center justify-center md:justify-end space-x-2 md:mr-16">
          {/* <Image
            src="/images/cards.png"
            width={100}
            height={100}
            className="h-8"
          /> */}
        </div>
      </div>
    </div>
  );
};

export default FooterBottomSection;
