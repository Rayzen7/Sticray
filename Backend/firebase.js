// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from 'firebase/storage'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD2_5FEyORnYqOyPGLPU9dBt9oQiZv3xng",
  authDomain: "e-commerce-sija.firebaseapp.com",
  projectId: "e-commerce-sija",
  storageBucket: "e-commerce-sija.appspot.com",
  messagingSenderId: "921822959706",
  appId: "1:921822959706:web:95b75dbaed6cbba57aa063",
  measurementId: "G-939ZQNYTYE"
};

// Initialize Firebase app
const app = initializeApp(firebaseConfig);

// Export Firebase storage
export const storage = getStorage(app);