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
    <article className="pt-24 pb-40 lg:grid grid-cols-12">
      <div className="col-start-2 xl:col-start-3 col-end-12 xl:col-end-11">
        <h1 className="display-3 mb-2">{post.title}</h1>
        <Image
          src={thumbnailUrl}
          alt={thumbnail.alt}
          width={1600}
          height={900}
          className="w-full rounded-xl object-cover h-[18rem] sm:h-auto border border-neutral-100"
        />
        <main className="pt-10">
          <RichText data={post.content} />
        </main>
      </div>
    </article>
  );
}
