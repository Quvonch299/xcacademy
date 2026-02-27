"use client";

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "SIZNING_API_KEY",
  authDomain: "SIZNING_PROJECT_ID.firebaseapp.com",
  projectId: "SIZNING_PROJECT_ID",
  storageBucket: "SIZNING_PROJECT_ID.appspot.com",
  messagingSenderId: "SIZNING_SENDER_ID",
  appId: "SIZNING_APP_ID",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);