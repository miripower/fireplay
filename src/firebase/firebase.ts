import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
    apiKey: "AIzaSyAwkI2z3ypLvLGQkRUnqcJYwL9qA2zu0TA",
    authDomain: "fireplay-7a6c4.firebaseapp.com",
    projectId: "fireplay-7a6c4",
    storageBucket: "fireplay-7a6c4.firebasestorage.app",
    messagingSenderId: "527836051599",
    appId: "1:527836051599:web:31451cdba98545e524d8fa",
    measurementId: "G-JLVCV0YPK5"
}

const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
export const db = getFirestore(app)
