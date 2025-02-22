import Link from "next/link";
import Logo from "./logo";
import { getPayload } from "payload";
import config from "@payload-config";
import Navigation from "@/components/navigation";
import MobileNavigation from "@/components/mobile-navigation";

export default async function Header() {
  const payload = await getPayload({ config });
  const navigationData = await payload.findGlobal({ slug: "header" });

  return (
    <header className="py-4 sm:py-5 flex items-center justify-between container">
      <Link href="/">
        <Logo className="h-auto w-[6.5rem] sm:w-[7.5rem]" />
      </Link>
      <Navigation data={navigationData} />
      <MobileNavigation data={navigationData} />
    </header>
  );
}
