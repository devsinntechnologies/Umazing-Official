"use client";
import { IoLocationOutline } from "react-icons/io5";
import NavMiddleSection from "./NavMiddleSection";
import AuthDialog from "../auth/AuthDialog";
import { useSelector, useDispatch } from "react-redux";
import { useGetUserProfileQuery } from "@/hooks/UseAuth";
import { setUserProfile } from "@/slice/authSlice";
import { useEffect, useState } from "react";
import Image from "next/image";

const Navbar = () => {
  // const dispatch = useDispatch();
  // const userId = useSelector((state) => state.authSlice.user?.id);
  // const isLoggedIn = useSelector((state) => state.authSlice.isLoggedIn);
  // const userData = useSelector((state) => state.authSlice.userProfile);
  // const [triggerFetch, setTriggerFetch] = useState(false);

  // // Trigger API fetch only when userId is set
  // useEffect(() => {
  //   if (userId && isLoggedIn) {
  //     setTriggerFetch(true);
  //   }
  // }, [userId, isLoggedIn]);

  // // Fetch user profile data once userId is available
  // const { data: userProfile, error, isLoading } = useGetUserProfileQuery(userId, {
  //   skip: !triggerFetch,  // Skip API call if triggerFetch is false
  // });

  // useEffect(() => {
  //   if (userProfile) {
  //     console.log("User Profile Data:", userProfile);
  //     dispatch(setUserProfile(userProfile.data));  // Store profile data in Redux
  //   }
  //   if (error) {
  //     console.error("Error fetching user profile:", error);
  //   }
  // }, [userProfile, error, dispatch]);

  return (
    <>
      <div className="fixed w-full top-0 left-0 right-0 z-50 bg-white px-2 sm:px-4 md:px-6 lg:px-8">
        {/* <div className="w-full flex flex-wrap md:flex-nowrap justify-between p-2 border-b-2 border-gray-200">
          <div className="flex items-center gap-2">
            <IoLocationOutline color="#6b7280" size={24} />
            <p className="text-gray-500 text-xs md:text-sm">
              Store Location: Lincoln-344, Illinois, Chicago, USA
            </p>
          </div>
          <div className="flex items-center gap-2 md:gap-4 mt-2 md:mt-0">
            <select className="text-gray-500 text-xs md:text-sm outline-none">
              <option className="text-gray-500 text-xs md:text-sm" value="">
                Eng
              </option>
              <option className="text-gray-500 text-xs md:text-sm" value="">
                Hindi
              </option>
            </select>
            <select className="text-gray-500 text-xs md:text-sm outline-none">
              <option className="text-gray-500 text-xs md:text-sm" value="">
                USD
              </option>
              <option className="text-gray-500 text-xs md:text-sm" value="">
                PKR
              </option>
            </select>
            <div className="flex justify-between items-center gap-3 min-h-10">
             {isLoggedIn && userData ? <div className="min-w-10 flex items-center gap-3">
              <Image src={`http://97.74.89.204/${userData?.imageUrl}`} alt="" width={40} height={40} className="size-10 rounded-full bg-primary"/>
              <h3>{userData.name}</h3>
              <hr />
              <button className="bg-primary px-4 py-1.5 rounded-full text-white text-xs md:text-sm">
          Logout
        </button>
              </div> : <AuthDialog />}
            </div>
          </div>
        </div> */}
        {/* Navbar middle section */}
        <NavMiddleSection />
      </div>
      {/* Extra space to accommodate the fixed navbar */}
      <div className="h-[124px]"></div>
    </>
  );
};

export default Navbar;
