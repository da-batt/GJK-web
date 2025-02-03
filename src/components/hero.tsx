"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";

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
    imageUrl: "/hero/people4.jpeg",
  },
  {
    id: 2,
    title: "Odpovědnost",
    content:
      "Se svobodou a důvěrou, kterých se našim studentů dostává, jde ruku v ruce i odpovědnost. Té se naši studenti učí praxí a někdy i skrze chyby.",
    imageUrl: "/hero/people3.jpeg",
  },
  {
    id: 3,
    title: "Respekt",
    content:
      "Budujeme prostředí, kde se každý cítí bezpečně a jeho názor je slyšen. Respektující komunikace a přístup jsou základním pilířem kultury školy.",
    imageUrl: "/hero/people2.jpeg",
  },
  {
    id: 4,
    title: "Odvaha",
    content:
      "Vedeme studenty k odvaze překročit své limity, zkoušet nové věci a pracovat na svých slabinách. Podporujeme i jejich občanskou odpovědnost a snahu měnit svět kolem sebe k lepšímu.",
    imageUrl: "/hero/people1.jpeg",
  },
];

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
  }, [cards.length, displayDuration, transitionDuration]);

  return (
    <section>
      <div
        className="min-h-[36em] h-[60vh] relative rounded-2xl overflow-hidden"
        ref={ref}
      >
        {cards.map((card, index) => (
          <div
            className={`absolute inset-0 p-8 flex items-end transition-opacity duration-2000 ${index === currentIndex ? "opacity-100" : "opacity-0"}`}
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
            <div className="z-10 text-white lg:max-w-[50%]">
              <h1 className="display-1">{card.title}</h1>
              <p>{card.content}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Hero;
