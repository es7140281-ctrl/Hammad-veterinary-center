import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

import { useLanguage } from "../../context/LanguageContext";
import { getVideos } from "../../services/videos";

export default function VideosPreview() {
  const { language, t } = useLanguage();

  const [videos, setVideos] = useState([]);

  function getEmbedUrl(url) {
    if (!url) return "";

    // YouTube Shorts
    if (url.includes("shorts/")) {
      const videoId = url.split("shorts/")[1].split("?")[0];

      return `https://www.youtube.com/embed/${videoId}`;
    }

    // YouTube normal
    if (url.includes("watch?v=")) {
      const videoId = url.split("watch?v=")[1].split("&")[0];

      return `https://www.youtube.com/embed/${videoId}`;
    }

    // youtu.be
    if (url.includes("youtu.be/")) {
      const videoId = url.split("youtu.be/")[1].split("?")[0];

      return `https://www.youtube.com/embed/${videoId}`;
    }

    return url;
  }

  useEffect(() => {
    async function loadVideos() {
      try {
        const data = await getVideos();

        setVideos(data.slice(0, 3));
      } catch (error) {
        console.log(error);
      }
    }

    loadVideos();
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
          {t("videos.title")}
        </motion.h2>

        <div className="grid md:grid-cols-3 gap-8">
          {videos.map((video, index) => (
            <motion.div
              key={video.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-gray-50 dark:bg-slate-800 rounded-2xl p-6 shadow"
            >
              <div className="aspect-video rounded-xl overflow-hidden mb-5">
                <iframe
                  className="w-full h-full"
                  src={getEmbedUrl(video.url)}
                  title={language === "ar" ? video.titleAr : video.titleEn}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>

              <h3 className="font-bold text-xl text-gray-800 dark:text-white">
                {language === "ar" ? video.titleAr : video.titleEn}
              </h3>
            </motion.div>
          ))}
        </div>

        <div className="flex justify-center mt-10">
          <Link
            to="/videos"
            className="bg-blue-600 text-white px-8 py-3 rounded-full hover:scale-105 transition"
          >
            {t("videos.button")}
          </Link>
        </div>
      </div>
    </section>
  );
}
