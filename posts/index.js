const express = require('express');
const bodyParser = require('body-parser');
const { randomBytes } = require('crypto')
const cors = require('cors')
const axios = require('axios')
const app = express();
const port = 4000;
app.use(bodyParser.json())
app.use(cors())
const posts = {}

app.get('/posts', (req, res) => {
    res.status(201).send(posts)
})

app.post('/posts', async (req, res) => {
    console.log('Post operation')
    let id = randomBytes(4).toString('hex')
    const postContent = req.body
    postContent["id"] = id
    posts[id] = postContent
    try {
        await axios.post('http://localhost:4005/events', {
            type: 'PostCreated',
            data: postContent
        })
    } catch (e) { console.log(e) }

    res.send(posts)
})

app.post('/events', (req, res) => {
    console.log('Recieved event ' + req.body.type)
    res.send({})
})
app.listen(4000, () => console.log(' Post app is listening at ' + port))