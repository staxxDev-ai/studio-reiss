"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Briefcase, ChevronRight, Mail, Globe, AtSign, MessageCircle, Camera, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { AnimatedBackground } from "@/components/AnimatedBackground";
import { Preloader } from "@/components/Preloader";
import { useLanguage } from "@/context/LanguageContext";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring" as const, stiffness: 300, damping: 24 },
  },
};

type ProjectType = {
  title: string;
  category: string;
  image: string;
  description: string;
  gallery: string[];
};

export default function Home() {
  const [showAllProjects, setShowAllProjects] = useState(false);
  const [selectedProject, setSelectedProject] = useState<ProjectType | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  const { t } = useLanguage();

  const PROJECTS: ProjectType[] = [
    {
      title: t("project.devoc.title"),
      category: t("project.devoc.category"),
      image: "/devoc/devoc-cover.png",
      description: t("project.devoc.desc"),
      gallery: [
        "iframe:https://teste.devocparts.com/"
      ]
    },
    {
      title: t("project.sushi.title"),
      category: t("project.sushi.category"),
      image: "https://cdn.wallofportfolios.in/production/images/portfolio_activetab.461cd8e56f1a.svg",
      description: t("project.sushi.desc"),
      gallery: [
        "https://cdn.wallofportfolios.in/production/images/portfolio_activetab.461cd8e56f1a.svg",
        "https://cdn.wallofportfolios.in/production/images/portfolio_activetab.461cd8e56f1a.svg"
      ]
    },
    {
      title: t("project.zomato.title"),
      category: t("project.zomato.category"),
      image: "https://cdn.wallofportfolios.in/production/images/portfolio_activetab.461cd8e56f1a.svg",
      description: t("project.zomato.desc"),
      gallery: [
        "https://cdn.wallofportfolios.in/production/images/portfolio_activetab.461cd8e56f1a.svg",
        "https://cdn.wallofportfolios.in/production/images/portfolio_activetab.461cd8e56f1a.svg"
      ]
    },
    {
      title: t("project.case3.title"),
      category: t("project.case3.category"),
      image: "https://cdn.wallofportfolios.in/production/images/portfolio_activetab.461cd8e56f1a.svg",
      description: t("project.case3.desc"),
      gallery: [
        "https://cdn.wallofportfolios.in/production/images/portfolio_activetab.461cd8e56f1a.svg",
        "https://cdn.wallofportfolios.in/production/images/portfolio_activetab.461cd8e56f1a.svg"
      ]
    },
    {
      title: t("project.case4.title"),
      category: t("project.case4.category"),
      image: "https://cdn.wallofportfolios.in/production/images/portfolio_activetab.461cd8e56f1a.svg",
      description: t("project.case4.desc"),
      gallery: [
        "https://cdn.wallofportfolios.in/production/images/portfolio_activetab.461cd8e56f1a.svg",
        "https://cdn.wallofportfolios.in/production/images/portfolio_activetab.461cd8e56f1a.svg"
      ]
    }
  ];

  const displayedProjects = showAllProjects ? PROJECTS : PROJECTS.slice(0, 2);

  useEffect(() => {
    const rawCount = localStorage.getItem("site_reload_count");
    let count = rawCount ? parseInt(rawCount, 10) : 0;
    
    // Se count for 0, 3, 6, etc (resto da divisão for 0), roda a animação.
    // Assim roda na 1ª vez, pula 2, e roda de novo.
    if (count % 3 !== 0) {
      setIsLoading(false);
    }
    
    count += 1;
    localStorage.setItem("site_reload_count", count.toString());
  }, []);

  // Bloqueia o scroll do body quando o modal está aberto ou durante o loading
  useEffect(() => {
    if (selectedProject || isLoading) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [selectedProject, isLoading]);

  return (
    <>
      <AnimatePresence>
        {isLoading && (
          <Preloader 
            onComplete={() => {
              setIsLoading(false);
            }} 
          />
        )}
      </AnimatePresence>
      <AnimatedBackground />
      {!selectedProject && <Navbar onOpenDevoc={() => setSelectedProject(PROJECTS[0])} />}
      <main className="min-h-screen flex flex-col items-center justify-center p-6 sm:p-12 md:p-24 relative z-10">
        <motion.div
          className="w-full max-w-7xl flex flex-col gap-16 md:gap-24"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Hero Section Redesenhada */}
          <motion.section id="inicio" variants={itemVariants} className="relative w-full min-h-[85vh] flex flex-col justify-center pt-32 pb-10">
            <div className="flex flex-col md:flex-row items-center justify-between gap-10">
              
              {/* Textos Esquerda */}
              <div className="flex flex-col gap-6 md:w-[60%] z-10">
                <h1 
                  className="text-[3.5rem] leading-[0.9] md:text-[5.5rem] lg:text-[7rem] font-sans font-bold text-white tracking-tighter uppercase"
                  dangerouslySetInnerHTML={{ __html: t("hero.title") }}
                />
                
                <div className="flex flex-col gap-1 mt-4 md:mt-8">
                  <p className="text-xl md:text-2xl text-white font-medium">{t("hero.subtitle")}</p>
                  <p className="text-sm sm:text-base md:text-lg lg:text-xl text-white/70 font-medium whitespace-nowrap flex flex-wrap gap-x-2 gap-y-1">
                    <span>{t("hero.roles.marketing")} <span className="opacity-50">|</span></span>
                    <span>{t("hero.roles.designer")} <span className="opacity-50">|</span></span>
                    <span>{t("hero.roles.social")} <span className="opacity-50">|</span></span>
                    <span>{t("hero.roles.video")} <span className="opacity-50">|</span></span>
                    <span>{t("hero.roles.ai")}</span>
                  </p>
                </div>
                
                <p 
                  className="text-sm md:text-base text-white/60 max-w-2xl leading-relaxed mt-4 font-light"
                  dangerouslySetInnerHTML={{ __html: t("hero.description") }}
                />
                
                <div className="flex gap-8 mt-6">
                  <SocialLink href="https://www.linkedin.com/in/gabriel-reis-filho-790b81233/" icon={<AtSign className="w-5 h-5" />} />
                  <SocialLink href="https://www.behance.net/reisspessoal" icon={<Globe className="w-5 h-5" />} />
                  <SocialLink href="https://api.whatsapp.com/send/?phone=5516992297294&text&type=phone_number&app_absent=0" icon={<MessageCircle className="w-5 h-5" />} />
                </div>
              </div>

            </div>

            {/* Brands Marquee / Bar Animado Full Width */}
            <div className="mt-24 md:mt-32 w-full">
              <p className="text-xs md:text-sm font-mono uppercase tracking-widest text-white/40 mb-8 text-center">
                {t("marquee.title")}
              </p>
              <div 
                className="w-[100vw] relative left-[50%] right-[50%] -ml-[50vw] -mr-[50vw] pt-8 overflow-hidden opacity-40 grayscale flex"
                style={{ 
                  maskImage: "linear-gradient(to right, transparent, black 10%, black 90%, transparent)", 
                  WebkitMaskImage: "linear-gradient(to right, transparent, black 10%, black 90%, transparent)" 
                }}
              >
              <motion.div
                className="flex items-center whitespace-nowrap w-max"
                animate={{ x: ["0%", "-50%"] }}
                transition={{
                  repeat: Infinity,
                  ease: "linear",
                  duration: 40,
                }}
              >
                {[...Array(8)].map((_, i) => (
                  <div key={i} className="flex items-center gap-12 md:gap-20 pr-12 md:pr-20 shrink-0">
                    <Image src="/logos/devoc.png" alt="Devoc" width={140} height={48} className="h-8 md:h-10 w-auto object-contain brightness-0 invert opacity-80 hover:opacity-100 transition-opacity" unoptimized />
                    <Image src="/logos/mtz.png" alt="MTZ" width={140} height={48} className="h-8 md:h-10 w-auto object-contain brightness-0 invert opacity-80 hover:opacity-100 transition-opacity" unoptimized />
                    <Image src="/logos/supra.png" alt="Supra" width={140} height={48} className="h-8 md:h-10 w-auto object-contain brightness-0 invert opacity-80 hover:opacity-100 transition-opacity" unoptimized />
                    <Image src="/logos/estradeiro.png" alt="Estradeiro" width={140} height={48} className="h-8 md:h-10 w-auto object-contain brightness-0 invert opacity-80 hover:opacity-100 transition-opacity" unoptimized />
                    <Image src="/logos/giaro.png" alt="Giaro" width={140} height={48} className="h-8 md:h-10 w-auto object-contain brightness-0 invert opacity-80 hover:opacity-100 transition-opacity" unoptimized />
                  </div>
                ))}
              </motion.div>
            </div>
            </div>
          </motion.section>

          {/* Selected Works Section */}
          <motion.section id="works" variants={itemVariants} className="flex flex-col gap-6 pt-20 md:pt-32">
            <div className="flex items-center justify-between text-white">
              <h2 className="text-2xl font-heading font-medium">{t("works.title")}</h2>
              <button 
                onClick={() => setShowAllProjects(!showAllProjects)}
                className="text-sm text-white/50 hover:text-white transition-colors flex items-center gap-1 group cursor-pointer"
              >
                {showAllProjects ? t("works.seeLess") : t("works.seeMore")} <ArrowRight className={`w-4 h-4 transition-transform ${showAllProjects ? "-rotate-90" : "group-hover:translate-x-1"}`} />
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <AnimatePresence>
                {displayedProjects.map((project, index) => (
                  <motion.div
                    key={project.title + index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ProjectCard
                      title={project.title}
                      category={project.category}
                      image={project.image}
                      onClick={() => setSelectedProject(project)}
                    />
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </motion.section>

          {/* Experience Section */}
          <motion.section id="experience" variants={itemVariants} className="flex flex-col gap-6 pt-10">
            <div className="flex items-center gap-2 text-white">
              <Briefcase className="w-5 h-5" />
              <h2 className="text-2xl font-heading font-medium">{t("experience.title")}</h2>
            </div>
            <div className="flex flex-col gap-4">
              <ExperienceCard
                company="Devoc Diesel Parts"
                role={t("exp.devoc.role")}
                date={t("exp.devoc.date")}
                description={t("exp.devoc.desc")}
              />
              <ExperienceCard
                company="Reis PSD"
                role={t("exp.reis.role")}
                date={t("exp.reis.date")}
                description={t("exp.reis.desc")}
              />

              <ExperienceCard
                company="Estradeiro"
                role={t("exp.estradeiro.role")}
                date={t("exp.estradeiro.date")}
                description={t("exp.estradeiro.desc")}
              />
              <ExperienceCard
                company="WebTrends"
                role={t("exp.webtrends.role")}
                date={t("exp.webtrends.date")}
                description={t("exp.webtrends.desc")}
              />
              <ExperienceCard
                company="Martinez Comunicação"
                role={t("exp.martinez.role")}
                date={t("exp.martinez.date")}
                description={t("exp.martinez.desc")}
              />
            </div>
          </motion.section>

          {/* About Section */}
          <motion.section id="about" variants={itemVariants} className="flex flex-col gap-8 pt-16 pb-10">
            <div className="flex items-center gap-3 text-white">
              <div className="w-2 h-2 bg-white/40 rounded-full" />
              <h2 className="text-2xl font-heading font-medium">{t("about.title")}</h2>
            </div>
            
            <div className="flex flex-col gap-8 max-w-4xl">
              <h3 
                className="text-2xl md:text-4xl font-light text-white/90 leading-[1.4] tracking-tight"
                dangerouslySetInnerHTML={{ __html: t("about.desc1") }}
              />
              
              <div className="flex flex-col gap-6 text-white/50 text-base md:text-lg leading-[1.8] font-light">
                <p dangerouslySetInnerHTML={{ __html: t("about.desc2") }} />
                <p dangerouslySetInnerHTML={{ __html: t("about.desc3") }} />
              </div>
              
              <div className="mt-2">
                <Link 
                  href="#works"
                  className="inline-flex items-center gap-2 bg-white text-black px-8 py-4 font-medium hover:bg-white/90 transition-all hover:scale-[1.02] active:scale-[0.98] w-fit"
                >
                  Visitar últimos cases
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </motion.section>

          {/* Footer Simples */}
        <motion.footer 
          className="w-full mt-6 border-t border-white/10 pt-8 pb-12 flex flex-col md:flex-row items-center justify-between gap-4"
          variants={itemVariants}
        >
          <p className="text-sm text-white/50">
            © 2026 Gabriel Reis. Todos os direitos reservados.
          </p>
          <p className="text-sm text-white/50 flex items-center gap-2">
            Projetos com estratégia.
          </p>
        </motion.footer>
        </motion.div>

        {/* Modal do Projeto */}
        <AnimatePresence>
          {selectedProject && (
            <motion.div 
              className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {/* Backdrop Clickable */}
              <div 
                className="absolute inset-0 bg-black/60 backdrop-blur-md cursor-pointer" 
                onClick={() => setSelectedProject(null)}
              />
              
              {/* Botão de Fechar Externo */}
              <button 
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 md:top-8 md:right-8 z-[60] p-3 rounded-full bg-black/50 hover:bg-white/20 text-white border border-white/20 transition-all backdrop-blur-md cursor-pointer group"
              >
                <X className="w-6 h-6 md:w-8 md:h-8 group-hover:rotate-90 transition-transform duration-300" />
              </button>
              
              {/* Container do Modal (Premium Full Screen Vibe) */}
              <motion.div 
                className="relative w-[95vw] h-[95vh] max-w-[1600px] border border-white/10 rounded-3xl overflow-hidden flex flex-col shadow-2xl bg-[#050505]"
                initial={{ opacity: 0, y: 50, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.2 } }}
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
              >
                {/* Imagem de Fundo Dinâmica (Blur) */}
                <div className="absolute inset-0 z-0 opacity-40 select-none pointer-events-none">
                  <Image 
                    src={selectedProject.image} 
                    alt="Background Blur" 
                    fill 
                    className="object-cover blur-3xl scale-125 saturate-200" 
                    unoptimized 
                  />
                  {/* Overlay Escuro Adicional para manter contraste de texto */}
                  <div className="absolute inset-0 bg-black/50" />
                </div>
                {/* Glow Background Topo */}
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(255,255,255,0.1),rgba(255,255,255,0))] pointer-events-none z-0" />
                {/* Layout de 2 Colunas */}
                <div className="flex flex-col lg:flex-row w-full h-full overflow-hidden">
                  
                  {/* Coluna Esquerda: Informações (Fixa no Desktop) */}
                  <div className="w-full lg:w-[35%] xl:w-[30%] flex flex-col p-8 md:p-12 lg:p-16 border-b lg:border-b-0 lg:border-r border-white/10 bg-black/40 backdrop-blur-xl overflow-y-auto no-scrollbar relative z-10">
                    <div className="flex flex-col gap-6 h-max">
                      
                      <div className="flex flex-col gap-3">
                        <span className="text-xs font-mono text-white/40 uppercase tracking-[0.2em]">
                          {selectedProject.category}
                        </span>
                        <h2 className="text-3xl md:text-5xl lg:text-[3.5rem] leading-[1.1] font-sans font-bold text-white tracking-tighter">
                          {selectedProject.title}
                        </h2>
                      </div>

                      <div className="w-12 h-1 bg-white/20 mt-2 mb-4" />

                      <div className="text-white text-base md:text-[1.1rem] leading-[1.7] tracking-wide font-sans font-light max-w-md">
                        <p>{selectedProject.description}</p>
                      </div>
                      
                    </div>
                  </div>

                  {/* Coluna Direita: Galeria (Rolável) */}
                  <div className="w-full lg:w-[65%] xl:w-[70%] h-full overflow-y-auto no-scrollbar p-2 md:p-4 lg:p-6 bg-transparent relative z-10">
                    <div className="flex flex-col gap-6 md:gap-8 h-full pb-4">
                      {selectedProject.gallery.map((item, idx) => (
                        item.startsWith("iframe:") ? (
                          <div key={idx} className="relative w-full h-full min-h-[600px] md:min-h-[90vh] rounded-xl overflow-hidden bg-white/5 border border-white/5">
                            <iframe 
                              src={item.replace("iframe:", "")} 
                              className="w-full h-full border-none bg-white"
                              title={`Live Preview ${idx}`}
                            />
                          </div>
                        ) : (
                          <div key={idx} className="relative w-full aspect-[4/3] md:aspect-video rounded-xl overflow-hidden bg-white/5 border border-white/5 group">
                            <Image 
                              src={item} 
                              alt={`Gallery image ${idx + 1}`} 
                              fill 
                              style={{ objectFit: "cover" }} 
                              unoptimized 
                              className="group-hover:scale-[1.02] transition-transform duration-700 ease-out"
                            />
                          </div>
                        )
                      ))}
                    </div>
                  </div>

                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

      </main>
    </>
  );
}

function SocialLink({ href, icon }: { href: string; icon: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="p-2.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/5 hover:border-white/20 text-muted-foreground hover:text-white transition-all duration-300"
      target="_blank"
      rel="noopener noreferrer"
    >
      {icon}
    </Link>
  );
}

function ExperienceCard({ company, role, date, description, logo }: { company: string; role: string; date: string; description: string; logo?: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isClamped, setIsClamped] = useState(true);

  useEffect(() => {
    if (isOpen) {
      setIsClamped(false);
    } else {
      const timer = setTimeout(() => setIsClamped(true), 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  return (
    <div 
      onClick={() => setIsOpen(!isOpen)}
      className="group relative glass-card p-6 rounded-2xl overflow-hidden hover:bg-white/[0.05] transition-colors duration-500 cursor-pointer"
    >
      <div className="flex items-start gap-4">
        {logo ? (
          <div className="w-12 h-12 rounded-xl overflow-hidden bg-white/10 shrink-0">
            <Image src={logo} alt={company} width={48} height={48} className="w-full h-full object-cover" unoptimized />
          </div>
        ) : (
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-white/10 to-white/5 flex items-center justify-center shrink-0 border border-white/10">
            <Briefcase className="w-6 h-6 text-muted-foreground" />
          </div>
        )}
        <div className="flex flex-col flex-1">
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2 sm:gap-4 mb-1">
            <h3 className="text-[1.35rem] font-heading font-semibold text-white tracking-tight leading-snug">{role}</h3>
            <span className="text-xs font-mono text-white/40 px-2 py-1 bg-white/5 border border-white/5 rounded-full w-fit shrink-0 sm:mt-1">
              {date}
            </span>
          </div>
          <p className="text-[0.8rem] font-mono text-white/50 uppercase tracking-[0.15em] mb-4">{company}</p>
          <div 
            className="text-sm text-white/60 leading-relaxed overflow-hidden transition-all duration-300 ease-in-out"
            style={{ maxHeight: isOpen ? '1000px' : '24px' }}
          >
            <p className={isClamped ? "line-clamp-1" : ""}>
              {description}
            </p>
          </div>
        </div>
        
        {/* Ícone indicativo de expandir */}
        <div className="mt-1 shrink-0">
          <motion.div animate={{ rotate: isOpen ? 90 : 0 }} transition={{ duration: 0.2 }}>
            <ChevronRight className="w-5 h-5 text-white/30 group-hover:text-white/70 transition-colors" />
          </motion.div>
        </div>
      </div>
    </div>
  );
}

function ProjectCard({ title, category, image, onClick }: { title: string; category: string; image: string; onClick: () => void }) {
  return (
    <div onClick={onClick} className="group relative glass-card rounded-2xl overflow-hidden flex flex-col hover:border-white/20 transition-colors duration-500 h-full cursor-pointer text-left w-full">
      <div className="relative w-full aspect-[4/3] md:aspect-video bg-white/5 overflow-hidden">
        {image ? (
          <Image 
            src={image} 
            alt={title} 
            fill 
            style={{ objectFit: "cover" }} 
            unoptimized 
            className="group-hover:scale-105 transition-transform duration-700"
          />
        ) : (
          <>
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent z-10" />
            <div className="absolute inset-0 flex items-center justify-center opacity-20 group-hover:opacity-40 group-hover:scale-105 transition-all duration-700">
                <div className="w-32 h-32 rounded-full bg-white blur-3xl" />
            </div>
          </>
        )}
      </div>
      <div className="p-6 flex flex-col flex-1 justify-between gap-4">
        <div>
          <p className="text-xs font-mono text-muted-foreground mb-1 tracking-wider uppercase">{category}</p>
          <h3 className="text-xl font-medium text-white group-hover:text-white/80 transition-colors">{title}</h3>
        </div>
        <div className="flex items-center text-sm text-muted-foreground gap-1 group-hover:text-white transition-colors">
          Ver Projeto <ChevronRight className="w-4 h-4" />
        </div>
      </div>
    </div>
  );
}
