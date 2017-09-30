import fs from 'fs'
import path from 'path'
import express from 'express'
import axios from 'axios'
const app = express()

const routeMetaInformation = JSON.parse(fs.readFileSync(path.resolve('./dist/media/seo.json')))

const blogPosts = {}

fs.readdirSync(path.resolve('./dist/posts'))
  .forEach(blogName => {
    blogPosts[`/blog/${blogName.slice(0, blogName.length - 3)}`] = fs.readFileSync(path.resolve('./dist/posts/' + blogName)).toString()
  })

app.get('/js/:file', (req, res) => {
  res.sendFile(path.resolve(`./dist/js/client/${req.params.file}`))
})

app.get('/css/:file', (req, res) => {
  res.sendFile(path.resolve(`./dist/css/${req.params.file}`))
})

app.get('/media/:file', (req, res) => {
  res.sendFile(path.resolve(`./dist/media/${req.params.file}`))
})

app.get('/posts/:post', (req, res) => {
  res.send({ markdown: fs.readFileSync(path.resolve('./dist/posts/' + req.params.post + '.md')).toString() })
})

app.get('/posts', (req, res) => {
  let blogs = fs.readdirSync(path.resolve('./dist/posts'))
    .map(blogName => {
      return {
        [blogName]: fs.readFileSync(path.resolve('./dist/posts/' + blogName)).toString()
      }
    })
  res.send(blogs)
})

app.get('/manifest.json', (req, res) => {
  res.sendFile(path.resolve('manifest.json'))
})

app.get('/pwafy', (req, res) => {
  res.sendFile(path.resolve('service-worker.js'))
})

app.get(/.*/, (req, res) => {
  res.sendFile(path.resolve('index.html'))
})

app.listen(3030)
