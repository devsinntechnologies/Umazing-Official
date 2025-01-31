//@ts-nocheck
"use client";
import React, { useState, useEffect, ChangeEvent, useRef } from "react";
import { Camera, CreditCard, Dot, MapPinned, Plus, X, PackageOpen, Loader2 } from "lucide-react";
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
import Link from "next/link";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
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
import ChangePassword from "@/components/profile/ChangePassword";
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"
import AddressManager from "@/components/profile/AddressManager";
import {useTranslations} from "next-intl"
import LanguageToggle from "@/components/LanguageToggle";

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
  const t = useTranslations();
  const isLoggedIn = useSelector((state: RootState) => state.authSlice.isLoggedIn);
  const userId = useSelector((state: RootState) => state.authSlice.user?.id);
  const [triggerFetch, setTriggerFetch] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editField, setEditField] = useState("");
  const [formData, setFormData] = useState<UserProfileData | null>(null);
  const [hasChanges, setHasChanges] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [isImageDialogOpen, setIsImageDialogOpen] = useState(false);
  const [isImageLoading, setIsImageLoading] = useState(true);

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
      if (field === 'phoneNo') {
        let value = e.target.value;
        // Remove the prefix and any non-digits
        value = value.replace('+92 ', '').replace(/\D/g, '');

        // Only update if remaining digits are 10 or less
        if (value.length <= 10) {
          const formattedValue = `+92 ${value}`;
          const updatedFormData = { ...formData, [field]: formattedValue };
          setFormData(updatedFormData);
          setHasChanges(true);
        }
        return;
      }

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

    const imageUrl = URL.createObjectURL(file);
    setPreviewImage(imageUrl);
    setIsImageDialogOpen(true);

    const formData = new FormData();
    formData.append('image', file);
    setFormData((prev) => ({ ...prev, image: formData }));
  };

  const handleUpdateProfilePicture = async () => {
    const imageFile = formData?.image?.get('image');
    if (!imageFile) return;

    const imageData = new FormData();
    imageData.append('image', imageFile);

    try {
      const response = await updateProfile(imageData).unwrap();
      if (response?.success) {
        toast({
          title: "Profile Picture Updated",
          description: "Your profile picture has been updated successfully.",
        });
        refetch();
        setIsImageDialogOpen(false);
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update profile picture. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleDateChange = (date: Date | undefined) => {
    if (date && formData) {
      const formattedDate = format(date, 'yyyy-MM-dd');
      const updatedFormData = { ...formData, dob: formattedDate };
      setFormData(updatedFormData);
      setHasChanges(true);
    }
  };

  return (
    <>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <div className="w-full flex flex-col sm:gap-8 gap-4 px-5 pb-4">
          <BreadCrumb />
          <div className="flex items-center items-left sm:justify-between gap-5 flex-col sm:flex-row">
            <div className="flex items-center gap-5 flex-col md:flex-row">
              <div className="relative">
                <div className="relative border shadow-md rounded-full flex justify-center items-center w-[100px] h-[100px] overflow-hidden">
                  {isImageLoading && (
                    <div className="absolute inset-0 flex justify-center items-center">
                      <Loader2 className="animate-spin text-primary" size={32} />
                    </div>
                  )}
                  <Image
                    src={formData?.imageUrl ? `http://97.74.89.204/${formData.imageUrl}` : "/Images/profileImg.png"}
                    width={100}
                    height={100}
                    alt="User Profile"
                    className={`w-full h-full rounded-full ${isImageLoading ? "invisible" : ""}`}
                    onLoad={() => setIsImageLoading(false)}
                    onError={(e) => {
                      e.currentTarget.src = "/Images/profileImg.png"; // Set to static image on error
                    }}
                  />
                  {isImageLoading && <div className="loader" />}
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
                  <Camera className="text-white size-4 md:size-5" />
                </div>
              </div>
              <div className="flex flex-col items-start">
                <h3 className="font-semibold text-2xl">{userProfile?.data.name}</h3>
                <p className="text-gray-600">{userProfile?.data.email}</p>
              </div>
            </div>
            <div className="flex gap-4 items-center">
            <LanguageToggle/>
              <Link href='/orders' className="text-primary font-semibold flex flex-col items-center">
                <div className="size-12 border border-primary rounded-full p-2 flex items-center justify-center">
                  <PackageOpen className="size-6 md:size-8" />
                </div>
                <p className="text-sm md:text-base">{t("orders")}</p>
              </Link>
              <button className="text-primary font-semibold flex flex-col items-center">
                <div className="size-12 border border-primary rounded-full p-2 flex items-center justify-center">
                  <CreditCard className="size-6 md:size-8" />
                </div>
                <p className="text-sm md:text-base">{t("paymentInfo")}</p>
              </button>
              <button className="text-primary font-semibold flex flex-col items-center">
                <div className="size-12 border border-primary rounded-full p-2 flex items-center justify-center">
                  <MapPinned className="size-6 md:size-8" />
                </div>
                <p className="text-sm md:text-base">{t("addresses")}</p>
              </button>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <h1 className="font-bold text-2xl sm:text-3xl ">{t("account")}</h1>
            {[t("names"), "dob", t("gender"), t("phone no")].map((field) => (
              <div key={field} className={`${editField === field && "border-b-primary"} flex justify-between items-center border-b py-2 sm:py-4`}>
                <div className="flex w-full flex-col sm:flex-row sm:items-center">
                  <h3 className="font-semibold text-base sm:text-lg mr-2 capitalize min-w-[120px]">
                    {field === 'dob' ? 'Date of Birth' : field}:
                  </h3>
                  {editField === field ? (
                    field === 'dob' ? (
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="ghost"
                            className="w-[240px] justify-start p-0 font-normal hover:bg-transparent"
                          >
                            {formData?.dob ? format(new Date(formData.dob), "PPP") : <span className="text-muted-foreground">Pick a date</span>}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={formData?.dob ? new Date(formData.dob) : undefined}
                            onSelect={handleDateChange}
                            initialFocus
                            disabled={(date) => date > new Date() || date < new Date("1900-01-01")}
                          />
                        </PopoverContent>
                      </Popover>
                    ) : field === 'phoneNo' ? (
                      <div className="relative flex-grow">
                        <span className="absolute text-gray-800"></span>
                        <input
                          type="tel"
                          value={formData?.[field]?.replace('+92 ', '') || ''}
                          onChange={(e) => handleFieldChange(e, field)}
                          maxLength={10}
                          className="pl-8 border-b-2 border-transparent focus:outline-none w-full"
                        />
                      </div>
                    ) : (
                      <input
                        type="text"
                        value={formData?.[field] || ''}
                        onChange={(e) => handleFieldChange(e, field)}
                        className="border-b-2 border-transparent focus:outline-none flex-grow"
                      />
                    )
                  ) : (
                    <p className="text-gray-600 flex-1">
                      {field === 'dob' && formData?.dob ? (
                        format(new Date(formData.dob), "PPP")
                      ) : field === 'phoneNo' ? (
                        <span>
                          <span className="text-gray-800">+92</span>
                          {' ' + formData?.[field]?.replace('+92 ', '')}
                        </span>
                      ) : (
                        formData?.[field] || 'Not set'
                      )}
                    </p>
                  )}
                </div>
                {editField === field ? (
                  <button onClick={handleSave} className="text-primary font-semibold whitespace-nowrap">
                    Save
                  </button>
                ) : (
                  <button onClick={() => handleEditClick(field)} className="text-primary font-semibold whitespace-nowrap">
                    Edit
                  </button>
                )}
              </div>
            ))}
            <div className="flex gap-3 items-center border-b py-2 sm:py-4">
              <h3 className="font-semibold text-base sm:text-lg mr-2  capitalize">{t("emails")}:</h3>
              <p className="flex items-center gap-0">
                {userProfile?.data.email}
              </p>
            </div>
          </div>


          <Accordion type="single" collapsible>
            <AccordionItem value="item-1">
              <AccordionTrigger className="font-semibold text-base sm:text-lg mr-2 capitalize">{t("addresses")}</AccordionTrigger>
              <AccordionContent>
                <div className="flex flex-col gap-4">
                  <div className="w-full flex justify-end mb-2">
                    <Button
                      onClick={() => setIsDialogOpen(true)}
                      className="bg-primary hover:bg-primary/90"
                    >
                      <Plus className="size-4 md:size-5" /> Add New Address
                    </Button>
                  </div>

                  {formData?.addresses?.length ? (
                    formData.addresses.map((addr) => (
                      <div key={addr.id} className="flex justify-between items-center py-3 px-3 rounded-lg shadow-md border w-full" onClick={() => console.log(addr.address)}>
                        <div className="flex flex-col gap-3">
                          <p>{addr.address}</p>
                          <p>{addr.phoneNo}</p>
                        </div>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <X className="text-destructive cursor-pointer size-4 md:size-5" />
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>This action cannot be undone.</AlertDialogTitle>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction className="bg-destructive text-white" onClick={() => handleDeleteAddress(addr.id)}>
                              {t("delete")}
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-8">
                      <p className="text-gray-500">No address found.</p>
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
          <div className="flex justify-between items-center pb-1 mb-2 border-b">
            <div className="flex">
              <h3 className="font-semibold text-base sm:text-lg mr-2 capitalize">{t("enterPassword")}:</h3>
              <p className="font-bold flex items-center gap-0">
                {Array.from({ length: 5 }).map((_, index) => (
                  <Dot className="size-4 md:size-5" key={index} />
                ))}
              </p>
            </div>
            <ChangePassword />
          </div>
          <Dialog open={isImageDialogOpen} onOpenChange={setIsImageDialogOpen}>
            <DialogContent>
              <DialogTitle>
                <h2 className="text-lg font-semibold">Update Profile Picture</h2>
              </DialogTitle>
              <div className="flex justify-center mb-4">
                <div className="border rounded-full overflow-hidden w-[150px] h-[150px]">
                  <Image
                    src={previewImage}
                    width={150}
                    height={150}
                    alt="Preview"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <button onClick={handleUpdateProfilePicture} className="bg-primary text-white rounded px-4 py-2">
                Update Profile Picture
              </button>
            </DialogContent>
          </Dialog>
        </div>
      )}
      {/* <AddressManager/> */}
    </>
  );
};

export default withAuth(Page);
