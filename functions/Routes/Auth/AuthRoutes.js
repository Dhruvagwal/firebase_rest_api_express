require('dotenv').config()

const express =  require('express');
const app =  express();
const jwt = require('jsonwebtoken');
const ACCESS_TOKEN = "5f69eb0402a5f645854af407897e2b2d7cd161b5dfe3689ac530bcfcbece1201ed80bde7d740364eb2ace4444c649cfa37a22f85f171af7fb37c0a548f19590a"
const firebase = require('./Firebase')

app.post('/signup',async (req,res)=>{
    const {email, password} = req.body;
    try{
        const { user } = await firebase.addUser(email, password)
        const token = jwt.sign({userId: user.uid}, ACCESS_TOKEN)
        res.send({token})
    }catch(err){
        res.status(401).send(err.message)
    }

})
app.post('/signin', async (req,res)=>{
    const {email, password} = req.body;
    try{
        if(!email || !password){
            return res.status(422).send({err:'Must provide email and password'})
        }
        const user = await firebase.authenticate(email, password)
        const token = jwt.sign({userId: user.uid}, ACCESS_TOKEN)
        res.status(200).send({token})
    }catch(err){
        res.status(401).send(err.message)
    }

})

app.post('/verifyToken', (req, res) =>{
    const {authorization} = req.headers;
    if(!authorization) return res.status(401).send({err:"You must be Logged in."})
    const token = authorization.replace('Bearer ','')
    jwt.verify(token, ACCESS_TOKEN,async (err, payload)=>{
        if(err){
            return res.status(401).send({err:"You must be Logged in."})
        }
        res.status(200).send("sucess", payload)
    })
})

app.delete('/signout', async (req,res)=>{
    const {token} = req.body;
    try{
        if(!token){
            return res.status(422).send({err:'Please Log in'})
        }
        await firebase.signOut()
    }catch(err){
        res.status(401).send(err.message)
    }

})


module.exports = app
