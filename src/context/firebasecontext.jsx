import React, { useEffect, useState } from "react";
import { createContext, useContext } from "react";
import { initializeApp } from "firebase/app";
import {getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, onAuthStateChanged} from "firebase/auth"

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
// Firebase Auth
const firebaseAuth = getAuth(firebaseApp);

// Google Auth
const googleProvider = new GoogleAuthProvider()



// Create Context Provider
export const FirebaseProvider = (props)=>{
    const [user, setUser] = useState(null);

    useEffect(()=>{
        onAuthStateChanged(firebaseAuth, (user)=>{
            if(user) setUser(user);
            else setUser(null);
        })
    },[])


    // Custom Function

    // Create User Function
    const signUpUserWithEmailAndPassword = (email, password)=>{
        return createUserWithEmailAndPassword(firebaseAuth, email, password );
    }

    // Login Eixsting User
    const loginWithEmailAndPassword = (email, password)=>{
        return signInWithEmailAndPassword(firebaseAuth, email, password);
    }

    // Sign in with Google

    const signInwithGoogle = ()=>{
        signInWithPopup(firebaseAuth, googleProvider)
    }

    const isLogedIn = user ? true : false
    return(
        <FirebaseContext.Provider value={{signUpUserWithEmailAndPassword, loginWithEmailAndPassword, signInwithGoogle, isLogedIn}}>
         {props.children}
        </FirebaseContext.Provider>
    )
}