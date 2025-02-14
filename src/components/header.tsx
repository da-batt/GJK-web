import Link from "next/link";
import Logo from "./logo";
import { getPayload } from "payload";
import config from "@payload-config";
import Navigation from "./navigation";

export default async function Header() {
  const payload = await getPayload({ config });
  const navigationData = await payload.findGlobal({ slug: "header" });

  return (
    <header className="py-5 flex items-center justify-between container">
      <Link href="/">
        <Logo className="h-auto w-[140px]" />
      </Link>
      <Navigation data={navigationData} />
    </header>
  );
}
