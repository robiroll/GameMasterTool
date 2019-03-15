import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import './Spinner.scss'

const portalRoot = document.getElementById('root')

class Spinner extends Component {
  constructor() {
    super()
    this.el = document.createElement('div')
  }

  componentDidMount = () => {
    portalRoot.appendChild(this.el)
  }

  componentWillUnmount = () => {
    portalRoot.removeChild(this.el)
  }

  render() {
    return ReactDOM.createPortal(
      <div className="spinner">
        <div className="spinner--outer spinner--circle spinner--large" />
        <div className="spinner--outer spinner--circle spinner--small" />
      </div>,
      this.el
    )
  }
}

export default Spinner
