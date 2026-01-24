"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { GitHub, Menu, X, Terminal } from "./icons";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "#configs", label: "Configs" },
  { href: "#installation", label: "Install" },
];

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);
  const { scrollY } = useScroll();
  
  const headerBackground = useTransform(
    scrollY,
    [0, 100],
    ["rgba(0, 0, 0, 0)", "rgba(0, 0, 0, 0.8)"]
  );
  
  const headerBorder = useTransform(
    scrollY,
    [0, 100],
    ["rgba(255, 255, 255, 0)", "rgba(255, 255, 255, 0.06)"]
  );

  useEffect(() => {
    const handleScroll = () => setHasScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [mobileMenuOpen]);

  return (
    <>
      <motion.header
        style={{ 
          backgroundColor: headerBackground,
          borderBottomColor: headerBorder,
        }}
        className={cn(
          "fixed top-0 left-0 right-0 z-50 border-b backdrop-blur-xl transition-all duration-300",
          hasScrolled && "backdrop-saturate-150"
        )}
      >
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="flex h-14 items-center justify-between md:h-16">
            {/* Logo */}
            <Link
              href="/"
              className="group flex items-center gap-2 text-white/90 transition-colors hover:text-white"
            >
              <motion.div
                whileHover={{ rotate: [0, -10, 10, 0] }}
                transition={{ duration: 0.4 }}
              >
                <Terminal size={20} className="text-[#1793d1] transition-colors group-hover:text-[#1ca3e3]" />
              </motion.div>
              <span className="text-[14px] font-medium tracking-[-0.01em]">
                linux configs
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden items-center gap-1 md:flex">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="group relative px-3 py-2 text-[14px] text-white/50 transition-colors hover:text-white/90 md:px-4"
                >
                  {link.label}
                  <span className="absolute inset-x-3 -bottom-px h-px bg-[#1793d1]/50 opacity-0 transition-opacity group-hover:opacity-100 md:inset-x-4" />
                </Link>
              ))}
              <motion.a
                href="https://github.com/insaneodyssey26/Linux-configs"
                target="_blank"
                rel="noopener noreferrer"
                className="ml-2 flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.02] px-3 py-2 text-[14px] text-white/70 transition-all hover:border-white/[0.15] hover:bg-white/[0.05] hover:text-white md:ml-3 md:px-4"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <GitHub size={16} />
                <span>GitHub</span>
              </motion.a>
            </nav>

            {/* Mobile Menu Button */}
            <motion.button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="flex h-9 w-9 items-center justify-center rounded-xl text-white/60 transition-colors hover:bg-white/[0.05] hover:text-white md:hidden"
              whileTap={{ scale: 0.95 }}
              aria-label="Toggle menu"
              aria-expanded={mobileMenuOpen}
            >
              <AnimatePresence mode="wait">
                {mobileMenuOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X size={20} />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu size={20} />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-black/98 backdrop-blur-2xl md:hidden motion-anim"
          >
            <motion.div 
              className="flex h-full flex-col items-center justify-center gap-6 px-4"
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: { staggerChildren: 0.1, delayChildren: 0.1 },
                },
              }}
            >
              {navLinks.map((link) => (
                <motion.div
                  key={link.href}
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0, transition: { duration: 0.35 } },
                  }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-3xl font-medium text-white/80 transition-colors hover:text-white sm:text-3xl"
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.35 } },
                }}
              >
                <a
                  href="https://github.com/insaneodyssey26/Linux-configs"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setMobileMenuOpen(false)}
                  className="mt-2 flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-5 py-3 text-base text-white/90 transition-all hover:bg-white/10 sm:px-6 sm:text-lg"
                >
                  <GitHub size={18} />
                  <span>View on GitHub</span>
                </a>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
