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
import ResetPassword from "@/components/auth/ResetPassword"; // Import ResetPassword component
import Logo from "../layout/Logo";
import { ArrowLeftIcon } from "lucide-react";

const AuthDialog = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentView, setCurrentView] = useState("login"); // Tracks the current view

  const handleSignup = (formData) => {
    console.log("Signup Data:", formData);
    setCurrentView("login"); // Move back to login after successful signup
  };

  const handleForgetPassword = (email) => {
    setCurrentView("resetPassword"); // Move to reset password after successful password reset request
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
      <DialogTrigger asChild className="h-fit items-center">
        <button onClick={() => setIsOpen(true)} className="bg-primary px-4 py-2 rounded-full text-white text-sm md:text-base">
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
              {currentView === "forgetPassword" && "Enter Your Email"}
              {currentView === "resetPassword" && "Reset Your Password"}
            </h2>
          </DialogTitle>
        </DialogHeader>

        {/* Back Button Logic for Signup, Forget Password, and Reset Password views */}
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
            onBack={() => setCurrentView("login")} // Navigate back to login from signup
            onSignupSuccess={handleSignup} // On successful signup, go back to login
          />
        )}

        {currentView === "forgetPassword" && (
          <ForgetPassword
            onBack={() => setCurrentView("login")} // Navigate back to login from forget password
            onSubmitSuccess={handleForgetPassword} // On successful reset password request, go to reset password view
          />
        )}

        {currentView === "resetPassword" && (
          <ResetPassword
            onBack={() => setCurrentView("login")} // Navigate back to login from reset password
            onResetSuccess={() => setIsOpen(false)} // Close dialog on successful password reset
          />
        )}
      </DialogContent>
    </Dialog>
  );
};

export default AuthDialog;
