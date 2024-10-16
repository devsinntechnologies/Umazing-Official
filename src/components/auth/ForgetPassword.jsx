import { useState } from "react";
import { FaEnvelope } from "react-icons/fa";
import axios from "axios";
import ecobazaar from "../../app/images/ecobazaar.jpg";
import Image from "next/image";
import { useState } from "react";
import ResetPassword from "./ResetPassword";
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
          <DialogTitle>Forget Password</DialogTitle>
        </DialogHeader>
        <div className="flex items-center space-x-2 flex-col gap-4 relative">
          <div className="w-full flex items-center border border-gray-300 p-2 rounded-md">
            <FaEnvelope className="text-gray-500 mr-2" />
            <input
              type="email"
              className="w-full focus:outline-none text-sm sm:text-base"
              placeholder="Enter your Email"
              // value={password}
              required
            />
          </div>

          <div className="text-right w-[98%] cursor-pointer"></div>

          <button
            type="submit"
            className="w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600 text-sm sm:text-base "
          >
            Submit
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default ForgetPassword;
