const functions = require("firebase-functions");
const admin = require("firebase-admin");
var serviceAccount = require("../path/to/serviceAccountKey.json");


admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

//-----------Express Code----------------//
const express = require("express");
const app = express();

const cors = require("cors");
app.use(cors({origin: true}));



//SignUp
const SignUp = require('./middlewares/SignUp')
app.use(SignUp)

//Login
const Login = require('./middlewares/Login')
app.use(Login)

//create database Api
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


//find by params
const QuerySearch = require('./middlewares/QuerySearch')
app.use(QuerySearch)


//Delete
const Delete = require('./middlewares/Delete')
app.use(Delete)



//Export the api to firebase Cloud Function
exports.app = functions.https.onRequest(app);