import { revalidatePath } from "next/cache";
import { GlobalConfig } from "payload";

export const Partners: GlobalConfig = {
  slug: "partners",
  fields: [
    {
      name: "logos",
      type: "array",
      fields: [
        {
          name: "logo",
          type: "relationship",
          relationTo: "media",
          required: true,
        },
      ],
    },
  ],
  hooks: {
    afterChange: [() => revalidatePath("/", "page")],
  },
};
