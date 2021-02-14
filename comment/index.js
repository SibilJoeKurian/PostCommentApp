const bodyParser=require('body-parser')
const express=require('express')
const {randomBytes} =require('crypto')
const cors = require('cors')
const app=express()
app.use(bodyParser.json())
const port= 4001
app.use(cors())
const comments={}
app.get('/posts/:id/comments',(req,res)=>{
    console.log("get request")
    let comment=comments[req.params.id]
    console.log(comment)
    res.status(201).send(comment)
})

app.post('/posts/:id/comments',(req,res)=>{
    let postId=req.params.id
    let commentArray=comments[postId]||[]
    let commentId=randomBytes(4).toString('hex')
    let comment={id:commentId,...req.body}
    commentArray.push(comment)
    comments[postId]=commentArray
    console.log(commentArray)
    res.status(201).send(commentArray)
})

app.listen(port,()=>console.log('Comment App is listening '+port))