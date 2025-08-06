import AsyncStorage from "@react-native-async-storage/async-storage";
import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBfm_0iIWfSXGt5Wn7KPy1dCjqp9twvvEs",
  authDomain: "fluffy-paws-app.firebaseapp.com",
  projectId: "fluffy-paws-app",
  storageBucket: "fluffy-paws-app.firebasestorage.app",
  messagingSenderId: "302741275110",
  appId: "1:302741275110:web:c4a05802932b2c5f025627"
};
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage)
});


export { app, auth, db };
