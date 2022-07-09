import firebase from "firebase/app";
import "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyDDEeDC5sEDK_rzNd-HTZvpzsCDsK-DYh0",
    authDomain: "simple-dev-46629.firebaseapp.com",
    projectId: "simple-dev-46629",
    storageBucket: "simple-dev-46629.appspot.com",
    messagingSenderId: "90573150745",
    appId: "1:90573150745:web:59c2ebcfe22b36e251e888",
    measurementId: "G-HRNMK9H1KB"
  };

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export const auth = firebase.auth();