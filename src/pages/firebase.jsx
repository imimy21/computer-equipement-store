// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCyW9bnNW0Do8nboEYFMXfegEcoim-J7b4",
  authDomain: "computer-site-6a923.firebaseapp.com",
  projectId: "computer-site-6a923",
  storageBucket: "computer-site-6a923.firebasestorage.app",
  messagingSenderId: "275369730862",
  appId: "1:275369730862:web:d03f5c32134750d61f90bf",
  measurementId: "G-HTGKYJHY5X"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider, signInWithPopup, signOut };
