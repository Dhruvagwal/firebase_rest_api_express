const admin = require("firebase-admin");
// const CONST =  require('../assets/CONST.json')
const authenticateToken = require('./AuthenticateToken')

const express = require("express");

const app = express();
const db = admin.firestore();

module.exports = app.delete('/api/:database/delete/:id',authenticateToken, (req, res)=>{
    (async ()=>{
        try {
            const document = db.collection(req.params.database).doc(req.params.id)

            await document.delete();
            
            return res.status(200).send('SUCESS!')
        }catch(err){
            console.log(err)
            return res.status(500).send('ERROR!')
        }
    })();
})
 