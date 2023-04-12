import { initializeApp } from "firebase/app";

// Optionally import the services that you want to use
import { getAuth, initializeAuth } from "firebase/auth";
// import {...} from "firebase/database";
import { getFirestore } from "firebase/firestore";
// import {...} from "firebase/functions";
// import {...} from "firebase/storage";

import {getReactNativePersistence} from 'firebase/auth/react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Initialize Firebase
export const FIREBASE_API = {
  databaseURL: "https://ploomes-938d3.firebaseio.com",
  apiKey: "AIzaSyCMzEQhAjeAETINqtOahsiqhCyl4_hDREw",
  authDomain: "ploomes-938d3.firebaseapp.com",
  projectId: "ploomes-938d3",
  storageBucket: "ploomes-938d3.appspot.com",
  messagingSenderId: "88202504409",
  appId: "1:88202504409:web:be79656fc75f14068cf6c8",
  measurementId: "G-4JGN2BLSS3",
};

const app = initializeApp(FIREBASE_API);
// For more information on how to access Firebase in your project,
// see the Firebase documentation: https://firebase.google.com/docs/web/setup#access-firebase

// Initialize Firebase Authentication and get a reference to the service
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

export const db = getFirestore(app);

export default {
  auth,
  db,
};
