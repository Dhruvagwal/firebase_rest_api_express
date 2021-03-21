const firebase = require("firebase/app");
require("firebase/auth");

const fb = firebase.initializeApp({
  apiKey: "AIzaSyDKHQ51z-7BQx-qX-v3xHv7oq8BOSVXj00",
  authDomain: "mwcdispdepot-df9c9.firebaseapp.com",
  projectId: "mwcdispdepot-df9c9",
  storageBucket: "mwcdispdepot-df9c9.appspot.com",
  messagingSenderId: "627570747617",
  appId: "1:627570747617:web:cc97def92a82c43436efa0",
  measurementId: "G-J5B954DFWW"
});

exports.addUser = (email, password) =>
  fb.auth().createUserWithEmailAndPassword(email, password);

exports.authenticate = (email, password) =>
  fb.auth().signInWithEmailAndPassword(email, password);

exports.signOut = ()=>{
    fb.auth().signOut();
}