import { useEffect, useState } from "react";
import { useLanguage } from "../context/LanguageContext";
import { getVideos } from "../services/videos";

function Videos() {
  const { language } = useLanguage();

  const [videos, setVideos] = useState([]);

  const [loading, setLoading] = useState(true);

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

        setVideos(data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }

    loadVideos();
  }, []);

  return (
    <main className="min-h-screen bg-white dark:bg-slate-900 py-20">
      <div className="container mx-auto px-6">
        <h1 className="text-4xl md:text-5xl font-bold text-center text-gray-800 dark:text-white">
          {language === "ar" ? "الفيديوهات" : "Videos"}
        </h1>

        {loading ? (
          <p className="text-center mt-12 text-gray-500">
            {language === "ar"
              ? "جاري تحميل الفيديوهات..."
              : "Loading videos..."}
          </p>
        ) : videos.length === 0 ? (
          <p className="text-center mt-12 text-gray-500">
            {language === "ar"
              ? "لا توجد فيديوهات حاليا"
              : "No videos available"}
          </p>
        ) : (
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {videos.map((video) => (
              <div
                key={video.id}
                className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg overflow-hidden hover:-translate-y-2 transition"
              >
                <div className="aspect-video">
                  <iframe
                    className="w-full h-full"
                    src={getEmbedUrl(video.url)}
                    title={language === "ar" ? video.titleAr : video.titleEn}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>

                <div className="p-5">
                  <h3 className="text-xl font-bold text-gray-800 dark:text-white">
                    {language === "ar" ? video.titleAr : video.titleEn}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}

export default Videos;
