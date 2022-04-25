import firebase from 'firebase/compat/app';
import {getFirestore} from "firebase/firestore"
import 'firebase/compat/auth';
import 'firebase/compat/firestore'

const app = firebase.initializeApp({
    apiKey: "AIzaSyAYbPtBBDqJCbXyf1Okt7eS-RMs9q5qmLk",
    authDomain: "testmessenger-4cb00.firebaseapp.com",
    databaseURL: "https://testmessenger-4cb00-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "testmessenger-4cb00",
    storageBucket: "testmessenger-4cb00.appspot.com",
    messagingSenderId: "506573483009",
    appId: "1:506573483009:web:852787c59bd3a56f87e400"
})

export default app
export const auth = app.auth()
export const firestore = app.firestore()
export const db = getFirestore(app)