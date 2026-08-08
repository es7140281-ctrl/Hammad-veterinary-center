import { useEffect, useState } from "react";

import { uploadImage } from "../../services/cloudinary";

import {
  addProduct,
  getProducts,
  deleteProduct,
  updateProduct,
} from "../../services/products";

function ProductManager() {
  const [nameAr, setNameAr] = useState("");
  const [nameEn, setNameEn] = useState("");

  const [descriptionAr, setDescriptionAr] = useState("");
  const [descriptionEn, setDescriptionEn] = useState("");

  const [image, setImage] = useState(null);

  const [editingId, setEditingId] = useState(null);

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const [products, setProducts] = useState([]);

  async function loadProducts() {
    try {
      const data = await getProducts();
      setProducts(data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    loadProducts();
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setLoading(true);
      setMessage("");

      let imageUrl = null;

      if (image instanceof File) {
        imageUrl = await uploadImage(image);
      }

      // تعديل منتج
      if (editingId) {
        const oldProduct = products.find((item) => item.id === editingId);

        await updateProduct(editingId, {
          nameAr,
          nameEn,
          descriptionAr,
          descriptionEn,
          image: imageUrl || oldProduct.image,
        });

        setMessage("تم تعديل المنتج بنجاح ✅");
      }

      // إضافة منتج
      else {
        if (!imageUrl) {
          setMessage("اختر صورة للمنتج");
          return;
        }

        await addProduct({
          nameAr,
          nameEn,
          descriptionAr,
          descriptionEn,
          image: imageUrl,
        });

        setMessage("تم إضافة المنتج بنجاح ✅");
      }

      setNameAr("");
      setNameEn("");
      setDescriptionAr("");
      setDescriptionEn("");
      setImage(null);
      setEditingId(null);

      await loadProducts();
    } catch (error) {
      console.log(error);
      setMessage("حدث خطأ أثناء الحفظ");
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id) {
    const confirmDelete = window.confirm("هل تريد حذف المنتج؟");

    if (!confirmDelete) return;

    await deleteProduct(id);

    loadProducts();
  }

  function handleEdit(product) {
    setEditingId(product.id);

    setNameAr(product.nameAr || "");
    setNameEn(product.nameEn || "");

    setDescriptionAr(product.descriptionAr || "");
    setDescriptionEn(product.descriptionEn || "");

    setImage(null);
  }

  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl shadow p-6">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">
        إدارة المنتجات
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4 mb-10">
        <input
          type="text"
          placeholder="اسم المنتج بالعربي"
          value={nameAr}
          onChange={(e) => setNameAr(e.target.value)}
          className="w-full p-3 rounded-lg border dark:bg-slate-700 dark:text-white"
        />

        <input
          type="text"
          placeholder="اسم المنتج بالإنجليزي"
          value={nameEn}
          onChange={(e) => setNameEn(e.target.value)}
          className="w-full p-3 rounded-lg border dark:bg-slate-700 dark:text-white"
        />

        <textarea
          placeholder="وصف المنتج بالعربي"
          value={descriptionAr}
          onChange={(e) => setDescriptionAr(e.target.value)}
          className="w-full p-3 rounded-lg border dark:bg-slate-700 dark:text-white"
        />

        <textarea
          placeholder="وصف المنتج بالإنجليزي"
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

        <button
          disabled={loading}
          className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition"
        >
          {loading
            ? "جاري الحفظ..."
            : editingId
              ? "حفظ التعديل"
              : "إضافة المنتج"}
        </button>
      </form>

      {message && <p className="mb-8 text-green-600 font-bold">{message}</p>}

      <h3 className="text-xl font-bold mb-5 text-gray-800 dark:text-white">
        جميع المنتجات
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-gray-100 dark:bg-slate-700 rounded-xl overflow-hidden shadow"
          >
            <img
              src={product.image}
              alt={product.nameAr}
              className="w-full h-56 object-cover"
            />

            <div className="p-4">
              <h4 className="text-xl font-bold text-gray-800 dark:text-white">
                {product.nameAr}
              </h4>

              <p className="mt-2 text-gray-600 dark:text-gray-300">
                {product.descriptionAr}
              </p>

              <p className="mt-2 text-sm text-gray-500">
                English: {product.nameEn}
              </p>

              <div className="mt-5 flex gap-3">
                <button
                  onClick={() => handleDelete(product.id)}
                  className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg"
                >
                  حذف
                </button>

                <button
                  onClick={() => handleEdit(product)}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
                >
                  تعديل
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductManager;
