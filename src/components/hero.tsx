"use client";
import { motion, useScroll, useTransform } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { FadeIn } from "./animations";

export const Hero = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"]);

  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const transitionDuration = 2000;
  const displayDuration = 5000;

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % cards.length);
    }, displayDuration + transitionDuration);

    return () => clearInterval(interval);
  }, [displayDuration, transitionDuration]);

  return (
    <section>
      <motion.div
        className="min-h-[75vh] h-[40em] relative rounded-2xl overflow-hidden"
        ref={ref}
        initial={{
          opacity: 0,
        }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      >
        {cards.map((card, index) => (
          <div
            className={`duration-2000 absolute inset-0 p-6 md:p-10 flex items-end justify-between transition-opacity ${index === currentIndex ? "opacity-100" : "opacity-0"}`}
            key={index}
          >
            <motion.div
              className="absolute inset-0 w-full h-full bg-cover bg-center scale-115"
              style={{
                backgroundImage: `url(${card.imageUrl})`,
                y,
              }}
              ref={ref}
            ></motion.div>
            <div className="absolute inset-0 bg-linear-to-t from-black to-transparent to-60% opacity-75"></div>
            <div className="z-10 text-white">
              <FadeIn delay={0.7}>
                <sub className="uppercase text-lg leading-[1.1] tracking-wider">
                  Naše hodnoty
                </sub>
              </FadeIn>
              {index == 0 ? (
                <FadeIn delay={1.2}>
                  <h1 className="display-1 text-5xl leading-none">
                    {card.title}
                  </h1>
                </FadeIn>
              ) : (
                <h1 className="display-1 text-5xl leading-none">
                  {card.title}
                </h1>
              )}
            </div>
          </div>
        ))}
      </motion.div>
    </section>
  );
};

export default Hero;

interface HeroCard {
  id: number;
  title: string;
  content: string;
  imageUrl: string;
}

const cards: HeroCard[] = [
  {
    id: 1,
    title: "Svoboda",
    content:
      "Dáváme studentům prostor pro vlastní nápady, projekty a akce. Učí se tím nejen tvořit, ale i spolupracovat a rozvíjet měkké dovednosti v přirozeném prostředí vrstevnického učení.",
    imageUrl: "/hero/svoboda.jpg",
  },
  {
    id: 2,
    title: "Odpovědnost",
    content:
      "Se svobodou a důvěrou, kterých se našim studentů dostává, jde ruku v ruce i odpovědnost. Té se naši studenti učí praxí a někdy i skrze chyby.",
    imageUrl: "/hero/odpovednost.jpg",
  },
  {
    id: 3,
    title: "Respekt",
    content:
      "Budujeme prostředí, kde se každý cítí bezpečně a jeho názor je slyšen. Respektující komunikace a přístup jsou základním pilířem kultury školy.",
    imageUrl: "/hero/respekt.jpg",
  },
  {
    id: 4,
    title: "Odvaha",
    content:
      "Vedeme studenty k odvaze překročit své limity, zkoušet nové věci a pracovat na svých slabinách. Podporujeme i jejich občanskou odpovědnost a snahu měnit svět kolem sebe k lepšímu.",
    imageUrl: "/hero/odvaha.jpg",
  },
];
