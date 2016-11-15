import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { Router, Route, IndexRoute, NotFoundRoute, Link, browserHistory } from 'react-router'

import { StyleSheet, css } from 'aphrodite'
import { StickyContainer, Sticky } from 'react-sticky'
import marked from 'marked'
import axios from 'axios'

let metaCache = {}

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

function beautifyDate(date) {
  if (date === undefined) {
    return ''
  }

  const months = ['January', 'Febuary', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
  let args = date.split('.')

  if (args[0][args[0].length - 1] == 1) {
    args[0] += 'st'
  } else if (args[0][args[0].length - 1] == 2) {
    args[0] += 'nd'
  } else if (args[0][args[0].length - 1] == 3) {
    args[0] += 'rd'
  } else {
    args[0] += 'th'
  }

  args[1] = months[Number(args[1]) - 1]

  return args.join(' ')
}

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

  componentWillMount() {
    this.props.changeRoute('post')

    if (metaCache[this.props.params.post] == undefined) {
      axios.get('/media/meta.json')
        .then(res => {
          res.data.forEach((d,k) => {
            metaCache[d.post_name] = d.date
          })
        })
        .catch(err => console.log(err))
    }
  }

  render() {
    let cleanHeading = this.props.params.post.split('-').join(' ')
    return (
      <StickyContainer>
        <Sticky>
          <BlogPostHead meta={{ heading: cleanHeading, date: metaCache[this.props.params.post] }} length={this.state.scrollWidth}/>
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
        backgroundColor: '#88de88',
        boxShadow: '2px 0px 2px lightgreen',
        width: (this.state.barLength / this.props.length) * window.innerWidth
      }
    })
    return (
      <div>
        <div className="post-title">
          { this.props.meta.heading }
          <div className="post-date">{ beautifyDate(this.props.meta.date) }</div>
        </div>
        <div className={css(barStyles.bar)}></div>
      </div>
    )
  }

}

class MarkdownWrapper extends Component {

