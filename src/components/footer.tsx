import React from "react";
import Logo from "./logo";
import { getPayload } from "payload";
import config from "@payload-config";
import CMSLink from "./cms-link";

const Footer = async () => {
  const payload = await getPayload({ config });
  const footer = await payload.findGlobal({ slug: "footer" });

  return (
    <footer className="bg-black text-white">
      <div className="py-12 flex justify-between container">
        <div>
          <Logo className="w-52 mb-2 fill-white" />
          <p>Parléřova 2, 169 00, Praha 6</p>
          <p>+420 233 352 546</p>
          <a href="mailto:gjk@gjk.cz">
            <p>gjk@gjk.cz</p>
          </a>
        </div>
        <div className="flex gap-16">
          {footer.columns?.map((col) => (
            <div key={col.id}>
              <h4 className="mb-2">{col.label}</h4>
              <ul>
                {col.links.map((link) => (
                  <li key={link.id}>
                    <CMSLink
                      className="text-neutral-200 hover:text-white"
                      {...link.link}
                    />
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
