import React from "react";
import { createContext, useContext } from "react";
import { initializeApp } from "firebase/app";

// Create Context
const FirebaseContext = createContext();
// Create Hooks
export const useFirebase = ()=> useContext(FirebaseContext);

// Firebase Configration
const firebaseConfig = {
  apiKey: "AIzaSyCkCBx8CtDCbTnhYPtKnKX3IJpsBT6tiyk",
  authDomain: "book-f616b.firebaseapp.com",
  databaseURL: "https://book-f616b-default-rtdb.firebaseio.com",
  projectId: "book-f616b",
  storageBucket: "book-f616b.firebasestorage.app",
  messagingSenderId: "181047076410",
  appId: "1:181047076410:web:f56a1a8d57dcf941143703",
  measurementId: "G-ECV8Q4QR2Q"
};

const firebaseApp = initializeApp(firebaseConfig);

// Create Context Provider
export const FirebaseProvider = (props)=>{
    return(
        <FirebaseContext.Provider>
         {props.children}
        </FirebaseContext.Provider>
    )
}