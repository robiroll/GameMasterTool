import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import InventoryComponent from '../../Components/Inventory'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { firebaseConnect } from 'react-redux-firebase'

class Inventory extends PureComponent {
  static propTypes = {
    // firebase
    firebase: PropTypes.object,
    characters: PropTypes.object,
    // props
    idCharacter: PropTypes.string
  }

  constructor(props) {
    super(props)
    this.state = {
      selected: null
    }
  }

  getSnapshotBeforeUpdate(prevProps) {
    return prevProps.idCharacter !== this.props.idCharacter
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (snapshot) {
      this.setState({ selected: null })
    }
  }

  handleEquip = (key, item) => () => {
    const { firebase, characters, idCharacter } = this.props
    const char = characters[idCharacter]
    const path = `characters/${idCharacter}`
    if (char.equipment) {
      const unequippedItem = char.equipment[item.slot]
      firebase.push(`${path}/inventory`, unequippedItem)
    }
    if (item.slot === 'weapon') {
      if (!char.equipment) {
        firebase.set(`${path}/equipment/weapon1`, item)
        firebase.remove(`${path}/inventory/${key}`)
      } else {
        const { weapon1, weapon2 } = char.equipment
        if (!weapon1 && !weapon2) {
          firebase.set(`${path}/equipment/weapon1`, item)
          firebase.remove(`${path}/inventory/${key}`)
        }
        if (weapon1) {
          if (weapon1.weaponHands === '1handed' && item.weaponHands !== '2handed') {
            firebase.set(`${path}/equipment/weapon2`, item)
            firebase.remove(`${path}/inventory/${key}`)
          }
        }
        if (weapon2) {
          if (weapon2.weaponHands === '1handed' && item.weaponHands !== '2handed') {
            firebase.set(`${path}/equipment/weapon1`, item)
            firebase.remove(`${path}/inventory/${key}`)
          }
        }
      }
    } else if (item.slot === 'ring') {
      if (!char.equipment) {
        firebase.set(`${path}/equipment/ring1`, item)
        firebase.remove(`${path}/inventory/${key}`)
      } else {
        const { ring1, ring2 } = char.equipment
        if (!ring1) {
          firebase.set(`${path}/equipment/ring1`, item)
          firebase.remove(`${path}/inventory/${key}`)
        } else if (!ring2) {
          firebase.set(`${path}/equipment/ring2`, item)
          firebase.remove(`${path}/inventory/${key}`)
        }
      }
    } else {
      firebase.set(`${path}/equipment/${item.slot}`, item)
      firebase.remove(`${path}/inventory/${key}`)
    }
  }

  handleUse = (key, item) => () => {
    const { firebase, idCharacter } = this.props
    firebase.update(`characters/${idCharacter}/inventory/${key}`, { quantity: item.quantity - 1 })
  }

  handleSelectItem = key => () => this.setState({ selected: key })

  render() {
    const { characters, idCharacter } = this.props
    const { inventory } = characters[idCharacter]
    return (
      <InventoryComponent
        items={inventory}
        onEquip={this.handleEquip}
        onSelect={this.handleSelectItem}
        onUse={this.handleUse}
        selectedItem={this.state.selected}
      />
    )
  }
}

const mapStateToProps = state => ({
  characters: state.firebase.data.characters
})

export default compose(
  firebaseConnect(['characters']),
  connect(mapStateToProps)
)(Inventory)
