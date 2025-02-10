import React from "react";
import Image from "next/image";
import logo from "~/logo.svg";

const Footer = () => {
  return (
    <footer className="pb-12 pt-8 flex justify-between bg-black text-white container">
      <div>
        <Image
          src={logo}
          alt="Logo Gymnázia Jana Keplera"
          className="w-52 mb-2"
        />
        <p>Parléřova 2, 169 00, Praha 6</p>
        <p>+420 233 352 546</p>
        <a href="mailto:gjk@gjk.cz">
          <p>gjk@gjk.cz</p>
        </a>
      </div>
      <div>
        {sitemap.map((col) => (
          <div>
            <span>{col.name}</span>
            <ul>{}</ul>
          </div>
        ))}
      </div>
    </footer>
  );
};

export default Footer;

const sitemap: FooterNavColumn[] = [
  {
    name: "O škole",
    children: [
      { name: "Pedagogický sbor", href: "/pedagogicky-sbor" },
      { name: "Dokumenty", href: "/dokumenty" },
      { name: "Akce", href: "/akce" },
    ],
  },
  {
    name: "Pro studenty",
    children: [{ name: "Volitelné předměty", href: "/" }],
  },
  {
    name: "Pro uchazeče",
    children: [
      { name: "Přijmací řízení", href: "/prijmaci-rizeni" },
      { name: "Dny otevřených dveří", href: "/dny-otevrenych-dveri" },
      { name: "Přestup na GJK", href: "/prestup-na-gjk" },
    ],
  },
];

type FooterNavColumn = {
  name: string;
  children: { name: string; href: string }[];
};
