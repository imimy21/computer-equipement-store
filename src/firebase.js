import { initializeApp } from "firebase/app";
import { collection, addDoc } from "firebase/firestore";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
} from "firebase/auth";

import {
  getFirestore,
  doc,
  setDoc,
  getDoc,
} from "firebase/firestore";

import { GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCyW9bnNW0Do8nboEYFMXfegEcoim-J7b4",
  authDomain: "computer-site-6a923.firebaseapp.com",
  projectId: "computer-site-6a923",
  storageBucket: "computer-site-6a923.firebasestorage.app",
  messagingSenderId: "275369730862",
  appId: "1:275369730862:web:d03f5c32134750d61f90bf",
  measurementId: "G-HTGKYJHY5X"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const provider = new GoogleAuthProvider();

// بيانات الإدمن الثابتة
export const ADMIN_CREDENTIALS = {
  email: "admin@pcparts.com",
  password: "admin123456"
};

// 🔥 إنشاء حساب الإدمن (تشغليه مرة واحدة فقط)
export const createAdminUser = async () => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      ADMIN_CREDENTIALS.email,
      ADMIN_CREDENTIALS.password
    );
    const user = userCredential.user;

    await setDoc(doc(db, "users", user.uid), {
      displayName: "Administrator",
      email: user.email,
      role: "admin",
      isAdmin: true,
      createdAt: new Date()
    });

    console.log("Admin created!");
  } catch (error) {
    if (error.code === "auth/email-already-in-use") {
      console.log("Admin already exists");
    } else {
      console.error("Admin creation error:", error);
    }
  }
};
window.createAdminUser = createAdminUser;

// 🔥 تسجيل دخول المستخدم العادي
export const signInUser = async (email, password) => {
  return await signInWithEmailAndPassword(auth, email, password);
};

// 🔥 تسجيل الدخول كإدمن
export const signInAsAdmin = async (email, password) => {
  if (email === ADMIN_CREDENTIALS.email && password === ADMIN_CREDENTIALS.password) {
    return await signInWithEmailAndPassword(auth, email, password);
  } else {
    throw new Error("Invalid admin credentials");
  }
};

// 🔥 جلب الدور مع حل مشكلة الفلاش
export const getUserRole = async (uid, email) => {
  try {
    // أولاً، تحقق من البريد للإدمن
    if (email === ADMIN_CREDENTIALS.email) return "admin";

    const ref = doc(db, "users", uid);
    const snap = await getDoc(ref);

    if (snap.exists()) {
      return snap.data().role;
    }

    return "user";
  } catch {
    return "user";
  }
};

// 🔥 تسجيل خروج
export const logout = async () => {
  await auth.signOut();

};

