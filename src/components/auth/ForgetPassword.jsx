import { FaEnvelope } from "react-icons/fa";
import ecobazaar from "../../app/images/ecobazaar.jpg";
import Image from "next/image";
import ResetPassword from "./ResetPassword";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

function ForgetPassword() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div>Forget Password</div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Forget Password</DialogTitle>
        </DialogHeader>
        <div className="flex items-center space-x-2">
          <div className="grid flex-1 gap-2">
            <input type="email" placeholder="Enter Your Email" />
          </div>
          <button>Submit</button>
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded-md"
        >
          Submit
        </button>
      </div>
      {successMessage && <p className="text-green-500">{successMessage}</p>}
    </form>
  );
};

export default ForgetPassword;
