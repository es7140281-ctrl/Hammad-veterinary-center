import { motion } from "framer-motion";
import { useLanguage } from "../../context/LanguageContext";

export default function About() {
  const { t } = useLanguage();

  return (
    <section className="py-20 bg-white dark:bg-slate-900">
      <div className="container mx-auto px-6 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-3xl md:text-5xl font-bold text-gray-800 dark:text-white"
        >
          {t("about.title")}
        </motion.h2>

        <p className="mt-6 text-gray-600 dark:text-gray-300 leading-8">
          {t("about.description")}
        </p>
      </div>
    </section>
  );
}
