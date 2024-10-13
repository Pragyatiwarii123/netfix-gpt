// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyABDrEL5CWCBxVaH4F4wnACBQ83c-NnvIE",
  authDomain: "netflixgpt-30c45.firebaseapp.com",
  projectId: "netflixgpt-30c45",
  storageBucket: "netflixgpt-30c45.appspot.com",
  messagingSenderId: "320515988937",
  appId: "1:320515988937:web:91c67c78fd556ed713dc18",
  measurementId: "G-EKGQJ5ZP9Z"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth();
