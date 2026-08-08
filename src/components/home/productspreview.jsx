import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

import { useLanguage } from "../../context/LanguageContext";
import { getProducts } from "../../services/products";

export default function ProductsPreview() {
  const { t, language } = useLanguage();

  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const data = await getProducts();
        setProducts(data.slice(0, 3));
      } catch (error) {
        console.log(error);
      }
    }

    fetchProducts();
  }, []);

  return (
    <section className="py-20 bg-gray-50 dark:bg-slate-900">
      <div className="container mx-auto px-6">
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-bold text-center text-gray-800 dark:text-white mb-12"
        >
          {t("products.title")}
        </motion.h2>

        <div className="grid md:grid-cols-3 gap-8">
          {products.map((product, index) => {
            const title = language === "ar" ? product.nameAr : product.nameEn;

            const description =
              language === "ar" ? product.descriptionAr : product.descriptionEn;

            return (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg overflow-hidden"
              >
                <img
                  src={product.image}
                  alt={title}
                  className="w-full h-56 object-cover"
                />

                <div className="p-5 text-right">
                  <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-3">
                    {title}
                  </h3>

                  <p className="text-gray-600 dark:text-gray-300">
                    {description?.length > 100
                      ? `${description.slice(0, 100)}...`
                      : description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        <div className="flex justify-center mt-10">
          <Link
            to="/products"
            className="bg-green-600 text-white px-8 py-3 rounded-full hover:scale-105 transition"
          >
            {t("products.button")}
          </Link>
        </div>
      </div>
    </section>
  );
}
