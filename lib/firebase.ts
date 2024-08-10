import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyD0rtkE_KIgyDxKN8QmT3xlEd5pizeKx9w",
  authDomain: "ecommerce-4c4a2.firebaseapp.com",
  projectId: "ecommerce-4c4a2",
  storageBucket: "ecommerce-4c4a2.appspot.com",
  messagingSenderId: "671662299167",
  appId: "1:671662299167:web:f6fb6f33ca73fc0277dd2a",
  measurementId: "G-KJSVTZMLJ0",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

export { db, storage };
