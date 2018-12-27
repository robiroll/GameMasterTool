import React from 'react'
import PropTypes from 'prop-types'
import './Button.scss'

const Button = ({ children, onClick, disabled, progress, size, variant, format }) => {
  const handleClick = !disabled ? onClick : undefined
  return (
    <div
      className={`button${disabled ? ' button--disabled' : ''} button--${size} button--${variant} button--${format}`}
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
  variant: PropTypes.string,
  format: PropTypes.string
}

Button.defaultProps = {
  onClick: () => {},
  disabled: false,
  progress: 0,
  size: 'medium',
  variant: 'primary-1',
  format: 'default'
}

export default Button
