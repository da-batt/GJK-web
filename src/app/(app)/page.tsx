import Header from "@/components/header";
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

export default async function Home() {
  const getCachedPosts = unstable_cache(fetchPosts, ["posts"], {
    tags: ["posts"],
  });
  const posts = await getCachedPosts();

  return (
    <>
      <Header />
      <main className="container">
        <Hero />
        <section className="pt-32 grid grid-cols-[3fr_5fr] gap-x-28 gap-y-56 pb-32">
          <h2 className="uppercase text-lg font-semibold tracking-wider">
            Naše mise
          </h2>
          <div>
            <p className="text-xl mb-12 leading-snug">
              Gymnázium Jana Keplera v Praze patří mezi prestižní školy s
              důrazem na kritické myšlení a tvůrčí výuku. Nabízíme osmileté i
              čtyřleté studium a vynikáme kvalitním vzděláním i přátelskou
              atmosférou.
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
              return (
                <FadeIn delay={0.2 * index} asChild>
                  <article key={post.id}>
                    <div className="relative aspect-square mb-2">
                      <Image
                        src={post.thumbnail.url}
                        alt={post.thumbnail.alt}
                        fill
                        className="object-cover rounded-xl"
                      />
                    </div>
                    <h1 className="text-lg font-medium">{post.title}</h1>
                  </article>
                </FadeIn>
              );
            })}
          </div>
        </section>
      </main>
    </>
  );
}

const fetchPosts = async () => {
  const payload = await getPayload({ config });
  return await payload
    .find({ limit: 3, collection: "posts" })
    .then((res) => res.docs);
};
