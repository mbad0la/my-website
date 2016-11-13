import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { Router, Route, IndexRoute, NotFoundRoute, Link, browserHistory } from 'react-router'

import { StyleSheet, css } from 'aphrodite'
import { StickyContainer, Sticky } from 'react-sticky'
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

class BlogPostWrapper extends Component {

  constructor(props) {
    super(props)
    this.state = {
      scrollWidth: 0
    }
    this.changeScrollWidth = this.changeScrollWidth.bind(this)
  }

  changeScrollWidth(w) {
    this.setState({ scrollWidth: w })
  }

  render() {
    return (
      <StickyContainer>
        <Sticky>
          <BlogPostHead heading={ 'First Attempt' } length={this.state.scrollWidth}/>
        </Sticky>
        <MarkdownWrapper updateLength={this.changeScrollWidth} post={this.props.params.post}/>
      </StickyContainer>
    )
  }

}

class BlogPostHead extends Component {

  constructor(props) {
    super(props)
    this.state = {
      barLength: 0
    }
    this.handleScroll = this.handleScroll.bind(this)
  }

  handleScroll(e) {
    this.setState({ barLength: e.srcElement.body.scrollTop })
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll)
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll)
  }

  render() {
    let barStyles = StyleSheet.create({
      bar: {
        display: 'block',
        height: 4,
        backgroundColor: '#8fef8f',
        boxShadow: '2px 0px 2px lightgreen',
        width: (this.state.barLength / this.props.length) * window.innerWidth
      },
      base: {
        padding: '20px 0px 0px 20px',
        height: 50,
        fontSize: '26px',
        fontWeight: 'bold',
        fontFamily: 'Ubuntu, "sans-serif"',
        backgroundColor: 'white',
        boxShadow: '2px 0px 2px lightgray'
      }
    })
    return (
      <div>
        <div className={css(barStyles.base)}>{this.props.heading}</div>
        <div className={css(barStyles.bar)}></div>
      </div>
    )
  }

}

class MarkdownWrapper extends Component {

  constructor(props) {
    super(props)
    this.state = {
      markdown: '# Please be patient while the content loads',
    }
  }

  componentWillMount() {
    axios.get('/posts/' + this.props.post)
      .then(res => {
        this.setState(res.data)

        setTimeout(() => this.props.updateLength(document.documentElement.scrollHeight - window.innerHeight), 0)
      })
      .catch(err => console.log(err))
  }

  render() {
    return (
      <section id='blog-post'  dangerouslySetInnerHTML={{ __html: marked(this.state.markdown) }}></section>
    )
  }

}

class About extends Component {

  constructor(props) {
    super(props)
    this.state = {}
  }

  componentWillMount() {
    this.props.changeRoute('about')
  }

  render() {
    return (
      <section>Hi! I'm @mbad0la.</section>
    )
  }

}

class BlogPostList extends Component {

  constructor(props) {
    super(props)
    this.state = {}
  }

  componentWillMount() {
    this.props.changeRoute('blog')
  }

  render() {
    return (
      <section>Blog List Here</section>
    )
  }

}

class Nav extends Component {

  constructor(props) {
    super(props)
    this.state = {
      img: null,
      nav: {
        about: true,
        blog: false
      }
    }
    this.changeRoute = this.changeRoute.bind(this)
  }

  changeRoute(newRoute) {
    let about = newRoute === "about" ? true : false
    let blog = newRoute === "blog" ? true : false
    this.setState({
      "nav": {
        "about": about,
        "blog": blog
      }
    })
  }

  render() {
    return (
      <div>
        <div style={{ position: 'relative', display: 'block', height: 80, backgroundColor: 'white' }}>
          <ul>
            <li className={ this.state.nav["about"] ? `active` : `off` }><Link to={`/`}>About</Link></li>
            <li className={ this.state.nav["blog"] ? `active` : `off` }><Link to={`/blog`}>Blog</Link></li>
          </ul>
        </div>
        { React.cloneElement(this.props.children, { key: this.props.location.pathname, changeRoute: this.changeRoute }) }
      </div>
    )
  }

}

ReactDOM.render((
  <Router history={browserHistory}>
    <Route path="/" component={Nav}>
      <IndexRoute component={About}/>
      <Route path="/blog" component={BlogPostList}/>
      <Route path="/blog/:post" component={BlogPostWrapper}/>
    </Route>
  </Router>
), document.getElementById("root"))
