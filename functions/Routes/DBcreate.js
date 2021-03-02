const admin = require("firebase-admin");
const express = require("express");
const app = express();

const db = admin.firestore();

module.exports = app.post('/api/:database/create',(req,res)=>{
    (async ()=>{
        try {
            await db.collection(req.params.database).doc('/' + req.body.id + '/')
                .create(req.body)
            return res.status(200).send('SUCESS!')
        }catch(err){
            console.log(err)
            return res.status(500).send('ERROR!')
        }
    })();
})