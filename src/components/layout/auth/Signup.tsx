// @ts-nocheck
"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  CalendarIcon,
  EyeOffIcon,
  EyeIcon,
  MailIcon,
  LockKeyhole,
  User2,
  Phone,
} from "lucide-react";
import { format } from "date-fns";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { useToast } from "@/hooks/use-toast";
import { useSignupMutation } from "@/hooks/UseAuth";

interface SignupProps {
  onBack: () => void;
  onSignupSuccess?: (data: any) => void; // Define the type according to your data structure
}

const Signup: React.FC<SignupProps> = ({ onBack, onSignupSuccess }) => {
  const [signupData, { isSuccess, error, data: responseData, isLoading }] = useSignupMutation();
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>(""); // Added Confirm Password state
  const [phoneNo, setPhoneNo] = useState<string>("");
  const [gender, setGender] = useState<"male" | "female">("male");
  const [dob, setDob] = useState<Date | null>(null);
  const { toast } = useToast();
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhoneNumber = (phoneNo: string): boolean => {
    const phoneRegex = /^[0-9]+$/;
    return phoneRegex.test(phoneNo);
  };

  useEffect(() => {
    if (isLoading) {
      toast({
        title: "Signing up",
        description: "Please wait while we create your account.",
        duration: 2000,
      });
    } else if (isSuccess) {
      if (responseData?.success) {
        toast({
          title: "Registration Successful",
          description: "You can now log in.",
          duration: 2000,
        });
        onBack(); // Move to login
        onSignupSuccess?.(responseData); // Trigger parent callback with response data if needed
      } else {
        toast({
          title: "Registration Failed",
          description: responseData?.message || "Failed to register.",
          duration: 2000,
        });
      }
    } else if (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to register.",
        duration: 2000,
      });
    }
  }, [isSuccess, isLoading, error, responseData, toast, onBack, onSignupSuccess]);

  const validateForm = (): boolean => {
    if (!name) {
      toast({
        description: "Name is required.",
        variant: "destructive",
        duration: 2000,
      });
      return false;
    }
    if (!email) {
      toast({
        description: "Email is required.",
        variant: "destructive",
        duration: 2000,
      });
      return false;
    }
    if (!validateEmail(email)) {
      toast({
        description: "Please enter a valid email address.",
        variant: "destructive",
        duration: 2000,
      });
      return false;
    }
    if (!password) {
      toast({
        description: "Password is required.",
        variant: "destructive",
        duration: 2000,
      });
      return false;
    }
    if (password.length < 6) {
      toast({
        description: "Password must be at least 6 characters long.",
        variant: "destructive",
        duration: 2000,
      });
      return false;
    }
    if (password !== confirmPassword) {
      toast({
        description: "Passwords do not match.",
        variant: "destructive",
        duration: 2000,
      });
      return false;
    }
    if (!phoneNo) {
      toast({
        description: "Phone number is required.",
        variant: "destructive",
        duration: 2000,
      });
      return false;
    }
    if (!validatePhoneNumber(phoneNo)) {
      toast({
        description: "Phone number must contain only numbers.",
        variant: "destructive",
        duration: 2000,
      });
      return false;
    }
    if (!dob) {
      toast({
        description: "Date of birth is required.",
        variant: "destructive",
        duration: 2000,
      });
      return false;
    }
    return true;
  };

  const signup = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    const formData = {
      name,
      email,
      password,
      phoneNo,
      gender,
      dob: dob ? format(dob, "yyyy-MM-dd") : "",
    };

    signupData(formData);
  };

  return (
    <>
      <form className="space-y-4" onSubmit={signup}>
        <div className="flex items-center border border-gray-300 p-2 rounded-md">
          <User2 className="text-gray-500 mr-2" />
          <input
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full focus:outline-none"
          />
        </div>

        <div className="flex items-center border border-gray-300 p-2 rounded-md">
          <MailIcon className="text-gray-500 mr-2" />
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full focus:outline-none"
          />
        </div>
        
        <div className="relative w-full flex items-center border border-gray-300 p-2 rounded-md">
          <LockKeyhole className="text-gray-500 mr-2" />
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Enter your password"
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

        <div className="flex items-center border border-gray-300 p-2 rounded-md">
          <Phone className="text-gray-500 mr-2" />
          <input
            type="tel"
            placeholder="Enter your phone number"
            value={phoneNo}
            onChange={(e) => setPhoneNo(e.target.value)}
            className="w-full focus:outline-none"
          />
        </div>

        {/* Gender Selection */}
        <div className="flex space-x-4">
          <label className="flex items-center">
            <input
              type="radio"
              name="gender"
              value="male"
              checked={gender === "male"}
              onChange={(e) => setGender(e.target.value)}
            />
            <span className="ml-2">Male</span>
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              name="gender"
              value="female"
              checked={gender === "female"}
              onChange={(e) => setGender(e.target.value)}
            />
            <span className="ml-2">Female</span>
          </label>
        </div>

        {/* Date of Birth */}
        
        <div className="flex items-center">
  <Popover>
    <PopoverTrigger asChild>
      <Button variant="outline" className="w-full justify-start">
        <CalendarIcon className="mr-2 h-4 w-4" />
        {dob ? format(dob, "MMMM dd, yyyy") : "Select your date of birth"}
      </Button>
    </PopoverTrigger>
    <PopoverContent className="w-auto p-0">
      <Calendar
        onSelect={(date) => {
          setDob(date); // Set the selected date to dob
        }}
        selected={dob}
        className="w-full border-none"
        initialMonth={dob || new Date()} // Set initial month
      />
    </PopoverContent>
  </Popover>
</div>

        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? "Signing up..." : "Sign Up"}
        </Button>
      </form>
      <div className="text-center">
        <span className="text-sm">Already have an account?</span>
        <Button variant="link" onClick={onBack} className="text-sm">
          Log In
        </Button>
      </div>
    </>
  );
};

export default Signup;
