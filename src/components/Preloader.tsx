"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const words = [
  "Bem-vindo",
  "Welcome",
  "Bienvenido",
  "Bienvenue",
  "ようこそ",
  "Benvenuto",
  "Willkommen"
];

export function Preloader({ onComplete }: { onComplete: () => void }) {
  const [index, setIndex] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    if (index < words.length - 1) {
      const timeout = setTimeout(() => {
        setIndex(index + 1);
      }, 400);
      return () => clearTimeout(timeout);
    } else {
      const timeout = setTimeout(() => {
        setIsFinished(true);
      }, 1000);
      return () => clearTimeout(timeout);
    }
  }, [index]);

  return (
    <div className="fixed inset-0 z-[999] flex">
      {/* Porta Esquerda */}
      <motion.div
        initial={{ x: 0 }}
        animate={{ x: isFinished ? "-100%" : 0 }}
        transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }}
        className="h-full w-1/2 bg-[#0a0a0a]"
      />
      
      {/* Porta Direita */}
      <motion.div
        initial={{ x: 0 }}
        animate={{ x: isFinished ? "100%" : 0 }}
        transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }}
        onAnimationComplete={() => {
          if (isFinished) {
            onComplete();
          }
        }}
        className="h-full w-1/2 bg-[#0a0a0a]"
      />

      {/* Container do Texto */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <AnimatePresence mode="wait">
          {!isFinished && (
            <motion.p
              key={index}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="text-white text-3xl md:text-5xl lg:text-6xl font-bold tracking-widest uppercase flex items-center gap-4"
            >
              <span className="w-3 h-3 bg-white rounded-full animate-pulse" />
              {words[index]}
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
