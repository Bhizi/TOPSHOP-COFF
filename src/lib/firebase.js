import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyC01ziEjlPe-T4fn7fzitpSQpdea6jtNk8",
    authDomain: "topshop-coffee.firebaseapp.com",
    projectId: "topshop-coffee",
    storageBucket: "topshop-coffee.firebasestorage.app",
    messagingSenderId: "486637725272",
    appId: "1:486637725272:web:08697d9898899054fb8c2d"
}

const app = initializeApp(firebaseConfig)

export const db = getFirestore(app)