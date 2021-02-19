const functions = require("firebase-functions");
const admin = require("firebase-admin");
const express = require("express");
const cors = require("cors");
const app = express();


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