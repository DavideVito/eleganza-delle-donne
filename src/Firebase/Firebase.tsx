// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { initializeFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAnqFRYnC1z_T2c4HXdL4kJW_CudqGvMVc",
    authDomain: "eleganza-delle-donne.firebaseapp.com",
    projectId: "eleganza-delle-donne",
    storageBucket: "eleganza-delle-donne.appspot.com",
    messagingSenderId: "729667101579",
    appId: "1:729667101579:web:baf4dd294ac47b8dd5858e"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

initializeFirestore(app, {
    ignoreUndefinedProperties: true
});