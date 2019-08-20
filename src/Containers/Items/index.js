import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ItemsComponent from '../../Components/Items'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { omit } from 'lodash'
import { firebaseConnect } from 'react-redux-firebase'

class Items extends Component {
  static propTypes = {
    firebase: PropTypes.object,
    items: PropTypes.object,
    characters: PropTypes.object
  }

  constructor(props) {
    super(props)
    this.state = {
      assignedCharacter: '',
      filter: 'all',
      selected: {},
      fields: {
        name: '',
        type: 'equipment',
        slot: 'weapon',
        weaponHands: '1handed',
        damageType: 'str',
        damage: 1,
        quantity: 1,
        size: 1,
        weight: 1,
        apCost: 0,
        creditsValue: 100,
        armor: 0,
        magicArmor: 0,
        hp: 0,
        description: ''
      },
      bonuses: {
        str: 0,
        siz: 0,
        con: 0,
        dex: 0,
        int: 0,
        pow: 0,
        cha: 0
      }
    }
  }
  handleCreate = () => {
    // TODO Handle case where item name is empty maybe
    const { firebase } = this.props
    const { fields, bonuses } = this.state
    let item = { ...fields }
    if (item.type !== 'usable') {
      item = omit(item, ['quantity'])
    }
    if (item.type === 'equipment') {
      if (item.slot !== 'weapon') item = omit(item, ['weaponHands', 'damageType', 'damage'])
      const bonus = { ...bonuses }
      Object.keys(bonus).map(key => {
        if (bonus[key] <= 0) delete bonus[key]
      })
      Object.assign(item, { bonus })
    } else {
      item = omit(item, ['slot', 'hp', 'armor', 'magicArmor', 'weaponHands', 'damageType', 'damage'])
    }
    firebase.push('items', item)
  }

  handleChangeField = e => {
    let { id, value } = e.target
    const fields = { ...this.state.fields }
    if (
      ['size', 'weight', 'apCost', 'creditsValue', 'quantity', 'armor', 'magicArmor', 'hp', 'damage'].indexOf(id) > -1
    )
      value = Number(value)
    Object.assign(fields, { [id]: value })
    this.setState({ fields })
  }

  handleChangeBonus = e => {
    let { id, value } = e.target
    const bonuses = { ...this.state.bonuses }
    Object.assign(bonuses, { [id]: Number(value) })
    this.setState({ bonuses })
  }

  handleChangeFilter = e => {
    this.setState({ filter: e.target.id })
  }

  handleSelect = id => () => {
    this.setState(prevState => ({ selected: { ...prevState.selected, [id]: !prevState.selected[id] } }))
  }

  handleChangeAssignee = e => {
    const { value } = e.target
    this.setState({ assignedCharacter: value })
  }

  handleAssign = () => {
    const { firebase, items } = this.props
    const { assignedCharacter, selected } = this.state
    Object.entries(selected).forEach(([key, isSelected]) => {
      if (isSelected) firebase.push(`characters/${assignedCharacter}/inventory`, items[key])
    })
  }

  render() {
    const { items, characters } = this.props
    const { fields, bonuses, filter, selected, assignedCharacter } = this.state
    return (
      <ItemsComponent
        items={items}
        onChangeFilter={this.handleChangeFilter}
        onSelect={this.handleSelect}
        selectedItems={selected}
        filter={filter}
        assignedCharacter={assignedCharacter}
        onChangeAssignee={this.handleChangeAssignee}
        onAssign={this.handleAssign}
        onCreate={this.handleCreate}
        onChangeField={this.handleChangeField}
        onChangeBonus={this.handleChangeBonus}
        fields={fields}
        bonuses={bonuses}
        characters={characters}
      />
    )
  }
}

const mapStateToProps = state => ({
  items: state.firebase.data.items,
  characters: state.firebase.data.characters
})

export default compose(
  firebaseConnect(['items', 'characters']),
  connect(mapStateToProps)
)(Items)
