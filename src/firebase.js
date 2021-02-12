import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/storage'

  // Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyA1CSADPFcuGM6JbrQFu9X2alv1jMtTBlg",
    authDomain: "auth-a959b.firebaseapp.com",
    databaseURL: "https://auth-a959b-default-rtdb.firebaseio.com",
    projectId: "auth-a959b",
    storageBucket: "auth-a959b.appspot.com",
    messagingSenderId: "77669121747",
    appId: "1:77669121747:web:403d6b26082e8fd4d71e26"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const auth = firebase.auth()
const db = firebase.firestore()
const storage = firebase.storage()

export {auth, firebase, db, storage}