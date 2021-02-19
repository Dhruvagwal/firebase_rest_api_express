const admin = require("firebase-admin");
const CONST =  require('../assets/CONST.json')

const express = require("express");

const app = express();
const db = admin.firestore();

module.exports = app.get('/api/:database/read/:id', (req, res)=>{
    (async ()=>{
        try {
            const documents = db.collection(req.params.database).doc(req.params.id);

            let products = await documents.get();

            let response  = products.data();

            return res.status(200).send(response)
        }catch(err){
            console.log(err)
            return res.status(500).send('ERROR!')
        }
    })();
})