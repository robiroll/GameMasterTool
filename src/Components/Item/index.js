import React, { memo } from 'react'
import PropTypes from 'prop-types'
import Icon from '../../styleguide/Icon'
import { MATCH_ICON } from '../../lib'
import ItemStats from '../ItemStats'
import * as S from './styles'

const Item = ({ item, onSelect, isSelected }) => (
  <S.Item onClick={onSelect} isSelected={isSelected}>
    <S.Header>
      <Icon name={item.type === 'equipment' ? MATCH_ICON[item.slot] || item.slot : 'rolling-dice'}></Icon>
      <S.Name>{item.name}</S.Name>
    </S.Header>
    <ItemStats item={item} hideTitle />
  </S.Item>
)
Item.propTypes = {
  item: PropTypes.object,
  onSelect: PropTypes.func,
  isSelected: PropTypes.bool
}

export default memo(Item)
