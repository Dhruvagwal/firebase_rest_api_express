const admin = require("firebase-admin");
// const CONST =  require('../assets/CONST.json')

const express = require("express");
const app = express();

const db = admin.firestore();

module.exports = app.post('/api/:database/create' ,(req,res)=>{
    (async ()=>{
        try {
            await db.collection(req.params.database).doc('/' + req.body.id + '/')
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