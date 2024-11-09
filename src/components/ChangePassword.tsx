import React, { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

const ChangePassword = () => {
  const [oldPassword, setOldPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [errors, setErrors] = useState({})

  const validateForm = () => {
    const errors = {}
    if (!oldPassword) {
      errors.oldPassword = "Old password is required"
    }
    if (!newPassword) {
      errors.newPassword = "New password is required"
    } else if (newPassword.length < 8) {
      errors.newPassword = "New password must be at least 8 characters"
    }
    if (!confirmPassword) {
      errors.confirmPassword = "Please confirm your new password"
    } else if (newPassword !== confirmPassword) {
      errors.confirmPassword = "Passwords do not match"
    }
    setErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handleUpdate = () => {
    if (validateForm()) {
      // Handle the password update logic here (e.g., API call)
      console.log("Password updated successfully")
    }
  }

  return (
    <div>
      <Dialog>
        <DialogTrigger className="px-4 py-2 bg-gray hover:bg-primary hover:text-white border-solid-1px border flex justify-center">
          Change Password
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-2xl text-center">Change Password</DialogTitle>
            <DialogDescription>
              <div className="space-y-3">
                <div>
                  <label className="font-semibold text-lg" htmlFor="oldpassword">Enter Old Password</label>
                  <input
                    type="password"
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                    className="w-full bg-gray px-2 py-2 border border-solid-1px"
                    placeholder="Enter your old password"
                  />
                  {errors.oldPassword && <p className="text-red-500 text-sm">{errors.oldPassword}</p>}
                </div>
                <div>
                  <label className="font-semibold text-lg" htmlFor="newpassword">Enter New Password</label>
                  <input
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="w-full bg-gray px-2 py-2 border border-solid-1px"
                    placeholder="Enter your new password"
                  />
                  {errors.newPassword && <p className="text-red-500 text-sm">{errors.newPassword}</p>}
                </div>
                <div>
                  <label className="font-semibold text-lg" htmlFor="confirmpassword">Confirm Password</label>
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full bg-gray px-2 py-2 border border-solid-1px"
                    placeholder="Confirm password"
                  />
                  {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword}</p>}
                </div>
                <div>
                  <button
                    onClick={handleUpdate}
                    className="w-full py-2 text-lg rounded-lg text-primary bg-gray hover:bg-primary hover:text-white border-solid-1px border flex justify-center"
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
  )
}

export default ChangePassword
