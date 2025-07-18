import React, { useEffect, useState } from "react";
import { createContext, useContext } from "react";
import { initializeApp } from "firebase/app";
import {getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, onAuthStateChanged} from "firebase/auth"
import {getFirestore, collection, addDoc} from 'firebase/firestore'
import {getStorage, ref, uploadBytes} from 'firebase/storage'

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

// Firestore Database
const firestore = getFirestore(firebaseApp);

// Storage
const storage = getStorage(firebaseApp);

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
    
    // Check user LogedIn or not
    const isLogedIn = user ? true : false

    // Add Listing
    const createNewListing = async (name, isbn, price, coverPic)=>{
        const imgRef =ref(storage, `uploads/images/${Date.now()}-${coverPic.name}`);
        const uploadResult = await uploadBytes(imgRef, coverPic);
        await addDoc(collection(firestore, 'books'),{
            name,
            isbn,
            price,
            imageUrl: uploadResult.ref.fullPath,
            userID: user.uid,
            userEmail: user.email,
            displayName: user.displayName,
            photoURL: user.photoURL
        })
    }
    return(
        <FirebaseContext.Provider value={{signUpUserWithEmailAndPassword, loginWithEmailAndPassword, signInwithGoogle, createNewListing, isLogedIn}}>
         {props.children}
        </FirebaseContext.Provider>
    )
}