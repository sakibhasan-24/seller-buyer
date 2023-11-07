// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAB0ZqQ3rfSgBcWfN7SSaB6hiZqchTLGVg",
  authDomain: "seller-buyer-2ccd0.firebaseapp.com",
  projectId: "seller-buyer-2ccd0",
  storageBucket: "seller-buyer-2ccd0.appspot.com",
  messagingSenderId: "1092691148042",
  appId: "1:1092691148042:web:5cd7044c83f7b5e62dcef3",
};

// Initialize Firebase
initializeApp(firebaseConfig);
export const db = getFirestore();
