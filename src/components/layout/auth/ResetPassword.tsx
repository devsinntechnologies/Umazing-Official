// @ts-nocheck
"use client";
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { useCheckOtpMutation, useResetPasswordMutation, useForgotPasswordMutation } from "@/hooks/UseAuth";
import { CheckCircle, EyeOffIcon, EyeIcon, Loader, LockKeyhole } from "lucide-react";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";

interface ResetPasswordProps {
  onBack: () => void; // Function to call when navigating back
  email: string; // Email address used for sending OTP
}

const ResetPassword: React.FC<ResetPasswordProps> = ({ onBack, email }) => {
  const [checkOtp, { isLoading: otpLoading }] = useCheckOtpMutation();
  const [resetPassword, { isSuccess: isResetSuccess, error: resetError, isLoading: resetLoading, data: resetResponseData }] = useResetPasswordMutation();
  const [forgotPassword, { isLoading: forgotPasswordLoading }] = useForgotPasswordMutation(); // Forgot password API
  const [otp, setOtp] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const { toast } = useToast();
  const [isOtpVerified, setIsOtpVerified] = useState<boolean>(false);
  const [resendTimer, setResendTimer] = useState<number>(60); // Timer for resend OTP
  const [isResendDisabled, setIsResendDisabled] = useState<boolean>(false); // Disable resend button initially
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);

  // Timer logic for resend button
  useEffect(() => {
    let timer: NodeJS.Timeout | undefined;
    if (resendTimer > 0) {
      timer = setTimeout(() => setResendTimer((prev) => prev - 1), 1000);
    } else {
      setIsResendDisabled(false); // Enable resend button when timer ends
    }
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [resendTimer]);

  const handleOtpChange = (newValue: string) => {
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

  const handleResendOtp = () => {
    if (isResendDisabled) return;

    setIsResendDisabled(true);
    setResendTimer(120); // Reset the timer to 2 minutes for next resend

    forgotPassword({ email }) // Send email for OTP
      .then(response => {
        if (response?.data?.success) {
          toast({
            title: "OTP Sent",
            description: response.data.message || "A new OTP has been sent to your email.",
            duration: 2000,
          });
        } else {
          toast({
            title: "Error",
            description: "Failed to resend OTP. Please try again later.",
            variant: "destructive",
            duration: 2000,
          });
        }
      })
      .catch(() => {
        toast({
          title: "Error",
          description: "Error sending OTP. Please try again.",
          variant: "destructive",
          duration: 2000,
        });
      });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Validation checks
    if (!password || !confirmPassword) {
      toast({
        title: "Error",
        description: "Please fill in both password fields.",
        variant: "destructive",
        duration: 2000,
      });
      return;
    }

    if (password.length < 6) {
      toast({
        title: "Error",
        description: "Password must be at least 6 characters long.",
        variant: "destructive",
        duration: 2000,
      });
      return;
    }

    if (password !== confirmPassword) {
      toast({
        title: "Error",
        description: "Passwords do not match.",
        variant: "destructive",
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
          description: "Failed to reset password.",
          variant: "destructive",
          duration: 2000,
        });
      });
  };

  return (
    <div className="w-full flex flex-col gap-3">
      {/* OTP Input */}
      <div className="flex items-center justify-center">
        <InputOTP
          maxLength={4} // Limit OTP to 4 digits
          value={otp}
          onChange={handleOtpChange}
          disabled={isOtpVerified || otpLoading}
        >
          <InputOTPGroup className="gap-3">
            {Array.from({ length: 4 }, (_, index) => (
              <InputOTPSlot 
              className='border'
                key={index}
                index={index} 
                aria-label={`OTP slot ${index + 1}`}
              />
            ))}
          </InputOTPGroup>
        </InputOTP>
      </div>

      {/* Resend OTP button with timer */}
      {!isOtpVerified &&  <button
        type="button"
        className={`w-full ${isResendDisabled ? "bg-gray-200": "bg-primary text-white"} py-2 rounded-md`}
        onClick={handleResendOtp}
        disabled={isResendDisabled || forgotPasswordLoading} // Disable resend if on timer or loading
      >
        {forgotPasswordLoading ? <Loader className="animate-spin" size={16} /> : `Resend OTP (${resendTimer}s)`} 
      </button>}

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
            <CheckCircle className="mr-2" />
            <h3 className="text-sm">Verified</h3>
          </>
        ) : (
          "Verify OTP"
        )}
      </button>

      {/* Show password fields if OTP is verified */}
      {isOtpVerified && (
        <>
       <div className="relative w-full flex items-center border border-gray-300 p-2 rounded-md">
          <LockKeyhole className="text-gray-500 mr-2" />
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Enter new password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full focus:outline-none"
          />
          {/* Show/Hide Password Button */}
          {password && (
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="w-6 absolute inset-y-0 right-3 flex items-center justify-center text-gray-600"
            >
              {showPassword ? <EyeIcon /> : <EyeOffIcon />}
            </button>
          )}
        </div>

        <div className="relative w-full flex items-center border border-gray-300 p-2 rounded-md">
          <LockKeyhole className="text-gray-500 mr-2" />
          <input
            type={showConfirmPassword ? "text" : "password"}
            placeholder="Confirm your password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full focus:outline-none"
          />
          {/* Show/Hide Confirm Password Button */}
          {confirmPassword && (
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="w-6 absolute inset-y-0 right-3 flex items-center justify-center text-gray-600"
            >
              {showConfirmPassword ? <EyeIcon /> : <EyeOffIcon />}
            </button>
          )}
        </div>

        {/* Submit Reset Password */}
        <button
          type="submit"
          className={`w-full flex items-center justify-center bg-primary text-white py-2 rounded-md`}
          onClick={handleSubmit}
          disabled={resetLoading}
        >
          {resetLoading ? <Loader className="animate-spin" size={16} /> : "Reset Password"}
        </button>
        </>
      )}
      {/* Back button */}
      <button
        type="button"
        className="w-full py-2 border border-gray-300 rounded-md"
        onClick={onBack}
      >
        Back
      </button>
    </div>
  );
};

export default ResetPassword;
