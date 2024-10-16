"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { CalendarIcon, EyeClosedIcon, EyeIcon, MailIcon, LockKeyhole, User2, Phone } from "lucide-react";
import { format } from "date-fns";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { useToast } from "@/hooks/use-toast";

const Signup = ({ onBack, onSignupSuccess }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [gender, setGender] = useState("male");
  const [dob, setDob] = useState(null);
  const { toast } = useToast();
  const [showPassword, setShowPassword] = useState(false);


  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhoneNumber = (phoneNo) => {
    const phoneRegex = /^[0-9]+$/;
    return phoneRegex.test(phoneNo);
  };

  const validateForm = () => {
    if (!name) {
      toast({
        // title: "Form Error",
        description: "Name is required.",
        variant: "destructive",
        duration: 2000,
      });
      return false;
    }
    if (!email) {
      toast({
        // title: "Form Error",
        description: "Email is required.",
        variant: "destructive",
        duration: 2000,
      });
      return false;
    }
    if (!validateEmail(email)) {
      toast({
        // title: "Form Error",
        description: "Please enter a valid email address.",
        variant: "destructive",
        duration: 2000,
      });
      return false;
    }
    if (!password) {
      toast({
        // title: "Form Error",
        description: "Password is required.",
        variant: "destructive",
        duration: 2000,
      });
      return false;
    }
    if (password.length < 6) {
      toast({
        // title: "Form Error",
        description: "Password must be at least 6 characters long.",
        variant: "destructive",
        duration: 2000,
      });
      return false;
    }
    if (!phoneNo) {
      toast({
        // title: "Form Error",
        description: "Phone number is required.",
        variant: "destructive",
        duration: 2000,
      });
      return false;
    }
    if (!validatePhoneNumber(phoneNo)) {
      toast({
        // title: "Form Error",
        description: "Phone number must contain only numbers.",
        variant: "destructive",
        duration: 2000,
      });
      return false;
    }
    if (!dob) {
      toast({
        // title: "Form Error",
        description: "Date of birth is required.",
        variant: "destructive",
        duration: 2000,
      });
      return false;
    }
    return true;
  };

  const signup = (e) => {
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

    console.log("Signup Form Data:", formData);
    onSignupSuccess(formData); // Trigger parent callback with form data
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
              // aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? <EyeIcon /> : <EyeClosedIcon />}
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
              <Button variant={"outline"} className="w-full justify-start">
                <CalendarIcon className="mr-2 h-4 w-4" />
                {dob ? format(dob, "PPP") : "Pick a date"}
              </Button>
            </PopoverTrigger>
            <PopoverContent align="start">
              <Calendar
                mode="single"
                selected={dob}
                onSelect={setDob}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>

        <button
          type="submit"
          className="w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600"
        >
          Register
        </button>
      </form>
    </>
  );
};

export default Signup;
