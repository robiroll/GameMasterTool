import React from 'react'
import PropTypes from 'prop-types'
// import './Button.css'

const Button = ({ children, onClick }) => (
  <div className="dialog" onClick={onClick}>
    {children}
  </div>
)

Button.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func
}
Button.defaultProps = {
  onClick: () => {}
}

export default Button
