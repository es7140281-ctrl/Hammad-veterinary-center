import { useEffect, useState } from "react";
import { motion } from "framer-motion";

import { FaSyringe, FaPills, FaDove, FaStethoscope } from "react-icons/fa";

import { GiCow } from "react-icons/gi";

import { useLanguage } from "../../context/LanguageContext";

import { collection, getDocs } from "firebase/firestore";

import { db } from "../../firebase/firestore";

function getIcon(icon) {
  const icons = {
    cow: <GiCow />,

    syringe: <FaSyringe />,

    pills: <FaPills />,

    dove: <FaDove />,

    stethoscope: <FaStethoscope />,
  };

  return icons[icon] || <FaStethoscope />;
}

export default function Services() {
  const { language, t } = useLanguage();

  const [services, setServices] = useState([]);

  useEffect(() => {
    async function loadServices() {
      try {
        const snapshot = await getDocs(collection(db, "services"));

        const data = snapshot.docs.map((item) => ({
          id: item.id,

          ...item.data(),
        }));

        setServices(data);
      } catch (error) {
        console.log(error);
      }
    }

    loadServices();
  }, []);

  return (
    <section className="py-20 bg-white dark:bg-slate-900">
      <div className="container mx-auto px-6">
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-bold text-center text-gray-800 dark:text-white mb-12"
        >
          {t("services.title")}
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-gray-50 dark:bg-slate-800 p-6 rounded-2xl shadow-lg hover:scale-105 transition"
            >
              <div className="text-4xl text-green-600 mb-5">
                {getIcon(service.icon)}
              </div>

              <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-3">
                {language === "ar" ? service.titleAr : service.titleEn}
              </h3>

              <p className="text-gray-600 dark:text-gray-300 leading-7">
                {language === "ar"
                  ? service.descriptionAr
                  : service.descriptionEn}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
