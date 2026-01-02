import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);

export const sendContactForm = async (formData) => {
  try {
    await addDoc(collection(db, "contactMessages"), {
      ...formData,
      timestamp: new Date(),
    });
    console.log("Mesaj başarıyla Firestore'a kaydedildi!");
    return { success: true };
  } catch (error) {
    console.error("Mesajı gönderme hatası: ", error);
    return { success: false, error };
  }
};
