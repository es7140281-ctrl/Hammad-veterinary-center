import { useEffect, useState } from "react";

import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";

import { db } from "../../firebase/firestore";

function ServicesManager() {
  const [services, setServices] = useState([]);

  const [titleAr, setTitleAr] = useState("");
  const [titleEn, setTitleEn] = useState("");

  const [descriptionAr, setDescriptionAr] = useState("");
  const [descriptionEn, setDescriptionEn] = useState("");

  const [icon, setIcon] = useState("cow");

  const [editingId, setEditingId] = useState(null);

  async function loadServices() {
    const snapshot = await getDocs(collection(db, "services"));

    const data = snapshot.docs.map((item) => ({
      id: item.id,

      ...item.data(),
    }));

    setServices(data);
  }

  useEffect(() => {
    loadServices();
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();

    const data = {
      titleAr,

      titleEn,

      descriptionAr,

      descriptionEn,

      icon,
    };

    if (editingId) {
      await updateDoc(doc(db, "services", editingId), data);
    } else {
      await addDoc(collection(db, "services"), data);
    }

    setTitleAr("");
    setTitleEn("");
    setDescriptionAr("");
    setDescriptionEn("");
    setIcon("cow");

    setEditingId(null);

    loadServices();
  }

  async function handleDelete(id) {
    await deleteDoc(doc(db, "services", id));

    loadServices();
  }

  function handleEdit(service) {
    setEditingId(service.id);

    setTitleAr(service.titleAr);

    setTitleEn(service.titleEn);

    setDescriptionAr(service.descriptionAr);

    setDescriptionEn(service.descriptionEn);

    setIcon(service.icon);
  }

  return (
    <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow">
      <h2 className="text-2xl font-bold mb-6 dark:text-white">إدارة الخدمات</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          value={titleAr}
          onChange={(e) => setTitleAr(e.target.value)}
          placeholder="اسم الخدمة بالعربي"
          className="w-full p-3 border rounded-lg"
        />

        <input
          value={titleEn}
          onChange={(e) => setTitleEn(e.target.value)}
          placeholder="اسم الخدمة بالإنجليزي"
          className="w-full p-3 border rounded-lg"
        />

        <textarea
          value={descriptionAr}
          onChange={(e) => setDescriptionAr(e.target.value)}
          placeholder="الوصف بالعربي"
          className="w-full p-3 border rounded-lg"
        />

        <textarea
          value={descriptionEn}
          onChange={(e) => setDescriptionEn(e.target.value)}
          placeholder="الوصف بالإنجليزي"
          className="w-full p-3 border rounded-lg"
        />

        <input
          value={icon}
          onChange={(e) => setIcon(e.target.value)}
          placeholder="اسم الأيقونة"
          className="w-full p-3 border rounded-lg"
        />

        <button className="bg-green-600 text-white px-6 py-3 rounded-lg">
          {editingId ? "حفظ التعديل" : "إضافة الخدمة"}
        </button>
      </form>

      <div className="mt-10 grid md:grid-cols-2 gap-5">
        {services.map((service) => (
          <div
            key={service.id}
            className="p-5 bg-gray-100 dark:bg-slate-700 rounded-xl"
          >
            <h3 className="font-bold text-xl dark:text-white">
              {service.titleAr}
            </h3>

            <p className="dark:text-gray-200">{service.titleEn}</p>

            <div className="flex gap-3 mt-5">
              <button
                onClick={() => handleEdit(service)}
                className="bg-blue-600 text-white px-4 py-2 rounded"
              >
                تعديل
              </button>

              <button
                onClick={() => handleDelete(service.id)}
                className="bg-red-600 text-white px-4 py-2 rounded"
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

export default ServicesManager;
