"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { GitHub, Terminal } from "./icons";

export function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="relative border-t border-white/[0.04] bg-black">
      {/* Top glow line */}
      <div className="absolute top-0 left-1/2 h-px w-1/2 -translate-x-1/2 bg-[#1793d1]/20" />
      
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-12">
        <motion.div 
          className="flex flex-col items-center justify-between gap-6 md:flex-row"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          {/* Left */}
          <div className="flex flex-col items-center gap-3 md:flex-row md:items-center md:gap-6">
            <Link href="/" className="group flex items-center gap-2 text-white/60 transition-colors hover:text-white/80">
              <motion.div whileHover={{ rotate: [0, -10, 10, 0] }} transition={{ duration: 0.4 }}>
                <Terminal size={18} className="text-[#1793d1]" />
              </motion.div>
              <span className="text-[13px] font-medium">linux configs</span>
            </Link>
            <span className="hidden h-4 w-px bg-white/10 md:block" />
            <span className="text-[12px] text-white/30 sm:text-[13px]">
              Built by{" "}
              <a
                href="https://github.com/insaneodyssey26"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/50 transition-colors hover:text-[#1793d1]"
              >
                Masum
              </a>
            </span>
          </div>

          {/* Right */}
          <div className="flex flex-col items-center gap-3 md:flex-row md:items-center md:gap-6">
            <span className="text-[11px] text-white/20 sm:text-[12px]">© {currentYear}</span>
            <a
              href="https://github.com/insaneodyssey26/Linux-configs/blob/main/LICENSE"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[12px] text-white/30 transition-colors hover:text-white/50 sm:text-[13px]"
            >
              MIT License
            </a>
            <motion.a
              href="https://github.com/insaneodyssey26/Linux-configs"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-[12px] text-white/30 transition-colors hover:text-white/50"
              whileHover={{ x: 2 }}
            >
              <GitHub size={14} />
              <span>Repository</span>
            </motion.a>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
