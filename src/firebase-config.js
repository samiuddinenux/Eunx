// firebase-config.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyCq2zbDrhw12ezsjTa8IYX5aak_6aXvRx0",
  authDomain: "eunx-data.firebaseapp.com",
  projectId: "eunx-data",
  storageBucket: "eunx-data.firebasestorage.app",
  messagingSenderId: "535845132722",
  appId: "1:535845132722:web:786cf3f92b3423314e6cab",
  measurementId: "G-65Q0CN0949",
};
const app = initializeApp(firebaseConfig); // getiing files inside configration
const db = getFirestore(app); // Firestore instance
export { db };
