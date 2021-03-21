const functions = require("firebase-functions");
const admin = require("firebase-admin");
var serviceAccount = require("./path/to/serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});


//-----------Express Code----------------//
const express = require("express");
const app = express();

const cors = require("cors");
app.use(cors({origin: true}));

//create database Api
const DBcreate = require('./Routes/DBcreate')
app.use(DBcreate)



app.use(require('./Routes/Auth/AuthRoutes'))

//read a Specific based on product id
//Get
const ReadId = require('./Routes/ReadId')
app.use(ReadId)

//read all products
//Get
const ReadAll = require('./Routes/ReadAll')
app.use(ReadAll)


//update
//put
const Update = require('./Routes/Update')
app.use(Update)


//find by params
const QuerySearch = require('./Routes/QuerySearch')
app.use(QuerySearch)


//Delete
const Delete = require('./Routes/Delete')
app.use(Delete)



//Export the api to firebase Cloud Function
exports.app = functions.https.onRequest(app);