import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ItemsComponent from '../../Components/Items'
import { compose } from 'redux'
import { connect } from 'react-redux'
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
      fields: {
        name: '',
        type: 'equipment',
        slot: 'weapon',
        weaponHands: '1handed',
        damage: 1,
        quantity: 1,
        size: 1,
        weight: 1,
        apCost: 0,
        creditsValue: 100,
        armor: 0,
        magicArmor: 0
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
    const item = { ...fields }
    if (item.type === 'equipment') {
      delete item.quantity
      const bonus = { ...bonuses }
      Object.keys(bonus).map(key => {
        if (bonus[key] <= 0) delete bonus[key]
      })
      Object.assign(item, { bonus })
    } else {
      delete item.slot
      delete item.size
      delete item.armor
      delete item.magicArmor
    }
    firebase.push('items', item)
  }

  handleChangeField = e => {
    let { id, value } = e.target
    const fields = { ...this.state.fields }
    if (['size', 'weight', 'apCost', 'creditsValue', 'quantity', 'armor', 'magicArmor', 'damage'].indexOf(id) > -1)
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

  render() {
    const { items, characters } = this.props
    const { fields, bonuses } = this.state
    return (
      <ItemsComponent
        items={items}
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

export default compose(firebaseConnect(['items', 'characters']), connect(mapStateToProps))(Items)
