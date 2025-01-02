import type { CollectionConfig } from "payload";

export const Users: CollectionConfig = {
  slug: "users",
  admin: {
    useAsTitle: "email",
  },
  auth: true,
  fields: [
    {
      name: "role",
      type: "select",
      options: [
        { value: "admin", label: "Admin" },
        { value: "editor", label: "Editor" },
      ],
      required: true,
      defaultValue: "editor",
    },
  ],
};
