import { getPayload } from "payload";
import Image from "next/image";
import React from "react";
import config from "@payload-config";
import { Media } from "@/payload-types";
import { RichText } from "@payloadcms/richtext-lexical/react";
import { notFound } from "next/navigation";

export default async function Page({
  params,
}: {
  params: Promise<{ id: number }>;
}) {
  const id = (await params).id;
  const payload = await getPayload({ config });
  const post = await payload
    .findByID({
      collection: "posts",
      id,
      depth: 2,
    })
    .catch(() => notFound());
  const thumbnail = post.thumbnail as Media;
  const thumbnailUrl = thumbnail.sizes?.landscape?.url;
  if (!thumbnailUrl) return;

  return (
    <article className="pt-20 pb-40 md:px-12 lg:px-24 xl:px-36 2xl:px-48">
      <h1 className="display-3 mb-2">{post.title}</h1>
      <Image
        src={thumbnailUrl}
        alt={thumbnail.alt}
        width={1600}
        height={900}
        className="w-full rounded-xl object-cover h-[18rem] sm:h-auto"
      />
      <main className="pt-12">
        <RichText data={post.content} />
      </main>
    </article>
  );
}
