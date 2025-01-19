import { Field } from "payload";

export const slugField: Field = {
  name: "slug",
  type: "text",
  admin: {
    position: "sidebar",
    readOnly: true,
  },
  unique: true,
  index: true,
};

export default slugField;
