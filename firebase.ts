// Import the functions you need from the SDKs you need

import { initializeApp,getApp,getApps } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAXd6kp_pTmyvB0coFpmdUaW3h6GJ2mMUs",
  authDomain: "netflix-web-test.firebaseapp.com",
  projectId: "netflix-web-test",
  storageBucket: "netflix-web-test.appspot.com",
  messagingSenderId: "233522017686",
  appId: "1:233522017686:web:6736651abd158e7aead9b7",
  measurementId: "G-6ZWHFWRZL3"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore();
const auth = getAuth();

export default app
export { db, auth }