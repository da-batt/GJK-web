"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
export const Hero = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"]);
  return (
    <section>
      <div
        className="h-[36em] flex items-end p-8 relative rounded-2xl overflow-hidden"
        ref={ref}
      >
        <motion.div
          className="bg-[url(/hero/people1.jpeg)] absolute top-0 left-0 w-full h-full bg-cover bg-center scale-115"
          style={{
            y,
          }}
          ref={ref}
        ></motion.div>
        <div className="absolute inset-0 bg-linear-to-t from-black to-transparent to-60% opacity-75"></div>
        <div className="z-10 text-white max-w-[50%]">
          <h1 className="display-1">Odvaha</h1>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Hero;
