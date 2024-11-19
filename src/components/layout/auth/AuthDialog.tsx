// @ts-nocheck
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import ForgetPassword from "@/components/layout/auth/ForgetPassword";
import Signup from "@/components/layout/auth/Signup";
import Login from "@/components/layout/auth/Login";
import ResetPassword from "@/components/layout/auth/ResetPassword";
import Logo from "../Logo";
import { ArrowLeftIcon } from "lucide-react";

interface AuthDialogProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  useTrigger?: boolean;
}

const AuthDialog: React.FC<AuthDialogProps> = ({
  isOpen: externalIsOpen,
  setIsOpen: externalSetIsOpen,
  useTrigger = true,
}) => {
  const [internalIsOpen, setInternalIsOpen] = useState(false);
  const [currentView, setCurrentView] = useState<"login" | "signup" | "forgetPassword" | "resetPassword">("login");
  const [resetEmail, setResetEmail] = useState<string>("");

  const isOpen = externalIsOpen !== undefined ? externalIsOpen : internalIsOpen;
  const setIsOpen = externalSetIsOpen || setInternalIsOpen;

  const handleDialogOpenChange = (open: boolean) => {
    setIsOpen(open);
    if (!open) {
      setCurrentView("login");
    }
  };

  const handleSignup = (formData: any) => {
    setCurrentView("login");
  };

  const handleForgetPassword = (email: string) => {
    setCurrentView("resetPassword");
    setResetEmail(email);
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleDialogOpenChange} className="relative">
      {useTrigger && (
        <DialogTrigger asChild>
          <button
            onClick={() => setIsOpen(true)}
            className="bg-primary px-6 py-1.5 rounded-full text-white text-sm md:text-base"
          >
            Login
          </button>
        </DialogTrigger>
      )}

      <DialogContent className="overflow-y-scroll sm:max-w-md">
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

        {(currentView === "forgetPassword" || currentView === "signup" || currentView === "resetPassword") && (
          <button
            onClick={() => setCurrentView("login")}
            className="absolute top-2 left-2 size-10 p-2 bg-primary text-white shadow-md rounded-full flex items-center justify-center"
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
