import { useEffect, useState } from "react";

import { FaFacebook, FaYoutube, FaTelegram, FaWhatsapp } from "react-icons/fa";

import { doc, getDoc } from "firebase/firestore";

import { db } from "../../firebase/firestore";

import { useLanguage } from "../../context/LanguageContext";

function Footer() {
  const { language } = useLanguage();

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
    <footer className="bg-gray-900 text-white mt-10">
      <div className="container py-10 grid md:grid-cols-3 gap-8">
        {/* About */}

        <div>
          <h2 className="text-xl font-bold mb-4">
            {language === "ar" ? settings.nameAr : settings.nameEn}
          </h2>

          <p className="text-gray-400 leading-7">
            {language === "ar"
              ? settings.descriptionAr
              : settings.descriptionEn}
          </p>
        </div>

        {/* Links */}

        <div>
          <h3 className="text-lg font-semibold mb-4">روابط مهمة</h3>

          <ul className="space-y-3 text-gray-400">
            <li>الرئيسية</li>

            <li>المنتجات</li>

            <li>الفيديوهات</li>

            <li>تواصل معنا</li>
          </ul>
        </div>

        {/* Social */}

        <div>
          <h3 className="text-lg font-semibold mb-4">تابعنا</h3>

          <div className="flex gap-4 text-2xl">
            <a
              href={settings.facebook}
              target="_blank"
              rel="noreferrer"
              className="hover:text-green-500 transition"
            >
              <FaFacebook />
            </a>

            <a
              href={settings.youtube}
              target="_blank"
              rel="noreferrer"
              className="hover:text-green-500 transition"
            >
              <FaYoutube />
            </a>

            <a
              href={settings.telegram}
              target="_blank"
              rel="noreferrer"
              className="hover:text-green-500 transition"
            >
              <FaTelegram />
            </a>

            <a
              href={`https://wa.me/${settings.whatsapp}`}
              target="_blank"
              rel="noreferrer"
              className="hover:text-green-500 transition"
            >
              <FaWhatsapp />
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-700 text-center py-4 text-gray-400">
        © {new Date().getFullYear()}{" "}
        {language === "ar" ? settings.nameAr : settings.nameEn} - جميع الحقوق
        محفوظة
      </div>
    </footer>
  );
}

export default Footer;
