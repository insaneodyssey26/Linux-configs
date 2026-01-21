"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Copy, Check, ExternalLink } from "./icons";
import type { ConfigItem } from "@/lib/configs";
import { cn } from "@/lib/utils";

interface ConfigCardProps {
  config: ConfigItem;
  index?: number;
}

export function ConfigCard({ config, index = 0 }: ConfigCardProps) {
  const [copied, setCopied] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const codeRef = useRef<HTMLPreElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(config.code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    cardRef.current.style.setProperty("--mouse-x", `${x}px`);
    cardRef.current.style.setProperty("--mouse-y", `${y}px`);
  };

  return (
    <motion.article
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-2xl",
        "border border-white/[0.06] bg-white/[0.02]",
        "transition-all duration-500",
        "hover:border-white/[0.12] hover:bg-white/[0.03]"
      )}
    >
      {/* Header */}
      <div className="relative z-10 flex items-start justify-between gap-4 p-6 pb-4">
        <div className="flex-1 min-w-0">
          <div className="mb-2 flex items-center gap-2">
            <motion.span 
              className="rounded-md bg-[#1793d1]/15 px-2.5 py-1 text-[11px] font-medium uppercase tracking-wider text-[#1793d1]/80"
              whileHover={{ scale: 1.05 }}
            >
              {config.category}
            </motion.span>
          </div>
          <h3 className="text-lg font-semibold tracking-tight text-white/90 transition-colors group-hover:text-white">
            {config.title}
          </h3>
          <p className="mt-1.5 text-[14px] leading-relaxed text-white/50">
            {config.description}
          </p>
        </div>
      </div>

      {/* Features */}
      {config.features && config.features.length > 0 && (
        <div className="relative z-10 flex flex-wrap gap-2 px-6 pb-4">
          {config.features.slice(0, 3).map((feature, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 + i * 0.05 }}
              className="rounded-full border border-white/[0.06] bg-white/[0.02] px-3 py-1 text-[12px] text-white/40 transition-colors group-hover:border-white/[0.1] group-hover:text-white/50"
            >
              {feature}
            </motion.span>
          ))}
          {config.features.length > 3 && (
            <span className="rounded-full border border-white/[0.06] bg-white/[0.02] px-3 py-1 text-[12px] text-white/40">
              +{config.features.length - 3} more
            </span>
          )}
        </div>
      )}

      {/* Code Block */}
      <div className="relative z-10 flex-1">
        <div className="flex items-center justify-between border-y border-white/[0.04] bg-black/40 px-4 py-2.5">
          <div className="flex items-center gap-3">
            {/* Traffic lights */}
            <div className="flex gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-white/10" />
              <span className="h-2.5 w-2.5 rounded-full bg-white/10" />
              <span className="h-2.5 w-2.5 rounded-full bg-white/10" />
            </div>
            <span className="font-mono text-[12px] text-white/30">
              {config.filename}
            </span>
          </div>
          <motion.button
            onClick={handleCopy}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={cn(
              "flex items-center gap-1.5 rounded-md px-2.5 py-1 text-[12px] font-medium transition-all",
              copied
                ? "bg-emerald-500/20 text-emerald-400"
                : "text-white/40 hover:bg-white/[0.06] hover:text-white/70"
            )}
          >
            <AnimatePresence mode="wait">
              {copied ? (
                <motion.span
                  key="copied"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="flex items-center gap-1.5"
                >
                  <Check size={14} />
                  <span>Copied!</span>
                </motion.span>
              ) : (
                <motion.span
                  key="copy"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="flex items-center gap-1.5"
                >
                  <Copy size={14} />
                  <span>Copy</span>
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>
        </div>
        <div className="max-h-[280px] overflow-auto bg-[#0a0a0a] scrollbar-thin">
          <pre
            ref={codeRef}
            className="p-4 font-mono text-[12px] leading-[1.7] text-white/70"
          >
            <code>{config.code}</code>
          </pre>
        </div>
      </div>

      {/* Footer */}
      <div className="relative z-10 flex items-center justify-between border-t border-white/[0.04] bg-white/[0.01] px-6 py-3">
        {config.attribution ? (
          <a
            href={config.attribution.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[12px] text-white/30 transition-colors hover:text-white/50"
          >
            {config.attribution.text}
          </a>
        ) : (
          <span />
        )}
        <motion.a
          href={`https://github.com/insaneodyssey26/Linux-configs/blob/main/${config.githubPath}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 text-[13px] text-white/40 transition-colors hover:text-white/70"
          whileHover={{ x: 2 }}
        >
          <span>View file</span>
          <ExternalLink size={12} />
        </motion.a>
      </div>
    </motion.article>
  );
}
