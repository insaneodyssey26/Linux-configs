"use client";

import { motion } from "framer-motion";
import { GitHub } from "./icons";
import { Magnetic } from "@/lib/animations";

export function CtaSection() {
  return (
    <section className="relative overflow-hidden border-t border-white/[0.04] py-16 md:py-24">
      {/* Background removed for simplicity and better performance on mobile */}

      <motion.div 
        className="relative mx-auto max-w-6xl px-4 sm:px-6 text-center"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
      >
        <motion.h2 
          className="text-xl font-semibold tracking-tight text-white/90 sm:text-2xl md:text-3xl"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
        >
          Ready to upgrade your setup?
        </motion.h2>
        <motion.p 
          className="mx-auto mt-3 max-w-md text-base text-white/50 sm:text-lg"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          Fork the repository, customize to your liking, and enjoy a refined
          development environment.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-6 md:mt-8"
        >
          <Magnetic strength={0.15}>
            <motion.a
              href="https://github.com/insaneodyssey26/Linux-configs"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-white px-5 py-2.5 text-[14px] font-medium text-black"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {/* Shine effect */}
              <motion.div
                className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-black/[0.05] to-transparent"
                animate={{ translateX: ["-100%", "200%"] }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
              />
              <GitHub size={16} className="relative" />
              <span className="relative">Get started on GitHub</span>
            </motion.a>
          </Magnetic>
        </motion.div>
      </motion.div>
    </section>
  );
}
