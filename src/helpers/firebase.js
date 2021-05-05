//import firebase from 'firebase/app';
import firebase from 'firebase/app';
import 'firebase/database'
import 'firebase/storage'
import 'firebase/analytics'
import 'firebase/auth'

var firebaseConfig = {
    apiKey: "AIzaSyDLDpBQenecyN8g3i6SYMkdt2dOlOhWufE",
    authDomain: "ideahub31.firebaseapp.com",
    projectId: "ideahub31",
    storageBucket: "ideahub31.appspot.com",
    messagingSenderId: "1079537595844",
    appId: "1:1079537595844:web:f557cfc9dd30ddb12ea091",
    measurementId: "G-MNCWP64FFH"
};

firebase.initializeApp(firebaseConfig);
firebase.analytics();
export const dbref = firebase.app().database('https://ideahub31-default-rtdb.asia-southeast1.firebasedatabase.app');

export const auth = firebase.auth();
const googleProvider = new firebase.auth.GoogleAuthProvider()
export const signInWithGoogle = () => {
    auth.signInWithPopup(googleProvider).then((res) => {
        console.log(`auth: ${JSON.stringify(auth)}\n\n\n res.user: ${JSON.stringify(res.user)}\n `);
    }).catch((error) => {
        console.log(`error.message: ${JSON.stringify(error.message)}\n `);
    })
    console.log(`auth: ${JSON.stringify(auth)}\n`);
}
export const signInWithAnon = () => {
    auth.signInAnonymously().then((res) => {
        console.log(`auth: ${JSON.stringify(auth)}\n\n\n res.user: ${JSON.stringify(res.user)}\n `);
    }).catch((error) => {
        console.log(`error.message: ${JSON.stringify(error.message)}\n `);
    })
    console.log(`auth: ${JSON.stringify(auth)}\n`);
}