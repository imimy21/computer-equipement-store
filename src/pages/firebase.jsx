// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

// إعدادات Firebase الخاصة بتطبيقك
const firebaseConfig = {
  apiKey: "AIzaSyB-rDtMti8B_F59ifZ_MhErU3MK0Ou_gN0",
  authDomain: "monsite-ab177.firebaseapp.com",
  projectId: "monsite-ab177",
  storageBucket: "monsite-ab177.firebasestorage.app",
  messagingSenderId: "74819553432",
  appId: "1:74819553432:web:f66347165b7638cda0a8ed",
  measurementId: "G-V5EF6M9CPD"
};

// تهيئة Firebase
const app = initializeApp(firebaseConfig);

// الخدمات التي ستستخدمها
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const db = getFirestore(app);
const analytics = getAnalytics(app);

export { app, auth, provider, signInWithPopup, signOut, db, analytics };

