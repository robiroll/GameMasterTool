import React, { memo } from 'react'
import PropTypes from 'prop-types'
import * as S from './styles'

const Terminal = ({ children }) => <S.Terminal>{children}</S.Terminal>
Terminal.propTypes = {
  children: PropTypes.node.isRequired
}
export default memo(Terminal)
