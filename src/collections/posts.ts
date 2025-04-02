import { lexicalEditor, BoldFeature, ItalicFeature, OrderedListFeature, UnorderedListFeature, UnderlineFeature, UploadFeature, HeadingFeature, ParagraphFeature, LinkFeature, FixedToolbarFeature, InlineToolbarFeature } from "@payloadcms/richtext-lexical";
import { revalidateTag } from "next/cache";
import type { CollectionConfig } from "payload";

export const Posts: CollectionConfig = {
  slug: "posts",
  admin: {
    useAsTitle: "title",
  },
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
    },
    {
      name: "thumbnail",
      type: "upload",
      relationTo: "media",
      required: true,
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
  ],
  hooks: {
    afterChange: [() => revalidateTag("posts")],
    afterDelete: [() => revalidateTag("posts")],
  },
};
