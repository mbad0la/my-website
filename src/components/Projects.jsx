import React, { Component } from 'react'

import axios from 'axios'

class ProjectList extends Component {

  constructor(props) {
    super(props)
    this.state = {
      colorCode: {},
      projects: []
    }
  }

  componentWillMount() {
    this.props.changeRoute('projects')

    if (process.title === 'browser') {
      axios.get('/media/colorcode.json')
        .then(res => {
          let coding = res.data
          axios.get('/media/projects.json')
            .then(res => this.setState({colorCode: coding, projects: res.data}))
            .catch(err => console.log(err))
        })
        .catch(err => console.log(err))
    }
  }

  render() {
    if (this.state.projects.length != 0) {
      return (
        <section id="projects">
          {
            this.state.projects.map((repo, k) => <Repository key={k} colorCodes={this.state.colorCode} meta={repo}/>)
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

class Repository extends Component {

  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    return (
      <a href={this.props.meta.html_url}>
        <div className="repo-name">{ this.props.meta.name }</div>
        <div className="repo-ownership">{ this.props.meta.ownership }</div>
        <div className="repo-desc" dangerouslySetInnerHTML={{ __html: this.props.meta.description }}></div>
        <div>
          {
            this.props.meta.technologies.map((tech, k) => <ColorCode key={k} color={this.props.colorCodes[tech]}/>)
          }
        </div>
      </a>
    )
  }
}

class ColorCode extends Component {

  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    return (
      <span style={{display: 'inline-block', width: 20, height: 5, borderRadius: 15, marginRight: 5, backgroundColor: this.props.color}}></span>
    )
  }

}

export default ProjectList
