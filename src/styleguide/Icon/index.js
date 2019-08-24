import React from 'react'
import PropTypes from 'prop-types'
import * as S from './styles.js'
import './styles.scss'

const Icon = ({ name, variant, size }) => <S.Icon variant={variant} size={size} className={`icon-${name}`}></S.Icon>

Icon.propTypes = {
  name: PropTypes.string.isRequired,
  variant: PropTypes.string,
  size: PropTypes.oneOf(['xs', 's', 'm', 'l', 'xl'])
}

Icon.defaultProps = {
  variant: 'white',
  size: 's'
}

export default Icon
