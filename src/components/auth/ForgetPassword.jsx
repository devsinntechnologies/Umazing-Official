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
          <div className="flex flex-col gap-3 justify-between items-center mb-4">
            <Image src={ecobazaar} width={150} alt="EcoBazaar Logo" />
            <DialogTitle>Forget Password</DialogTitle>
          </div>
        </DialogHeader>
        <div className="flex items-center space-x-2">
          <div className="grid flex-1 gap-2">
            <input type="email" placeholder="Enter Your Email" />
          </div>
          <button>Submit</button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
export default ForgetPassword;
