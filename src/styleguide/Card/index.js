import React from 'react'
import PropTypes from 'prop-types'
import './Card.css'

const Card = ({ children, title }) => (
  <div className="card">
    <div className="card--title">{title}</div>
    <div className="card--content">{children}</div>
  </div>
)

Card.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.node
}

export default Card
