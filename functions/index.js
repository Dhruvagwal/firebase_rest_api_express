const functions = require("firebase-functions");
const admin = require("firebase-admin");

var serviceAccount = require("./path/to/serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});


const express = require("express");
const app = express();


const cors = require("cors");
app.use(cors({origin: true}));


//Routes
app.get('/', (req, res)=>{
    return res.status(200).send('Hello World!');
})

//create 
//post

//read
//Get

//update
//put

//Delete
 

//Export the api to firebase Cloud Function
exports.app = functions.https.onRequest(app);