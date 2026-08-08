// Firebase App
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAyao2DNEmkZuZ2ySG2qWmjlmOV64UU60Y",
  authDomain: "vet-clinic-d5dd1.firebaseapp.com",
  projectId: "vet-clinic-d5dd1",
  storageBucket: "vet-clinic-d5dd1.firebasestorage.app",
  messagingSenderId: "422268327045",
  appId: "1:422268327045:web:741c7504ee482169b805ec",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Firestore Database
const db = getFirestore(app);

export { db };

export default app;
