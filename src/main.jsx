import React, { Component } from 'react'
import ReactDOM from 'react-dom'


class ReactWrapper extends Component {

  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    return (
      <section>
        <h1>Hello!</h1>
        <p> Welcome to my website </p>
      </section>
    )
  }

}

ReactDOM.render(<ReactWrapper />, document.getElementById('root'))
