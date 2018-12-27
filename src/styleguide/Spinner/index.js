import React from 'react'
import './Spinner.scss'

const Spinner = () => (
  <div className="spinner">
    <div className="spinner--outer spinner--circle spinner--large" />
    <div className="spinner--outer spinner--circle spinner--small" />
  </div>
)

export default Spinner
