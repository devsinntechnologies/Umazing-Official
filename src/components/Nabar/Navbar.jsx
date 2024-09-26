'use client';

import { IoLocationOutline } from "react-icons/io5";
import NavMiddleSection from './NavMiddleSection';
import SignupPopup from "../form/SignupPopup";
import LoginPopup from "../form/LoginPopup";
import { useState } from "react";

const Navbar = () => {
  const [isLoginPopupOpen, setIsLoginPopupOpen] = useState(false); // State for Login popup
  const [isSignupPopupOpen, setIsSignupPopupOpen] = useState(false); // State for Signup popup

  const openLoginPopup = () => {
    setIsLoginPopupOpen(true);
    setIsSignupPopupOpen(false); // Ensure Signup popup is closed when Login opens
  };

  const openSignupPopup = () => {
    setIsSignupPopupOpen(true);
    setIsLoginPopupOpen(false); // Ensure Login popup is closed when Signup opens
  };

  const closePopup = () => {
    setIsLoginPopupOpen(false);
    setIsSignupPopupOpen(false); // Close both popups
  };

  return (
    <>
      {/* Fixed Navbar */}
      <div className="fixed w-full top-0 left-0 right-0 z-50 bg-white">
        {/* Top bar */}
        <div className="flex flex-wrap md:flex-nowrap w-[95vw] mx-auto justify-between p-2 border-b-2 border-gray-200">
          <div className="flex items-center gap-2">
            <IoLocationOutline color="#6b7280" size={24} />
            <p className="text-gray-500 text-xs md:text-sm">Store Location: Lincoln-344, Illinois, Chicago, USA</p>
          </div>
          <div className="flex items-center gap-2 md:gap-4 mt-2 md:mt-0">
            <select className="text-gray-500 text-xs md:text-sm outline-none">
              <option className="text-gray-500 text-xs md:text-sm" value="">Eng</option>
              <option className="text-gray-500 text-xs md:text-sm" value="">Hindi</option>
            </select>
            <select className="text-gray-500 text-xs md:text-sm outline-none">
              <option className="text-gray-500 text-xs md:text-sm" value="">USD</option>
              <option className="text-gray-500 text-xs md:text-sm" value="">PKR</option>
            </select>
            <div className='flex justify-between gap-3'>
              <button onClick={openLoginPopup} className='text-gray-500 text-xs md:text-sm'>Login</button>
              <button onClick={openSignupPopup} className='text-gray-500 text-xs md:text-sm'>Signup</button>
            </div>
          </div>
        </div>

        {/* Navbar middle section */}
        <NavMiddleSection />
      </div>

      {/* Login Popup */}
      <LoginPopup isOpen={isLoginPopupOpen} closePopup={closePopup} />

      {/* Signup Popup */}
      <SignupPopup isOpen={isSignupPopupOpen} closePopup={closePopup} />

      {/* Extra space to accommodate the fixed navbar */}
      <div className="h-[166px]"></div>
    </>
  );
};

export default Navbar;
