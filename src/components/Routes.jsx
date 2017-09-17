import React from 'react'
import { Route, IndexRoute, NotFoundRoute } from 'react-router'

import { Nav, About } from './IndexRouteComponents.jsx'

export default (
  <Route path="/" component={Nav}>
    <IndexRoute component={About}/>
    <Route
      path="/blog"
      getComponent={(location, cb) => {
        require.ensure([], require => {
          const BlogPostList = require('./BlogPostList.jsx').default
          cb(null, BlogPostList)
        }, 'BlogPostList')
      }}
    />
    <Route
      path="/projects"
      getComponent={(location, cb) => {
        require.ensure([], require => {
          const ProjectList = require('./Projects.jsx').default
          cb(null, ProjectList)
        }, 'Projects')
      }}
    />
    <Route
      path="/blog/:post"
      getComponent={(location, cb) => {
        require.ensure([], require => {
          const BlogPostWrapper = require('./BlogPostComponents.jsx').default
          cb(null, BlogPostWrapper)
        }, 'BlogPostComponents')
      }}
    />
  </Route>
)
