import { Page } from "@/payload-types";
import Link from "next/link";
import React, { ReactNode } from "react";

type LinkType = "internal" | "custom";

type CMSLinkProps = {
  type: LinkType;
  className?: string;
  children?: ReactNode;
  reference?: Page | number | null;
  url?: string | null;
  label?: string | null;
};

const CMSLink = ({
  url,
  reference,
  type,
  children,
  label,
  ...props
}: CMSLinkProps) => {
  const pageTitle = (reference as Page)?.title;
  return (
    <Link href={generateHref({ type, reference, url })} {...props}>
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
