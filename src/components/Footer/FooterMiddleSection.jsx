import Image from "next/image";
import Logo from "../layout/Logo";
import Link from "next/link";

const FooterMiddleSection = () => {
  return (
    <div className="w-full py-8">
      <div className="w-full grid grid-cols-1 md:grid-cols-5 gap-6">
        {/* Left Section - Brand Info */}
        <div className="col-span-1 md:col-span-2 w-full sapce-y-4">

          <div className="flex items-center  mb-4 ">
            <Logo />
          </div>
          <p className="text-sm text-gray-500 mb-4">
            Morbi cursus porttitor enim lobortis molestie. Duis gravida turpis
            dui, eget bibendum magna congue nec.
          </p>

          <div className="flex space-x-4">
            <a
              href="tel:+923154031364"
              className="font-semibold border-b-2 border-primary "
            >
              +923154031364
            </a>
          </div>
          <div className="flex space-x-4">
            <a
              href="mailto:umazingofficial@gmail.com"
              className="font-semibold border-b-2 border-primary pt-2"
            >
              umazingofficial@gmail.com
            </a>
          </div>
        </div>

        {/* Center Sections - Links */}
        <div className="col-span-1 md:col-span-1 w-full space-y-2">
          <h3 className="font-semibold text-gray-800 mb-5">My Account</h3>
          <ul className="text-gray-600 flex flex-col gap-4">
            <Link href="/seller">
              <li className="hover:text-primary">Sell</li>
            </Link>
            <Link href="/profile">
              <li className="hover:text-primary">Account</li>
            </Link>
            <Link href="/wishlist">
              <li className="hover:text-primary">Wishlist</li>
            </Link>
          </ul>
        </div>
        <div className="col-span-1 md:col-span-1 w-full space-y-2">
          <h3 className="font-semibold text-gray-800 mb-5">Helps</h3>
          <ul className="text-gray-600 flex flex-col gap-4">
            <Link href="/contact-us">
              <li className="hover:text-primary">Contact</li>
            </Link>
            <li className="hover:text-primary">FAQs</li>
            <li className="hover:text-primary">Terms & Condition</li>
            <li className="hover:text-primary">Privacy Policy</li>
          </ul>
        </div>

        {/* Right Section - Download Mobile App */}
        <div className="col-span-1 md:col-span-1 flex w-full flex-col space-y-4">
          <h3 className="font-semibold text-gray-800">Download Mobile App</h3>
          <div className="flex">
            <a href="#" className="flex gap-2">
              <Image src='/images/playStore.png' width={80} alt="" height={20} />
              <Image src='/images/appStore.png' width={80} alt="" height={20} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FooterMiddleSection;
