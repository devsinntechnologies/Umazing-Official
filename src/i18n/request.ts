import { getRequestConfig } from "next-intl/server";
import { cookies } from "next/headers";

export default getRequestConfig(async () => {
  // Access cookies using the `cookies` helper
  const cookieStore = await cookies();
  const locale = cookieStore.get("NEXT_LOCALE")?.value || "en"; // Default to "en" if no locale is set

  console.log("Locale detected:", locale);

  return {
    locale,
    messages: (await import(`../locales/${locale}.json`)).default,
  };
});
