import type { CollectionConfig } from "payload";

export const Media: CollectionConfig = {
  slug: "media",
  access: {
    read: () => true,
  },
  fields: [
    {
      name: "alt",
      type: "text",
      required: true,
    },
  ],
  upload: {
    staticDir: "media",
    mimeTypes: ["image/*"],
    formatOptions: {
      format: "webp",
      options: {
        lossless: true,
      },
    },
    crop: true,
    focalPoint: true,
    imageSizes: [
      {
        name: "square",
        width: 600,
        height: 600,
        fit: "cover",
      },
      {
        name: "card",
        width: 600,
        height: 450,
        fit: "cover",
      },
      {
        name: "landscape",
        width: 1600,
        height: 900,
        fit: "cover",
        withoutEnlargement: false,
      },
    ],
  },
};
