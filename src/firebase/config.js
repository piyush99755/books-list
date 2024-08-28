
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyCwD7UKuHzCi8oIwTYSZkbVmm75K6PyRAo",
  authDomain: "books-list-with-firebase-73747.firebaseapp.com",
  projectId: "books-list-with-firebase-73747",
  storageBucket: "books-list-with-firebase-73747.appspot.com",
  messagingSenderId: "481010724476",
  appId: "1:481010724476:web:65f441eded486bc14e23f9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);