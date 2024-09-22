
import Link from "next/link";



function Register() {
  return (
    <>

      <div className="w-[95vw] flex flex-col justify-center  p-5 gap-7 shadow-2xl rounded-lg my-5 mx-auto md:w-[70vw] md:mt-20 lg:w-[55vw] sm:p-12 xl:w-[40vw] xl:mt-5 ">
        <div className="flex flex-col justify-center items-center gap-2">
          <Link href="/">
            {" "}
            <img src="https://pickbazar-react.vercel.app/_next/image?url=https%3A%2F%2Fpickbazarlaravel.s3.ap-southeast-1.amazonaws.com%2F2295%2FLogo-new.png&w=1920&q=75"></img>
          </Link>
          <p className="text-center">Register new account</p>
        </div>
        <div className="flex flex-col gap-5">
          <label className="text-sm font-semibold" for="name">
            Name
          </label>
          <div className="join_icon relative">
            <input
              className="w-full p-3 border-[1px] border-solid border-slate-400 rounded-lg pr-12  focus:outline-none"
              type="text"
              id="name"
            ></input>
            <i class="fa-regular fa-user absolute right-4 top-4 cursor-pointer"></i>
          </div>
          <label className="text-sm font-semibold" for="email">
            Email
          </label>
          <div className="join_icon relative">
            <input
              className="w-full p-3 border-[1px] border-solid border-slate-400 rounded-lg pr-12  focus:outline-none"
              type="email"
              id="email"
            ></input>
            <i class="fa-regular fa-envelope absolute right-4 top-4 cursor-pointer"></i>
          </div>
          <label className="text-sm font-semibold" for="password">
            Password
          </label>
          <div className="join_icon relative">
            <input
              className="w-full p-3 border-[1px] border-solid border-slate-400 rounded-lg pr-12  focus:outline-none"
              type="password"
              id="password"
            ></input>
            <i class="fa-regular fa-eye absolute right-4 top-4 cursor-pointer"></i>
          </div>
          <button className="py-2 px-4 text-xl bg-green-600  text-white rounded-lg">
            {" "}
            Register
          </button>
        </div>
        <p className="text-center">Or</p>
        <div className="register flex justify-center gap-5">
          <p>Already have an account?</p>
          <button className="underline text-green-600 font-semibold hover:no-underline">
            <Link href="/login">Login</Link>
          </button>
        </div>
      </div>
    </>
  );
}

export default Register;
