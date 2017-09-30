import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import App from './components/IndexRouteComponents.jsx'

if ('serviceWorker' in navigator) {
  navigator.serviceWorker
    .register('/pwafy', {
      scope: '/'
    })
    .then(reg => console.log(`Service worker instantiated with scope : ${reg.scope}`))
    .catch(err => console.log(`Service worker registration failed because : ${err}`))
}

ReactDOM.render(
  <Router>
    <Route component={App} />
  </Router>
  , document.getElementById("root")
)
