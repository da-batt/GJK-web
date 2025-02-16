"use client";
import { Header } from "@/payload-types";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@radix-ui/react-navigation-menu";
import { ChevronDown } from "lucide-react";
import React from "react";
import CMSLink from "@/components/cms-link";

interface NavigationProps {
  data: Header;
}
const Navigation: React.FC<NavigationProps> = ({ data }) => {
  return (
    <NavigationMenu className="hidden lg:block list-none">
      <NavigationMenuList className="flex items-center gap-8">
        {data.tabs &&
          data.tabs.map((tab) => {
            const tabLabel = tab.enableDirectLink
              ? tab.link && (
                  <NavigationMenuLink asChild>
                    <CMSLink label={tab.label} {...tab.link} />
                  </NavigationMenuLink>
                )
              : tab.label;

            if (tab.enableDropdown) {
              return (
                <NavigationMenuItem key={tab.id} className="relative">
                  <NavigationMenuTrigger className="inline-flex gap-1 font-medium items-center">
                    {tabLabel} <ChevronDown />
                  </NavigationMenuTrigger>
                  <NavigationMenuContent className="text-black z-10 absolute p-1 bg-white border-neutral-100 border rounded-lg left-[50%] -translate-x-[50%] mt-2 grid gap-1">
                    {tab.links &&
                      tab.links.map((link) => {
                        if (!link.link) return;
                        return (
                          <CMSLink
                            className="hover:bg-neutral-50 rounded-lg py-2 px-4 font-medium whitespace-nowrap"
                            key={link.id}
                            {...link.link}
                          />
                        );
                      })}
                  </NavigationMenuContent>
                </NavigationMenuItem>
              );
            } else {
              return (
                <NavigationMenuItem
                  key={tab.id}
                  className="relative font-medium"
                >
                  {tabLabel}
                </NavigationMenuItem>
              );
            }
          })}
      </NavigationMenuList>
    </NavigationMenu>
  );
};

export default Navigation;
