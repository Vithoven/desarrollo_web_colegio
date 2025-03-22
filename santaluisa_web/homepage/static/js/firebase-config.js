// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.1.1/firebase-app.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB9Q1t6gUGaOBGkkP1M7U1n1zbGEJ4lO2U",
  authDomain: "registrapp-f83a9.firebaseapp.com",
  projectId: "registrapp-f83a9",
  storageBucket: "registrapp-f83a9.appspot.com",
  messagingSenderId: "1072150469678",
  appId: "1:1072150469678:web:cf354eb2a62d83f3cb93bf"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Exporta el app para que se use en otros archivos
export { app };
