import React from "react";
import Logo from "@/components/ui/logo";
import { getPayload } from "payload";
import config from "@payload-config";
import CMSLink from "@/components/cms-link";

const Footer = async () => {
  const payload = await getPayload({ config });
  const footer = await payload.findGlobal({ slug: "footer" });

  return (
    <footer className="bg-black text-white">
      <div className="py-12 md:flex justify-between container">
        <div>
          <Logo className="w-52 mb-2 fill-white" />
          <ul>
            <li>Parléřova 2, 169 00, Praha 6</li>
            <li>+420 233 352 546</li>
            <li>
              <a href="mailto:gjk@gjk.cz">gjk@gjk.cz</a>
            </li>
          </ul>
          <h3>Identifikační údaje</h3>
          <ul>
            <li>IČO 61388246</li>
            <li>IZO 061388246</li>
            <li>REDIZO 600005691</li>
          </ul>
          <h3>Datová schránka</h3>
          <ul>
            <li>a99zagh</li>
          </ul>
        </div>
        <div className="md:flex gap-16">
          {footer.columns?.map((col) => (
            <div key={col.id}>
              <h3>{col.label}</h3>
              <ul>
                {col.links.map((link) => (
                  <li key={link.id}>
                    <CMSLink {...link.link} />
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
