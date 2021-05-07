//import firebase from 'firebase/app';
import firebase from 'firebase/app';
import 'firebase/database'
import 'firebase/firestore'
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
// export const dbref = firebase.app().database('https://ideahub31-default-rtdb.asia-southeast1.firebasedatabase.app');
export const dbref = firebase.firestore();

export const auth = firebase.auth();

const googleProvider = new firebase.auth.GoogleAuthProvider()
export const signInWithGoogle = () => {
    auth.signInWithPopup(googleProvider).then((res) => {
        console.log(`FIREBASE res\n auth: ${JSON.stringify(auth)}\n `);
    }).catch((error) => {
        console.log(`FIREBASE error\n error.message: ${JSON.stringify(error.message)}\n `);
    })
    console.log(`FIREBASE initial\n auth: ${JSON.stringify(auth)}\n`);
}

const twitterProvider = new firebase.auth.TwitterAuthProvider();
export const signInWithTwitter = () => {
    auth.signInWithPopup(twitterProvider).then((res) => {
       console.log(res.credential.accessToken, res.user);
    }).catch((error) => {
        console.log(`FIREBASE error\n error.message: ${JSON.stringify(error.message)}\n `);
    })
 }

export const signInWithAnon = () => {
    auth.signInAnonymously().then((res) => {
        console.log(`FIREBASE res\n auth: ${JSON.stringify(auth)}\n `);
    }).catch((error) => {
        console.log(`FIREBASE error\n error.message: ${JSON.stringify(error.message)}\n `);
    })
    console.log(`FIREBASE initial\n auth: ${JSON.stringify(auth)}\n `);
}

export const logOut = () => {
    auth.signOut().then(()=> {
        console.log(`FIREBASE res\n auth: ${JSON.stringify(auth)}\n `);
    }).catch((error) => {
        console.log(`FIREBASE error\n error.message: ${JSON.stringify(error.message)}\n `);
    })
    console.log(`FIREBASE initial\n auth: ${JSON.stringify(auth)}\n `);
}