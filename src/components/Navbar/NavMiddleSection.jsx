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
              <Auth className="block md:hidden"/>
          </div>
          {/* Search Bar */}
          <Searchbar />
          {/* Contact Info */}
            <Auth className="hidden md:block"/>
        </div>
      </header>
    </div>
  );
};

export default NavMiddleSection;
