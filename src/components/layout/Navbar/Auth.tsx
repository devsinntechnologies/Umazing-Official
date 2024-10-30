// @ts-nocheck
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
import { setUserProfile, logOut } from "@/slice/authSlice";
import AuthDialog from "../auth/AuthDialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";

interface AuthProps {
  className?: string;
}

const Auth: React.FC<AuthProps> = ({ className }) => {
  const dispatch = useDispatch();
  const userId = useSelector((state: any) => state.authSlice.user?.id);
  const isLoggedIn = useSelector((state: any) => state.authSlice.isLoggedIn);
  const userData = useSelector((state: any) => state.authSlice.userProfile);
  const [triggerFetch, setTriggerFetch] = useState(false);

  const handleLogout = () => {
    dispatch(logOut());
  };

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
      dispatch(setUserProfile(userProfile.data));  // Store profile data in Redux
    }
    if (error) {
      console.error("Error fetching user profile:", error);
    }
  }, [userProfile, error, dispatch]);

  return (
    <div className={`${cn(className)} flex gap-2 items-center space-x-1 text-gray-500 text-sm`}>
      {isLoggedIn ? (
        isLoading ? (
          <div className="flex items-center gap-3 min-h-10">
            <Skeleton className="size-8 md:size-10 rounded-full" />
            <Skeleton className="size-8 md:size-10 rounded-full" />
            <Skeleton className="size-12 rounded-full" />
          </div>
        ) : (
          <div className="flex items-center gap-3 min-h-10">
            <Link href='/wishlist' className="size-8 md:size-10 rounded-full text-primary font-bold flex items-center justify-center">
              <Heart className="font-bold" />
            </Link>
            <Link href='/cart' className="size-8 md:size-10 rounded-full text-primary font-bold flex items-center justify-center">
              <ShoppingCart className="font-bold" />
            </Link>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                {userData && (
                  <div className="min-w-10 flex items-center gap-3 border rounded-full">
                    <Image
                      src={userData?.imageUrl ? `http://97.74.89.204/${userData?.imageUrl}` : "/Images/profileImg.png"}
                      alt=""
                      width={48}
                      height={48}
                      className="size-12 rounded-full"
                    />
                  </div>
                )}
              </DropdownMenuTrigger>
              <DropdownMenuContent className="min-w-[325px]">
                <DropdownMenuGroup>
                  <DropdownMenuItem asChild className="cursor-pointer">
                    <Link
                      href={`/profile`}
                      className="flex flex-row items-center gap-x-5 py-2"
                    >
                      {userData && (
                        <div className="min-w-10 flex items-center gap-3">
                          <Image
                            src={userData?.imageUrl ? `http://97.74.89.204/${userData?.imageUrl}` : "/Images/profileImg.png"}
                            alt=""
                            width={64}
                            height={64}
                            className="size-16 rounded-full"
                          />
                        </div>
                      )}
                      <div className="flex flex-col">
                        <span className="text-lg font-bold">
                          {userData?.name}
                        </span>
                        <span className="text-md">View Profile</span>
                      </div>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild className="cursor-pointer">
                    <Link href="/seller">Sell | Dashboard</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild className="cursor-pointer">
                    <Link href="/seller/addProduct">
                      Add Product
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild className="cursor-pointer">
                    <Link href="/seller/products">Your Products</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild className="cursor-pointer">
                    <Link href="/wishlist">Wishlist</Link>
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  className="cursor-pointer"
                  onClick={handleLogout}
                >
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        )
      ) : (
        <AuthDialog useTrigger={true} />
      )}
    </div>
  );
};

export default Auth;
