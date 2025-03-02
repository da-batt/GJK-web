import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Footer from "@/components/layout/footer";
import Header from "@/components/layout/header";

const switzer = localFont({ src: "./fonts/Switzer-Variable.woff2" });

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
      <body className={`${switzer.className}`}>
        <Header />
        <main className="container">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
