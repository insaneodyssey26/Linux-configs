"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Copy, Check } from "./icons";
import { dependencies } from "@/lib/configs";
import { cn } from "@/lib/utils";

export function InstallSection() {
  const [copied, setCopied] = useState<string | null>(null);

  const handleCopy = async (text: string, id: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(id);
      setTimeout(() => setCopied(null), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const commands = [
    {
      id: "clone",
      label: "Clone repository",
      command: "git clone https://github.com/insaneodyssey26/Linux-configs.git ~/dotfiles",
    },
    {
      id: "deps",
      label: "Install dependencies",
      command: dependencies.installCommand,
    },
  ];

  return (
    <section id="installation" className="relative py-16 md:py-24">
      
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
          {/* Left column - Text */}
          <motion.div
            className="min-w-0"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <span className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.02] px-3 py-1 text-[11px] font-medium uppercase tracking-wider text-white/50 sm:px-4 sm:py-1.5 sm:text-[12px]">
              <span className="h-1 w-1 rounded-full bg-[#1793d1] sm:h-1.5 sm:w-1.5" />
              Installation
            </span>
            <h2 className="text-2xl font-semibold tracking-tight text-white/90 sm:text-3xl md:text-4xl">
              Get started in minutes
            </h2>
            <p className="mt-3 text-base leading-relaxed text-white/50 sm:text-lg">
              Clone the repository, install the required tools, and manually
              symlink the configuration files to their proper locations.
            </p>

            {/* Warning */}
            <motion.div 
              className="mt-6 rounded-xl border border-amber-500/20 bg-amber-500/10 p-5"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-6 h-6 rounded-lg bg-amber-500/20 flex items-center justify-center mt-0.5">
                  <motion.span 
                    className="text-amber-400 text-sm"
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    ⚠
                  </motion.span>
                </div>
                <div>
                  <p className="text-[14px] leading-relaxed text-amber-200/90 font-medium mb-1 sm:text-[15px]">
                    Manual Setup Required
                  </p>
                  <p className="text-[13px] leading-relaxed text-amber-200/60 sm:text-[14px] break-words">
                    The automated setup script is not yet ready. Please copy or symlink 
                    configuration files manually (see README for details).
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Dependencies */}
            <motion.div 
              className="mt-10"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <h3 className="mb-4 text-[15px] font-medium text-white/70">
                Required tools
              </h3>
              <div className="flex flex-wrap gap-2 min-w-0">
                {[...dependencies.core, ...dependencies.tools].map((dep, i) => (
                  <motion.span
                    key={dep}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 + i * 0.03 }}
                    whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.05)" }}
                    className="cursor-default min-w-0 rounded-lg border border-white/[0.06] bg-white/[0.02] px-3 py-1.5 font-mono text-[13px] text-white/50 transition-colors"
                  >
                    {dep}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Right column - Commands */}
          <motion.div 
            className="space-y-4 min-w-0"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            {commands.map((cmd, index) => (
              <motion.div
                key={cmd.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 + index * 0.1 }}
                whileHover={{ scale: 1.01 }}
                className={cn(
                  "group relative overflow-hidden rounded-xl",
                  "border border-white/[0.06] bg-white/[0.02]",
                  "transition-all duration-300",
                  "hover:border-white/[0.12] hover:bg-white/[0.03]"
                )}
              >
                <div className="relative flex items-center justify-between border-b border-white/[0.04] bg-white/[0.01] px-4 py-3">
                  <div className="flex items-center gap-3">
                    <motion.span 
                      className={cn(
                        "flex h-7 w-7 items-center justify-center rounded-lg text-[12px] font-semibold",
                        copied === cmd.id 
                          ? "bg-emerald-500/20 text-emerald-400" 
                          : "bg-[#1793d1]/10 text-[#1793d1]"
                      )}
                      animate={copied === cmd.id ? { scale: [1, 1.2, 1] } : {}}
                    >
                      {copied === cmd.id ? "✓" : index + 1}
                    </motion.span>
                    <span className="text-[13px] font-medium text-white/70">
                      {cmd.label}
                    </span>
                  </div>
                  <motion.button
                    onClick={() => handleCopy(cmd.command, cmd.id)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={cn(
                      "flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-[12px] font-medium transition-all",
                      copied === cmd.id
                        ? "bg-emerald-500/20 text-emerald-400"
                        : "text-white/40 hover:bg-white/[0.08] hover:text-white/70"
                    )}
                  >
                    <AnimatePresence mode="wait">
                      {copied === cmd.id ? (
                        <motion.span
                          key="copied"
                          initial={{ opacity: 0, y: 5 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -5 }}
                          className="flex items-center gap-1.5"
                        >
                          <Check size={14} />
                          <span>Copied!</span>
                        </motion.span>
                      ) : (
                        <motion.span
                          key="copy"
                          initial={{ opacity: 0, y: 5 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -5 }}
                          className="flex items-center gap-1.5"
                        >
                          <Copy size={14} />
                          <span>Copy</span>
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </motion.button>
                </div>
                <div className="relative bg-[#0a0a0a] p-4 min-w-0">
                  <code className="block overflow-x-auto whitespace-pre-wrap break-words font-mono text-[13px] text-emerald-400/80 scrollbar-thin">
                    <span className="text-[#1793d1]/60">$ </span>
                    {cmd.command}
                  </code>
                </div>
              </motion.div>
            ))}

            {/* After install */}
            <motion.div 
              className="rounded-xl border border-white/[0.04] bg-white/[0.02] p-5"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
            >
              <div className="flex items-start gap-3">
                <span className="text-lg">💡</span>
                <p className="text-[14px] leading-relaxed text-white/40">
                  After installation, restart your terminal or log out and back in
                  to see all changes take effect.
                </p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
