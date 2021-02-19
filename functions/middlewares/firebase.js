const firebase = require("firebase/app");
require("firebase/auth");

const apiKey = process.env.FIREBASE_API_KEY;

const fb = firebase.initializeApp(require('../path/to/firbase.json'));

exports.addUser = (email, password) =>
  fb.auth().createUserWithEmailAndPassword(email, password);

exports.authenticate = (email, password) =>
  fb.auth().signInWithEmailAndPassword(email, password);