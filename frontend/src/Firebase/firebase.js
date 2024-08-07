import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC-tUrdEs2RDtmipDX9usfOsIE69sFTu6Y",
  authDomain: "fir-cure.firebaseapp.com",
  projectId: "fir-cure",
  storageBucket: "fir-cure.appspot.com",
  messagingSenderId: "953758324842",
  appId: "1:953758324842:web:7c5c8e0fb721c1142a1213",
  measurementId: "G-QP7HWW1PP5"
};
const app = initializeApp(firebaseConfig);


// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);
export  {auth};
