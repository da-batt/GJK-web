import Hero from "@/components/hero";
import { getPayload } from "payload";
import config from "@payload-config";
import Image from "next/image";
import Link from "next/link";
import { unstable_cache } from "next/cache";
import { ArrowRightIcon } from "lucide-react";
import { Button } from "@/components/button";
import { FadeIn } from "@/components/animations";
import { Media } from "@/payload-types";

export default async function Home() {
  const getCachedPosts = unstable_cache(
    async () => {
      const payload = await getPayload({ config });
      return await payload
        .find({ limit: 3, collection: "posts" })
        .then((res) => res.docs);
    },
    ["posts"],
    {
      tags: ["posts"],
    },
  );

  const posts = await getCachedPosts();

  return (
    <>
      <Hero />
      <section className="pt-32 lg:pt-48 lg:grid grid-cols-[3fr_5fr] gap-x-28 pb-32">
        <div className="col-start-2">
          <FadeIn whileInView viewportAmount={0.4}>
            <p className="text-xl mb-12 leading-snug">
              Naší misí je připravit studenty na život v rychle se měnícím světě
              prostřednictvím kvalitního vzdělání, které propojuje znalosti,
              dovednosti a hodnoty. Škola rozvíjí kritické myšlení, tvořivost a
              zodpovědný přístup k informacím i technologiím.
            </p>
            <Button asChild>
              <Link href="/mise">
                Zjistit více <ArrowRightIcon />
              </Link>
            </Button>
          </FadeIn>
        </div>
      </section>
      <hr className="border-neutral-100" />
      <section className="pt-16 pb-32">
        <FadeIn whileInView>
          <div className="flex justify-between items-end mb-6">
            <h2 className="display-2">Aktuality</h2>
            <Button variant="outline" className="hidden lg:inline-flex" asChild>
              <Link href="/aktuality">
                Všechny aktuality
                <ArrowRightIcon />
              </Link>
            </Button>
          </div>
        </FadeIn>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {posts.map((post, index) => {
            const thumbnail = post.thumbnail as Media;
            const thumbnailUrl = thumbnail.sizes?.square?.url;
            if (!thumbnailUrl)
              return <div key={post.id}>Failed to load post</div>;

            return (
              <FadeIn key={post.id} delay={0.2 * index} asChild whileInView>
                <Link href={`/aktuality/${post.id}`}>
                  <article>
                    <Image
                      src={thumbnailUrl}
                      alt={thumbnail.alt}
                      width={600}
                      height={600}
                      className="rounded-xl mb-2 w-full h-auto"
                    />
                    <h1 className="text-lg">{post.title}</h1>
                  </article>
                </Link>
              </FadeIn>
            );
          })}
        </div>
      </section>
    </>
  );
}
