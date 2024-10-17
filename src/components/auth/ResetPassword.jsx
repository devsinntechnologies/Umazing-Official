import { useState } from "react";

import axios from "axios";
// import ecobazaar from "../../app/images/ecobazaar.jpg";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import Logo from "../layout/Logo";

function ResetPassword() {
  const [otp, setOtp] = useState(""); // Capture OTP input
  const [password, setPassword] = useState(""); // Capture password input
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [isOtpVerified, setIsOtpVerified] = useState(false); // State to track OTP verification

  const handleOTPChange = (e, index) => {
    const otpArray = [...otp];
    otpArray[index] = e.target.value;
    setOtp(otpArray.join(""));
  };

  const verifyOtp = async () => {
    try {
      const response = await axios.post("http://localhost:5000/auth/checkOtp", {
        otp, // Ensure the OTP is correctly passed in the body
      });

      if (response.data.valid) {
        // Check if the response indicates a valid OTP
        setIsOtpVerified(true); // Mark OTP as verified
        setError(null);
        setSuccess("OTP verified successfully.");
      } else {
        setError("Invalid OTP. Please try again.");
        setSuccess(null);
      }
    } catch (err) {
      console.error("Error during OTP verification:", err);
      setError("An error occurred while verifying the OTP. Please try again.");
      setSuccess(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isOtpVerified) {
      setError("Please verify the OTP first.");
      return;
    }
    try {
      const response = await axios.post(
        "http://97.74.89.204:4000/auth/reset-password",
        {
          otp,
          password,
        }
      );
      if (response.data.success) {
        // Check if the password reset was successful
        setSuccess("Password has been reset successfully.");
        setError(null);
      } else {
        setError("Failed to reset the password. Please try again.");
        setSuccess(null);
      }
    } catch (err) {
      setError("Failed to reset the password. Please try again.");
      setSuccess(null);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div>Submit</div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="flex flex-col gap-3 justify-between items-center mb-4">
            <Logo />
            <DialogTitle>Reset Password</DialogTitle>
          </div>
        </DialogHeader>
        <div className="w-full flex justify-center items-center flex-col gap-3">
          <InputOTP maxLength={6} pattern={REGEXP_ONLY_DIGITS_AND_CHARS}>
            <InputOTPGroup>
              {[0, 1, 2, 3].map((index) => (
                <InputOTPSlot
                  key={index}
                  index={index}
                  className="w-[65px]"
                  onChange={(e) => handleOTPChange(e, index)} // Update OTP
                />
              ))}
            </InputOTPGroup>
          </InputOTP>

          <button
            type="button"
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 text-sm sm:text-base"
            onClick={verifyOtp} // Verify OTP before allowing password reset
          >
            Verify OTP
          </button>

          <input
            type="password"
            placeholder="Enter New Password"
            className="w-full border border-gray-300 p-2 rounded-md"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            disabled={!isOtpVerified} // Disable password input until OTP is verified
          />

          {error && <div className="text-red-500 text-sm">{error}</div>}
          {success && <div className="text-green-500 text-sm">{success}</div>}

          <button
            type="submit"
            className="w-full bg-primary text-white py-2 rounded-md hover:bg-primary text-sm sm:text-base"
            onClick={handleSubmit}
            disabled={!isOtpVerified} // Disable submit button until OTP is verified
          >
            Submit
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default ResetPassword;
