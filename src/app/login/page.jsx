import Link from "next/link";
import Image from "next/image";
import { MdOutlineEmail } from "react-icons/md";
import { FaRegEye } from "react-icons/fa";
import { FaGoogle } from "react-icons/fa";
function login() {
  return (
    <>
      <div className="w-[95vw] flex flex-col justify-center  p-5 gap-7 shadow-2xl rounded-lg my-5 mx-auto md:w-[70vw] md:mt-20 lg:w-[55vw] xl:w-[40vw] xl:mt-5 sm:p-12 sm:w-[70vw]">
        <div className="flex flex-col justify-center items-center gap-2">
          <Link href="/">
            <Image
              className=" w-full   	"
              width={246}
              height={246}
              src={"/Images/logo.webp"}
            ></Image>
          </Link>
          <p className="text-center">Login with your email & password</p>
        </div>
        <div className="flex flex-col gap-5">
          <label className="text-sm font-semibold" for="email">
            Email
          </label>

          <div className="join_icon relative flex justify-between items-center gap-2">
            <input
              className="w-full p-3 border-[1px] border-solid border-slate-400 rounded-lg pr-12 focus:outline-none "
              type="email"
              id="email"
            ></input>
            <MdOutlineEmail class="absolute right-4 top-4 cursor-pointer" />{" "}
          </div>
          <div className="flex justify-between items-center gap-3 ">
            <label className="text-sm font-semibold" for="password">
              Password
            </label>
            <p className="text-green-700 text-xs font-medium cursor-pointer">
              Forgot password?
            </p>
          </div>
          <div className="join_icon relative flex justify-between items-center gap-2">
            <input
              className="w-full p-3 border-[1px] border-solid border-slate-400 rounded-lg pr-12 focus:outline-none "
              type="password"
              id="password"
            ></input>
            <FaRegEye class=" absolute right-4 top-4 cursor-pointer" />
          </div>
          <button className="py-[10px] px-4 text-base bg-green-600  text-white rounded-lg sm:text-xl">
            Login
          </button>
        </div>
        <div className="hr flex justify-center items-center">
          <p>Or</p>
        </div>
        <div className=" text-white rounded-lg flex flex-col justify-between  gap-5 sm:text-xl">
          <button className="py-[10px] px-4 text-base bg-blue-600  text-white rounded-lg sm:text-xl">
            Login with Google
          </button>
          <button className="py-[10px] px-4 text-base bg-slate-500  text-white rounded-lg sm:text-xl">
            Login with Mobile number
          </button>
        </div>
        <p className="text-center">Or</p>
        <div className="register flex justify-center gap-5">
          <p>Don't have any account? </p>
          <button className="underline text-green-600 font-semibold hover:no-underline">
            <Link href="/signup">Sign Up</Link>
          </button>
        </div>
      </div>
    </>
  );
}

export default login;
