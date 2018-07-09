import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ItemComponent from '../../Components/Item'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { firebaseConnect } from 'react-redux-firebase'

class Item extends Component {
  static propTypes = {
    item: PropTypes.object,
    firebase: PropTypes.object,
    characters: PropTypes.object
  }

  constructor(props) {
    super(props)
    this.state = {
      isOpen: false,
      assignedCharacter: ''
    }
  }

  handleChangeAssignee = e => {
    const { value } = e.target
    this.setState({ assignedCharacter: value })
  }

  handleToggle = () => this.setState({ isOpen: !this.state.isOpen })

  handleAssign = () => {
    const { firebase, item } = this.props
    const { assignedCharacter } = this.state
    firebase.push(`characters/${assignedCharacter}/inventory`, item)
  }

  render() {
    const { item, characters } = this.props
    const { isOpen, assignedCharacter } = this.state
    return (
      <ItemComponent
        item={item}
        characters={characters}
        isOpen={isOpen}
        onToggle={this.handleToggle}
        assignedCharacter={assignedCharacter}
        onChangeAssignee={this.handleChangeAssignee}
        onAssign={this.handleAssign}
      />
    )
  }
}

const mapStateToProps = state => ({
  characters: state.firebase.data.characters
})

export default compose(firebaseConnect(['characters']), connect(mapStateToProps))(Item)
