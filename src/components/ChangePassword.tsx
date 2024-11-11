import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import toast, { Toaster } from 'react-hot-toast';

const ChangePassword = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  let toastDisplayed = false; // Flag to track if a toast is shown

  const handleValidation = () => {
    let isValid = true;
  
    if (!oldPassword) {
      if (!toastDisplayed) {
        toast.error("Old password is required");
        toastDisplayed = true;
      }
      isValid = false;
    }
  
    if (!newPassword) {
      if (!toastDisplayed) {
        toast.error("New password is required");
        toastDisplayed = true;
      }
      isValid = false;
    }
  
    if (!confirmPassword) {
      if (!toastDisplayed) {
        toast.error("Please confirm your new password");
        toastDisplayed = true;
      }
      isValid = false;
    }
  
    if (newPassword && confirmPassword && newPassword !== confirmPassword) {
      if (!toastDisplayed) {
        toast.error("Passwords do not match");
        toastDisplayed = true;
      }
      isValid = false;
    }
  
    return isValid;
  };
  

  const handleSubmit = () => {
    if (handleValidation()) {
      // Handle password update logic here
      toast.success("Password updated successfully");
      console.log("Password updated successfully");
    }
  };

  return (
    <div>
      <Toaster position="top-center" reverseOrder={false} />
      <Dialog>
        <DialogTrigger className='px-4 py-2 rounded-lg bg-gray hover:bg-primary hover:text-white border-solid-1px border flex justify-center'>
          Change Password
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className='text-2xl text-center'>Change Password</DialogTitle>
            <DialogDescription>
              <div className='space-y-3'>
                <div>
                  <label className='font-semibold text-lg' htmlFor="oldpassword">
                    Enter Old Password
                  </label>
                  <input
                    type="password"
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                    className='w-full bg-gray px-2 py-2 border border-solid-1px'
                    placeholder='Enter your old password'
                  />
                </div>
                <div>
                  <label className='font-semibold text-lg' htmlFor="newpassword">
                    Enter New Password
                  </label>
                  <input
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className='w-full bg-gray px-2 py-2 border border-solid-1px'
                    placeholder='Enter your new password'
                  />
                </div>
                <div>
                  <label className='font-semibold text-lg' htmlFor="confirmpassword">
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className='w-full bg-gray px-2 py-2 border border-solid-1px'
                    placeholder='Confirm password'
                  />
                </div>
                <div>
                  <button
                    className='w-full py-2 text-lg rounded-lg text-primary bg-gray hover:bg-primary hover:text-white border-solid-1px border flex justify-center'
                    onClick={handleSubmit}
                  >
                    Update
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
