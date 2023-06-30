import { initializeApp } from 'firebase/app'
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth"
import { getFirestore, collection, addDoc, query, where, getDocs, getDoc, doc, updateDoc, deleteDoc } from 'firebase/firestore'

export default defineNuxtPlugin(() => {
    const config = useRuntimeConfig()

    const firebaseConfig = {
        apiKey: config.public.apiKey,
        authDomain: config.public.authDomain,
        projectId: config.public.projectId,
        storageBucket: config.public.storageBucket,
        messagingSenderId: config.public.messagingSenderId,
        appId: config.public.appId,
    };

    const app = initializeApp(firebaseConfig)

    const auth = getAuth(app)
    const firestore = getFirestore(app)

    return {
        provide: {
          auth,firestore,signInWithPopup,GoogleAuthProvider,signOut, collection, addDoc, query, where, getDocs, getDoc, doc, updateDoc, deleteDoc
        }
      }
    
})