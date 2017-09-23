import fs from 'fs'
import path from 'path'
import express from 'express'
import axios from 'axios'
const app = express()

import React from 'react'
import { renderToString } from 'react-dom/server'
import { match, RouterContext } from 'react-router'
import routes from './components/Routes.jsx'

const routeMetaInformation = JSON.parse(fs.readFileSync(path.resolve('./dist/media/seo.json')))

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
  match({ routes: routes, location: req.url }, (err, redirect, contextProps) => {
    if (/\/blog\/[a-zA-Z]+/.exec(contextProps.location.pathname)) {
      let postEndpoint = contextProps.location.pathname.replace('blog', 'posts')

      let content = undefined

      try {
        content = fs.readFileSync(path.resolve('./dist/' + postEndpoint + '.md')).toString()
      } catch(ex) {
        content = 'This content doesn\'t exist ...'
      }


      const appHtml = renderToString(
        <RouterContext
          { ...contextProps }
          createElement={(Component, props) => <Component content={ content } { ...props } /> }
        />
      )

      // fs.readFileSync(path.resolve('./dist/posts/' + req.params.post + '.md')).toString()
      axios.get('https://mayankbadola.me/media/meta.json')
        .then(result => {
          let post = result.data.filter((d,k) => {
            return d.post_name === contextProps.params.post
          })

          let title = contextProps.params.post.split('-').map(str => str.charAt(0).toUpperCase() + str.slice(1)).join(' ')
          res.send(renderPage(appHtml, routeMetaInformation[contextProps.location.pathname]))
        })
        .catch(err => console.log(err))
    } else {
      const appHtml = renderToString(<RouterContext { ...contextProps } />)
      res.send(renderPage(appHtml, routeMetaInformation[contextProps.location.pathname]))
    }
  })
})

const renderPage = (node, meta) => {
  let { title, description, keywords } = meta || routeMetaInformation['/']
  console.log(meta)
  return (
    `
      <!DOCTYPE html>
      <html>
        <head>
          <title>${title}</title>
          <meta name="description" content="${description}">
          <meta name="keywords" content="${keywords}">
          <meta itemprop="image" content="http://mayankbadola.me/media/me.jpg">
          <meta name="twitter:card" content="summary">
          <meta name="twitter:site" content="@mbad0la">
          <meta name="twitter:title" content="${title}">
          <meta name="twitter:description" content="${description}">
          <meta property="og:type" content="article">
          <meta property="og:title" content="${title}">
          <meta property="og:description" content="${description}">
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
          <div id="root">${process.env.NODE_ENV === 'production' ? node : `<div>${node}</div>`}</div>
          <script src="/js/website.js"></script>
        </body>
      </html>
    `
  )
}

app.listen(3030)
