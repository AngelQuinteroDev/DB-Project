// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-firestore.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAgVj5FAzSRPn_7n-ZX1joUEcKrta0VCiM",
  authDomain: "superzoo-4d820.firebaseapp.com",
  databaseURL: "https://superzoo-4d820-default-rtdb.firebaseio.com",
  projectId: "superzoo-4d820",
  storageBucket: "superzoo-4d820.firebasestorage.app",
  messagingSenderId: "82513931469",
  appId: "1:82513931469:web:dc06274bb62a45eacd4d84"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore();

export { db };