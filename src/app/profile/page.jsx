"use client"; // Add this line at the top

import React, { useState, useEffect } from "react";
import { Camera } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import BreadCrum from "@/components/BreadCrum";
import { useGetUserProfileQuery, useUpdateProfileMutation, useAddUserAddressMutation } from "@/hooks/UseAuth"; // Adjust the import path
import { useSelector } from "react-redux";
import { useToast } from "@/hooks/use-toast";

const Profile = () => {
  const isLoggedIn = useSelector((state) => state.authSlice.isLoggedIn);
  const userId = useSelector((state) => state.authSlice.user?.id);
  const [triggerFetch, setTriggerFetch] = useState(false);
  
  const { toast } = useToast(); // Initialize toast

  useEffect(() => {
    if (userId && isLoggedIn) {
      setTriggerFetch(true);
    }
  }, [userId, isLoggedIn]);

  // Fetch user profile data once userId is available
  const { data: userProfile, error, isLoading, refetch } = useGetUserProfileQuery(userId, {
    skip: !triggerFetch,  // Skip API call if triggerFetch is false
  });

  useEffect(() => {
    if (userProfile) {
      console.log("User Profile Data:", userProfile);
    }
    if (error) {
      console.error("Error fetching user profile:", error);
    }
  }, [userProfile, error]);
  
  const [updateProfile] = useUpdateProfileMutation();
  const [addUserAddress] = useAddUserAddressMutation();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [birthday, setBirthday] = useState("");
  const [newAddress, setNewAddress] = useState("");

  // Update state when userProfile data is fetched
  useEffect(() => {
    if (userProfile) {
      setName(userProfile.data.name);
      setEmail(userProfile.data.email);
      setBirthday(userProfile.data.dob);
    }
  }, [userProfile]);

  const handleUpdateProfile = () => {
    const updateData = { name, email, dob: birthday }; // Collecting the data to send
    
    console.log("Update data being sent:", updateData); // Log the data before sending

    toast.loading("Updating profile...");
    updateProfile(updateData)
      .unwrap()
      .then((response) => {
        console.log("API response:", response); // Log the API response
        toast.success("Profile updated successfully!");
        refetch(); // Optionally refetch user data after successful update
      })
      .catch((error) => {
        console.error("Error during profile update:", error); // Log any errors
        toast({
          title: "Error",
          description: "Failed to update profile. Please try again.",
          variant: "destructive",
        });
      });
  };

  const handleAddAddress = () => {
    console.log("New address being added:", newAddress); // Log the new address

    addUserAddress({ address: newAddress })
      .unwrap()
      .then((response) => {
        console.log("Add address API response:", response); // Log the API response
        toast.success("Address added successfully!");
        setNewAddress(""); // Clear the input field
        refetch(); // Optionally refetch user profile to get updated addresses
      })
      .catch((error) => {
        console.error("Error adding address:", error); // Log any errors
        toast({
          title: "Error",
          description: "Failed to add address. Please try again.",
          variant: "destructive",
        });
      });
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error fetching profile data</div>;

  return (
    <div className="w-full py-10 flex flex-col gap-8 px-5">
      <BreadCrum />
      <div className="flex items-center gap-5 flex-col md:flex-row">
        <div className="bg-slate-300 rounded-full flex justify-center items-center w-[120px] h-[120px] ">
          <Camera className="text-4xl" />
        </div>
        <h3 className="font-semibold text-center md:text-left">{name}</h3>
      </div>

      <div className="flex flex-col gap-4">
        <h1 className="font-bold text-2xl sm:text-3xl">Account</h1>

        {/* Name Section */}
        <div className="flex justify-between items-center px-3 border-b-[1px] border-solid border-black pb-3 pt-4 sm:pt-6">
          <div className="flex flex-col sm:flex-row">
            <h3 className="font-semibold text-base sm:text-lg">Name: &nbsp;</h3>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="text-base sm:text-lg border-b-2 border-transparent focus:border-primary focus:outline-none"
            />
          </div>
          <button onClick={handleUpdateProfile} className="text-primary font-semibold text-sm sm:text-base">
            Save
          </button>
        </div>

        {/* Email Section */}
        <div className="flex justify-between items-center px-3 border-b-[1px] border-solid border-black pb-3 pt-4 sm:pt-6">
          <div className="flex flex-col sm:flex-row">
            <h3 className="font-semibold text-base sm:text-lg">Email: &nbsp;</h3>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="text-base sm:text-lg border-b-2 border-transparent focus:border-primary focus:outline-none"
            />
          </div>
          <button onClick={handleUpdateProfile} className="text-primary font-semibold text-sm sm:text-base">
            Save
          </button>
        </div>

        {/* Accordion Section */}
        <Accordion type="single" collapsible className="border-b-[1px] border-solid border-black">
          <AccordionItem value="item-1" className="px-3">
            <AccordionTrigger className="text-base sm:text-lg">Address</AccordionTrigger>
            <AccordionContent>
              <div className="flex justify-between items-center flex-col gap-4">
                {userProfile?.data?.addresses?.length ? (
                  userProfile.data.addresses.map((address) => (
                    <div key={address.id} className="flex justify-between items-center py-3 sm:py-4 bg-slate-100 px-3 rounded-lg w-full">
                      <h3 className="font-normal text-sm sm:text-base">{address.address}</h3>
                      <p className="text-primary font-semibold text-sm sm:text-base cursor-pointer">Edit</p>
                    </div>
                  ))
                ) : (
                  <div className="flex justify-center items-center py-3 sm:py-4 bg-slate-100 px-3 rounded-lg w-full">
                    <h3 className="font-normal text-sm sm:text-base">No addresses added yet.</h3>
                  </div>
                )}
                <input
                  type="text"
                  value={newAddress}
                  onChange={(e) => setNewAddress(e.target.value)}
                  placeholder="Add a new address"
                  className="border-b-2 border-transparent focus:border-primary focus:outline-none w-full"
                />
                <button onClick={handleAddAddress} className="mt-4 sm:mt-6 px-4 py-2 sm:px-5 sm:py-3 bg-green-500 text-white rounded-lg hover:bg-green-600">
                  Add
                </button>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        {/* Birthday Section */}
        <div className="flex justify-between items-center px-3 border-b-[1px] border-solid border-black pb-3 pt-4 sm:pt-6">
          <div className="flex flex-col sm:flex-row">
            <h3 className="font-semibold text-base sm:text-lg">Birthday: &nbsp;</h3>
            <input
              type="date"
              value={birthday}
              onChange={(e) => setBirthday(e.target.value)}
              className="text-base sm:text-lg border-b-2 border-transparent focus:border-primary focus:outline-none"
            />
          </div>
          <button onClick={handleUpdateProfile} className="text-primary font-semibold text-sm sm:text-base">
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
