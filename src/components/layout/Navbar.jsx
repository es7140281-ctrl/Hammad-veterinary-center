import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaWhatsapp, FaBars, FaTimes } from "react-icons/fa";

import ThemeToggle from "../ui/ThemeToggle";
import LanguageToggle from "../ui/LanguageToggle";

import { useLanguage } from "../../context/LanguageContext";

import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase/firestore";

function Navbar() {
  const { t, language } = useLanguage();

  const [settings, setSettings] = useState(null);

  const [open, setOpen] = useState(false);

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

  return (
    <header className="w-full bg-white dark:bg-slate-900 shadow-sm sticky top-0 z-50">
      <nav className="container flex items-center justify-between py-4">
        <Link to="/" className="flex items-center gap-3">
          <img
            src={settings?.logo || "/logo.png"}
            alt="logo"
            className="w-12 h-12 rounded-full object-cover"
          />

          <div>
            <h1 className="text-xl font-bold text-gray-800 dark:text-white">
              {language === "ar"
                ? settings?.nameAr || t("brand.name")
                : settings?.nameEn || t("brand.name")}
            </h1>

            <p className="text-xs text-gray-500 dark:text-gray-300">
              {language === "ar"
                ? settings?.descriptionAr
                : settings?.descriptionEn}
            </p>
          </div>
        </Link>

        {/* Desktop Menu */}

        <div className="hidden md:flex items-center gap-8">
          <Link to="/" className="hover:text-green-600 transition">
            {t("navbar.home")}
          </Link>

          <Link to="/products" className="hover:text-green-600 transition">
            {t("navbar.products")}
          </Link>

          <Link to="/videos" className="hover:text-green-600 transition">
            {t("navbar.videos")}
          </Link>

          <Link to="/contact" className="hover:text-green-600 transition">
            {t("navbar.contact")}
          </Link>
        </div>

        <div className="flex items-center gap-3">
          <LanguageToggle />

          <ThemeToggle />

          <button
            onClick={() => setOpen(!open)}
            className="md:hidden text-2xl text-gray-800 dark:text-white"
          >
            {open ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        <a
          href={`https://wa.me/${settings?.whatsapp || ""}`}
          target="_blank"
          rel="noreferrer"
          className="hidden lg:flex items-center gap-2 bg-green-600 text-white px-5 py-2 rounded-full hover:bg-green-700 transition"
        >
          <FaWhatsapp />

          {t("navbar.whatsapp")}
        </a>
      </nav>

      {/* Mobile Menu */}

      {open && (
        <div className="md:hidden bg-white dark:bg-slate-900 px-6 pb-5">
          <div className="flex flex-col gap-4 text-right">
            <Link onClick={() => setOpen(false)} to="/">
              {t("navbar.home")}
            </Link>

            <Link onClick={() => setOpen(false)} to="/products">
              {t("navbar.products")}
            </Link>

            <Link onClick={() => setOpen(false)} to="/videos">
              {t("navbar.videos")}
            </Link>

            <Link onClick={() => setOpen(false)} to="/contact">
              {t("navbar.contact")}
            </Link>

            <a
              href={`https://wa.me/${settings?.whatsapp || ""}`}
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-center gap-2 bg-green-600 text-white py-3 rounded-full"
            >
              <FaWhatsapp />

              {t("navbar.whatsapp")}
            </a>
          </div>
        </div>
      )}
    </header>
  );
}

export default Navbar;
