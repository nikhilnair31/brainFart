//import firebase from 'firebase/app';
import firebase from 'firebase';
import 'firebase/storage'
import 'firebase/analytics'

const config = {
    apiKey: "AIzaSyDLDpBQenecyN8g3i6SYMkdt2dOlOhWufE",
    authDomain: "ideahub31.firebaseapp.com",
    projectId: "ideahub31",
    storageBucket: "ideahub31.appspot.com",
    messagingSenderId: "1079537595844",
    appId: "1:1079537595844:web:f557cfc9dd30ddb12ea091",
    measurementId: "G-MNCWP64FFH"
};

firebase.initializeApp(config);
firebase.analytics();
export const dbref = firebase.database().ref('contacters');