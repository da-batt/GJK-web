"use client";
import { Slot } from "@radix-ui/react-slot";
import { motion } from "motion/react";
import React, { ReactNode } from "react";

interface FadeInProps {
  children: ReactNode;
  delay?: number;
  once?: boolean;
  whileInView?: boolean;
  viewportAmount?: number;
  asChild?: boolean;
}

export const FadeIn: React.FC<FadeInProps> = ({
  children,
  delay = 0,
  once = true,
  whileInView = false,
  asChild = false,
  viewportAmount = 0.5,
}) => {
  const Component = asChild ? motion(Slot) : motion.div;
  return (
    <Component
      transition={{
        duration: 0.6,
        ease: "easeOut",
        delay,
      }}
      initial="hidden"
      {...(whileInView ? { whileInView: "visible" } : { animate: "visible" })}
      viewport={{ once, amount: viewportAmount }}
      variants={{
        visible: { opacity: 1, translateY: 0 },
        hidden: { opacity: 0, translateY: "0.5rem" },
      }}
    >
      {children}
    </Component>
  );
};
