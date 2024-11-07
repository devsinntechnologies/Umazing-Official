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
} from "@/hooks/UseAuth"; // Adjust this import path to your file structure
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
  const isLoggedIn = useSelector((state: RootState) => state.authSlice.isLoggedIn);
  const userId = useSelector((state: RootState) => state.authSlice.user?.id);
  const [triggerFetch, setTriggerFetch] = useState(false);

  const { toast } = useToast();

  useEffect(() => {
    if (userId && isLoggedIn) {
      setTriggerFetch(true);
    }
  }, [userId, isLoggedIn]);

  const {
    data: userProfile,
    error,
    isLoading,
    refetch,
  } = useGetUserProfileQuery(userId, {
    skip: !triggerFetch,
  });

  useEffect(() => {
    if (userProfile) {
      toast({
        description: "Login Successfully",
      });
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

  const [updateProfile] = useUpdateProfileMutation();
  const [addUserAddress] = useAddUserAddressMutation();

  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [birthday, setBirthday] = useState<string>("");
  const [newAddress, setNewAddress] = useState<string>("");
  const [gender, setGender] = useState<string>("");
  const [phoneNo, setPhoneNo] = useState<string>("");


  useEffect(() => {
    if (userProfile) {
      setName(userProfile.data.name);
      setEmail(userProfile.data.email);
      setBirthday(userProfile.data.dob);
      setGender(userProfile.data.gender);
      setPhoneNo(userProfile.data.phoneNo);

    }
  }, [userProfile]);

  const handleUpdateProfile = async () => {
    const updateData = { name, email, dob: birthday };

    try {
      await updateProfile(updateData).unwrap();
      toast({
        title: "Success",
        description: "Profile updated successfully!",
      });
      refetch();
    } catch (err) {
      console.error("Error during profile update:", err);
      toast({
        title: "Error",
        description: "Failed to update profile.",
        variant: "destructive",
      });
    }
  };

  const handleAddAddress = async () => {
    try {
      await addUserAddress({ address: newAddress }).unwrap();
      toast({
        title: "Success",
        description: "Address added successfully.",
      });
      setNewAddress("");
      refetch();
    } catch (err) {
      console.error("Error adding address:", err);
      toast({
        title: "Error",
        description: "Failed to add address.",
        variant: "destructive",
      });
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-[80vh]">
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-[80vh]">
        Error fetching profile data
      </div>
    );
  }

  return (
    <div className="w-full py-10 flex flex-col gap-8 px-5">
      <BreadCrumb />
      <div className=" flex items-center gap-5 flex-col md:flex-row">
      <div className="relative">
      <div className="relative  bg-slate-300 rounded-full flex -z-1 justify-center items-center w-[120px] h-[120px] overflow-hidden">
  <Image
    src={userProfile?.data?.imageUrl ? `http://97.74.89.204/${userProfile?.data?.imageUrl}` : "/Images/profileImg.png"} 
    width={100}
    height={100}
    alt="User Profile"
    className="w-full h-full"
  />
 
</div>
<div className="absolute bottom-0 right-0 bg-black rounded-full p-1 z-100 flex items-center justify-center">
    <Camera className="text-white " />
  </div>
      </div>

        <h3 className="font-semibold text-center md:text-left">{name}</h3>
      </div>

      <div className="flex flex-col gap-4">
        <h1 className="font-bold text-2xl sm:text-3xl">Account</h1>

        <div className="flex justify-between items-center px-3 border-b-[1px] border-solid border-black pb-3 pt-4 sm:pt-6">
          <div className="flex w-full flex-col sm:flex-row">
            <h3 className="font-semibold text-base sm:text-lg mr-2">Name:</h3>
            <input
              type="text"
              value={name}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setName(e.target.value)
              }
              className="border-b-2 border-transparent focus:border-primary focus:outline-none flex-grow w-full"
            />
          </div>
          <button
            onClick={handleUpdateProfile}
            className="mt-3 sm:mt-0 sm:ml-3 text-primary font-semibold text-sm sm:text-base"
          >
            Save
          </button>
        </div>

        {/* Additional sections (Email, Address Accordion, Birthday, etc.) follow the same structure */}
        <Accordion
          type="single"
          collapsible
          className="border-b-[1px] border-solid border-black"
        >
          <AccordionItem value="item-1" className="px-3">
            <AccordionTrigger className="text-base sm:text-lg">
              Address
            </AccordionTrigger>
            <AccordionContent>
              <div className="flex flex-col gap-4">
                {userProfile?.data?.addresses?.length ? (
                  userProfile.data.addresses.map((address) => (
                    <div
                      key={address.id}
                      className="flex justify-between items-center py-3 bg-slate-100 px-3 rounded-lg w-full"
                    >
                      <h3 className="font-normal text-sm sm:text-base">
                        {address.address}
                      </h3>
                      <p className="text-primary font-semibold text-sm sm:text-base cursor-pointer">
                        Edit
                      </p>
                    </div>
                  ))
                ) : (
                  <div className="py-3 bg-slate-100 px-3 rounded-lg w-full">
                    <h3 className="font-normal text-sm sm:text-base">
                      No addresses added yet.
                    </h3>
                  </div>
                )}
                <Dialog>
                  <DialogTrigger className="mt-4 px-4 py-2 bg-primary text-white rounded-lg">
                    Add
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogDescription className="py-10">
                        <input
                          type="text"
                          value={newAddress}
                          onChange={(e: ChangeEvent<HTMLInputElement>) =>
                            setNewAddress(e.target.value)
                          }
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
        <div className="flex justify-between items-center px-3 border-b-[1px] border-solid border-black pb-3 pt-4 sm:pt-6">
          <div className="flex w-full flex-col sm:flex-row">
            <h3 className="font-semibold text-base sm:text-lg mr-2">Email:</h3>
            <input
              type="text"
              value={email}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setName(e.target.value)
              }
              className="border-b-2 border-transparent focus:border-primary focus:outline-none flex-grow w-full"
            />
          </div>
          {/* <button
            onClick={handleUpdateProfile}
            className="mt-3 sm:mt-0 sm:ml-3 text-primary font-semibold text-sm sm:text-base"
          >
            Change
          </button> */}
        </div>
        <div className="flex justify-between items-center px-3 border-b-[1px] border-solid border-black pb-3 pt-4 sm:pt-6">
  <div className="flex w-full flex-col sm:flex-row">
    <h3 className="font-semibold text-base sm:text-lg mr-2">Dob:</h3>
    <input
      type="text"
      value={birthday}
      onChange={(e: ChangeEvent<HTMLInputElement>) =>
        setDob(e.target.value)
      }
      className="border-b-2 border-transparent focus:border-primary focus:outline-none flex-grow w-full"
    />
  </div>
  {/* <button
    onClick={handleUpdateProfile}
    className="mt-3 sm:mt-0 sm:ml-3 text-primary font-semibold text-sm sm:text-base"
  >
    Change
  </button> */}
</div>
<div className="flex justify-between items-center px-3 border-b-[1px] border-solid border-black pb-3 pt-4 sm:pt-6">
  <div className="flex w-full flex-col sm:flex-row">
    <h3 className="font-semibold text-base sm:text-lg mr-2">Gender:</h3>
    <input
      type="text"
      value={gender}
      onChange={(e: ChangeEvent<HTMLInputElement>) =>
        setDob(e.target.value)
      }
      className="border-b-2 border-transparent focus:border-primary focus:outline-none flex-grow w-full"
    />
  </div>
  {/* <button
    onClick={handleUpdateProfile}
    className="mt-3 sm:mt-0 sm:ml-3 text-primary font-semibold text-sm sm:text-base"
  >
    Change
  </button> */}
</div>
<div className="flex justify-between items-center px-3 border-b-[1px] border-solid border-black pb-3 pt-4 sm:pt-6">
  <div className="flex w-full flex-col sm:flex-row">
    <h3 className="font-semibold text-base sm:text-lg">Phone No:</h3>
    <input
      type="text"
      value={phoneNo}
      onChange={(e: ChangeEvent<HTMLInputElement>) =>
        setDob(e.target.value)
      }
      className="border-b-2 border-transparent focus:border-primary focus:outline-none flex-grow w-full"
    />
  </div>
  {/* <button
    onClick={handleUpdateProfile}
    className="mt-3 sm:mt-0 sm:ml-3 text-primary font-semibold text-sm sm:text-base"
  >
    Change
  </button> */}
</div>
      </div>
    </div>
  );
};

export default withAuth(Page);
