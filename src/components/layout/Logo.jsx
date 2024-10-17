import { Menu } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useSelector } from "react-redux";


const Logo = ()=>{
  //  const isLoggedIn = useSelector((state) => state.authSlice.isLoggedIn);
  return (
    <div className="flex items-center justify-between sm:w-52 h-auto gap-3 px-2">
    {/* {isLoggedIn && 
     <div
       className="size-12 flex items-center justify-center"
       onClick={toggleSidebar}
     >
       <Menu size={28} />
     </div>} */}
     <Link
       href="/"
       className="w-[40px] sm:w-[145px] items-baseline md:items-center justify-center flex "
     >
       <Image priority width={56} height={56} src={ "/icon.svg" } alt="Umazing" className="block sm:hidden" />
       <Image priority width={145} height={50} src={ "/logo.svg" } alt="Umazing" className="hidden sm:block" />
     </Link>
   </div>
  )
}
export default Logo