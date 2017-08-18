import React, { Component } from 'react'

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
    if (w !== NaN) {
      this.setState({ scrollWidth: w })
    }
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
    let barStyles = {
      display: 'block',
      height: 4,
      backgroundColor: '#88de88',
      boxShadow: '2px 0px 2px lightgreen',
      width: (this.state.barLength / this.props.length) * window.innerWidth
    }
    return (
      <div>
        <div className="post-title">
          { this.props.meta.heading }
          <div className="post-date">{ beautifyDate(this.props.meta.date) }</div>
        </div>
        <div style={ barStyles }></div>
      </div>
    )
  }

}

class MarkdownWrapper extends Component {

  constructor(props) {
    super(props)
    this.state = {
      markdown: null,
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
    if (this.state.markdown != null) {
      return (
        <section id='blog-post'  dangerouslySetInnerHTML={{ __html: marked(this.state.markdown) }}></section>
      )
    } else {
      return (
        <section id="blog-post">
          <div id="load"></div>
        </section>
      )
    }

  }

}

export default BlogPostWrapper
