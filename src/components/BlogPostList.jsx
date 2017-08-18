import React, { Component } from 'react'
import { Link } from 'react-router'
import axios from 'axios'

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

export default BlogPostList
