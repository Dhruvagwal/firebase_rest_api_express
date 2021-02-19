const functions = require("firebase-functions");
const admin = require("firebase-admin");
const CONST =  require('./assets/CONST.json')

var serviceAccount = require("./path/to/serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});


const express = require("express");
const app = express();
const db = admin.firestore();


const cors = require("cors");
app.use(cors({origin: true}));


//Routes
app.get('/', (req, res)=>{
    return res.status(200).send('Hello World!');
})

//create 
//post
app.post('/api/create', (req, res)=>{
    (async ()=>{
        try {
            await db.collection(CONST.DBNAME).doc('/' + req.body.id + '/')
                .create({
                    name : req.body.name,
                    description: req.body.description,
                    price : req.body.price
                })
            return res.status(200).send('SUCESS!')
        }catch(err){
            console.log(err)
            return res.status(500).send('ERROR!')
        }
    })();
})


//read
//Get

//update
//put

//Delete
 

//Export the api to firebase Cloud Function
exports.app = functions.https.onRequest(app);