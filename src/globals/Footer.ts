import { GlobalConfig } from "payload";
import link from "@/fields/link";
import { revalidatePath } from "next/cache";

export const Footer: GlobalConfig = {
  slug: "footer",
  fields: [
    {
      name: "columns",
      type: "array",
      admin: {
        components: {
          RowLabel: "@/globals/TabsRowLabel.tsx",
        },
      },
      fields: [
        {
          name: "label",
          type: "text",
          required: true,
        },
        {
          name: "links",
          type: "array",
          minRows: 1,
          required: true,
          admin: {
            initCollapsed: true,
            components: {
              RowLabel: "@/globals/LinksRowLabel.tsx",
            },
          },
          fields: [link({ overrides: { label: false } })],
        },
      ],
    },
  ],
  hooks: {
    afterChange: [() => revalidatePath("/", "layout")],
  },
};
