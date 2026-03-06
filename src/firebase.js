import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCsqkYVT_PjXpf_RTzauIDLrXPWYoflHaQ",
  authDomain: "motimahalartjewellery.firebaseapp.com",
  projectId: "motimahalartjewellery",
  storageBucket: "motimahalartjewellery.firebasestorage.app",
  messagingSenderId: "535023632817",
  appId: "1:535023632817:web:bcb863db1e337ec53a3d90",
};

const app = initializeApp(firebaseConfig);

// Services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const googleProvider = new GoogleAuthProvider();
