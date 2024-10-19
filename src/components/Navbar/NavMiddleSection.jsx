"use client";
import { useEffect, useState } from "react";
import {
  Menu,
  Heart,
  ShoppingCart,
  User,
  CircleX,
  ChevronDown,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import Logo from "../layout/Logo";
import { useSelector, useDispatch } from "react-redux";
import { useGetUserProfileQuery } from "@/hooks/UseAuth";
import { setUserProfile } from "@/slice/authSlice";
import Auth from "./Auth";
import Searchbar from "./Searchbar";

const NavMiddleSection = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State for hamburger menu
  const [ishamburgerOpen, setIshamburgerOpen] = useState(false);
  const userData = useSelector((state) => state.authSlice.userProfile);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen); // Toggle menu open/close state
    setIshamburgerOpen(!ishamburgerOpen);
  };

  return (
    <div>
      <header className="bg-white w-full">
        {/* Top Section */}
        <div className="w-full px-2 py-3 flex justify-between items-center flex-col md:flex-row gap-4 md:gap-[auto]">
          {/* Logo Section */}
          <div className="w-full md:w-fit flex items-center justify-between md:justify-center">
          <Logo />
          <div className="block md:hidden">
         <Auth/>
         </div>
          </div>
          {/* Search Bar */}
          <Searchbar/>
          {/* Contact Info */}
         <div className="hidden md:block">
         <Auth/>
         </div>
        </div>

        {/* Bottom Navigation */}
        <nav>
          <div className=" hidden bg-black w-full  items-center py-2 lg:py-0 px-6">
            {/* All Categories Button */}
            <div className="hidden lg:flex">
              <div className="bg-primary p-3">
                <Menu color="white" size={24} />
              </div>
              <div className="bg-[#393e46] p-3">
                <span className="text-white flex items-center">
                  All Categories <ChevronDown size={20} />
                </span>
              </div>
            </div>

            {/* Hamburger icon */}
            <div className="hamburger_icon flex lg:hidden" onClick={toggleMenu}>
              {ishamburgerOpen ? (
                <CircleX color="white" size={24} />
              ) : (
                <Menu color="white" size={24} />
              )}
            </div>

            {/* Navigation Links for large screens */}
            <ul className="hidden lg:flex items-center space-x-6 ml-4 text-white">
              <li>
                <Link
                  href="/"
                  className="flex items-center hover:text-gray-300"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/shop"
                  className="flex items-center hover:text-gray-300"
                >
                  Shop
                </Link>
              </li>

              <li>
                <a href="#" className="flex items-center hover:text-gray-300">
                  About Us
                </a>
              </li>
              <li>
                <Link
                  href="/contact-us"
                  className="flex items-center hover:text-gray-300"
                >
                  Contact Us
                </Link>
              </li>
            </ul>

            {/* Icons Section */}
            <div className="flex items-center ml-auto space-x-4">
              <Link href="/wishlist" className="text-white hover:text-gray-300">
                <Heart size={30} />
              </Link>
              <Link
                href="/cart"
                className="relative text-white hover:text-gray-300"
              >
                <ShoppingCart size={30} />
                <span className="absolute -top-1 -right-2 bg-primary text-xs rounded-full px-1">
                  2
                </span>
              </Link>
              <Link href="/profile" className="text-white hover:text-gray-300">
                {userData?.imageUrl ? <div className="size-8 rounded-full shadow-lg"><Image src={`http://97.74.89.204/${userData.imageUrl}`} alt="" width={40} height={40} className="size-8 rounded-full" /></div> : <User size={30} />}
              </Link>
            </div>
          </div>

          {isMenuOpen ? (
            <div className="w-full bg-black absolute top-0 left-0 h-screen z-50">
              <div className="flex justify-end p-4">
                <CircleX color="white" size={30} onClick={toggleMenu} />
              </div>

              {/* Navigation Links */}
              <ul className="text-white p-4 space-y-4 flex flex-col items-center">
                <li>
                  <Link href="/" className="block hover:text-gray-300">
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="/shop" className="block hover:text-gray-300">
                    Shop
                  </Link>
                </li>
                <li>
                  <a href="#" className="block hover:text-gray-300">
                    Pages
                  </a>
                </li>
                <li>
                  <a href="#" className="block hover:text-gray-300">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="#" className="block hover:text-gray-300">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#" className="block hover:text-gray-300">
                    Contact Us
                  </a>
                </li>
              </ul>
            </div>
          ) : null}
        </nav>
      </header>
    </div>
  );
};

export default NavMiddleSection;
