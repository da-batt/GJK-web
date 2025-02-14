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
          name: "enableDropdown",
          type: "checkbox",
        },
        {
          name: "enableDirectLink",
          type: "checkbox",
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
          label: "Dropdown links",
          type: "collapsible",
          admin: {
            condition: (_, siblingData) => siblingData.enableDropdown,
            initCollapsed: true,
          },
          fields: [
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
    },
  ],
  hooks: {
    afterChange: [() => revalidatePath("/", "layout")],
  },
};
