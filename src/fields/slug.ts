import { Field, FieldHook } from "payload";

export const slugField = (fieldToUse: string = "title") => {
  return {
    name: "slug",
    type: "text",
    admin: {
      position: "sidebar",
      readOnly: true,
    },
    index: true,
    hooks: {
      beforeValidate: [formatSlugHook(fieldToUse)],
    },
  } as Field;
};

export default slugField;

export const formatSlug = (val: string): string =>
  val
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/ /g, "-")
    .replace(/[^\w-]+/g, "")
    .toLowerCase();

export const formatSlugHook =
  (fallback: string): FieldHook =>
  ({ data, value }) => {
    const fallbackData = data?.[fallback] || data?.[fallback];

    if (fallbackData && typeof fallbackData === "string") {
      return formatSlug(fallbackData);
    }

    return value;
  };
