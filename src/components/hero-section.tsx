"use client";

import { motion } from "framer-motion";
import { Arrow, GitHub } from "./icons";
import { TerminalDemo } from "./terminal-demo";
import { Magnetic, easing } from "@/lib/animations";

const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.3,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: easing.gentle },
  },
};

export function HeroSection() {
  return (
    <section className="relative overflow-hidden pt-20 pb-12 md:pt-32 md:pb-24">
      {/* Animated background */}
      <div className="pointer-events-none absolute inset-0">
      </div>

      {/* Grid pattern overlay */}
      <div 
        className="pointer-events-none absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <motion.div
          className="mx-auto max-w-3xl text-center"
          variants={container}
          initial="hidden"
          animate="visible"
        >
          {/* Badge */}
          <motion.div variants={item}>
            <span className="inline-flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.02] px-3 py-1 text-[11px] font-medium text-white/60 backdrop-blur-sm sm:px-4 sm:text-[12px]">
              Open Source • MIT License
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            className="mt-6 text-3xl font-semibold tracking-tight text-white sm:text-4xl md:text-5xl lg:text-6xl md:leading-[1.1]"
            variants={item}
          >
            Curated dotfiles for a
            <br />
            <span className="text-white">
              productive workflow
            </span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-white/50 sm:text-lg md:text-xl"
            variants={item}
          >
            Minimal, modern configuration files for Fish shell, Ghostty
            terminal, Starship prompt, and more.
          </motion.p>

          {/* CTAs */}
          <motion.div
            className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4"
            variants={item}
          >
            <Magnetic strength={0.15}>
              <motion.a
                href="#configs"
                className="group relative flex h-11 items-center gap-2 overflow-hidden rounded-full bg-white px-5 text-[14px] font-medium text-black"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {/* Shine effect */}
                <motion.div
                  className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-black/[0.05] to-transparent"
                  animate={{ translateX: ["−100%", "200%"] }}
                  transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                />
                <span className="relative">Explore configs</span>
                <Arrow size={16} className="relative transition-transform duration-300 group-hover:translate-x-1" />
              </motion.a>
            </Magnetic>
            <Magnetic strength={0.15}>
              <motion.a
                href="https://github.com/insaneodyssey26/Linux-configs"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex h-11 items-center gap-2 rounded-full border border-white/[0.12] bg-white/[0.02] px-5 text-[14px] font-medium text-white/80 backdrop-blur-sm transition-all hover:border-white/[0.20] hover:bg-white/[0.05]"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <GitHub size={16} />
                <span>View on GitHub</span>
              </motion.a>
            </Magnetic>
          </motion.div>
        </motion.div>

        {/* Terminal Demo */}
        <motion.div
          className="mt-12 md:mt-20"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8, ease: easing.gentle }}
        >
          <TerminalDemo />
        </motion.div>
      </div>
    </section>
  );
}
