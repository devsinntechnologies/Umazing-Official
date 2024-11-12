//@ts-nocheck
"use client";
import React, { useState, useEffect, ChangeEvent } from "react";
import { Camera } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import BreadCrumb from "@/components/BreadCrumb";
import {
  useGetUserProfileQuery,
  useUpdateProfileMutation,
  useAddUserAddressMutation,
} from "@/hooks/UseAuth";
import { useSelector } from "react-redux";
import { useToast } from "@/hooks/use-toast";
import withAuth from "@/components/hoc/withAuth";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { RootState } from "@/store/store";
import ChangePassword from "@/components/ChangePassword";
import LoadingSpinner from "@/components/loadingSpinner/LoadingSpinner";

interface Address {
  id: string;
  address: string;
}

interface UserProfileData {
  id: string;
  name: string;
  email: string;
  dob: string;
  imageUrl: string;
  gender: string;
  addresses: Address[];
}

const Page: React.FC = () => {
  const { toast } = useToast();
  const isLoggedIn = useSelector((state: RootState) => state.authSlice.isLoggedIn);
  const userId = useSelector((state: RootState) => state.authSlice.user?.id);
  const [triggerFetch, setTriggerFetch] = useState(false);
  const [userProfileData, setUserProfileData] = useState<UserProfileData | null>(null);

  useEffect(() => {
    if (userId && isLoggedIn) {
      setTriggerFetch(true);
    }
  }, [userId, isLoggedIn]);

  const { data: userProfile, error, isLoading } = useGetUserProfileQuery(userId, {
    skip: !triggerFetch,
  });

  useEffect(() => {
    if (userProfile) {
      toast({ description: "Login Successfully" });
    }
    if (error) {
      console.error("Error fetching user profile:", error);
      toast({
        title: "Error",
        description: "Failed to fetch profile data. Please try again.",
        variant: "destructive",
      });
    }
  }, [userProfile, error, toast]);

  useEffect(() => {
    if (userProfile) {
      setUserProfileData(userProfile.data);
    }
  }, [userProfile]);

  return (
    <>
      {isLoading ? <LoadingSpinner /> : 
      <div className="w-full py-10 flex flex-col gap-8 px-5">
        <BreadCrumb />
        <div className="flex items-center gap-5 flex-col md:flex-row">
          <div className="relative bg-slate-300 rounded-full w-[120px] h-[120px] overflow-hidden">
            <Image
              src={userProfile?.data?.imageUrl ? `http://97.74.89.204/${userProfile.data.imageUrl}` : "/Images/profileImg.png"}
              width={100}
              height={100}
              alt="User Profile"
              className="w-full h-full"
            />
            <div className="absolute bottom-0 right-0 bg-black rounded-full p-1 flex items-center justify-center">
              <Camera className="text-white" />
            </div>
          </div>
          <h3 className="font-semibold text-2xl">{userProfileData?.name}</h3>
        </div>

        <div className="flex flex-col gap-4">
          <h1 className="font-bold text-2xl sm:text-3xl">Account</h1>

          <Accordion type="single" collapsible>
            <AccordionItem value="item-1" className="px-3">
              <AccordionTrigger className="text-base sm:text-lg">Address</AccordionTrigger>
              <AccordionContent>
                <div className="flex flex-col gap-4">
                  {userProfile?.data?.addresses?.length ? (
                    userProfile.data.addresses.map((address) => (
                      <div key={address.id} className="py-3 bg-slate-100 px-3 rounded-lg">
                        <h3 className="font-normal text-sm sm:text-base">{address.address}</h3>
                        <p className="text-primary font-semibold text-sm sm:text-base cursor-pointer">Edit</p>
                      </div>
                    ))
                  ) : (
                    <div className="py-3 bg-slate-100 px-3 rounded-lg">
                      <h3 className="font-normal text-sm sm:text-base">No addresses added yet.</h3>
                    </div>
                  )}
                  <Dialog>
                    <DialogTrigger className="mt-4 px-4 py-2 bg-primary text-white rounded-lg">Add</DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogDescription className="py-10">
                          <input
                            type="text"
                            placeholder="Add a new address"
                            className="border-b-2 border-transparent focus:border-primary focus:outline-none w-full"
                          />
                        </DialogDescription>
                      </DialogHeader>
                    </DialogContent>
                  </Dialog>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
          <ChangePassword />
        </div>
      </div>}
    </>
  );
};

export default withAuth(Page);
