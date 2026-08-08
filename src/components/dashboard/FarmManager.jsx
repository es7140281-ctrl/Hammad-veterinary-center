import { useEffect, useState } from "react";

import { uploadImage } from "../../services/cloudinary";
import { getFarm, updateFarm } from "../../services/farm";

export default function FarmManager() {
  const [titleAr, setTitleAr] = useState("");
  const [titleEn, setTitleEn] = useState("");

  const [descriptionAr, setDescriptionAr] = useState("");
  const [descriptionEn, setDescriptionEn] = useState("");

  const [image, setImage] = useState(null);
  const [oldImage, setOldImage] = useState("");

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  async function loadFarm() {
    const data = await getFarm();

    if (data) {
      setTitleAr(data.titleAr || "");
      setTitleEn(data.titleEn || "");

      setDescriptionAr(data.descriptionAr || "");
      setDescriptionEn(data.descriptionEn || "");

      setOldImage(data.image || "");
    }
  }

  useEffect(() => {
    loadFarm();
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setLoading(true);
      setMessage("");

      let imageUrl = oldImage;

      if (image instanceof File) {
        imageUrl = await uploadImage(image);
      }

      await updateFarm({
        titleAr,
        titleEn,
        descriptionAr,
        descriptionEn,
        image: imageUrl,
      });

      setMessage("تم حفظ قسم الإشراف على المزارع ✅");

      setImage(null);
    } catch (error) {
      console.log(error);
      setMessage("حدث خطأ أثناء الحفظ");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl shadow p-6">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">
        إدارة الإشراف على المزارع
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="العنوان بالعربي"
          value={titleAr}
          onChange={(e) => setTitleAr(e.target.value)}
          className="w-full p-3 rounded-lg border dark:bg-slate-700 dark:text-white"
        />

        <input
          type="text"
          placeholder="العنوان بالإنجليزي"
          value={titleEn}
          onChange={(e) => setTitleEn(e.target.value)}
          className="w-full p-3 rounded-lg border dark:bg-slate-700 dark:text-white"
        />

        <textarea
          placeholder="الوصف بالعربي"
          value={descriptionAr}
          onChange={(e) => setDescriptionAr(e.target.value)}
          className="w-full p-3 rounded-lg border dark:bg-slate-700 dark:text-white"
        />

        <textarea
          placeholder="الوصف بالإنجليزي"
          value={descriptionEn}
          onChange={(e) => setDescriptionEn(e.target.value)}
          className="w-full p-3 rounded-lg border dark:bg-slate-700 dark:text-white"
        />
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
          className="w-full"
        />

        {image && (
          <img
            src={URL.createObjectURL(image)}
            alt="preview"
            className="w-40 h-40 object-cover rounded-xl mt-4"
          />
        )}

        {oldImage && !image && (
          <img
            src={oldImage}
            alt="farm"
            className="w-40 h-40 object-cover rounded-xl mt-4"
          />
        )}

        <button
          disabled={loading}
          className="bg-green-600 text-white px-6 py-3 rounded-lg"
        >
          {loading ? "جاري الحفظ..." : "حفظ"}
        </button>
      </form>

      {message && <p className="mt-5 text-green-600 font-bold">{message}</p>}
    </div>
  );
}
