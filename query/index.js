const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')

const port = 4002
const app = express()
app.use(bodyParser.json())
app.use(cors())

const posts = {}

app.get('/posts', (req, res) => {
    res.send({ posts })
})

app.post('/events', (req, res) => {
    const typeCreated = req.body.type
    if (typeCreated === 'PostCreated') {
        const { id, content } = req.body.data
        posts[id] = { id, content, comments: [] }
    }
    else if (typeCreated === 'CommentCreated') {
        const { id, content, postId,status } = req.body.data
        const post = posts[postId]
        post.comments.push({ id, content,status })
    }
    res.send({})
    console.log(posts)
})

app.listen(port, () => 'Query app is listening at ' + port)