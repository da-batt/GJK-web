import { getPayload } from "payload";
import config from "@payload-config";
import React from "react";
import { notFound } from "next/navigation";
import { RichText } from "@payloadcms/richtext-lexical/react";

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}) {
  const slug = (await params).slug;
  const payload = await getPayload({ config });
  const page = await payload
    .find({
      collection: "pages",
      limit: 1,
      where: {
        slug: {
          equals: slug.join(),
        },
      },
    })
    .then((res) => res.docs[0]);

  if (page == undefined) return notFound();

  return (
    <div className="pt-40 pb-40 xl:px-24 2xl:px-48">
      <h1 className="display-1 mb-4">{page.title}</h1>
      <hr className="mb-10" />
      <RichText data={page.content} />
    </div>
  );
}
