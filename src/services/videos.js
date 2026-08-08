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

const videosRef = collection(db, "videos");

// جلب الفيديوهات
export async function getVideos() {
  const q = query(videosRef, orderBy("createdAt", "desc"));

  const snapshot = await getDocs(q);

  return snapshot.docs.map((item) => ({
    id: item.id,
    ...item.data(),
  }));
}

// إضافة فيديو
export async function addVideo(video) {
  return await addDoc(videosRef, {
    ...video,

    createdAt: Date.now(),
  });
}

// حذف فيديو
export async function deleteVideo(id) {
  await deleteDoc(doc(db, "videos", id));
}

// تعديل فيديو
export async function updateVideo(id, data) {
  await updateDoc(doc(db, "videos", id), {
    ...data,
    updatedAt: Date.now(),
  });
}
