import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const ChangePassword = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});

  const handleValidation = () => {
    const newErrors = {};
    if (!oldPassword) newErrors.oldPassword = "Old password is required";
    if (!newPassword) newErrors.newPassword = "New password is required";
    if (!confirmPassword) newErrors.confirmPassword = "Please confirm your new password";
    if (newPassword && confirmPassword && newPassword !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (handleValidation()) {
      // Handle password update logic here
      console.log("Password updated successfully");
    }
  };

  return (
    <div>
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
                  {errors.oldPassword && <p className="text-red-500">{errors.oldPassword}</p>}
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
                  {errors.newPassword && <p className="text-red-500">{errors.newPassword}</p>}
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
                  {errors.confirmPassword && <p className="text-red-500">{errors.confirmPassword}</p>}
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
