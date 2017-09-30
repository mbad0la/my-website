import React, { Component } from 'react'

class LoadComponent extends Component {

  constructor(props) {
    super(props)

    this.state = {
      component: LoadComponent.prefetchedComponent,
      path: null
    }
  }

  static prefetchComponent(component) {
    LoadComponent.prefetchedComponent = component
  }

  componentWillMount() {
    this.props.loadComponent()
      .then(component => this.setState({ component: component, path: this.props.path }))
      .catch(error => console.log(error))
  }

  componentWillReceiveProps(nextProps) {
    nextProps.loadComponent()
      .then(component => this.setState({ component: component, path: nextProps.path }))
      .catch(error => console.log(error))
  }

  shouldComponentUpdate(nextProps, nextState) {
    return nextState != this.state
  }

  render() {
    const Component = LoadComponent.prefetchedComponent || (this.state.component && this.state.component.default) || null
    const props = this.props

    return Component ? <Component {...props} /> : null
  }

}

LoadComponent.prefetchedComponent = null

export default LoadComponent
