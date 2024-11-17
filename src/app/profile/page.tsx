//@ts-nocheck
"use client";
import React, { useState, useEffect, ChangeEvent, useRef } from "react";
import { Camera, Plus, X } from "lucide-react";
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
  useDeleteAddressByIdMutation,
} from "@/hooks/UseAuth";
import { useSelector } from "react-redux";
import { useToast } from "@/hooks/use-toast";
import withAuth from "@/components/hoc/withAuth";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { RootState } from "@/store/store";
import LoadingSpinner from "@/components/loadingSpinner/LoadingSpinner";
import AddAddressDialog from "@/components/AddAddressDialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import ChangePassword from "../../components/profile/ChangePassword";

interface Address {
  id: string;
  address: string;
  phoneNo: string;
}

interface UserProfileData {
  id: string;
  name: string;
  email: string;
  dob: string;
  imageUrl: string;
  gender: string;
  phoneNo: string;
  addresses: Address[];
}

const Page: React.FC = () => {
  const isLoggedIn = useSelector((state: RootState) => state.authSlice.isLoggedIn);
  const userId = useSelector((state: RootState) => state.authSlice.user?.id);
  const [triggerFetch, setTriggerFetch] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editField, setEditField] = useState("");
  const [formData, setFormData] = useState<UserProfileData | null>(null);
  const [hasChanges, setHasChanges] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { toast } = useToast();
  const {
    data: userProfile,
    error,
    isLoading,
    refetch,
  } = useGetUserProfileQuery(userId, {
    skip: !triggerFetch,
  });

  const [updateProfile] = useUpdateProfileMutation();
  const [addAddress, { isLoading: addingAddress }] = useAddUserAddressMutation();
  const [deleteAddress] = useDeleteAddressByIdMutation();

  useEffect(() => {
    if (userId && isLoggedIn) {
      setTriggerFetch(true);
    }
  }, [userId, isLoggedIn]);

  useEffect(() => {
    if (userProfile?.data) {
      setFormData(userProfile.data);
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

  const handleEditClick = (field: string) => {
    setEditField(field);
  };

  const handleFieldChange = (e: ChangeEvent<HTMLInputElement>, field: keyof UserProfileData) => {
    if (formData) {
      const updatedFormData = { ...formData, [field]: e.target.value };
      setFormData(updatedFormData);
      setHasChanges(true);
    }
  };

  const handleSave = async () => {
    if (!hasChanges || !formData) {
      setEditField("");
      return;
    }

    try {
      const response = await updateProfile(formData).unwrap();
      if (response?.success) {
        toast({
          title: "Profile Updated",
          description: "Your profile has been updated successfully.",
        });
        refetch();
        setHasChanges(false);
      }
    } catch (updateError) {
      console.error("Error updating profile:", updateError);
      toast({
        title: "Error",
        description: "Failed to update profile. Please try again.",
        variant: "destructive",
      });
    } finally {
      setEditField("");
    }
  };

  const handleAddAddress = async (streetAddress: string, phone: string) => {
    try {
      await addAddress({
        address: streetAddress,
        phoneNo: phone,
        UserId: userId,
      });
      toast({
        title: "Address Added",
        description: "Your new address has been added successfully!",
      });
      refetch();
      setIsDialogOpen(false);
    } catch (error) {
      toast({
        title: "Error Adding Address",
        description: "There was an issue adding your address. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleDeleteAddress = async (addressId: string) => {
    try {
      await deleteAddress(addressId);
      toast({
        title: "Address Deleted",
        description: "The address has been deleted successfully.",
      });
      refetch();
    } catch (error) {
      toast({
        title: "Error Deleting Address",
        description: "There was an issue deleting your address. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleImageUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('image', file);
    // formData.append('UserId', userId as string);

    try {
      const response = await updateProfile(formData).unwrap();
      if (response?.success) {
        toast({
          title: "Profile Picture Updated",
          description: "Your profile picture has been updated successfully.",
        });
        refetch();
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update profile picture. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <div className="w-full flex flex-col gap-8 px-5">
          <BreadCrumb />
          <div className="flex items-center gap-5 flex-col md:flex-row">
            <div className="relative">
              <div className="relative bg-slate-300 rounded-full flex justify-center items-center w-[120px] h-[120px] overflow-hidden">
                <Image
                  src={formData?.imageUrl ? `http://97.74.89.204/${formData.imageUrl}` : "/Images/profileImg.png"}
                  width={100}
                  height={100}
                  alt="User Profile"
                  className="w-full h-full"
                />
              </div>
              <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                accept="image/*"
                onChange={handleImageUpload}
              />
              <div 
                className="absolute bottom-0 right-0 bg-black rounded-full p-1 flex items-center justify-center cursor-pointer"
                onClick={handleImageClick}
              >
                <Camera className="text-white" />
              </div>
            </div>
            <h3 className="font-semibold text-2xl">{userProfile?.data.name}</h3>
          </div>

          <div className="flex flex-col gap-4">
            <h1 className="font-bold text-2xl sm:text-3xl">Account</h1>
            {["name", "dob", "gender", "phoneNo"].map((field) => (
              <div key={field} className={`${editField === field && "border-b-primary"} flex justify-between items-center border-b pb-3 pt-4 sm:pt-6`} >
                <div className="flex w-full flex-col sm:flex-row">
                  <h3 className="font-semibold text-base sm:text-lg mr-2 capitalize">{field}:</h3>
                  {editField === field ? (
                    <input
                      type="text"
                      value={formData?.[field]}
                      onChange={(e) => handleFieldChange(e, field)}
                      className="border-b-2 border-transparent focus:outline-none flex-grow"
                    />
                  ) : (
                    <p>{formData?.[field]}</p>
                  )}
                </div>
                {editField === field ? (
                  <button onClick={handleSave} className="text-primary font-semibold">
                    Save
                  </button>
                ) : (
                  <button onClick={() => handleEditClick(field)} className="text-primary font-semibold">
                    Edit
                  </button>
                )}
              </div>
            ))}
          </div>

          <Accordion type="single" collapsible>
            <AccordionItem value="item-1">
              <AccordionTrigger>Address</AccordionTrigger>
              <AccordionContent>
                <div className="flex flex-col gap-4">
                  <div className="w-full flex justify-end mb-4">
                    <Button 
                      onClick={() => setIsDialogOpen(true)}
                      className="bg-primary hover:bg-primary/90"
                    >
                      <Plus className="mr-2" /> Add New Address
                    </Button>
                  </div>
                  
                  {formData?.addresses?.length ? (
                    formData.addresses.map((addr) => (
                      <div key={addr.id} className="flex justify-between items-center py-3 px-3 rounded-lg shadow-md border w-full">
                        <div className="flex flex-col gap-3">
                        <p>{addr.address}</p>
                        <p>{addr.phoneNo}</p>
                        </div>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <X className="text-destructive cursor-pointer" />
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>This action cannot be undone.</AlertDialogTitle>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction className="bg-destructive text-white" onClick={() => handleDeleteAddress(addr.id)}>
                                Delete
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-8">
                      <p className="text-gray-500 mb-4">No address found.</p>
                      <Button 
                        onClick={() => setIsDialogOpen(true)}
                        className="bg-primary hover:bg-primary/90"
                      >
                        <Plus /> Add Your First Address
                      </Button>
                    </div>
                  )}
                  
                  <AddAddressDialog
                    onSubmit={handleAddAddress}
                    isOpen={isDialogOpen}
                    onClose={() => setIsDialogOpen(false)}
                    isLoading={addingAddress}
                  />
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
         <div className="flex justify-between mb-4">
         <div className="flex">
                  <h3 className="font-semibold text-base sm:text-lg mr-2 capitalize">Password:</h3>
                    <p>.........</p>
                
                </div>
          <ChangePassword/>
         </div>
        </div>
      )}
    </>
  );
};

export default withAuth(Page);
