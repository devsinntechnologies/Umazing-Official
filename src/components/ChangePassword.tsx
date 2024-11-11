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
import toast, { Toaster } from "react-hot-toast";
import { useChangePasswordMutation } from "@/hooks/UseAuth"; // Correct import path for your hook

const ChangePassword = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [changePassword, { isLoading }] = useChangePasswordMutation(); // Destructure loading state

  const handleValidation = () => {
    if (!oldPassword) {
      toast.error("Old password is required");
      return false;
    }
    if (!newPassword) {
      toast.error("New password is required");
      return false;
    }
    if (!confirmPassword) {
      toast.error("Please confirm your new password");
      return false;
    }
    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match");
      return false;
    }
    return true;
  };

  const handleSubmit = async () => {
    if (handleValidation()) {
      try {
        // Call changePassword API with the old and new passwords
        await changePassword({ oldPassword, newPassword }).unwrap();

        // Show success message and reset form fields
        toast.success("Password updated successfully");
        setOldPassword("");
        setNewPassword("");
        setConfirmPassword("");
      } catch (error) {
        // Handle API error
        toast.error("Failed to update password. Please try again.");
        console.error("Password update error:", error);
      }
    }
  };

  return (
    <div>
      <Toaster position="top-center" reverseOrder={false} />
      <Dialog>
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
    </div>
  );
};

export default ChangePassword;
