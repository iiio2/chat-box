import firebase from 'firebase/app'; 
import "firebase/firestore";
import "firebase/auth"; 

// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyBaC6S_o-PitPeDTcGJ4Fu2dMr6PhQ45I0",
    authDomain: "chat-box-cc131.firebaseapp.com",
    databaseURL: "https://chat-box-cc131.firebaseio.com",
    projectId: "chat-box-cc131",
    storageBucket: "chat-box-cc131.appspot.com",
    messagingSenderId: "128310142374",
    appId: "1:128310142374:web:933b285c61ff7e3fe05b67"
  };
  // Initialize Firebase
 var firebaseApp = firebase.initializeApp(firebaseConfig);

 export const db = firebaseApp.firestore(); 
 export const auth = firebaseApp.auth(); 