  constructor(props) {
    super(props)
    this.state = {
      markdown: '# Be patient, something is cooking for sure!',
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
    this.state = {
      pos: 0,
      love: [
        "people",
        "open-source",
        "software architecture",
        "breaking benjamin",
        "bullets for my valentine",
        "coldplay",
        "big data",
        "machine learning",
        "react",
        "javaScript",
        "diversity",
        "pizza",
        "call of duty",
        "web developement",
        "mongodb",
        "distributed systems",
        "data redundancy",
        "scalability",
        "linting",
        "Dota",
        "APIs",
        "development pipelines",
        "real-time analytics",
        "teaching",
        "John Petrucci",
        "hotel california",
        "robustness",
        "technology",
        "spaceX",
        "marvel studios",
        "game of thrones",
        "westworld"
      ]
    }
    this.shiftOutput = this.shiftOutput.bind(this)
  }

  shiftOutput() {
    this.setState({ pos: Math.floor(Math.random() * this.state.love.length) })
  }

  componentWillMount() {
    this.props.changeRoute('about')

    this.interval = setInterval(this.shiftOutput, 800)
  }

  componentWillUnmount() {
    clearInterval(this.interval)
  }

  render() {
    return (
      <section id="about">
        <h1>Howdy!</h1>
        <p>Mayank Badola here.</p>
        <p>
          I will be graduating from Netaji Subhas Institute of Technology in 2017 with B.E. in Computer Engineering.
        </p>
        <p style={{ fontFamily: '"Gloria Hallelujah", cursive' }}>I</p>
        <p style={{ color: '#ff3131', fontSize: 34 }}>&#10084;</p>
        <p style={{ fontFamily: '"Gloria Hallelujah", cursive' }}>{ this.state.love[this.state.pos] }</p>
        <div>
          <ul className="soc">
            <li><a href="https://facebook.com/mbad0la" target="_blank" className="icon-10 facebook" title="Facebook"><svg viewBox="0 0 512 512"><path d="M211.9 197.4h-36.7v59.9h36.7V433.1h70.5V256.5h49.2l5.2-59.1h-54.4c0 0 0-22.1 0-33.7 0-13.9 2.8-19.5 16.3-19.5 10.9 0 38.2 0 38.2 0V82.9c0 0-40.2 0-48.8 0 -52.5 0-76.1 23.1-76.1 67.3C211.9 188.8 211.9 197.4 211.9 197.4z"/></svg></a></li>
            <li><a href="https://github.com/mbad0la" target="_blank" className="icon-13 github" title="GitHub"><svg viewBox="0 0 512 512"><path d="M256 70.7c-102.6 0-185.9 83.2-185.9 185.9 0 82.1 53.3 151.8 127.1 176.4 9.3 1.7 12.3-4 12.3-8.9V389.4c-51.7 11.3-62.5-21.9-62.5-21.9 -8.4-21.5-20.6-27.2-20.6-27.2 -16.9-11.5 1.3-11.3 1.3-11.3 18.7 1.3 28.5 19.2 28.5 19.2 16.6 28.4 43.5 20.2 54.1 15.4 1.7-12 6.5-20.2 11.8-24.9 -41.3-4.7-84.7-20.6-84.7-91.9 0-20.3 7.3-36.9 19.2-49.9 -1.9-4.7-8.3-23.6 1.8-49.2 0 0 15.6-5 51.1 19.1 14.8-4.1 30.7-6.2 46.5-6.3 15.8 0.1 31.7 2.1 46.6 6.3 35.5-24 51.1-19.1 51.1-19.1 10.1 25.6 3.8 44.5 1.8 49.2 11.9 13 19.1 29.6 19.1 49.9 0 71.4-43.5 87.1-84.9 91.7 6.7 5.8 12.8 17.1 12.8 34.4 0 24.9 0 44.9 0 51 0 4.9 3 10.7 12.4 8.9 73.8-24.6 127-94.3 127-176.4C441.9 153.9 358.6 70.7 256 70.7z"/></svg></a></li>
            <li><a href="https://in.linkedin.com/in/mbad0la" target="_blank" className="icon-17 linkedin" title="LinkedIn"><svg viewBox="0 0 512 512"><path d="M186.4 142.4c0 19-15.3 34.5-34.2 34.5 -18.9 0-34.2-15.4-34.2-34.5 0-19 15.3-34.5 34.2-34.5C171.1 107.9 186.4 123.4 186.4 142.4zM181.4 201.3h-57.8V388.1h57.8V201.3zM273.8 201.3h-55.4V388.1h55.4c0 0 0-69.3 0-98 0-26.3 12.1-41.9 35.2-41.9 21.3 0 31.5 15 31.5 41.9 0 26.9 0 98 0 98h57.5c0 0 0-68.2 0-118.3 0-50-28.3-74.2-68-74.2 -39.6 0-56.3 30.9-56.3 30.9v-25.2H273.8z"/></svg></a></li>
            <li><a href="https://twitter.com/mbad0la" target="_blank" className="icon-26 twitter" title="Twitter"><svg viewBox="0 0 512 512"><path d="M419.6 168.6c-11.7 5.2-24.2 8.7-37.4 10.2 13.4-8.1 23.8-20.8 28.6-36 -12.6 7.5-26.5 12.9-41.3 15.8 -11.9-12.6-28.8-20.6-47.5-20.6 -42 0-72.9 39.2-63.4 79.9 -54.1-2.7-102.1-28.6-134.2-68 -17 29.2-8.8 67.5 20.1 86.9 -10.7-0.3-20.7-3.3-29.5-8.1 -0.7 30.2 20.9 58.4 52.2 64.6 -9.2 2.5-19.2 3.1-29.4 1.1 8.3 25.9 32.3 44.7 60.8 45.2 -27.4 21.4-61.8 31-96.4 27 28.8 18.5 63 29.2 99.8 29.2 120.8 0 189.1-102.1 185-193.6C399.9 193.1 410.9 181.7 419.6 168.6z"/></svg></a></li>
          </ul>
        </div>
      </section>
    )
  }

}

class BlogPostList extends Component {

  constructor(props) {
    super(props)
    this.state = {
      posts: []
    }
  }

  componentWillMount() {
    this.props.changeRoute('blog')

    axios.get('/media/meta.json')
      .then(res => {
        res.data.forEach((d,k) => {
          metaCache[d.post_name] = d.date
        })
        this.setState({ posts: res.data })
      })
      .catch(err => console.log(err))
  }

  render() {
    if (this.state.posts.length != 0) {
      return (
        <section id="blog-posts">
          {
            this.state.posts.map((d, k) => {
              return (
                <Link key={k} to={`/blog/${d.post_name}`}>
                  <div className="post-list-date">{ beautifyDate(d.date) }</div>
                  <div style={{ fontSize: 36, color: '#000', textTransform: 'capitalize' }}>{ d.post_name.split('-').join(' ') }</div>
                  <div style={{ fontSize: 20, color: '#1b1b1b', marginBottom: 50 }}>{ d.summary }</div>
                </Link>
              )
            })
          }
        </section>
      )
    } else {
      return (
        <section style={{ textAlign: 'center', fontSize: 32 }} id="blog-posts">
          <div id="load"></div>
        </section>
      )
    }
  }

}

class Nav extends Component {

  constructor(props) {
    super(props)
    this.state = {
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
        <nav style={{ position: 'relative', display: 'block', height: 80, backgroundColor: 'white' }}>
          <div className="my-img"></div>
          <ul>
            <li className={ this.state.nav["about"] ? `active` : `off` }><Link to={`/`}>About</Link></li>
            <li className={ this.state.nav["blog"] ? `active` : `off` }><Link to={`/blog`}>Blog</Link></li>
          </ul>
        </nav>
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
