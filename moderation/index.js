const express =require('express')
const axios=require('axios')
const bodyParser=require('body-parser')

const app=express()
const port=4003

app.get('',()=>{})

app.listen(port,()=>console.log("Moderation service is running on port "+port))