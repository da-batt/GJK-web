import React from "react";
import config from "@payload-config";
import { getPayload } from "payload";
import { FadeIn } from "@/components/animations";
import Image from "next/image";
import { parseRichText } from "@/lib/utils";
import Button from "@/components/ui/button";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Media } from "@/payload-types";

export default async function Page(props: {
  searchParams?: Promise<{ strana?: string }>;
}) {
  const searchParams = await props.searchParams;
  const page = Number(searchParams?.strana) || 1;
  console.log("Search param: " + page.toString());

  const payload = await getPayload({ config });
  const posts = await payload.find({ collection: "posts", page, limit: 12 });

  return (
    <main className="pt-20 pb-32">
      <FadeIn>
        <h1 className="display-2 mb-2">Aktuality</h1>
      </FadeIn>
      <div
        className="grid md:grid-cols-2 xl:grid-cols-3 gap-x-8 gap-y-12 mb-8 pt-4"
        id="col"
      >
        {posts.docs.map((post, index) => {
          const thumbnail = post.thumbnail as Media;
          const thumbnailUrl = thumbnail.sizes?.card?.url;
          if (!thumbnailUrl) return <div key={post.id}>Error loading post</div>;
          return (
            <FadeIn asChild delay={0.2 + index * 0.2} key={post.id}>
              <article className="">
                <div className="relative mb-3">
                  <Image
                    src={thumbnailUrl}
                    alt={thumbnail.alt}
                    height={450}
                    width={600}
                    className="w-full h-auto rounded-xl"
                  />
                </div>
                <div>
                  <Link href={`/aktuality/${post.id}`}>
                    <h1 className="text-lg leading-[1.2] font-semibold mb-1">
                      {post.title}
                    </h1>
                  </Link>
                  <p className="text-ellipsis">
                    {parseRichText(post.content.root)
                      .split(" ")
                      .slice(0, 30)
                      .join(" ")
                      .concat(" ...")}
                  </p>
                </div>
              </article>
            </FadeIn>
          );
        })}
      </div>
      <div className="flex justify-between">
        <Button asChild disabled={!posts.hasPrevPage}>
          <Link href={`/aktuality?strana=${posts.prevPage}#col`}>
            <ChevronLeft />
          </Link>
        </Button>
        <Button asChild disabled={!posts.hasNextPage}>
          <Link href={`/aktuality?strana=${posts.nextPage}#col`}>
            <ChevronRight />
          </Link>
        </Button>
      </div>
    </main>
  );
}
