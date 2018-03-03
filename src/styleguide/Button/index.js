import React from 'react'
import PropTypes from 'prop-types'
import './Button.css'

const Button = ({ children, onClick, disabled, progress }) => {
  const handleClick = !disabled ? onClick : undefined
  return (
    <div
      className={`button${disabled ? ' button--disabled' : ''}`}
      onClick={handleClick}
    >
      {children}
      {!!progress && (
        <div className="button--progress" style={{ width: `${progress}%` }} />
      )}
    </div>
  )
}

Button.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
  progress: PropTypes.number
}

Button.defaultProps = {
  onClick: () => {},
  disabled: false,
  progress: 0
}

export default Button
