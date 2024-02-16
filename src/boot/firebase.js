// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyATRrSRPZF9bMe8_2qLgYwPJPgOZYFI7BE",
  authDomain: "majorblend.firebaseapp.com",
  projectId: "majorblend",
  storageBucket: "majorblend.appspot.com",
  messagingSenderId: "544560950927",
  appId: "1:544560950927:web:83fa66710af1168dad0afa",
  measurementId: "G-MBDR860JGB",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const firestore = getFirestore(app);

export { app, analytics, auth, firestore };
