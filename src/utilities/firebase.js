// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyB39L-8WVL5ng6wUOO0G6N1VmKluQapAQo",
    authDomain: "it-service-user.firebaseapp.com",
    projectId: "it-service-user",
    storageBucket: "it-service-user.appspot.com",
    messagingSenderId: "652064831351",
    appId: "1:652064831351:web:71f2cf7cfc681a30965372"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export default { app, db };