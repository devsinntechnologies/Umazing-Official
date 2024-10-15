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

import { REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp";

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";

function ResetPassword() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div>Submit</div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="flex flex-col gap-3 justify-between items-center mb-4">
            <Image src={ecobazaar} width={150} alt="EcoBazaar Logo" />
            <DialogTitle>Reset Password</DialogTitle>
          </div>
        </DialogHeader>
        <div className="w-full flex justify-center items-center flex-col gap-3">
          <InputOTP maxLength={6} pattern={REGEXP_ONLY_DIGITS_AND_CHARS}>
            <InputOTPGroup>
              <InputOTPSlot index={0} className="w-[65px]" />
              <InputOTPSlot index={1} className="w-[65px]" />
              <InputOTPSlot index={2} className="w-[65px]" />
              <InputOTPSlot index={3} className="w-[65px]" />
              <InputOTPSlot index={4} className="w-[65px]" />
              <InputOTPSlot index={5} className="w-[65px]" />
            </InputOTPGroup>
          </InputOTP>

          <button
            type="submit"
            className="w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600 text-sm sm:text-base"
          >
            Submit
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
export default ResetPassword;
