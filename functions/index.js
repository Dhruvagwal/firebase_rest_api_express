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


//read a Specific based on product id
//Get
app.get('/api/read/:id', (req, res)=>{
    (async ()=>{
        try {
            const documents = db.collection(CONST.DBNAME).doc(req.params.id);

            let products = await documents.get();

            let response  = products.data();

            return res.status(200).send(response)
        }catch(err){
            console.log(err)
            return res.status(500).send('ERROR!')
        }
    })();
})

//read all products
//Get
app.get('/api/read', (req, res)=>{
    (async ()=>{
        try {

            let query = db.collection(CONST.DBNAME);

            let response = [];

            await query.get().then(querySnapshot => {
                let docs = querySnapshot.docs; //the results of the query

                for (let doc of docs){
                    const selectedItem = {
                        id: doc.id,
                        name: doc.data().name,
                        description: doc.data().description,
                        price: doc.data().price,
                    }
                    response.push(selectedItem)
                }
                return response;
            })

            return res.status(200).send(response)
        }catch(err){
            console.log(err)
            return res.status(500).send('ERROR!')
        }
    })();
})


//update
//put
app.put('/api/update/:id', (req, res)=>{
    (async ()=>{
        try {
            const document = db.collection(CONST.DBNAME).doc(req.params.id)
            await document.update({
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



//Delete
app.delete('/api/delete/:id', (req, res)=>{
    (async ()=>{
        try {
            const document = db.collection(CONST.DBNAME).doc(req.params.id)

            await document.delete();
            
            return res.status(200).send('SUCESS!')
        }catch(err){
            console.log(err)
            return res.status(500).send('ERROR!')
        }
    })();
})
 

//Export the api to firebase Cloud Function
exports.app = functions.https.onRequest(app);