"use client";
import { motion, useScroll, useTransform } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { FadeIn } from "./animations";
import { ArrowDownIcon } from "lucide-react";

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
        className="aspect-square w-full  sm:h-[85vh] relative rounded-2xl overflow-hidden"
        ref={ref}
        initial={{
          opacity: 0,
        }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      >
        {cards.map((card, index) => (
          <div
            className={`duration-2000 absolute inset-0 p-4 sm:p-6 md:p-8 flex items-end justify-between transition-opacity ${index === currentIndex ? "opacity-100" : "opacity-0"}`}
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
            <div className="z-10 text-white w-full items-end">
              <FadeIn delay={0.7}>
                <sub className="uppercase text-base md:text-lg leading-[1.05] tracking-wider">
                  Naše hodnoty
                </sub>
              </FadeIn>
              <div className="inline-flex justify-between w-full items-baseline">
                {index == 0 ? (
                  <FadeIn delay={1.2}>
                    <h1 className="display-0">{card.title}</h1>
                  </FadeIn>
                ) : (
                  <h1 className="display-0">{card.title}</h1>
                )}
                <FadeIn delay={2.4}>
                  <ArrowDownIcon className="hidden sm:block sm:w-[1.5rem] lg:w-[2rem] h-auto animate-bounce" />
                </FadeIn>
              </div>
            </div>
          </div>
        ))}
      </motion.div>
    </section>
  );
};

export default Hero;

interface HeroCard {
  title: string;
  content: string;
  imageUrl: string;
}

const cards: HeroCard[] = [
  {
    title: "Svoboda",
    content:
      "Dáváme studentům prostor pro vlastní nápady, projekty a akce. Učí se tím nejen tvořit, ale i spolupracovat a rozvíjet měkké dovednosti v přirozeném prostředí vrstevnického učení.",
    imageUrl: "/hero/svoboda.webp",
  },
  {
    title: "Odpovědnost",
    content:
      "Se svobodou a důvěrou, kterých se našim studentů dostává, jde ruku v ruce i odpovědnost. Té se naši studenti učí praxí a někdy i skrze chyby.",
    imageUrl: "/hero/odpovednost.webp",
  },
  {
    title: "Respekt",
    content:
      "Budujeme prostředí, kde se každý cítí bezpečně a jeho názor je slyšen. Respektující komunikace a přístup jsou základním pilířem kultury školy.",
    imageUrl: "/hero/respekt.webp",
  },
  {
    title: "Odvaha",
    content:
      "Vedeme studenty k odvaze překročit své limity, zkoušet nové věci a pracovat na svých slabinách. Podporujeme i jejich občanskou odpovědnost a snahu měnit svět kolem sebe k lepšímu.",
    imageUrl: "/hero/odvaha.webp",
  },
];
