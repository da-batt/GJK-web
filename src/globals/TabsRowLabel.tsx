"use client";
import type { PayloadClientReactComponent, RowLabelComponent } from "payload";

import { useRowLabel } from "@payloadcms/ui";

const TabsRowLabel: PayloadClientReactComponent<RowLabelComponent> = () => {
  const { data } = useRowLabel<{ label?: string }>();

  return data.label || "...";
};

export default TabsRowLabel;
