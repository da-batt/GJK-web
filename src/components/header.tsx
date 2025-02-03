import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
} from "@radix-ui/react-navigation-menu";

export default function Header() {
  return (
    <header className="py-6 flex items-center justify-between">
      <Link href="/">
        <img
          src="/logo.svg"
          alt="Gymnázium Jana Keplera"
          className="h-auto w-[150px]"
        />
      </Link>
      <NavigationMenu className="hidden lg:flex items-center gap-8 list-none">
        <NavigationMenuItem>O škole</NavigationMenuItem>
        <NavigationMenuItem>Pro studenty</NavigationMenuItem>
        <NavigationMenuItem>Pro uchazeče</NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink asChild>
            <Link href="/galerie">Galerie</Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink asChild>
            <Link href="/aktuality">Aktuality</Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenu>
    </header>
  );
}
