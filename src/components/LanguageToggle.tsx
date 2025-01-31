// @ts-nocheck
"use client";
const Cookies = require("js-cookie");
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import { Switch } from "@/components/ui/switch"; // Ensure the Switch component is set up correctly

const LanguageToggle: React.FC = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [locale, setLocale] = useState<string>("en");

  useEffect(() => {
    const savedLocale = Cookies.get("NEXT_LOCALE") || "en";
    setLocale(savedLocale);
  }, []);

  const toggleLanguage = () => {
    const newLocale = locale === "en" ? "ur" : "en";
    Cookies.set("NEXT_LOCALE", newLocale, { expires: 365 });
    setLocale(newLocale);
  
    const queryString = searchParams.toString();
    const newPath = queryString ? `${pathname}?${queryString}` : pathname;
    router.push(newPath, undefined, { scroll: false });
    window.location.reload();
  };

  return (
    <div className="flex items-center gap-2">
      <Switch
        checked={locale === "ur"}
        onCheckedChange={toggleLanguage}
      />
      <span className="text-sm font-medium text-gray-700 dark:text-gray-200">
        {locale === "en" ? "English" : "اردو"}
      </span>
    </div>
  );
};

export default LanguageToggle;
