import fs from 'fs'
import path from 'path'
import express from 'express'
import axios from 'axios'
const app = express()

import React from 'react'
import { StaticRouter as Router, Route } from 'react-router-dom'
import ReactDOMServer from 'react-dom/server'

import LoadComponent from './components/LoadComponent.jsx'
import App from './components/IndexRouteComponents.jsx'
import BlogPostList from './components/BlogPostList.jsx'
import BlogPostWrapper from './components/BlogPostComponents.jsx'
import ProjectList from './components/Projects.jsx'

const componentCache = {
  '/blog': BlogPostList,
  '/post': BlogPostWrapper,
  '/projects': ProjectList
}

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
  if (req.url.indexOf('/blog') == 0) {
    if (req.url.split('/').length == 3) {
      LoadComponent.prefetchComponent(componentCache['/post'])
    } else {
      LoadComponent.prefetchComponent(componentCache['/blog'])
    }
  } else if (componentCache[req.url]) {
    LoadComponent.prefetchComponent(componentCache[req.url])
  } else {
    // prefetch 404 route (or /)
  }

  let context = {}

  let markup = ReactDOMServer.renderToString(
    <Router location={req.url} context={context}>
      <App />
    </Router>
  )

  res.send(render(markup))
})

const render = markup => {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <title>Mayank Badola</title>
        <meta name="description" content="ASDE at Expedia. Technology Enthusiast. Occasional Philosopher.">
        <meta name="keywords" content="Mayank Badola, mayank badola, mayank, mbad0la, github, GitHub, NSIT, Netaji Subhas Institute of Technology, Developer, Web Developer, Software Developer, JavaScript Developer, Software Engineer, Open Source, DuckDuckGo, Fossasia, Hoodie, Mozpacers, ODIN, Open Development Initiative - NSIT, Collegespace, Machine Learning, Big Data, Udacity, Udacity India, Expedia, ASDE, The Air Force School, TAFS, TAFSian">
        <meta itemprop="image" content="http://mayankbadola.me/media/me.jpg">
        <meta name="twitter:card" content="summary">
        <meta name="twitter:site" content="@mbad0la">
        <meta name="twitter:title" content="Mayank Badola">
        <meta name="twitter:description" content="ASDE at Expedia. Technology Enthusiast. Occasional Philosopher.">
        <meta property="og:type" content="article">
        <meta property="og:title" content="Mayank Badola">
        <meta property="og:description" content="ASDE at Expedia. Technology Enthusiast. Occasional Philosopher.">
        <meta property="og:site_name" content="Mayank Badola">
        <meta property="og:url" content="http://mayankbadola.me">
        <meta property="og:image" content="http://mayankbadola.me/media/me.jpg">
        <meta property="article:author" content="https://facebook.com/mbad0la">
        <link rel="icon" href="/media/favicon.png" type="image/x-icon">
        <link rel="manifest" href="/manifest.json">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link href="https://fonts.googleapis.com/css?family=Roboto+Slab|Gloria+Hallelujah|Open+Sans" rel="stylesheet">
        <link rel="stylesheet" href="/css/website.css" />
      </head>
      <body>
        <div id="root">${markup}</div>
        <script src="/js/website.js"></script>
      </body>
    </html>
  `
}

app.listen(3030)
