const admin = require("firebase-admin");

const express = require("express");

const app = express();
const db = admin.firestore();

module.exports = app.put('/api/:database/update/:id',(req, res)=>{
    (async ()=>{
        try {
            const document = db.collection(req.params.database).doc(req.params.id)
            await document.update(req.body)
            return res.status(200).send('SUCESS!')
        }catch(err){
            console.log(err)
            return res.status(500).send('ERROR!')
        }
    })();
})