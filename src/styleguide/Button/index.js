import React from 'react'
import PropTypes from 'prop-types'
import './Button.css'

const Button = ({ children, onClick, disabled }) => {
  const handleClick = !disabled ? onClick : undefined
  return (
    <div className={`button${disabled ? ' button--disabled' : ''}`} onClick={handleClick}>
      {children}
    </div>
  )
}

Button.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
  disabled: PropTypes.bool
}

Button.defaultProps = {
  onClick: () => {},
  disabled: false
}

export default Button
