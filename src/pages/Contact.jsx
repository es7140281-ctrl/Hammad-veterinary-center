import { useEffect, useState } from "react";

import {
  FaWhatsapp,
  FaFacebook,
  FaYoutube,
  FaTelegram,
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
} from "react-icons/fa";

import { doc, getDoc } from "firebase/firestore";

import { db } from "../firebase/firestore";

import { useLanguage } from "../context/LanguageContext";

export default function Contact() {
  const { t } = useLanguage();

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
    <main className="min-h-screen bg-white dark:bg-slate-900 py-20">
      <div className="container mx-auto px-6">
        <h1 className="text-4xl md:text-5xl font-bold text-center text-gray-800 dark:text-white mb-5">
          {t("contact.title")}
        </h1>

        <p className="text-center text-gray-600 dark:text-gray-300 mb-12">
          {t("contact.description")}
        </p>

        <div className="grid md:grid-cols-2 gap-10">
          {/* Contact Info */}

          <div className="bg-gray-50 dark:bg-slate-800 rounded-3xl p-8 shadow-lg">
            <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">
              {t("contact.follow")}
            </h2>

            <div className="flex gap-5 text-4xl flex-wrap mb-8">
              <a
                href={settings.facebook}
                target="_blank"
                rel="noreferrer"
                className="text-blue-600 hover:scale-110 transition"
              >
                <FaFacebook />
              </a>

              <a
                href={settings.youtube}
                target="_blank"
                rel="noreferrer"
                className="text-red-600 hover:scale-110 transition"
              >
                <FaYoutube />
              </a>

              <a
                href={settings.telegram}
                target="_blank"
                rel="noreferrer"
                className="text-sky-500 hover:scale-110 transition"
              >
                <FaTelegram />
              </a>

              <a
                href={`https://wa.me/${settings.whatsapp}`}
                target="_blank"
                rel="noreferrer"
                className="text-green-600 hover:scale-110 transition"
              >
                <FaWhatsapp />
              </a>
            </div>

            <div className="space-y-5 text-gray-700 dark:text-gray-300">
              <p className="flex items-center gap-3">
                <FaMapMarkerAlt className="text-green-600" />

                {settings.address}
              </p>

              <a
                href={`tel:${settings.phone}`}
                className="flex items-center gap-3 hover:text-green-600"
              >
                <FaPhone className="text-green-600" />

                {settings.phone}
              </a>

              <a
                href={`mailto:${settings.email}`}
                className="flex items-center gap-3 hover:text-green-600"
              >
                <FaEnvelope className="text-green-600" />

                {settings.email}
              </a>
            </div>
          </div>

          {/* Map */}

          <div className="bg-gray-50 dark:bg-slate-800 rounded-3xl p-6 shadow-lg">
            <iframe
              src={settings.location}
              className="w-full h-80 rounded-2xl"
              loading="lazy"
              title="Google Map"
            ></iframe>

            <a
              href={settings.location}
              target="_blank"
              rel="noreferrer"
              className="block text-center mt-6 bg-green-600 text-white py-3 rounded-full hover:bg-green-700 transition"
            >
              📍 {t("contact.mapButton")}
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}
