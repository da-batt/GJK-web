"use client";
import type { PayloadClientReactComponent, RowLabelComponent } from "payload";

import { useRowLabel } from "@payloadcms/ui";
import { useEffect, useState } from "react";

const LinksRowLabel: PayloadClientReactComponent<RowLabelComponent> = () => {
  const [referenceTitle, setReferenceTitle] = useState<string | null>(null);

  const { data } = useRowLabel<{
    link?: {
      url?: string;
      reference?: number;
      label?: string;
    };
  }>();

  useEffect(() => {
    if (!data.link || data.link.url) return;
    fetch(`/api/pages/${data.link.reference}?select[title]=true`)
      .then((res) => res.json())
      .then((page) => setReferenceTitle(page.title));
  }, [data.link]);

  return data.link?.label || referenceTitle || "...";
};

export default LinksRowLabel;
