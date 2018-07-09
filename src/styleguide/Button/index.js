import React from 'react'
import PropTypes from 'prop-types'
import './Button.css'

const Button = ({ children, onClick, disabled, progress, size, variant }) => {
  const handleClick = !disabled ? onClick : undefined
  return (
    <div
      className={`button${disabled ? ' button--disabled' : ''} button--${size} button--${variant}`}
      onClick={handleClick}
    >
      {children}
      {!!progress && <div className="button--progress" style={{ width: `${progress}%` }} />}
      <div className="button--corner top left" />
      <div className="button--corner top right" />
      <div className="button--corner bottom left" />
      <div className="button--corner bottom right" />
    </div>
  )
}

Button.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
  progress: PropTypes.number,
  size: PropTypes.string,
  variant: PropTypes.string
}

Button.defaultProps = {
  onClick: () => {},
  disabled: false,
  progress: 0,
  size: 'medium',
  variant: 'primary-1'
}

export default Button
