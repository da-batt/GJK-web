import type { AccessArgs, CollectionConfig } from "payload";

export const isAdmin = ({ req }: AccessArgs) => req.user?.role == "admin";
const isSelf = (args: AccessArgs) => args.req.user?.id == args.id;
const isAdminOrSelf = (args: AccessArgs) => isAdmin(args) || isSelf(args);
const isAdminAndSelf = (args: AccessArgs) => isAdmin(args) && isSelf(args);

export const Users: CollectionConfig = {
  slug: "users",
  admin: {
    useAsTitle: "email",
  },
  access: {
    create: isAdmin,
    delete: isAdminAndSelf,
    update: (args) => isAdminAndSelf(args) || isSelf(args),
    read: isAdminOrSelf,
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
      access: {
        update: isAdminAndSelf,
      },
    },
  ],
};
