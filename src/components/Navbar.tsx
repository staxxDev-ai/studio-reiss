"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Grip, X, ArrowUpRight } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import Link from "next/link";
import Image from "next/image";

export function Navbar({ onOpenDevoc }: { onOpenDevoc?: () => void }) {
  const [isOpen, setIsOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();

  type NavLink = { name: string; href: string; target?: string; disabled?: boolean; badge?: string };
  const navLinks: NavLink[] = [
    { name: t("nav.home"), href: "#inicio" },
    { name: t("nav.about"), href: "#about" },
    { name: t("nav.experience"), href: "#experience" },
    { name: t("nav.works"), href: "#works" },
    { name: t("nav.resume"), href: "/curriculo-gabriel-reis.pdf", target: "_blank" },
  ];

  return (
    <>
      <div className="fixed top-0 left-0 w-full flex items-center justify-end gap-3 p-6 md:p-10 z-50 pointer-events-none">
        {/* Botões de Idioma */}
        <div className="pointer-events-auto flex items-center gap-4 bg-black/20 backdrop-blur-md rounded-full px-5 h-12 border border-white/10">
          <button onClick={() => setLanguage("BR")} className={`text-sm md:text-base font-medium tracking-wider leading-none transition-all hover:scale-110 ${language === "BR" ? "opacity-100 text-white" : "opacity-40 hover:opacity-100"}`} title="Português">BR</button>
          <button onClick={() => setLanguage("US")} className={`text-sm md:text-base font-medium tracking-wider leading-none transition-all hover:scale-110 ${language === "US" ? "opacity-100 text-white" : "opacity-40 hover:opacity-100"}`} title="English">US</button>
          <button onClick={() => setLanguage("ES")} className={`text-sm md:text-base font-medium tracking-wider leading-none transition-all hover:scale-110 ${language === "ES" ? "opacity-100 text-white" : "opacity-40 hover:opacity-100"}`} title="Español">ES</button>
        </div>

        {/* Menu Toggle Top Right */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="pointer-events-auto cursor-pointer w-12 h-12 text-white hover:text-white/70 transition-colors bg-black/20 backdrop-blur-md rounded-full border border-white/10 flex items-center justify-center shrink-0"
          aria-label="Toggle Menu"
        >
          {isOpen ? <X className="w-5 h-5" /> : <Grip className="w-5 h-5" />}
        </button>
      </div>

      {/* Overlay do Menu Redesenhado */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-40 bg-black/60 backdrop-blur-md flex items-center justify-center p-4 md:p-12"
          >
            {/* Container Modal Arredondado */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="w-full max-w-[1200px] max-h-[95vh] overflow-y-auto bg-[#111111] border border-white/5 rounded-[2rem] md:rounded-[3rem] p-6 md:p-12 grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-10 md:gap-16 shadow-2xl"
            >
              
              {/* Lado Esquerdo: Cards Especiais */}
              <div className="flex flex-col gap-6 w-full">
                {/* Card Devoc */}
                <div 
                  onClick={() => {
                    setIsOpen(false);
                    onOpenDevoc?.();
                  }}
                  className="bg-[#111111] border border-white/10 rounded-[1.5rem] md:rounded-[2rem] p-8 flex flex-col justify-between relative overflow-hidden h-[250px] md:h-[320px] group cursor-pointer shadow-inner"
                >
                   <div className="z-10 h-8 md:h-10 w-32 relative">
                     <Image src="/logos/devoc.png" alt="Devoc Parts" fill className="object-contain object-left brightness-0 invert" unoptimized />
                   </div>
                   <div className="z-10 mt-auto">
                     <p className="text-white text-2xl md:text-3xl font-medium leading-tight group-hover:translate-x-2 transition-transform duration-500">
                       Website Institucional<br/>& UX/UI Design
                     </p>
                     <p className="text-white/50 text-sm mt-3">Case Devoc Parts</p>
                   </div>
                   {/* Capa do Projeto Devoc como Fundo */}
                   <div className="absolute inset-0 w-full h-full pointer-events-none z-0">
                      <Image 
                        src="/devoc/devoc-cover.png" 
                        alt="Devoc Preview" 
                        fill 
                        className="object-cover opacity-40 group-hover:opacity-60 transition-all duration-700 group-hover:scale-105" 
                        unoptimized 
                      />
                      {/* Overlay escuro para garantir leitura do texto */}
                      <div className="absolute inset-0 bg-gradient-to-t from-[#111111] via-[#111111]/80 to-transparent" />
                   </div>
                </div>

                {/* Card Reis PSD */}
                <div className="bg-gradient-to-br from-[#1a1a1a] to-[#050505] border border-white/10 rounded-[1.5rem] md:rounded-[2rem] p-8 flex flex-col justify-between h-[250px] md:h-[320px] relative overflow-hidden group cursor-pointer shadow-inner">
                   <div className="z-10">
                     <h2 className="text-white font-sans font-bold text-2xl tracking-tighter">
                       REIS<span className="font-light text-white/50">PSD</span>
                     </h2>
                     <p className="text-white/40 text-xs mt-1 font-mono uppercase tracking-widest">Estúdio Criativo</p>
                   </div>
                   <div className="z-10 mt-auto">
                     <p className="text-white text-2xl md:text-3xl font-medium leading-tight group-hover:translate-x-2 transition-transform duration-500">
                       Design Gráfico &<br/>Identidade Visual
                     </p>
                     <p className="text-white/50 text-sm mt-3">Projetos selecionados de Branding</p>
                   </div>
                   {/* Abstract shape */}
                   <div className="absolute left-[-20%] bottom-[-20%] w-[70%] h-[70%] bg-white/5 rounded-full blur-[60px] group-hover:bg-white/10 transition-colors duration-700" />
                </div>
              </div>

              {/* Lado Direito: Lista de Links */}
              <div className="flex flex-col justify-center gap-2 md:gap-4 lg:pl-8">
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 + i * 0.05 }}
                  >
                    <Link
                      href={link.href}
                      target={link.target}
                      onClick={(e) => {
                         if(link.disabled) {
                           e.preventDefault();
                         } else {
                           setTimeout(() => setIsOpen(false), 150);
                         }
                      }}
                      className={`flex items-center justify-between py-5 border-b border-white/5 group ${link.disabled ? "cursor-default" : "hover:border-white/20 transition-colors"}`}
                    >
                      <div className="flex items-center gap-4">
                        <span className={`text-2xl md:text-3xl transition-colors ${link.disabled ? "text-white/20" : "text-white/90 font-medium group-hover:text-white"}`}>
                          {link.name}
                        </span>
                        {link.badge && (
                          <span className="text-[10px] font-mono text-white/30 tracking-wider">
                            {link.badge}
                          </span>
                        )}
                      </div>
                      <ArrowUpRight className={`w-6 h-6 transition-all ${link.disabled ? "text-white/20" : "text-white/50 group-hover:text-white group-hover:translate-x-1 group-hover:-translate-y-1"}`} />
                    </Link>
                  </motion.div>
                ))}
              </div>
              
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
