import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Menu from '../Containers/Menu'
import './style.css'

export default class Layout extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired
  }
  static contextTypes = {
    router: PropTypes.object
  }
  render() {
    const { children } = this.props
    return (
      <div className="layout">
        <Menu active={this.context.router.route.location.pathname.substr(1)} />
        <div className="wrapper">{children}</div>
      </div>
    )
  }
}
