import Hero from "@/components/hero";
import { getPayload } from "payload";
import config from "@payload-config";
import Image from "next/image";
import Link from "next/link";
import { unstable_cache } from "next/cache";
import hladkov from "~/about/gjk-hladkov.jpg";
import interier from "~/about/prazdne-gjk.jpg";
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
      <section className="pt-48 grid grid-cols-[3fr_5fr] gap-x-28 gap-y-56 pb-32">
        <h2 className="uppercase text-lg font-semibold tracking-wider">
          Naše mise
        </h2>
        <div>
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
        </div>
        <Image
          src={hladkov}
          alt=""
          className="rounded-2xl object-cover h-[28em]"
        />
        <Image
          src={interier}
          alt=""
          className="rounded-2xl object-cover h-[40em]"
        />
      </section>
      <section className="pt-16 pb-32">
        <div className="flex justify-between items-end mb-6">
          <h2 className="display-2">Aktuality</h2>
          <Button asChild>
            <Link href="/aktuality">
              Všechny aktuality
              <ArrowRightIcon />
            </Link>
          </Button>
        </div>
        <div className="grid grid-cols-3 gap-10">
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
                    <h1 className="text-lg font-medium">{post.title}</h1>
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
