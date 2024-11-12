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

const ChangePassword = () => {
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
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
      
      // Reset form and close dialog
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

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className="px-4 py-2 rounded-lg bg-gray hover:bg-primary hover:text-white border-solid-1px border flex justify-center">
        Change Password
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-2xl text-center">Change Password</DialogTitle>
          <DialogDescription>
            <div className="space-y-3">
              <div>
                <label className="font-semibold text-lg" htmlFor="oldpassword">
                  Enter Old Password
                </label>
                <input
                  type="password"
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                  className="w-full bg-gray px-2 py-2 text-lg border border-solid-1px"
                  placeholder="Enter your old password"
                />
              </div>
              <div>
                <label className="font-semibold text-lg" htmlFor="newpassword">
                  Enter New Password
                </label>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full bg-gray px-2 py-2 text-lg border border-solid-1px"
                  placeholder="Enter your new password"
                />
              </div>
              <div>
                <label className="font-semibold text-lg" htmlFor="confirmpassword">
                  Confirm Password
                </label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full bg-gray px-2 py-2 text-lg border border-solid-1px"
                  placeholder="Confirm password"
                />
              </div>
              <div>
                <button
                  className="w-full py-2 text-lg rounded-lg text-primary bg-gray hover:bg-primary hover:text-white border-solid-1px border flex justify-center"
                  onClick={handleSubmit}
                  disabled={isLoading}
                >
                  {isLoading ? "Updating..." : "Update"}
                </button>
              </div>
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default ChangePassword;
