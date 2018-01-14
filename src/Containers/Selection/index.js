import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { selectCharacter, validateCharacters, selectFoe } from '../../redux/actions/fight'
import SelectionComponent from '../../Components/Selection'
class Selection extends Component {
  static propTypes = {
    onCloseSelection: PropTypes.func,
    selectCharacter: PropTypes.func,
    selectFoe: PropTypes.func,
    validateCharacters: PropTypes.func,
    order: PropTypes.array,
    foes: PropTypes.array
  }

  handleValidateCharacters = () => {
    this.props.onCloseSelection()
    this.props.validateCharacters()
  }
  render() {
    return (
      <SelectionComponent
        selectCharacter={this.props.selectCharacter}
        selectFoe={this.props.selectFoe}
        validateCharacters={this.handleValidateCharacters}
        isValidateDisabled={this.props.order.length < 1}
        order={this.props.order}
        foes={this.props.foes}
      />
    )
  }
}

const mapStateToProps = ({ fight: { order, foes } }) => ({
  order,
  foes
})

const mapDispatchToProps = dispatch => ({
  selectCharacter: idCharacter => {
    dispatch(selectCharacter(idCharacter))
  },
  selectFoe: idCharacter => {
    dispatch(selectFoe(idCharacter))
  },
  validateCharacters: () => {
    dispatch(validateCharacters())
  }
})
export default connect(mapStateToProps, mapDispatchToProps)(Selection)
