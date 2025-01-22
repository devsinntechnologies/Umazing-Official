import Image from "next/image";
import Logo from "../Logo";
import Link from "next/link";
import {useTranslations} from "next-intl"

const FooterMiddleSection = () => {
  const t = useTranslations();

  return (
    <div className="w-full py-8">
      <div className="w-full grid grid-cols-1 md:grid-cols-5 gap-6">
        {/* Left Section - Brand Info */}
        <div className="col-span-1 md:col-span-2 w-full sm:sapce-y-4 sapce-y-2">

          <div className="flex items-center  sm:mb-4 mb-2 ">
            <Logo />
          </div>
          <p className="text-sm text-gray-500 mb-4">
          Umazing is renowned online fashion platform of Pakistan that solely offers style products for women, men and kids.
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
        <div className="col-span-1 md:col-span-1 flex sm:hidden w-full flex-col sm:space-y-4 space-y-2">
          <h3 className="font-semibold text-gray-800">Download Mobile App</h3>
          <div className="flex">
            <a href="#" className="flex gap-2">
              <Image src='/Images/playStore.png' width={80} alt="" height={20} />
              <Image src='/Images/appStore.png' width={80} alt="" height={20} />
            </a>
          </div>
        </div>

        {/* Center Sections - Links */}
        <div className="col-span-1 md:col-span-1 w-full sm:space-y-2 space-y-1">
          <h3 className="font-semibold text-gray-800 sm:mb-5 mb-3">My Account</h3>
          <ul className="text-gray-600 flex flex-col gap-4">
            <Link href="/seller">
              <li className="hover:text-primary">{t("sell")}</li>
            </Link>
            <Link href="/profile">
              <li className="hover:text-primary">{t("account")}</li>
            </Link>
            <Link href="/wishlist">
              <li className="hover:text-primary">{t("wishList")}</li>
            </Link>
          </ul>
        </div>
        <div className="col-span-1 md:col-span-1 w-full sm:space-y-2 space-y-1">
          <h3 className="font-semibold text-gray-800 sm:mb-5 mb-3">{t("helps")}</h3>
          <ul className="text-gray-600 flex flex-col gap-4">
            <Link href="/contact-us">
              <li className="hover:text-primary">{t("contact")}</li>
            </Link>
           <Link href="/faqs"> <li className="hover:text-primary">FAQs</li></Link>
           <Link href="/termsAndConditions"> <li className="hover:text-primary">Terms & Condition</li></Link>
           <Link href="/privacyPolicy"> <li className="hover:text-primary">Privacy Policy</li></Link>
          </ul>
        </div>

        {/* Right Section - Download Mobile App */}
        <div className="col-span-1 md:col-span-1 sm:flex hidden w-full flex-col sm:space-y-4 space-y-2">
          <h3 className="font-semibold text-gray-800">Download Mobile App</h3>
          <div className="flex">
            <a href="#" className="flex gap-2">
              <Image src='/Images/playStore.png' width={80} alt="" height={20} />
              <Image src='/Images/appStore.png' width={80} alt="" height={20} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FooterMiddleSection;
