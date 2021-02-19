const admin = require("firebase-admin");
const CONST =  require('../assets/CONST.json')

const express = require("express");

const app = express();
const db = admin.firestore();

module.exports = app.put('/api/update/:id', (req, res)=>{
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