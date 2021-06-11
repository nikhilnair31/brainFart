import firebase from 'firebase/app';
import 'firebase/firestore'
import 'firebase/analytics'
import 'firebase/auth'

var firebaseConfig = {
    apiKey: "AIzaSyDLDpBQenecyN8g3i6SYMkdt2dOlOhWufE",
    authDomain: "ideahub31.firebaseapp.com",
    databaseURL: "https://ideahub31-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "ideahub31",
    storageBucket: "ideahub31.appspot.com",
    messagingSenderId: "1079537595844",
    appId: "1:1079537595844:web:f557cfc9dd30ddb12ea091",
    measurementId: "G-MNCWP64FFH"
};
firebase.initializeApp(firebaseConfig);
firebase.analytics();

export const dbref = firebase.firestore();
export const auth = firebase.auth();

export const googleProvider = new firebase.auth.GoogleAuthProvider()
export const twitterProvider = new firebase.auth.TwitterAuthProvider();