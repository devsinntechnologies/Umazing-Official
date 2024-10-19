import React, { useState } from "react";
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
import ResetPassword from "@/components/auth/ResetPassword";
import Logo from "../layout/Logo";
import { ArrowLeftIcon } from "lucide-react";

const AuthDialog = ({ isOpen: externalIsOpen, setIsOpen: externalSetIsOpen, useTrigger = true }) => {
  // If external control is provided, use it; otherwise, use internal state.
  const [internalIsOpen, setInternalIsOpen] = useState(false);
  const [currentView, setCurrentView] = useState("login");
  const [resetEmail, setResetEmail] = useState("");

  const isOpen = externalIsOpen !== undefined ? externalIsOpen : internalIsOpen;
  const setIsOpen = externalSetIsOpen || setInternalIsOpen;

  // Handle dialog open/close change
  const handleDialogOpenChange = (open) => {
    setIsOpen(open); // This will work whether controlled externally or internally
    if (!open) {
      setCurrentView("login"); // Reset view to "login" when dialog is closed
    }
  };

  const handleSignup = (formData) => {
    console.log("Signup Data:", formData);
    setCurrentView("login");
  };

  const handleForgetPassword = (email) => {
    setCurrentView("resetPassword");
    setResetEmail(email);
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleDialogOpenChange} className="relative">
      {useTrigger && ( // Render the button trigger only when using internally (like in navbar)
        <DialogTrigger asChild>
          <button
            onClick={() => setIsOpen(true)}  // Open the dialog via button click
            className="bg-primary px-4 py-2 rounded-full text-white text-sm md:text-base"
          >
            Login
          </button>
        </DialogTrigger>
      )}

      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>
            <div className="flex justify-center items-center mb-4">
              <Logo />
            </div>
            <h2 className="text-lg font-bold text-center">
              {currentView === "login" && "Login with your email & password"}
              {currentView === "signup" && "Create a new account"}
              {currentView === "forgetPassword" && "Enter Your Email"}
              {currentView === "resetPassword" && "Reset Your Password"}
            </h2>
          </DialogTitle>
        </DialogHeader>

        {/* Back button logic */}
        {(currentView === "forgetPassword" || currentView === "signup" || currentView === "resetPassword") && (
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
            onLoginSuccess={() => setIsOpen(false)} // Close dialog on login success
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

        {currentView === "resetPassword" && (
          <ResetPassword
            onBack={() => setCurrentView("login")}
            onResetSuccess={() => setIsOpen(false)}
            email={resetEmail}
          />
        )}
      </DialogContent>
    </Dialog>
  );
};

export default AuthDialog;
