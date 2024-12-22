// @ts-nocheck
"use client";
import { useEffect, useState } from "react";
import {
  Heart,
  LayoutDashboard,
  LogOut,
  Package,
  PackagePlus,
  ShoppingBag,
  ShoppingCart,
  MessageCircleMore,
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
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

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
    skip: !triggerFetch, // Skip API call if triggerFetch is false
  });

  useEffect(() => {
    if (userProfile) {
      dispatch(setUserProfile(userProfile.data));  // Store profile data in Redux
    }
    if (error) {

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
             <Tooltip content="chat">
              <TooltipTrigger>
                <Link href='/chat' className="relative size-8 md:size-10 rounded-full text-primary font-bold flex items-center justify-center">
                  <div className="absolute -top-1 -right-1 flex items-center justify-center bg-destructive text-white text-xs w-5 h-5 rounded-full">10</div>
                  <MessageCircleMore  className="font-bold" />
                </Link></TooltipTrigger>
              <TooltipContent>
                <p>chat</p>
              </TooltipContent>
            </Tooltip>
            <Tooltip content="Wishlist">
              <TooltipTrigger>
                <Link href='/wishlist' className="relative size-8 md:size-10 rounded-full text-primary font-bold flex items-center justify-center">
                  <div className="absolute -top-1 -right-1 flex items-center justify-center bg-destructive text-white text-xs w-5 h-5 rounded-full">10</div>
                  <Heart className="font-bold" />
                </Link></TooltipTrigger>
              <TooltipContent>
                <p>Wishlist</p>
              </TooltipContent>
            </Tooltip>

            <Tooltip content="Cart">

              <TooltipTrigger>
                <Link href='/cart' className="relative size-8 md:size-10 rounded-full text-primary font-bold flex items-center justify-center">
                  <div className="absolute -top-1 -right-1 flex items-center justify-center bg-destructive text-white text-xs w-5 h-5 rounded-full">10</div>
                  <ShoppingCart className="font-bold" />
                </Link>
              </TooltipTrigger>
              <TooltipContent>
                <p>Cart</p>
              </TooltipContent>
            </Tooltip>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                {userData && (
                  <div className="min-w-10 flex items-center gap-3 border rounded-full">
                    <Image
                      src={userData?.imageUrl ? `http://97.74.89.204/${userData?.imageUrl}` : "/Images/profileImg.png"}
                      alt=""
                      width={48}
                      height={48}
                      className="size-10 rounded-full"
                      onError={(e) => {
                        e.currentTarget.src = "/Images/profileImg.png"; // Set to static image on error
                      }}
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
                            width={100}
                            height={100}
                            className="size-16 rounded-full"
                            onError={(e) => {
                              e.currentTarget.src = "/Images/profileImg.png"; // Set to static image on error
                            }}
                          />
                        </div>
                      )}
                      <div className="flex flex-col">
                        <span className="text-lg font-bold truncate-multiline-1 w-[180px]">
                          {userData?.name}
                        </span>
                        <span className="text-md">View Profile</span>
                      </div>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild className="cursor-pointer">
                    <Link href="/seller" className="flex items-center gap-2">
                      <LayoutDashboard className="w-4 h-4" />
                      Sell | Dashboard
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild className="cursor-pointer">
                    <Link href="/seller/addProduct" className="flex items-center gap-2">
                      <PackagePlus className="w-4 h-4" />
                      Add Product
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild className="cursor-pointer">
                    <Link href="/seller/products" className="flex items-center gap-2">
                      <Package className="w-4 h-4" />
                      Your Products
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild className="cursor-pointer">
                    <Link href="/orders" className="flex items-center gap-2">
                      <ShoppingBag className="w-4 h-4" />
                      Your Orders
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild className="cursor-pointer">
                    <Link href="/seller/orders" className="flex items-center gap-2">
                      <ShoppingBag className="w-4 h-4" />
                      Customer Orders
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild className="cursor-pointer">
                    <Link href="/wishlist" className="flex items-center gap-2">
                      <Heart className="w-4 h-4" />
                      Wishlist
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <button
                    className="w-full py-1 flex items-center justify-center gap-2 rounded-lg cursor-pointer bg-destructive text-white"
                    onClick={handleLogout}
                  >
                    <LogOut className="w-4 h-4" />
                    Logout
                  </button>
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
