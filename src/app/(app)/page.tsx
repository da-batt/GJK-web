import Header from "@/components/header";
import Hero from "@/components/hero";
import { getPayload } from "payload";
import config from "@payload-config";
import Image from "next/image";
import { Media } from "@/payload-types";
import Link from "next/link";
import { parseRichText } from "@/lib/utils";

export default async function Home() {
  const payload = await getPayload({ config });
  const posts = await payload
    .find({ limit: 3, collection: "posts" })
    .then((res) => res.docs);
  return (
    <>
      <Header />
      <main>
        <Hero />
        <section className="py-24">
          <h2 className="display-2">Aktuality</h2>
          <hr className="mt-2 mb-8" />
          <div className="flex flex-col gap-8">
            {posts.map((post) => {
              const thumbnail = post.thumbnail as Media;
              return (
                <article
                  key={post.id}
                  className="flex flex-col gap-4 lg:grid lg:gap-8 lg:grid-cols-[28em_auto]"
                >
                  <div className="h-96 md:h-72 relative">
                    <Image
                      src={
                        thumbnail.url ?? "https://imageplaceholder.net/600x400"
                      }
                      alt={thumbnail.alt}
                      fill
                      className="object-center object-cover w-full rounded-2xl"
                    />
                  </div>
                  <div>
                    <Link href={`/aktuality/${post.id}`}>
                      <h3 className="display-3 mb-2">{post.title}</h3>
                    </Link>
                    <p className="hidden lg:block">
                      <Ellipsis
                        wordLimit={75}
                        text={parseRichText(post.content.root)}
                      />
                    </p>
                    <div />
                  </div>
                </article>
              );
            })}
          </div>
        </section>
      </main>
    </>
  );
}

const Ellipsis = ({ text, wordLimit }: { text: string; wordLimit: number }) => {
  const wordCount = text.split(" ").length;
  if (wordCount < wordLimit) return <>{text}</>;
  return <>{text.split(" ", wordLimit).join(" ").concat(" ...")}</>;
};
