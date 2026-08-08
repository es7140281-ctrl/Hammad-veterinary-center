import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaWhatsapp } from "react-icons/fa";

import { useLanguage } from "../../context/LanguageContext";

import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase/firestore";

export default function Hero() {
  const { language, t } = useLanguage();

  const [settings, setSettings] = useState(null);

  useEffect(() => {
    async function loadSettings() {
      try {
        const ref = doc(db, "settings", "site");

        const snapshot = await getDoc(ref);

        if (snapshot.exists()) {
          setSettings(snapshot.data());
        }
      } catch (error) {
        console.log(error);
      }
    }

    loadSettings();
  }, []);

  if (!settings) {
    return null;
  }

  return (
    <section
      className="relative min-h-screen flex items-center bg-cover bg-center"
      style={{
        backgroundImage: `url(${settings.heroImage})`,
      }}
    >
      {/* Overlay */}

      <div className="absolute inset-0 bg-black/50"></div>

      <div className="relative z-10 container mx-auto px-6 grid md:grid-cols-2 gap-10 items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="text-right order-2 md:order-1"
        >
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-5">
            {language === "ar" ? settings.nameAr : settings.nameEn}
          </h1>

          <p className="text-lg text-gray-200 leading-8 mb-8">
            {language === "ar"
              ? settings.descriptionAr
              : settings.descriptionEn}
          </p>

          <a
            href={`https://wa.me/${settings.whatsapp}`}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-3 bg-green-600 text-white px-7 py-3 rounded-full hover:scale-105 transition"
          >
            <FaWhatsapp />

            {t("navbar.whatsapp")}
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="flex justify-center order-1 md:order-2"
        >
          <img
            src={settings.logo || "/logo.png"}
            alt="logo"
            className="w-72 h-72 rounded-full object-cover shadow-2xl border-4 border-white"
          />
        </motion.div>
      </div>
    </section>
  );
}
