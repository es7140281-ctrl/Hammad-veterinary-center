import { db } from "../firebase/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";

const farmRef = doc(db, "settings", "farm");

export async function getFarm() {
  const snap = await getDoc(farmRef);

  if (snap.exists()) {
    return snap.data();
  }

  return null;
}

export async function updateFarm(data) {
  await setDoc(farmRef, data, { merge: true });
}
