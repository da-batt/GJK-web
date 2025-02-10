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
    </footer>
  );
};

export default Footer;
