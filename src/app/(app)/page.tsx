import Header from "@/components/header";
import Hero from "@/components/hero";

export default function Home() {
  return (
    <div className="px-28">
      <Header />
      <main>
        <Hero />
        <section className="py-24">
          <h2 className="display-2">Aktuality</h2>
        </section>
      </main>
    </div>
  );
}
