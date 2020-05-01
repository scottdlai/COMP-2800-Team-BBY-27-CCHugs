import 'firebase/auth';
import 'firebase/firestore';



import firebase from 'firebase/app';


const app = firebase.initializeApp({
    apiKey: "AIzaSyCreNMuxE3225kdhMdTM7dg062CuzOb0gw",
    authDomain: "cchugs-bd4ee.firebaseapp.com",
    databaseURL: "https://cchugs-bd4ee.firebaseio.com",
    projectId: "cchugs-bd4ee",
    storageBucket: "cchugs-bd4ee.appspot.com",
    messagingSenderId: "1032457047931",
    appId: "1:1032457047931:web:d87770099239f1c10cf7de"
});

const firestore = firebase.firestore(app);
const auth = firebase.auth(app);

export { app, auth, firestore};

export default firebase;