import { useState } from "react";
import { Mail } from "lucide-react";

import axios from "axios";
// import ecobazaar from "../../app/images/ecobazaar.jpg";
import Image from "next/image";
import ResetPassword from "./ResetPassword";
import Logo from "../layout/Logo";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

function ForgetPassword() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://97.74.89.204:4000/auth/forgot-password",
        {
          email,
        }
      );
      setSuccess("Password reset link sent to your email.");
      setError(null);
    } catch (err) {
      setError("Failed to send reset link. Please try again.");
      setSuccess(null);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div>Forget Password</div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="flex flex-col gap-3 justify-between items-center mb-4">
            <Logo />
            <DialogTitle>Forget Password</DialogTitle>
          </div>
        </DialogHeader>
        <form
          onSubmit={handleSubmit}
          className="flex items-center space-x-2 flex-col gap-4 relative"
        >
          <div className="w-full flex items-center border border-gray-300 p-2 rounded-md">
            <Mail className="text-gray-500 mr-2" />
            <input
              type="email"
              className="w-full focus:outline-none text-sm sm:text-base"
              placeholder="Enter your Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {error && <div className="text-red-500 text-sm">{error}</div>}
          {success && <div className="text-primary text-sm">{success}</div>}

          <button
            type="submit"
            className="w-full bg-primary text-white py-2 rounded-md hover:primary text-sm sm:text-base"
          >
            <ResetPassword />
          </button>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default ForgetPassword;
