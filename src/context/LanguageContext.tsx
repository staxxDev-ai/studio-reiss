"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { dictionaries, Language, TranslationKey } from "@/i18n/dictionaries";

type LanguageContextType = {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: TranslationKey) => string;
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>("BR");

  useEffect(() => {
    const savedLang = localStorage.getItem("site_language") as Language;
    if (savedLang && ["BR", "US", "ES"].includes(savedLang)) {
      setLanguageState(savedLang);
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem("site_language", lang);
  };

  const t = (key: TranslationKey): string => {
    const dict = dictionaries[language];
    return dict[key] || dictionaries["BR"][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
