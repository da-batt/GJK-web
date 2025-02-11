import React from "react";
import config from "@payload-config";
import { getPayload } from "payload";
import { FadeIn } from "@/components/animations";
import Image from "next/image";
import { cn, parseRichText } from "@/lib/utils";
import { Button } from "@/components/button";
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
  const posts = await payload.find({ collection: "posts", page, limit: 10 });

  return (
    <main className="pt-20 pb-32">
      <FadeIn>
        <h1 className="display-1">Aktuality</h1>
      </FadeIn>
      <div className="grid gap-8 mb-8 pt-8" id="col">
        {posts.docs.map((post, index) => {
          const thumbnail = post.thumbnail as Media;
          return (
            <FadeIn asChild delay={0.2 + index * 0.2} key={post.id}>
              <article className="grid grid-cols-[28em_auto] h-[20em] gap-6">
                <div className="relative">
                  <Image
                    src={thumbnail.url ?? "https://placehold.co/600x400"}
                    alt={thumbnail.alt}
                    fill
                    className="object-cover rounded-xl"
                  />
                </div>
                <div>
                  <h1 className="text-xl font-semibold">{post.title}</h1>
                  <p className="text-lg text-ellipsis">
                    {parseRichText(post.content.root).slice(0, 200)}
                  </p>
                </div>
              </article>
            </FadeIn>
          );
        })}
      </div>
      <div className="flex justify-between">
        <Button
          asChild
          variant={posts.hasPrevPage ? "default" : "disabled"}
          className={cn(!posts.hasPrevPage && "pointer-events-none")}
        >
          <Link href={`/aktuality?strana=${posts.prevPage}#col`}>
            <ChevronLeft />
          </Link>
        </Button>
        <Button
          asChild
          variant={posts.hasNextPage ? "default" : "disabled"}
          className={cn(!posts.hasNextPage && "pointer-events-none")}
        >
          <Link href={`/aktuality?strana=${posts.nextPage}#col`}>
            <ChevronRight />
          </Link>
        </Button>
      </div>
    </main>
  );
}
