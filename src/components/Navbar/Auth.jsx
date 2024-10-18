"use client";
import { useEffect, useState } from "react";
import {
  Heart,
  ShoppingCart,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import { useGetUserProfileQuery } from "@/hooks/UseAuth";
import { setUserProfile } from "@/slice/authSlice";
import AuthDialog from "../auth/AuthDialog";

const Auth = () => {
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.authSlice.user?.id);
  const isLoggedIn = useSelector((state) => state.authSlice.isLoggedIn);
  const userData = useSelector((state) => state.authSlice.userProfile);
  const [triggerFetch, setTriggerFetch] = useState(false);

  // Trigger API fetch only when userId is set
  useEffect(() => {
    if (userId && isLoggedIn) {
      setTriggerFetch(true);
    }
  }, [userId, isLoggedIn]);

  // Fetch user profile data once userId is available
  const { data: userProfile, error, isLoading } = useGetUserProfileQuery(userId, {
    skip: !triggerFetch,  // Skip API call if triggerFetch is false
  });

  useEffect(() => {
    if (userProfile) {
      console.log("User Profile Data:", userProfile);
      dispatch(setUserProfile(userProfile.data));  // Store profile data in Redux
    }
    if (error) {
      console.error("Error fetching user profile:", error);
    }
  }, [userProfile, error, dispatch]);

  return (
    <div className="flex gap-2 items-center space-x-1 text-gray-500 text-sm">
            {isLoggedIn ?
              <div className="flex  items-center gap-3 min-h-10">
                <Link href='/wishlist' className="size-8 md:size-10 rounded-full text-primary font-bold flex items-center justify-center"><Heart className="font-bold" /></Link>
                <Link href='/cart' className="size-8 md:size-10 rounded-full text-primary font-bold flex items-center justify-center"><ShoppingCart className="font-bold" /></Link>
                {/* <div className="size-8 md:size-10 rounded-full text-primary font-bold flex items-center justify-center"><Bell className="font-bold" /></div> */}
                {userData && <div className="min-w-10 flex items-center gap-3">
                  <Image src={`http://97.74.89.204/${userData?.imageUrl}`} alt="" width={48} height={48} className="size-12 rounded-full bg-primary" />
                  {/* <h3>{userData.name}</h3> */}
                  {/* <hr /> */}
                  {/* <button className="bg-primary px-4 py-1.5 rounded-full text-white text-xs md:text-sm">
          Logout
        </button> */}
                </div>}
              </div>
              : <AuthDialog />}
          </div>
  )
}

export default Auth
