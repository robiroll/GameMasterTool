import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { selectCharacter, validateCharacters } from '../../redux/actions/fight'
import SelectionComponent from '../../Components/Selection'
class Selection extends Component {
  static propTypes = {
    characters: PropTypes.object,
    onCloseSelection: PropTypes.func,
    selectCharacter: PropTypes.func,
    validateCharacters: PropTypes.func,
    order: PropTypes.array
  }

  handleValidateCharacters = () => {
    this.props.onCloseSelection()
    this.props.validateCharacters()
  }
  render() {
    return (
      <SelectionComponent
        characters={this.props.characters}
        selectCharacter={this.props.selectCharacter}
        validateCharacters={this.handleValidateCharacters}
        isValidateDisabled={this.props.order.length < 1}
        order={this.props.order}
      />
    )
  }
}

const mapStateToProps = ({ firebase, fight: { order } }) => ({
  order,
  characters: firebase.data.characters
})

const mapDispatchToProps = dispatch => ({
  selectCharacter: idCharacter => {
    dispatch(selectCharacter(idCharacter))
  },
  validateCharacters: () => {
    dispatch(validateCharacters())
  }
})
export default connect(mapStateToProps, mapDispatchToProps)(Selection)
