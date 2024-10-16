import React, { useState } from "react";
// import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import ForgetPassword from "@/components/auth/ForgetPassword";
import Signup from "@/components/auth/Signup";
import Login from "@/components/auth/Login";
import Logo from "../layout/Logo";
import { ArrowLeftIcon } from "lucide-react";

const AuthDialog = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentView, setCurrentView] = useState("login"); // Tracks the current view

  const handleSignup = (formData) => {
    console.log("Signup Data:", formData);
    setCurrentView("login");
  };

  const handleForgetPassword = (email) => {
    console.log("Forget Password Data:", email);
    setCurrentView("login");
  };

  const handleDialogOpenChange = (open) => {
    setIsOpen(open);
    if (!open) {
      // Reset to login when the dialog is closed
      setCurrentView("login");
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleDialogOpenChange} className="relative">
      <DialogTrigger asChild>
        <button onClick={() => setIsOpen(true)} className="text-destructive text-xs md:text-sm">
          Login
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>
            <div className="flex justify-center items-center mb-4">
              <Logo />
            </div>
            <h2 className="text-lg font-bold text-center">
              {currentView === "login" && "Login with your email & password"}
              {currentView === "signup" && "Create a new account"}
              {currentView === "forgetPassword" && "Reset Your Password"}
            </h2>
          </DialogTitle>
        </DialogHeader>

        {(currentView === "forgetPassword" || currentView === "signup") && (
          <button
            onClick={() => setCurrentView("login")}
            className="absolute top-2 left-2 size-10 p-2 text-primary shadow-md rounded-full flex items-center justify-center"
          >
           <ArrowLeftIcon size={20} />
          </button>
        )}

        {currentView === "login" && (
          <Login
            onForgetPassword={() => setCurrentView("forgetPassword")}
            onSignup={() => setCurrentView("signup")}
          />
        )}

        {currentView === "signup" && (
          <Signup
            onBack={() => setCurrentView("login")}
            onSignupSuccess={handleSignup}
          />
        )}

        {currentView === "forgetPassword" && (
          <ForgetPassword
            onBack={() => setCurrentView("login")}
            onSubmitSuccess={handleForgetPassword}
          />
        )}
      </DialogContent>
    </Dialog>
  );
};

export default AuthDialog;
