const express = require('express')
const bodyParser = require('body-parser')
const { default: axios } = require('axios')
const app = express()
app.use(bodyParser.json())
const port = 4005

app.post('/events', (req, res) => {
    console.log('Event received ' + req.body.type)
    const event = req.body
    try {
        axios.post('http://localhost:4000/events', event)
        axios.post('http://localhost:4001/events', event)
        axios.post('http://localhost:4002/events', event)
    } catch(e) { }
    res.status(200).send({ status: 'OK' })
})
app.listen(port, () => { console.log('Event bus is running on ' + port) })