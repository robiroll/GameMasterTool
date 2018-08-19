import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import EquipmentComponent from '../../Components/Equipment'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { firebaseConnect } from 'react-redux-firebase'

class Equipment extends PureComponent {
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

  handleUnequip = () => {
    const { firebase, idCharacter, characters } = this.props
    const { selected } = this.state
    const item = characters[idCharacter].equipment[selected]
    firebase.remove(`characters/${idCharacter}/equipment/${selected}`)
    firebase.push(`characters/${idCharacter}/inventory`, item)
    this.setState({ selected: null })
  }

  handleSelectItem = key => () => this.setState({ selected: key })

  render() {
    const { characters, idCharacter } = this.props
    const { equipment } = characters[idCharacter]
    return (
      <EquipmentComponent
        equipment={equipment}
        onUnequip={this.handleUnequip}
        onSelect={this.handleSelectItem}
        selectedItem={this.state.selected}
      />
    )
  }
}

const mapStateToProps = state => ({
  characters: state.firebase.data.characters
})

export default compose(firebaseConnect(['characters']), connect(mapStateToProps))(Equipment)
