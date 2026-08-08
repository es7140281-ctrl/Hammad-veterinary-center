import { useLanguage } from "../../context/LanguageContext";

export default function LanguageToggle() {
  const { language, toggleLanguage } = useLanguage();

  return (
    <button
      onClick={toggleLanguage}
      className="px-3 py-2 rounded-full bg-gray-200 dark:bg-slate-700 text-gray-800 dark:text-white transition"
    >
      {language === "ar" ? "English" : "عربي"}
    </button>
  );
}
