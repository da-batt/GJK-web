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
      <section className="py-24 lg:grid grid-cols-[3fr_5fr] gap-x-28 border-b-neutral-100 border-b-2">
        <div className="col-start-2">
          <FadeIn whileInView viewportAmount={0.4}>
            <p className="paragraph-large mb-12 px-2 sm:px-0">
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
      <section className="pt-12 pb-32">
        <FadeIn whileInView>
          <div className="flex justify-between items-end mb-2 sm:mb-4 lg:mb-6">
            <h2 className="display-2">Aktuality</h2>
            <Button variant="outline" className="hidden lg:inline-flex" asChild>
              <Link href="/aktuality">
                Všechny aktuality
                <ArrowRightIcon />
              </Link>
            </Button>
          </div>
        </FadeIn>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4">
          {posts.map((post, index) => {
            const thumbnail = post.thumbnail as Media;
            const thumbnailUrl = thumbnail.sizes?.card?.url;
            if (!thumbnailUrl)
              return <div key={post.id}>Failed to load post</div>;

            return (
              <FadeIn
                key={post.id}
                delay={0.2 * index}
                asChild
                whileInView
                className="last:sm:hidden last:lg:block"
              >
                <Link href={`/aktuality/${post.id}`}>
                  <article className="group">
                    <Image
                      src={thumbnailUrl}
                      alt={thumbnail.alt}
                      loading="lazy"
                      width={600}
                      height={450}
                      className="rounded-xl mb-2 w-full h-auto group-hover:opacity-80 transition-opacity duration-200"
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
