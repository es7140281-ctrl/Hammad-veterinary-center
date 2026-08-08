import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
  query,
  orderBy,
} from "firebase/firestore";

import { db } from "../firebase/firestore";

const productsRef = collection(db, "products");

// إضافة منتج
export async function addProduct(product) {
  return await addDoc(productsRef, {
    ...product,
    createdAt: Date.now(),
  });
}

// جلب كل المنتجات
export async function getProducts() {
  const q = query(productsRef, orderBy("createdAt", "desc"));

  const snapshot = await getDocs(q);

  return snapshot.docs.map((item) => ({
    id: item.id,
    ...item.data(),
  }));
}

// حذف منتج
export async function deleteProduct(id) {
  const productRef = doc(db, "products", id);

  await deleteDoc(productRef);
}

// تعديل منتج
export async function updateProduct(id, product) {
  const productRef = doc(db, "products", id);

  await updateDoc(productRef, {
    ...product,

    updatedAt: Date.now(),
  });
}
