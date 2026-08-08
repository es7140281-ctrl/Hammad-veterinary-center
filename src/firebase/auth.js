// Firebase Authentication

import { getAuth } from "firebase/auth";
import app from "./firebase";

// Initialize Firebase Auth
const auth = getAuth(app);

export default auth;
