import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';
require('firebase/database');
const firebaseConfig = {
  apiKey: "AIzaSyCv8WN8SPGk5FcMgoyafrESPbVXpmp7-IA",
  authDomain: "anseval-29e57.firebaseapp.com",
  databaseURL: "https://anseval-29e57.firebaseio.com",
  projectId: "anseval-29e57",
  storageBucket: "anseval-29e57.appspot.com",
  messagingSenderId: "404935896421",
  appId: "1:404935896421:web:2d9639033034a873ecc58c",
  measurementId: "G-TXP712Z5MP"
};
  // Initialize Firebase
  
firebase.initializeApp(firebaseConfig);
export const auth = firebase.auth();
export const firestore = firebase.firestore();
export const storage = firebase.storage();
export default firebase;