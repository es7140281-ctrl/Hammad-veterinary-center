import { useEffect, useState } from "react";

import { doc, getDoc, setDoc } from "firebase/firestore";

import { db } from "../../firebase/firestore";

import { uploadImage } from "../../services/cloudinary";

function SettingsManager() {
  const [settings, setSettings] = useState({
    nameAr: "",
    nameEn: "",

    descriptionAr: "",
    descriptionEn: "",

    whatsapp: "",

    facebook: "",
    youtube: "",
    telegram: "",

    location: "",

    location: "",

    phone: "",
    email: "",
    address: "",

    logo: "",

    logo: "",

    heroImage: "",
  });

  const [logoFile, setLogoFile] = useState(null);

  const [heroFile, setHeroFile] = useState(null);

  const [loading, setLoading] = useState(false);

  const [message, setMessage] = useState("");

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

  useEffect(() => {
    loadSettings();
  }, []);

  function handleChange(e) {
    setSettings({
      ...settings,

      [e.target.name]: e.target.value,
    });
  }

  function handleLogoChange(e) {
    setLogoFile(e.target.files[0]);
  }

  function handleHeroChange(e) {
    setHeroFile(e.target.files[0]);
  }
  async function handleSave(e) {
    e.preventDefault();

    try {
      setLoading(true);

      setMessage("");

      let logoUrl = settings.logo;

      let heroUrl = settings.heroImage;

      if (logoFile) {
        logoUrl = await uploadImage(logoFile);
      }

      if (heroFile) {
        heroUrl = await uploadImage(heroFile);
      }

      const newSettings = {
        ...settings,

        logo: logoUrl,

        heroImage: heroUrl,
      };

      await setDoc(
        doc(db, "settings", "site"),

        newSettings,
      );

      setSettings(newSettings);

      setMessage("تم حفظ الإعدادات بنجاح ✅");
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
        إعدادات الموقع
      </h2>

      <form onSubmit={handleSave} className="space-y-4">
        <input
          name="nameAr"
          value={settings.nameAr}
          onChange={handleChange}
          placeholder="اسم المركز بالعربي"
          className="w-full p-3 rounded-lg border dark:bg-slate-700 dark:text-white"
        />

        <input
          name="nameEn"
          value={settings.nameEn}
          onChange={handleChange}
          placeholder="اسم المركز بالإنجليزي"
          className="w-full p-3 rounded-lg border dark:bg-slate-700 dark:text-white"
        />

        <textarea
          name="descriptionAr"
          value={settings.descriptionAr}
          onChange={handleChange}
          placeholder="الوصف بالعربي"
          className="w-full p-3 rounded-lg border dark:bg-slate-700 dark:text-white"
        />

        <textarea
          name="descriptionEn"
          value={settings.descriptionEn}
          onChange={handleChange}
          placeholder="الوصف بالإنجليزي"
          className="w-full p-3 rounded-lg border dark:bg-slate-700 dark:text-white"
        />
        <div className="border rounded-lg p-4 dark:border-slate-600">
          <label className="block mb-3 font-bold text-gray-800 dark:text-white">
            رفع اللوجو
          </label>

          <input
            type="file"
            accept="image/*"
            onChange={handleLogoChange}
            className="w-full"
          />

          {settings.logo && (
            <img
              src={settings.logo}
              alt="Logo Preview"
              className="mt-4 w-32 h-32 object-cover rounded-full"
            />
          )}
        </div>

        <div className="border rounded-lg p-4 dark:border-slate-600">
          <label className="block mb-3 font-bold text-gray-800 dark:text-white">
            رفع صورة الهيرو
          </label>

          <input
            type="file"
            accept="image/*"
            onChange={handleHeroChange}
            className="w-full"
          />

          {settings.heroImage && (
            <img
              src={settings.heroImage}
              alt="Hero Preview"
              className="mt-4 w-full h-48 object-cover rounded-xl"
            />
          )}
        </div>

        <input
          name="whatsapp"
          value={settings.whatsapp}
          onChange={handleChange}
          placeholder="رقم الواتساب"
          className="w-full p-3 rounded-lg border dark:bg-slate-700 dark:text-white"
        />

        <input
          name="facebook"
          value={settings.facebook}
          onChange={handleChange}
          placeholder="رابط فيسبوك"
          className="w-full p-3 rounded-lg border dark:bg-slate-700 dark:text-white"
        />

        <input
          name="youtube"
          value={settings.youtube}
          onChange={handleChange}
          placeholder="رابط يوتيوب"
          className="w-full p-3 rounded-lg border dark:bg-slate-700 dark:text-white"
        />
        <input
          name="telegram"
          value={settings.telegram}
          onChange={handleChange}
          placeholder="رابط تيليجرام"
          className="w-full p-3 rounded-lg border dark:bg-slate-700 dark:text-white"
        />

        <input
          name="phone"
          value={settings.phone}
          onChange={handleChange}
          placeholder="رقم الهاتف"
          className="w-full p-3 rounded-lg border dark:bg-slate-700 dark:text-white"
        />

        <input
          name="email"
          value={settings.email}
          onChange={handleChange}
          placeholder="البريد الإلكتروني"
          className="w-full p-3 rounded-lg border dark:bg-slate-700 dark:text-white"
        />

        <input
          name="address"
          value={settings.address}
          onChange={handleChange}
          placeholder="العنوان"
          className="w-full p-3 rounded-lg border dark:bg-slate-700 dark:text-white"
        />

        <input
          name="location"
          value={settings.location}
          onChange={handleChange}
          placeholder="رابط الخريطة"
          className="w-full p-3 rounded-lg border dark:bg-slate-700 dark:text-white"
        />

        <button
          disabled={loading}
          className="bg-green-600 text-white px-8 py-3 rounded-lg hover:bg-green-700"
        >
          {loading ? "جاري الحفظ..." : "حفظ الإعدادات"}
        </button>
      </form>

      {message && <p className="mt-5 text-green-600 font-bold">{message}</p>}
    </div>
  );
}

export default SettingsManager;
