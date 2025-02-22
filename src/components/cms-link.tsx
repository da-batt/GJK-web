import { Page } from "@/payload-types";
import Link from "next/link";
import React, { ReactNode } from "react";

type LinkType = "internal" | "custom";

export type LinkField = {
  type: LinkType;
  reference?: Page | number | null;
  url?: string | null;
  label?: string | null;
  newTab?: boolean | null;
};

type CMSLinkProps = {
  className?: string;
  children?: ReactNode;
  onClick?: (
    event: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>,
  ) => void;
} & LinkField;

const CMSLink = ({
  url,
  reference,
  type,
  children,
  label,
  newTab,
  ...props
}: CMSLinkProps) => {
  const pageTitle = (reference as Page)?.title;
  return (
    <Link
      href={generateHref({ type, reference, url })}
      target={newTab ? "_blank" : "_self"}
      {...props}
    >
      {label || pageTitle}
      {children}
    </Link>
  );
};

export default CMSLink;

type GenerateHrefArgs = {
  type?: LinkType | null;
  url?: string | null;
  reference?: number | Page | null;
};

const generateHref = ({ type, reference, url }: GenerateHrefArgs) => {
  if ((type === "custom" || type === undefined) && url) {
    return url;
  }

  if (type === "internal" && reference && typeof reference != "number") {
    return "/" + reference.slug;
  }

  return "";
};
