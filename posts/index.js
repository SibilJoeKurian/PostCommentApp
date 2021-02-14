const express=require('express');
const bodyParser=require('body-parser');
const {randomBytes}=require('crypto')
const cors =require('cors')
const app=express();
const port=4000;
app.use(bodyParser.json())
app.use(cors())
const posts={}

app.get('/posts',(req,res)=>{
    res.status(201).send(posts)
})

app.post('/posts',(req,res)=>{
    let id=randomBytes(4).toString('hex')
    const postContent=req.body
    postContent["id"]=id
    posts[id]=postContent
    console.log('Single post')
    console.log(postContent)
    console.log('Full post object')
    console.log(posts)
    res.send(posts)
})

app.listen(4000,()=>console.log('app is listening at '+port))