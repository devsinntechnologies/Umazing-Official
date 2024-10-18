"use client";

import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useCheckOtpMutation, useResetPasswordMutation } from "@/hooks/UseAuth";
import { CheckCircle, Loader } from "lucide-react";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";

function ResetPassword({ onBack }) {
  const [checkOtp, { isLoading: otpLoading }] = useCheckOtpMutation();
  const [resetPassword, { isSuccess: isResetSuccess, error: resetError, isLoading: resetLoading, data: resetResponseData }] = useResetPasswordMutation();
  const [otp, setOtp] = useState(""); // OTP as a single state
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { toast } = useToast(); // Initialize toast
  const [isOtpVerified, setIsOtpVerified] = useState(false);

  const handleOtpChange = (newValue) => {
    setOtp(newValue);
  };

  const verifyOtp = () => {
    if (otp.length === 4) {
      checkOtp({ otp }) // Send OTP for verification
        .then(response => {
          if (response?.data?.success) {
            setIsOtpVerified(true);
            toast({
              title: "OTP Verified",
              description: "You can now reset your password.",
              duration: 2000,
            });
          } else {
            setIsOtpVerified(false);
            toast({
              title: "Invalid OTP",
              description: "Please try again.",
              duration: 2000,
            });
          }
        })
        .catch(() => {
          toast({
            title: "Error",
            description: "Error during OTP verification. Please try again.",
            duration: 2000,
          });
        });
    } else {
      toast({
        title: "Error",
        description: "OTP must be 4 digits.",
        duration: 2000,
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation checks
    if (!password || !confirmPassword) {
      toast({
        title: "Error",
        description: "Please fill in both password fields.",
        variant: "destructive", // Show destructive toast
        duration: 2000,
      });
      return;
    }

    if (password.length < 6) {
      toast({
        title: "Error",
        description: "Password must be at least 6 characters long.",
        variant: "destructive", // Show destructive toast
        duration: 2000,
      });
      return;
    }

    if (password !== confirmPassword) {
      toast({
        title: "Error",
        description: "Passwords do not match.",
        variant: "destructive", // Show destructive toast
        duration: 2000,
      });
      return;
    }

    resetPassword({ otp, password }) // Send OTP and password to reset password
      .then(() => {
        if (isResetSuccess && resetResponseData?.success) {
          toast({
            title: "Success",
            description: resetResponseData.message,
            duration: 2000,
          });
          onBack(); // Move to login
        }
      })
      .catch(() => {
        toast({
          title: "Error",
          description: resetError?.message || "Failed to reset password.",
          variant: "destructive", // Show destructive toast
          duration: 2000,
        });
      });
  };

  return (
    <div className="w-full flex flex-col gap-3">
      {/* OTP Input using InputOTPControlled */}
     <div className="flex items-center justify-center">
     <InputOTP
        maxLength={4} // Limit OTP to 4 digits
        value={otp}
        onChange={handleOtpChange}
      >
        <InputOTPGroup>
          {Array.from({ length: 4 }, (_, index) => (
            <InputOTPSlot 
              key={index}
              index={index} 
              aria-label={`OTP slot ${index + 1}`} // Accessibility enhancement
            />
          ))}
        </InputOTPGroup>
      </InputOTP>
     </div>
     <button
  type="button"
  className="w-full bg-primary text-white py-2 rounded-md flex justify-center items-center"
  onClick={verifyOtp}
  disabled={otpLoading || isOtpVerified} // Disable while verifying OTP or if already verified
>
  {otpLoading ? (
    <Loader className="animate-spin" size={16} />
  ) : isOtpVerified ? (
    <>
      <CheckCircle className="mr-2" /> {/* Icon for verified status */}
      <h3 className="text-sm">Verified</h3> {/* Status text */}
    </>
  ) : (
    "Verify OTP" // Default text
  )}
</button>
      {/* Only show password fields if OTP is verified */}
      {isOtpVerified && (
        <>
          <input
            type="password"
            placeholder="Enter New Password"
            className="w-full border border-gray-300 p-2 rounded-md"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Confirm New Password"
            className="w-full border border-gray-300 p-2 rounded-md"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />

          <button
            type="submit"
            className="w-full bg-primary text-white py-2 rounded-md flex justify-center items-center"
            onClick={handleSubmit}
            disabled={resetLoading} // Disable button while loading
          >
            {resetLoading ? <Loader className="animate-spin" size={16} /> : "Submit"}
          </button>
        </>
      )}
    </div>
  );
}

export default ResetPassword;
