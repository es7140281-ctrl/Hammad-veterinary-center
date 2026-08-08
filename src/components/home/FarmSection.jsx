import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaWhatsapp } from "react-icons/fa";

import { useLanguage } from "../../context/LanguageContext";
import { getFarm } from "../../services/farm";

export default function FarmSection() {
  const { language, t } = useLanguage();

  const [farm, setFarm] = useState(null);

  useEffect(() => {
    async function loadFarm() {
      const data = await getFarm();
      setFarm(data);
    }

    loadFarm();
  }, []);

  if (!farm) return null;

  const title = language === "ar" ? farm.titleAr : farm.titleEn;

  const description =
    language === "ar" ? farm.descriptionAr : farm.descriptionEn;

  return (
    <section className="py-20 bg-green-50 dark:bg-slate-800">
      <div className="container mx-auto px-6 grid md:grid-cols-2 gap-10 items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="text-right"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-5">
            {title}
          </h2>

          <p className="text-gray-600 dark:text-gray-300 leading-8 mb-8">
            {description}
          </p>

          <a
            href="https://wa.me/"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-3 bg-green-600 text-white px-7 py-3 rounded-full hover:scale-105 transition"
          >
            <FaWhatsapp />
            {t("farm.button")}
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="flex justify-center"
        >
          <img
            src={farm.image}
            alt={title}
            className="w-72 h-72 object-cover rounded-3xl shadow-xl"
          />
        </motion.div>
      </div>
    </section>
  );
}
