import { createContext, useContext, useEffect, useState } from "react";

import ar from "../locales/ar.json";
import en from "../locales/en.json";

const LanguageContext = createContext();

const translations = {
  ar,
  en,
};

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState(
    localStorage.getItem("language") || "ar",
  );

  useEffect(() => {
    document.documentElement.dir = language === "ar" ? "rtl" : "ltr";

    document.documentElement.lang = language;

    localStorage.setItem("language", language);
  }, [language]);

  function toggleLanguage() {
    setLanguage((prev) => (prev === "ar" ? "en" : "ar"));
  }

  function t(path) {
    const keys = path.split(".");

    return keys.reduce((obj, key) => {
      return obj?.[key];
    }, translations[language]);
  }

  return (
    <LanguageContext.Provider
      value={{
        language,
        toggleLanguage,
        t,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
