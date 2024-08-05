// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAMv1Zfn669-b0_RlJAZmaLrJBN86DJJA0",
    authDomain: "auth124mp3.firebaseapp.com",
    projectId: "auth124mp3",
    storageBucket: "auth124mp3.appspot.com",
    messagingSenderId: "1001291818594",
    appId: "1:1001291818594:web:266d7d133c507fd142d33b",
    measurementId: "G-RT715L0ZFN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;