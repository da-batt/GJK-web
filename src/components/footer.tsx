import React from "react";
import Logo from "./logo";

const Footer = () => {
  return (
    <footer className="bg-black text-white">
      <div className="py-8 flex justify-between container">
        <div>
          <Logo className="w-52 mb-2 fill-white" />
          <p>Parléřova 2, 169 00, Praha 6</p>
          <p>+420 233 352 546</p>
          <a href="mailto:gjk@gjk.cz">
            <p>gjk@gjk.cz</p>
          </a>
          <p className="text-sm mt-12 text-neutral-500">
            Zřizovatel: Magistrát hlavního města Prahy
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
