import type { ClassValue } from "clsx";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

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

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};
