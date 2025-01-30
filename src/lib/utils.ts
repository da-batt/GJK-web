type RichTextBlock = {
  [k: string]: unknown;
  children?: RichTextBlock[];
  text?: string;
};

export function parseRichText(richText: RichTextBlock): string {
  if (richText.children) {
    return richText.children
      .map((block) => {
        if (block.children) {
          return parseRichText(block);
        }

        return block.text || "";
      })
      .join(" ");
  }

  return "";
}
