import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
const apiKey = process.env.EXPO_PUBLIC_FIREBASE_KEY;

const firebaseConfig = {
  apiKey: apiKey,
  authDomain: "fluffy-paws-app.firebaseapp.com",
  projectId: "fluffy-paws-app",
  storageBucket: "fluffy-paws-app.firebasestorage.app",
  messagingSenderId: "302741275110",
  appId: "1:302741275110:web:c4a05802932b2c5f025627"
};
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);


export { app, db };
