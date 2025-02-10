"use client";
import { Slot } from "@radix-ui/react-slot";
import { motion } from "motion/react";
import React, { ReactNode } from "react";

interface FadeInProps {
  children: ReactNode;
  delay?: number;
  once?: boolean;
  asChild?: boolean;
}

export const FadeIn: React.FC<FadeInProps> = ({
  children,
  delay = 0,
  once = true,
  asChild = false,
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
      whileInView="visible"
      viewport={{ once, amount: 0.5 }}
      variants={{
        visible: { opacity: 1, translateY: 0 },
        hidden: { opacity: 0, translateY: "0.5rem" },
      }}
    >
      {children}
    </Component>
  );
};
