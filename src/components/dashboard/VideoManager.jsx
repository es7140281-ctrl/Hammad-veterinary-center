import { useEffect, useState } from "react";

import {
  addVideo,
  getVideos,
  deleteVideo,
  updateVideo,
} from "../../services/videos";

function VideoManager() {
  const [titleAr, setTitleAr] = useState("");
  const [titleEn, setTitleEn] = useState("");
  const [url, setUrl] = useState("");

  const [videos, setVideos] = useState([]);

  const [editingId, setEditingId] = useState(null);

  const [loading, setLoading] = useState(false);

  const [message, setMessage] = useState("");

  async function loadVideos() {
    try {
      const data = await getVideos();

      setVideos(data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    loadVideos();
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();

    if (!titleAr || !titleEn || !url) {
      setMessage("اكتب العنوان بالعربي والإنجليزي والرابط");

      return;
    }

    try {
      setLoading(true);

      setMessage("");

      const videoData = {
        titleAr,

        titleEn,

        url,
      };

      if (editingId) {
        await updateVideo(editingId, videoData);

        setMessage("تم تعديل الفيديو بنجاح ✅");
      } else {
        await addVideo(videoData);

        setMessage("تم إضافة الفيديو بنجاح ✅");
      }

      setTitleAr("");

      setTitleEn("");

      setUrl("");

      setEditingId(null);

      loadVideos();
    } catch (error) {
      console.log(error);

      setMessage("حدث خطأ");
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id) {
    const ok = window.confirm("هل تريد حذف الفيديو؟");

    if (!ok) return;

    await deleteVideo(id);

    loadVideos();
  }

  function handleEdit(video) {
    setEditingId(video.id);

    setTitleAr(video.titleAr);

    setTitleEn(video.titleEn);

    setUrl(video.url);
  }

  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl shadow p-6">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">
        إدارة الفيديوهات
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4 mb-10">
        <input
          type="text"
          placeholder="عنوان الفيديو بالعربي"
          value={titleAr}
          onChange={(e) => setTitleAr(e.target.value)}
          className="w-full p-3 rounded-lg border dark:bg-slate-700 dark:text-white"
        />

        <input
          type="text"
          placeholder="عنوان الفيديو بالإنجليزي"
          value={titleEn}
          onChange={(e) => setTitleEn(e.target.value)}
          className="w-full p-3 rounded-lg border dark:bg-slate-700 dark:text-white"
        />

        <input
          type="text"
          placeholder="رابط YouTube"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="w-full p-3 rounded-lg border dark:bg-slate-700 dark:text-white"
        />

        <button
          disabled={loading}
          className="bg-green-600 text-white px-6 py-3 rounded-lg"
        >
          {loading
            ? "جاري الحفظ..."
            : editingId
              ? "حفظ التعديل"
              : "إضافة الفيديو"}
        </button>
      </form>

      {message && <p className="text-green-600 font-bold mb-6">{message}</p>}

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {videos.map((video) => (
          <div
            key={video.id}
            className="bg-gray-100 dark:bg-slate-700 rounded-xl p-5"
          >
            <h3 className="font-bold text-gray-800 dark:text-white">
              🇪🇬 {video.titleAr}
            </h3>

            <h3 className="font-bold text-gray-800 dark:text-white mt-2">
              🇬🇧 {video.titleEn}
            </h3>

            <p className="text-gray-600 dark:text-gray-300 mt-3 break-all">
              {video.url}
            </p>

            <div className="flex gap-3 mt-5">
              <button
                onClick={() => handleEdit(video)}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg"
              >
                تعديل
              </button>

              <button
                onClick={() => handleDelete(video.id)}
                className="bg-red-600 text-white px-4 py-2 rounded-lg"
              >
                حذف
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default VideoManager;
