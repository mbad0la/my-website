import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import marked from 'marked'

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

class ReactWrapper extends Component {

  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    return (
      <section dangerouslySetInnerHTML={{__html: marked('## Hi!\n```js\nconsole.log(\'This looks cool!\')\n```')}}>
      </section>
    )
  }

}

ReactDOM.render(<ReactWrapper />, document.getElementById('root'))
