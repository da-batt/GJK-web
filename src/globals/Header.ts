import { GlobalConfig } from "payload";
import link from "@/fields/link";
import { revalidatePath } from "next/cache";

export const Header: GlobalConfig = {
  slug: "header",
  fields: [
    {
      name: "tabs",
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
          type: "row",
          fields: [
            {
              name: "enableDirectLink",
              type: "checkbox",
              admin: {
                width: "16rem",
              },
            },
            {
              name: "enableDropdown",
              type: "checkbox",
            },
          ],
        },
        {
          label: "Direct link",
          type: "collapsible",
          admin: {
            condition: (_, siblingData) => siblingData.enableDirectLink,
            initCollapsed: true,
          },
          fields: [
            link({ disableURLLabel: true, overrides: { label: false } }),
          ],
        },
        {
          name: "links",
          label: "Dropdown links",
          type: "array",
          minRows: 1,
          required: true,
          admin: {
            condition: (_, siblingData) => siblingData.enableDropdown,
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
