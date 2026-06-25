"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useState } from "react";

export function AnimatedBackground() {
  const [isMounted, setIsMounted] = useState(false);

  // Mouse tracking values
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth springs para o movimento seguir o mouse de forma mais ágil
  const springX = useSpring(mouseX, { stiffness: 300, damping: 30 });
  const springY = useSpring(mouseY, { stiffness: 300, damping: 30 });

  useEffect(() => {
    setIsMounted(true);
    
    // Inicia os orbs no centro da tela antes de rastrear o mouse
    mouseX.set(window.innerWidth / 2);
    mouseY.set(window.innerHeight / 2);

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  if (!isMounted) return null;

  // Gera os orbs ambientes originais
  const circles = Array.from({ length: 12 }).map((_, i) => ({
    id: i,
    size: Math.random() * 200 + 100,
    x: Math.random() * 100,
    y: Math.random() * 100,
    duration: Math.random() * 20 + 15,
    delay: Math.random() * 5,
    parallaxFactor: (Math.random() - 0.5) * 0.1, // Para parallax sutil
  }));

  return (
    <div className="fixed inset-0 z-[1000] overflow-hidden bg-transparent pointer-events-none">
      
      {/* 🌟 ORB GIGANTE INTERATIVO (Segue o mouse) */}
      <motion.div
        className="absolute rounded-full bg-white pointer-events-none"
        style={{
          width: 800,
          height: 800,
          left: springX,
          top: springY,
          translateX: "-50%",
          translateY: "-50%",
          opacity: 0.05, // Opacidade super suave
          filter: "blur(140px)", // Blur gigante para dar aquele glow difuso estilo LP
        }}
      />

      {/* Círculos flutuantes originais (Ambiente) */}
      {circles.map((circle) => (
        <motion.div
          key={circle.id}
          className="absolute rounded-full bg-white pointer-events-none"
          style={{
            width: circle.size,
            height: circle.size,
            top: `${circle.y}%`,
            left: `${circle.x}%`,
            opacity: 0.03, // Opacidade bem sutil
            filter: "blur(80px)",
          }}
          animate={{
            x: [0, Math.random() * 150 - 75, 0],
            y: [0, Math.random() * 150 - 75, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: circle.duration,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
            delay: circle.delay,
          }}
        />
      ))}
      
      {/* Noise/Gradient sutil por cima para texturizar */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/[0.01] to-transparent pointer-events-none" />
    </div>
  );
}
