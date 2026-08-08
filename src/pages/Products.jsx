import { useEffect, useState } from "react";
import { motion } from "framer-motion";

import { useLanguage } from "../context/LanguageContext";
import { getProducts } from "../services/products";

export default function Products() {
  const { t, language } = useLanguage();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openId, setOpenId] = useState(null);

  useEffect(() => {
    async function loadProducts() {
      try {
        const data = await getProducts();

        setProducts(data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }

    loadProducts();
  }, []);

  return (
    <main className="min-h-screen bg-white dark:bg-slate-900 py-20">
      <div className="container mx-auto px-6">
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-5xl font-bold text-center text-gray-800 dark:text-white"
        >
          {t("products.title")}
        </motion.h1>

        <p className="text-center text-gray-600 dark:text-gray-300 mt-5 max-w-2xl mx-auto">
          {t("products.description")}
        </p>

        {loading ? (
          <p className="text-center mt-16 text-gray-500">
            جاري تحميل المنتجات...
          </p>
        ) : products.length === 0 ? (
          <div className="mt-12 bg-gray-50 dark:bg-slate-800 rounded-2xl p-8 text-center shadow">
            <h3 className="text-xl font-bold text-gray-800 dark:text-white">
              {t("products.empty")}
            </h3>

            <p className="text-gray-600 dark:text-gray-300 mt-3">
              {t("products.waiting")}
            </p>
          </div>
        ) : (
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product, index) => {
              const title = language === "ar" ? product.nameAr : product.nameEn;

              const description =
                language === "ar"
                  ? product.descriptionAr
                  : product.descriptionEn;

              return (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white dark:bg-slate-800 rounded-2xl overflow-hidden shadow-lg hover:-translate-y-2 transition"
                >
                  <img
                    src={product.image}
                    alt={title}
                    loading="lazy"
                    className="w-full h-64 object-cover"
                  />

                  <div className="p-5">
                    <h3 className="text-2xl font-bold text-gray-800 dark:text-white">
                      {title}
                    </h3>

                    <p className="mt-3 text-gray-600 dark:text-gray-300 leading-7">
                      {openId === product.id
                        ? description
                        : description?.slice(0, 80)}
                    </p>

                    {description?.length > 80 && (
                      <button
                        onClick={() =>
                          setOpenId(openId === product.id ? null : product.id)
                        }
                        className="mt-4 text-green-600 font-bold"
                      >
                        {openId === product.id
                          ? language === "ar"
                            ? "إخفاء"
                            : "Hide"
                          : language === "ar"
                            ? "المزيد"
                            : "More"}
                      </button>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </main>
  );
}
