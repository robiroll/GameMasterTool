import React from 'react'
import PropTypes from 'prop-types'
import './Card.scss'

const Card = ({ children, title }) => (
  <div className="card">
    {title && <div className="card--title">{title}</div>}
    <div className="card--content">{children}</div>
    <div className="card--corner top left" />
    <div className="card--corner top right" />
    <div className="card--corner bottom left" />
    <div className="card--corner bottom right" />
  </div>
)

Card.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.node
}

export default Card
