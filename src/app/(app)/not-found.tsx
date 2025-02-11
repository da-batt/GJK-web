import { Button } from "@/components/button";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex items-center justify-center flex-col min-h-[calc(100vh-3rem)] -translate-y-16">
      <h1 className="text-[11rem] font-semibold leading-none">{"404"}</h1>
      <p className="text-lg mb-8 text-center">Stránka nebyla nalezena</p>
      <Button asChild>
        <Link href="/">Zpět domů</Link>
      </Button>
    </div>
  );
}
