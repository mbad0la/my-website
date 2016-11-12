const fs = require('fs')
const express = require('express')
const app = express()

app.get('/js/:file', (req, res) => {
  res.sendFile(__dirname + '/dist/js/' + req.params.file)
})

app.get('/css/:file', (req, res) => {
  res.sendFile(__dirname + '/dist/css/' + req.params.file)
})

app.get('/media/:file', (req, res) => {
  res.sendFile(__dirname + '/dist/media/' + req.params.file)
})

app.get('/posts/:post', (req, res) => {
  res.send({ markdown: fs.readFileSync(__dirname + '/dist/posts/' + req.params.post + '.md').toString() })
})

app.get(/.*/, (req, res) => {
  res.sendFile(__dirname + '/index.html')
})

app.listen(3030)
