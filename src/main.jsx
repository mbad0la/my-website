import React from 'react'
import ReactDOM from 'react-dom'
import { Router, browserHistory } from 'react-router'

import routes from './components/Routes.jsx'

if ('serviceWorker' in navigator) {
  navigator.serviceWorker
    .register('/pwafy', {
      scope: '/'
    })
    .then(reg => console.log(`Service worker instantiated with scope : ${reg.scope}`))
    .catch(err => console.log(`Service worker registration failed because : ${err}`))
}

ReactDOM.render(<Router routes={routes} history={browserHistory} />, document.getElementById("root"))
