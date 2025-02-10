import Link from "next/link";
import { ChevronDown } from "lucide-react";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuTrigger,
} from "@radix-ui/react-navigation-menu";
import Image from "next/image";
import logo from "~/logo.svg";

export default function Header() {
  return (
    <header className="py-5 flex items-center justify-between container">
      <Link href="/">
        <Image
          src={logo}
          alt="Gymnázium Jana Keplera"
          className="h-auto w-[140px]"
        />
      </Link>
      <NavigationMenu className="hidden lg:flex items-center gap-8 list-none">
        {sitemap.map((nav) => {
          if (nav.children) {
            return (
              <NavigationMenuItem
                key={nav.name}
                className="font-medium tracking-wider"
              >
                <NavigationMenuTrigger className="inline-flex items-center gap-1">
                  {navlink(nav)}
                  <ChevronDown className="h-[1.2rem]" />
                </NavigationMenuTrigger>
              </NavigationMenuItem>
            );
          } else {
            return (
              <NavigationMenuItem
                key={nav.name}
                className="font-medium tracking-wider"
              >
                {navlink(nav)}
              </NavigationMenuItem>
            );
          }
        })}
      </NavigationMenu>
    </header>
  );
}

const navlink = (nav: NavLink) =>
  nav.href ? (
    <NavigationMenuLink asChild>
      <Link href={nav.href}>{nav.name}</Link>
    </NavigationMenuLink>
  ) : (
    nav.name
  );

type NavLink = {
  name: string;
  href?: string;
  children?: NavLink[];
};

const sitemap: NavLink[] = [
  {
    name: "O škole",
    children: [],
  },
  {
    name: "Pro studenty",
    children: [],
  },
  {
    name: "Pro uchazeče",
    children: [],
  },
  {
    name: "Galerie",
    href: "/galerie",
  },
  {
    name: "Aktuality",
    href: "/aktuality",
  },
];
