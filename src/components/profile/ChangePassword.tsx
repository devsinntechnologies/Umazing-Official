// @ts-nocheck
"use client";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useChangePasswordMutation } from "@/hooks/UseAuth";
import { useToast } from "@/hooks/use-toast";
import { EyeIcon, EyeOffIcon, LockKeyhole } from "lucide-react";

const ChangePassword = () => {
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [changePassword, { isLoading }] = useChangePasswordMutation();

  const handleValidation = () => {
    if (!oldPassword) {
      toast({
        title: "Validation Error",
        description: "Please enter your old password",
        variant: "destructive",
      });
      return false;
    }
    if (!newPassword) {
      toast({
        title: "Validation Error",
        description: "New password is required",
        variant: "destructive",
      });
      return false;
    }
    if (!confirmPassword) {
      toast({
        title: "Validation Error",
        description: "Please confirm your new password",
        variant: "destructive",
      });
      return false;
    }
    if (newPassword !== confirmPassword) {
      toast({
        title: "Validation Error",
        description: "Passwords do not match",
        variant: "destructive",
      });
      return false;
    }
    return true;
  };

  const handleSubmit = async () => {
    if (!handleValidation()) return;

    try {
      await changePassword({ oldPassword, newPassword }).unwrap();

      toast({
        title: "Success",
        description: "Password updated successfully",
        variant: "default",
      });

      setOldPassword("");
      setNewPassword("");
      setConfirmPassword("");
      setOpen(false);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update password. Please try again.",
        variant: "destructive",
      });
      console.error("Password update error:", error);
    }
  };

  const renderPasswordInput = (label, value, setValue, showPassword, setShowPassword) => (
    <div>
      <label className="font-semibold text-lg">{label}</label>
      <div className="relative w-full flex items-center border border-gray-300 p-2 rounded-md">
        <LockKeyhole className="text-gray-500 mr-2" />
        <input
          type={showPassword ? "text" : "password"}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder={label}
          className="w-full focus:outline-none"
        />
        {value && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute inset-y-0 right-3 flex items-center justify-center text-gray-600"
          >
            {showPassword ? <EyeIcon /> : <EyeOffIcon />}
          </button>
        )}
      </div>
    </div>
  );

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-primary hover:text-white border border-solid flex justify-center">
        Change Password
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-2xl text-center">Change Password</DialogTitle>
          <DialogDescription>
            <div className="space-y-4">
              {renderPasswordInput("Enter Old Password", oldPassword, setOldPassword, showOldPassword, setShowOldPassword)}
              {renderPasswordInput("Enter New Password", newPassword, setNewPassword, showNewPassword, setShowNewPassword)}
              {renderPasswordInput("Confirm Password", confirmPassword, setConfirmPassword, showConfirmPassword, setShowConfirmPassword)}
              <button
                className="w-full py-2 text-lg rounded-lg bg-primary text-white hover:bg-primary-dark border-solid border"
                onClick={handleSubmit}
                disabled={isLoading}
              >
                {isLoading ? "Updating..." : "Update"}
              </button>
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default ChangePassword;
