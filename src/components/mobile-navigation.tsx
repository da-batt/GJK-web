"use client";

import { Header } from "@/payload-types";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
} from "@radix-ui/react-dialog";
import { ArrowLeftIcon, ArrowRightIcon, MenuIcon, XIcon } from "lucide-react";
import React, { useState } from "react";
import CMSLink, { LinkField } from "./cms-link";

interface MobileNavigationProps {
  data: Header;
}

const MobileNavigation: React.FC<MobileNavigationProps> = ({ data }) => {
  const [open, setOpen] = useState(false);
  const [activeTabIndex, setActiveTabIndex] = useState<number | null>(null);
  const closeModal = () => {
    setActiveTabIndex(null);
    setOpen(false);
  };

  return (
    <Dialog open={open}>
      <DialogTrigger
        onClick={() => setOpen(true)}
        className="lg:hidden mr-2 hover:cursor-pointer"
      >
        <MenuIcon />
      </DialogTrigger>
      <DialogPortal>
        <DialogOverlay className="fixed inset-0 bg-black/20">
          <DialogTitle></DialogTitle>
          <DialogContent className="bg-white w-80 h-full absolute right-0">
            <div className="py-5 mr-1 flex justify-end px-4 border-b border-neutral-100">
              <DialogClose
                className="hover:cursor-pointer"
                onClick={() => {
                  setActiveTabIndex(null);
                  setOpen(false);
                }}
              >
                <XIcon />
              </DialogClose>
            </div>
            {activeTabIndex == null ? (
              <MainNavItems
                tabs={data.tabs}
                setActiveTab={setActiveTabIndex}
                setOpen={setOpen}
              />
            ) : (
              <SubNavItems
                links={data.tabs[activeTabIndex]?.links || []}
                onBackClicked={() => setActiveTabIndex(null)}
                onLinkClicked={closeModal}
              />
            )}
          </DialogContent>
        </DialogOverlay>
      </DialogPortal>
    </Dialog>
  );
};

export default MobileNavigation;

const MainNavItems = ({
  tabs,
  setActiveTab,
  setOpen,
}: {
  tabs: Header["tabs"];
  setActiveTab: (tab: number | null) => void;
  setOpen: (open: boolean) => void;
}) => {
  const closeModal = () => {
    setActiveTab(null);
    setOpen(false);
  };

  return (
    <ul className="grid gap-4 py-3">
      {(tabs || []).map((tab, index) => {
        if (!tab.enableDropdown) {
          return (
            <li className="px-4 text-lg" key={tab.id}>
              {tab.enableDirectLink ? (
                <CMSLink
                  label={tab.label}
                  {...tab.link}
                  className="text-lg"
                  onClick={() => closeModal()}
                />
              ) : (
                tab.label
              )}
            </li>
          );
        } else {
          return (
            <li className="px-4 text-lg" key={tab.id}>
              <button
                className="inline-flex w-full justify-between items-center"
                onClick={() => setActiveTab(index)}
              >
                {tab.enableDirectLink ? (
                  <CMSLink
                    label={tab.label}
                    {...tab.link}
                    className="text-lg"
                    onClick={() => {
                      closeModal();
                    }}
                  />
                ) : (
                  tab.label
                )}
                <ArrowRightIcon />
              </button>
            </li>
          );
        }
      })}
    </ul>
  );
};

const SubNavItems = ({
  links,
  onBackClicked,
  onLinkClicked,
}: {
  links: { link: LinkField }[];
  onBackClicked: () => void;
  onLinkClicked: () => void;
}) => {
  return (
    <>
      <div className="px-4 py-3 border-b border-b-neutral-100 flex items-center">
        <button
          className="inline-flex items-center gap-2"
          onClick={onBackClicked}
        >
          <ArrowLeftIcon />
          Zpět
        </button>
      </div>
      <ul className="grid gap-4 py-3">
        {links.map((link, index) => (
          <li key={index} className="px-4">
            <CMSLink
              {...link.link}
              className="text-lg"
              onClick={onLinkClicked}
            />
          </li>
        ))}
      </ul>
    </>
  );
};
