import { FaEnvelope } from "react-icons/fa";
import ecobazaar from "../../app/images/ecobazaar.jpg";
import Image from "next/image";

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
          <div className="flex flex-col gap-3 justify-between items-center mb-4">
            <Image src={ecobazaar} width={150} alt="EcoBazaar Logo" />
            <DialogTitle>Forget Password</DialogTitle>
          </div>
        </DialogHeader>
        <div className="flex items-center space-x-2 flex-col gap-4">
          <div className="w-full flex items-center border border-gray-300 p-2 rounded-md">
            <FaEnvelope className="text-gray-500 mr-2" />
            <input
              type="email"
              className="w-full focus:outline-none text-sm sm:text-base"
              placeholder="Enter your email"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600 text-sm sm:text-base"
          >
            Login
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
export default ForgetPassword;
