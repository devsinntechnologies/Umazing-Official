'use client'
import React, { useState } from 'react';
import { FaBars, FaPhoneAlt } from 'react-icons/fa';
import { MdCancel } from "react-icons/md";
import { IoCartOutline } from "react-icons/io5";
import { CiHeart, CiUser } from "react-icons/ci";
import { RiArrowDropDownLine } from "react-icons/ri";
import Image from 'next/image';
import ecobazaar from '../../app/images/ecobazaar.jpg';
import Link from 'next/link';

const NavMiddleSection = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State for hamburger menu
  const [ishamburgerOpen, setIshamburgerOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen); // Toggle menu open/close state
    setIshamburgerOpen(!ishamburgerOpen)
  };

  return (
    <div>
      <header className="bg-white">
        {/* Top Section */}
        <div className="container w-[95vw] mx-auto px-2 py-3 flex justify-between items-center">
          {/* Logo Section */}
          <div>
           <Link href={'/'}> <Image src={ecobazaar} width={150} height={50} /></Link>
          </div>

          {/* Search Bar */}
          <div className="items-center hidden lg:flex w-1/2 bg-gray-100 rounded overflow-hidden">
            <input
              type="text"
              placeholder="Search"
              className="w-full p-2 text-sm border-none outline-none bg-transparent"
            />
            <button className="bg-green-600 text-white px-4 py-2">Search</button>
          </div>

          {/* Contact Info */}
          <div className="flex gap-2 items-center space-x-1 text-gray-500 text-sm">
            <FaPhoneAlt size={20} /> {/* Reduced icon size for small screens */}
            <div className="flex flex-col">
              {/* Adjusting the font size for different screen sizes */}
              <span className="text-[8px] sm:text-[10px] md:text-xs">Customer Services</span>
              <span className="font-bold text-black text-[12px] sm:text-[14px] md:text-lg">(219) 555-0114</span>
            </div>
          </div>
        </div>

        {/* Bottom Navigation */}
        <nav>
          <div className="container bg-black w-[95vw] mx-auto flex items-center py-2 lg:py-0 px-6">
            {/* All Categories Button */}
            <div className='hidden lg:flex'>
              <div className="bg-green-600 p-3">
                <FaBars color="white" size={24} />
              </div>
              <div className="bg-[#393e46] p-3">
                <span className="text-white flex items-center">All Categories <RiArrowDropDownLine size={24} /></span>
              </div>
            </div>

            {/* Hamburger icon */}
            <div className="hamburger_icon flex lg:hidden" onClick={toggleMenu}>
              {
                ishamburgerOpen ? <MdCancel color="white" size={24} /> :
                  <FaBars color="white" size={24} />
              }
            </div>

            {/* Navigation Links for large screens */}
            <ul className="hidden lg:flex items-center space-x-6 ml-4 text-white">
              <li><Link href="/" className="flex items-center hover:text-gray-300">Home</Link></li>
              <li><Link href="/shop" className="flex items-center hover:text-gray-300">Shop</Link></li>
              <li><a href="#" className="flex items-center hover:text-gray-300">Pages</a></li>
              <li><a href="#" className="flex items-center hover:text-gray-300">Blog</a></li>
              <li><a href="#" className="flex items-center hover:text-gray-300">About Us</a></li>
              <li><a href="#" className="flex items-center hover:text-gray-300">Contact Us</a></li>
            </ul>

            {/* Icons Section */}
            <div className="flex items-center ml-auto space-x-4">
              <Link href="/wishlist" className="text-white hover:text-gray-300"><CiHeart size={30} /></Link>
              <Link href="/cart" className="relative text-white hover:text-gray-300">
                <IoCartOutline  size={30} />
                <span className="absolute -top-1 -right-2 bg-green-600 text-xs rounded-full px-1">2</span>
              </Link>
              <a href="#" className="text-white hover:text-gray-300"><CiUser size={30} /></a>
            </div>
          </div>


          {isMenuOpen ? (
            <div className='w-full bg-black absolute top-0 left-0 h-screen z-50'>

              <div className='flex justify-end p-4'>
                <MdCancel color="white" size={30} onClick={toggleMenu} />
              </div>

              {/* Navigation Links */}
              <ul className="text-white p-4 space-y-4 flex flex-col items-center">
                <li><Link href="/" className="block hover:text-gray-300">Home</Link></li>
                <li><Link href="/shop" className="block hover:text-gray-300">Shop</Link></li>
                <li><a href="#" className="block hover:text-gray-300">Pages</a></li>
                <li><a href="#" className="block hover:text-gray-300">Blog</a></li>
                <li><a href="#" className="block hover:text-gray-300">About Us</a></li>
                <li><a href="#" className="block hover:text-gray-300">Contact Us</a></li>
              </ul>
            </div>
          ) : null}

        </nav>
      </header>
    </div>
  );
};

export default NavMiddleSection;