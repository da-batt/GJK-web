import slugField from "@/fields/slug";
import {
  BoldFeature,
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  ItalicFeature,
  lexicalEditor,
  LinkFeature,
  OrderedListFeature,
  ParagraphFeature,
  UnderlineFeature,
  UnorderedListFeature,
  UploadFeature,
} from "@payloadcms/richtext-lexical";
import { revalidatePath } from "next/cache";
import type { CollectionConfig } from "payload";

export const Pages: CollectionConfig = {
  slug: "pages",
  admin: {
    useAsTitle: "title",
  },
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
      hooks: {
        afterChange: [() => revalidatePath("/", "layout")],
      },
    },
    {
      name: "description",
      type: "text",
    },
    {
      name: "content",
      type: "richText",
      required: true,
      editor: lexicalEditor({
        features: () => [
          BoldFeature(),
          ItalicFeature(),
          OrderedListFeature(),
          UnorderedListFeature(),
          UnderlineFeature(),
          UploadFeature(),
          HeadingFeature({ enabledHeadingSizes: ["h2", "h3", "h4"] }),
          ParagraphFeature(),
          LinkFeature(),
          FixedToolbarFeature(),
          InlineToolbarFeature(),
        ],
      }),
    },
    slugField(),
  ],
};
