// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-firestore.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCAoqk0ECwUOxqtDqy6Uvnvn2P33Vao6us",
  authDomain: "zoologico-f93b7.firebaseapp.com",
  projectId: "zoologico-f93b7",
  storageBucket: "zoologico-f93b7.firebasestorage.app",
  messagingSenderId: "650624564645",
  appId: "1:650624564645:web:3345ec308271ed200abc4c",
  measurementId: "G-HS11Y7WYKE"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore();

export { db };