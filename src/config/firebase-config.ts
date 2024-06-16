import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyDha0TpW7H-TMvVEe5y78IlzK7l423qfZA",
  authDomain: "sheyott-udemy.firebaseapp.com",
  projectId: "sheyott-udemy",
  storageBucket: "sheyott-udemy.appspot.com",
  messagingSenderId: "111182494304",
  appId: "1:111182494304:web:3af138146af143ce882105",
  measurementId: "G-78867ZGFBS"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
export default firebaseApp;
