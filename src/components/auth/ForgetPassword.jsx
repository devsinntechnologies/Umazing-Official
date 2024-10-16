import { FaEnvelope } from "react-icons/fa";
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
  const [successMessage, setSuccessMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your form submission logic here
    setSuccessMessage("A reset link has been sent to your email.");
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
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex items-center space-x-2">
            <FaEnvelope className="text-gray-500" />
            <input
              type="email"
              placeholder="Enter Your Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 border border-gray-300 px-3 py-2 rounded-md"
              required
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded-md"
          >
            Submit
          </button>
        </form>
        {successMessage && <p className="text-green-500">{successMessage}</p>}
      </DialogContent>
    </Dialog>
  );
}

export default ForgetPassword;
