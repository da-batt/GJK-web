import Header from "@/components/header";
import Hero from "@/components/hero";
import { getPayload } from "payload";
import config from "@payload-config";
import Image from "next/image";
import { Media } from "@/payload-types";
import Link from "next/link";

export default async function Home() {
  const payload = await getPayload({ config });
  const posts = await payload
    .find({ limit: 3, collection: "posts" })
    .then((res) => res.docs);
  return (
    <div className="px-28">
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
                  className="grid gap-8 grid-cols-[28em_auto] h-72"
                >
                  <div className="h-72 relative">
                    <Image
                      src={thumbnail.url}
                      alt={thumbnail.alt}
                      fill
                      className="object-center object-cover w-full rounded-2xl"
                    />
                  </div>
                  <div>
                    <Link href={`/aktuality/${post.id}`}>
                      <h3 className="display-3 mb-2">{post.title}</h3>
                    </Link>
                    <p>
                      <Ellipsis
                        wordLimit={75}
                        text={parseRichText(post.content)}
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
    </div>
  );
}

function parseRichText(richText: any): string {
  if (richText.root && richText.root.children) {
    richText = richText.root;
  }

  if (richText.children) {
    return richText.children
      .map((block: any) => {
        if (block.children) {
          return parseRichText(block);
        }

        return block.text || "";
      })
      .join("");
  }

  return "";
}

const Ellipsis = ({ text, wordLimit }: { text: string; wordLimit: number }) => {
  const wordCount = text.split(" ").length;
  if (wordCount < wordLimit) return <>{text}</>;
  return <>{text.split(" ", wordLimit).join(" ").concat(" ...")}</>;
};
