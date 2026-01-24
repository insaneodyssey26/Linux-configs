"use client";

import { motion } from "framer-motion";
import { ConfigCard } from "./config-card";
import { configs } from "@/lib/configs";

export function ConfigsSection() {
  return (
    <section id="configs" className="relative py-16 md:py-24">
      {/* Background gradient */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-0 left-0 h-px w-full bg-white/[0.06]" />
      </div>

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        {/* Section Header */}
        <motion.div
          className="mb-12 text-center md:mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <motion.span 
            className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.02] px-3 py-1 text-[11px] font-medium uppercase tracking-wider text-white/50 backdrop-blur-sm sm:px-4 sm:py-1.5 sm:text-[12px]"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <span className="h-1 w-1 rounded-full bg-[#1793d1] sm:h-1.5 sm:w-1.5" />
            Configurations
          </motion.span>
          <motion.h2 
            className="text-2xl font-semibold tracking-tight text-white/90 sm:text-3xl md:text-4xl"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            Everything you need
          </motion.h2>
          <motion.p 
            className="mx-auto mt-3 max-w-lg text-base text-white/50 sm:text-lg"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            A complete set of configurations for a cohesive, modern Linux
            experience. Each file is crafted for efficiency and aesthetics.
          </motion.p>
        </motion.div>

        {/* Config Grid */}
        <div className="grid gap-4 sm:gap-6 md:grid-cols-2">
          {configs.map((config, index) => (
            <ConfigCard key={config.id} config={config} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
