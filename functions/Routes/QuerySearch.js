const admin = require("firebase-admin");


const express = require("express");

const app = express();
const db = admin.firestore();

module.exports = app.post('/api/:database/search/',(req, res)=>{
    (async ()=>{
        try {

            let query = db.collection(req.params.database).where(req.body.value,"==",req.body.query);
            let response = [];

            await query.get().then(querySnapshot => {
                let docs = querySnapshot.docs; //the results of the query

                for (let doc of docs){
                    const selectedItem = doc.data()
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