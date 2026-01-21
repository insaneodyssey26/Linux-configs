"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const bootSequence = [
  { text: "$ fastfetch", type: "command" as const, delay: 0 },
  { text: "", type: "output" as const, delay: 200 },
  { text: "        /\\         masum@arch", type: "output" as const, delay: 300 },
  { text: "       /  \\        -----------", type: "output" as const, delay: 50 },
  { text: "      /    \\       OS: Arch Linux x86_64", type: "output" as const, delay: 50 },
  { text: "     /      \\      Kernel: 6.12.8-zen1-1-zen", type: "output" as const, delay: 50 },
  { text: "    /   __   \\     Shell: fish 3.7.1", type: "output" as const, delay: 50 },
  { text: "   /   (  )   \\    DE: GNOME 47", type: "output" as const, delay: 50 },
  { text: "  /   __)(____\\   Terminal: ghostty", type: "output" as const, delay: 50 },
  { text: " /___/        \\   CPU: AMD Ryzen 7", type: "output" as const, delay: 50 },
  { text: "", type: "output" as const, delay: 100 },
  { text: "$ ls -la ~/dotfiles", type: "command" as const, delay: 800 },
  { text: "", type: "output" as const, delay: 200 },
  { text: "drwxr-xr-x  config.fish", type: "file" as const, delay: 100 },
  { text: "drwxr-xr-x  Ghostty/", type: "folder" as const, delay: 80 },
  { text: "drwxr-xr-x  Kitty/", type: "folder" as const, delay: 80 },
  { text: "drwxr-xr-x  Starship/", type: "folder" as const, delay: 80 },
  { text: "drwxr-xr-x  fastfetch/", type: "folder" as const, delay: 80 },
  { text: "", type: "output" as const, delay: 100 },
  { text: "$ echo \"Ready to configure!\"", type: "command" as const, delay: 600 },
  { text: "Ready to configure!", type: "success" as const, delay: 300 },
];

export function TerminalDemo() {
  const [lines, setLines] = useState<typeof bootSequence>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const [typedCommand, setTypedCommand] = useState("");
  const terminalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (currentIndex < bootSequence.length) {
      const currentLine = bootSequence[currentIndex];
      
      // Typing effect for commands
      if (currentLine.type === "command" && typedCommand.length < currentLine.text.length) {
        setIsTyping(true);
        const typingTimer = setTimeout(() => {
          setTypedCommand(currentLine.text.slice(0, typedCommand.length + 1));
        }, 30 + Math.random() * 40); // Random typing speed for realism
        return () => clearTimeout(typingTimer);
      }
      
      // Command finished typing, add it and move on
      if (currentLine.type === "command" && typedCommand.length === currentLine.text.length) {
        const timer = setTimeout(() => {
          setLines((prev) => [...prev, currentLine]);
          setCurrentIndex((prev) => prev + 1);
          setTypedCommand("");
          setIsTyping(false);
        }, 150);
        return () => clearTimeout(timer);
      }
      
      // Non-command lines
      const timer = setTimeout(() => {
        setLines((prev) => [...prev, bootSequence[currentIndex]]);
        setCurrentIndex((prev) => prev + 1);
      }, bootSequence[currentIndex].delay);

      return () => clearTimeout(timer);
    }
  }, [currentIndex, typedCommand]);

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [lines, typedCommand]);

  const getLineColor = (type: string) => {
    switch (type) {
      case "command": return "text-[#98c379]";
      case "success": return "text-[#98c379]";
      case "file": return "text-white/70";
      case "folder": return "text-[#61afef]";
      default: return "text-white/60";
    }
  };

  return (
    <motion.div 
      className="mx-auto w-full max-w-3xl overflow-hidden rounded-2xl border border-white/[0.08] bg-[#0c0c0c] shadow-2xl shadow-black/50"
      initial={{ opacity: 0, y: 20, scale: 0.98 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      {/* Terminal Header */}
      <div className="flex items-center justify-between border-b border-white/[0.06] bg-gradient-to-b from-white/[0.04] to-white/[0.02] px-4 py-3">
        <div className="flex items-center gap-3">
          <div className="flex gap-2">
            <motion.span 
              className="h-3 w-3 rounded-full bg-[#ff5f56]" 
              whileHover={{ scale: 1.2 }}
            />
            <motion.span 
              className="h-3 w-3 rounded-full bg-[#ffbd2e]" 
              whileHover={{ scale: 1.2 }}
            />
            <motion.span 
              className="h-3 w-3 rounded-full bg-[#27ca40]" 
              whileHover={{ scale: 1.2 }}
            />
          </div>
          <span className="ml-2 font-mono text-[13px] text-white/40">
            ghostty — fish
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-[11px] text-white/30">live</span>
        </div>
      </div>

      {/* Terminal Body */}
      <div
        ref={terminalRef}
        className="h-[340px] overflow-y-auto bg-gradient-to-b from-[#0d0d0d] to-black p-5 font-mono text-[13px] leading-relaxed scrollbar-thin"
      >
        <AnimatePresence>
          {lines.map((line, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -5 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.15 }}
              className="min-h-[1.6em]"
            >
              <span className={getLineColor(line.type)}>{line.text}</span>
            </motion.div>
          ))}
        </AnimatePresence>
        
        {/* Currently typing command */}
        {isTyping && bootSequence[currentIndex]?.type === "command" && (
          <div className="min-h-[1.6em] flex items-center">
            <span className="text-[#98c379]">{typedCommand}</span>
            <motion.span 
              className="ml-0.5 inline-block h-4 w-2 bg-white/80"
              animate={{ opacity: [1, 0] }}
              transition={{ duration: 0.5, repeat: Infinity }}
            />
          </div>
        )}
        
        {/* Final cursor */}
        {currentIndex >= bootSequence.length && (
          <motion.div 
            className="flex items-center gap-1 text-white/60"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <span className="text-[#98c379]">❯</span>
            <motion.span 
              className="inline-block h-4 w-2 bg-white/80"
              animate={{ opacity: [1, 0] }}
              transition={{ duration: 0.6, repeat: Infinity }}
            />
          </motion.div>
        )}
      </div>

      {/* Terminal footer with glow */}
      <div className="h-px bg-[#1793d1]/30" />
    </motion.div>
  );
}
