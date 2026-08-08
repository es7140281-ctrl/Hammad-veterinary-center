import { FaWhatsapp } from "react-icons/fa";
import { useLanguage } from "../../context/LanguageContext";

export default function ContactCTA() {
  const { t } = useLanguage();

  return (
    <section className="py-16 bg-green-600">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-5">
          {t("contactCTA.title")}
        </h2>

        <p className="text-white mb-8 text-lg">{t("contactCTA.description")}</p>

        <a
          href="https://wa.me/"
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-3 bg-white text-green-600 px-8 py-3 rounded-full font-bold hover:scale-105 transition"
        >
          <FaWhatsapp />
          {t("contactCTA.button")}
        </a>
      </div>
    </section>
  );
}
