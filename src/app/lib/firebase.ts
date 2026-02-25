// src/app/lib/firebase.ts
import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Les clés de connexion de ton projet JOBO
const firebaseConfig = {
  apiKey: "AIzaSyBvtxE5-ulzUGqp_oEWFjo_PnKWYd5yRpI",
  authDomain: "jobo-cc791.firebaseapp.com",
  projectId: "jobo-cc791",
  storageBucket: "jobo-cc791.firebasestorage.app",
  messagingSenderId: "711918297286",
  appId: "1:711918297286:web:0fa449f420e6ea8ce0f7c7"
};

// Initialisation de Firebase (on vérifie qu'il ne s'allume pas 2 fois)
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// On exporte la base de données pour pouvoir l'utiliser dans nos dashboards
export const db = getFirestore(app);