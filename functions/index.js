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


//create 
const DBcreate = require('./middlewares/DBcreate')
app.use(DBcreate)


//read a Specific based on product id
//Get
const ReadId = require('./middlewares/ReadId')
app.use(ReadId)

//read all products
//Get
const ReadAll = require('./middlewares/ReadAll')
app.use(ReadAll)


//update
//put
const Update = require('./middlewares/Update')
app.use(Update)




//Delete
const Delete = require('./middlewares/Delete')
app.use(Delete)


//Export the api to firebase Cloud Function
exports.app = functions.https.onRequest(app);