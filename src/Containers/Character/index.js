import React, { Component } from 'react'
import PropTypes from 'prop-types'
import CharacterComponent from '../../Components/Character'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { firebaseConnect } from 'react-redux-firebase'

import { useSkill, useAction, delayTurn, endTurn } from '../../redux/actions/fight'

class Character extends Component {
  static propTypes = {
    firebase: PropTypes.object,
    characters: PropTypes.object,
    idCharacter: PropTypes.string,
    round: PropTypes.number,
    useSkill: PropTypes.func.isRequired,
    useAction: PropTypes.func.isRequired,
    endTurn: PropTypes.func.isRequired,
    delayTurn: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props)
    const { idCharacter, characters } = props
    const hp = characters ? characters[idCharacter].hp : 0
    this.state = { usedAP: 0, hp }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.characters) {
      const { idCharacter } = nextProps
      this.setState({ hp: nextProps.characters[idCharacter].hp })
    }
  }

  updateCharacter = changes => {
    const { firebase, idCharacter } = this.props
    firebase.update(`characters/${idCharacter}`, changes)
  }

  handleUseSkill = (name, skill) => {
    const { characters, idCharacter } = this.props
    const character = characters[idCharacter]
    const cooldowns = Object.assign({}, character.cooldowns, {
      [name]: skill.cooldown
    })
    this.updateCharacter({
      ap: character.ap - skill.cost,
      cooldowns
    })
  }
  handleUseAction = action => this.props.useAction(action)
  handleAttack = weapon => {
    const { characters, idCharacter } = this.props
    const character = characters[idCharacter]
    this.updateCharacter({ ap: character.ap - weapon.size })
  }
  handleMove = () => {
    const { characters, idCharacter } = this.props
    const character = characters[idCharacter]
    this.updateCharacter({ ap: character.ap - 1 })
  }
  handleEndTurn = () => this.props.endTurn()
  handleDelayTurn = () => this.props.delayTurn()
  handleChangeHp = e => {
    this.setState({ hp: Number(e.target.value) })
  }
  handleUpdateHp = () => {
    this.updateCharacter({ hp: this.state.hp })
  }

  render() {
    const { characters, idCharacter } = this.props
    const character = characters[idCharacter]
    return (
      <CharacterComponent
        round={this.props.round}
        data={character}
        skills={character.skills}
        state={this.state}
        onUseSkill={this.handleUseSkill}
        onUseAction={this.handleUseAction}
        onAttack={this.handleAttack}
        onMove={this.handleMove}
        onEndTurn={this.handleEndTurn}
        onDelayTurn={this.handleDelayTurn}
        onChangeHp={this.handleChangeHp}
        onUpdateHp={this.handleUpdateHp}
        hpToUpdate={this.state.hp}
      />
    )
  }
}

const mapStateToProps = state => {
  return {
    characters: state.firebase.data.characters,
    round: state.fight.round
  }
}

const mapDispatchToProps = dispatch => ({
  useSkill: skill => {
    dispatch(useSkill(skill.cost))
  },
  useAction: action => {
    dispatch(useAction(action))
  },
  endTurn: () => {
    dispatch(endTurn())
  },
  delayTurn: () => {
    dispatch(delayTurn())
  }
})
export default compose(firebaseConnect(['characters']), connect(mapStateToProps, mapDispatchToProps))(Character)
