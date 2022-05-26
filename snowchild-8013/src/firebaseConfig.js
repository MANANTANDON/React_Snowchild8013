import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDLQRYgHl7IheFJPmW6j9vYZEXlOGPfbQc",
  authDomain: "snowchild-1b1c7.firebaseapp.com",
  databaseURL: "https://snowchild-1b1c7-default-rtdb.firebaseio.com",
  projectId: "snowchild-1b1c7",
  storageBucket: "snowchild-1b1c7.appspot.com",
  messagingSenderId: "1049046893401",
  appId: "1:1049046893401:web:276e06d07729841f608248",
  measurementId: "G-H87DFHKT2B",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);
