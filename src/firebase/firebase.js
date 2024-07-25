// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBL-S5G6aCyZPThhLqTzDEzFXN7UUPrwoY",
  authDomain: "tnea-9a87e.firebaseapp.com",
  projectId: "tnea-9a87e",
  storageBucket: "tnea-9a87e.appspot.com",
  messagingSenderId: "409758372965",
  appId: "1:409758372965:web:cc4697b36f2991d0cce28c",
  measurementId: "G-5GB34JSN1C"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);