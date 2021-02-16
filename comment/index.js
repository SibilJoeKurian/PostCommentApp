const bodyParser=require('body-parser')
const express=require('express')
const {randomBytes} =require('crypto')
const cors = require('cors')
const axios =require('axios')
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

app.post('/posts/:id/comments',async (req,res)=>{
    let postId=req.params.id
    let commentArray=comments[postId]||[]
    let commentId=randomBytes(4).toString('hex')
    let comment={id:commentId,...req.body,status:'pending'}
    try{
        await axios.post('http://localhost:4005/events',{
            type:'CommentCreated',
            data:{
                ...comment,postId,status:'pending'
            }
        })
    }
    catch(e){console.log(e)}
    commentArray.push(comment)
    comments[postId]=commentArray
    console.log(commentArray)
    res.status(201).send(commentArray)
})
app.post('/events', (req, res) => {
    console.log('Recieved event '+req.body.type)
    res.send({})
})
app.listen(port,()=>console.log('Comment App is listening '+port))