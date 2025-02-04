import type { Metadata } from "next";
import { Lexend } from "next/font/google";
import "./globals.css";
import Footer from "@/components/footer";

const lexend = Lexend({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Gymnázium Jana Keplera",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${lexend.className} max-w-screen-2xl mx-auto px-4 md:px-8 xl:px-28`}
      >
        {children}
        <Footer />
      </body>
    </html>
  );
}
