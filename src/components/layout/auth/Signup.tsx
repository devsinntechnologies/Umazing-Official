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
import PhoneInputWithCountry from "react-phone-number-input";
import "react-phone-number-input/style.css";
import PhoneInput from "@/components/PhoneInput";

interface SignupProps {
  onBack: () => void;
  onSignupSuccess?: (data: any) => void; // Define the type according to your data structure
}

const Signup: React.FC<SignupProps> = ({ onBack, onSignupSuccess }) => {
  const [signupData, { isSuccess, error, data: responseData, isLoading }] =
    useSignupMutation();
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [phoneNo, setPhoneNo] = useState<string | undefined>();
  const [gender, setGender] = useState<"male" | "female">("male");
  const [dob, setDob] = useState<Date | null>(null);
  const { toast } = useToast();
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);

  useEffect(() => {
    if (isLoading) {
      toast({
        title: "Signing up...",
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
        onBack();
        onSignupSuccess?.(responseData);
      } else {
        toast({
          title: "Registration Failed",
          description: responseData?.message || "Something went wrong.",
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
    if (!name.trim()) {
      toast({ description: "Name is required.", variant: "destructive" });
      return false;
    }
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast({ description: "Enter a valid email address.", variant: "destructive" });
      return false;
    }
    if (!password || password.length < 6) {
      toast({
        description: "Password must be at least 6 characters long.",
        variant: "destructive",
      });
      return false;
    }
    if (password !== confirmPassword) {
      toast({ description: "Passwords do not match.", variant: "destructive" });
      return false;
    }
    if (!phoneNo) {
      toast({ description: "Phone number is required.", variant: "destructive" });
      return false;
    }
    if (!dob) {
      toast({ description: "Date of birth is required.", variant: "destructive" });
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

      <div className="relative flex items-center border border-gray-300 p-2 rounded-md">
        <LockKeyhole className="text-gray-500 mr-2" />
        <input
          type={showPassword ? "text" : "password"}
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full focus:outline-none"
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 text-gray-600"
        >
          {showPassword ? <EyeIcon /> : <EyeOffIcon />}
        </button>
      </div>

      <div className="relative flex items-center border border-gray-300 p-2 rounded-md">
        <LockKeyhole className="text-gray-500 mr-2" />
        <input
          type={showConfirmPassword ? "text" : "password"}
          placeholder="Confirm your password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="w-full focus:outline-none"
        />
        <button
          type="button"
          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
          className="absolute right-3 text-gray-600"
        >
          {showConfirmPassword ? <EyeIcon /> : <EyeOffIcon />}
        </button>
      </div>

      <PhoneInput value={phoneNo} onChange={setPhoneNo} />

      <div className="flex space-x-4">
        <label className="flex items-center">
          <input
            type="radio"
            name="gender"
            value="male"
            checked={gender === "male"}
            onChange={() => setGender("male")}
          />
          <span className="ml-2">Male</span>
        </label>
        <label className="flex items-center">
          <input
            type="radio"
            name="gender"
            value="female"
            checked={gender === "female"}
            onChange={() => setGender("female")}
          />
          <span className="ml-2">Female</span>
        </label>
      </div>

      <div>
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" className="w-full">
              <CalendarIcon className="mr-2" />
              {dob ? format(dob, "MMMM dd, yyyy") : "Select Date of Birth"}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="flex items-center justify-center">
            <Calendar
              mode="single"
              selected={dob}
              onSelect={(date) => setDob(date)}
              disabled={(date) =>
                date > new Date() || date < new Date("1900-01-01")
              }
            />
          </PopoverContent>
        </Popover>
      </div>

      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading ? "Signing up..." : "Sign Up"}
      </Button>
    </form>
  );
};

export default Signup;
