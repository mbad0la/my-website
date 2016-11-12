import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { Router, Route, IndexRoute, NotFoundRoute, Link, browserHistory } from 'react-router'

import marked from 'marked'
import axios from 'axios'

marked.setOptions({
  renderer: new marked.Renderer(),
  gfm: true,
  tables: true,
  breaks: false,
  pedantic: false,
  sanitize: false,
  smartLists: true,
  smartypants: false
})

class MarkdownWrapper extends Component {

  constructor(props) {
    super()
    this.state = {
      markdown: '# Please be patient while the content loads'
    }
  }

  componentWillMount() {
    axios.get('/posts/' + this.props.params.post)
      .then(res => this.setState(res.data))
      .catch(err => console.log(err))
  }

  render() {
    return (
      <section dangerouslySetInnerHTML={{__html: marked(this.state.markdown)}}>
      </section>
    )
  }

}

class About extends Component {

  constructor(props) {
    super()
    this.state = {}
  }

  render() {
    return (
      <section>
        Hi! I'm @mbad0la.
      </section>
    )
  }

}

class Nav extends Component {

  constructor(props) {
    super()
    this.state = {}
  }

  render() {
    return (
      <div>
        { React.cloneElement(this.props.children, { key: this.props.location.pathname}) }
      </div>
    )
  }

}

ReactDOM.render((
  <Router history={browserHistory}>
    <Route path="/" component={Nav}>
      <IndexRoute component={About}/>
      <Route path="/blog/:post" component={MarkdownWrapper}/>
    </Route>
  </Router>
), document.getElementById("root"))
