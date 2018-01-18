import React, { Component } from 'react'
import PropTypes from 'prop-types'
import CharacterComponent from '../../Components/Character'

import { connect } from 'react-redux'
import { nextTurn, useSkill, useAction, attack, move, delayTurn, endTurn } from '../../redux/actions/fight'

import * as Races from '../../World/Races'
import * as Classes from '../../World/Classes'
import * as Skills from '../../World/Skills'

import CHARACTERS from '../../World/Characters'

class Character extends Component {
  static propTypes = {
    match: PropTypes.object,
    data: PropTypes.object,
    currentTurn: PropTypes.number,
    useSkill: PropTypes.func.isRequired,
    useAction: PropTypes.func.isRequired,
    attack: PropTypes.func.isRequired,
    move: PropTypes.func.isRequired,
    endTurn: PropTypes.func.isRequired,
    delayTurn: PropTypes.func.isRequired,
    nextTurn: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props)
    this.character = props.data || CHARACTERS.find(char => char.idCharacter === props.match.params.idCharacter) // We might need to do a `new Character`. As of now, I'm testing without it

    this.state = { usedAP: 0 }

    this.setSkills()
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.data) {
      this.character = nextProps.data
      this.setSkills()
    }
  }

  setSkills() {
    this.skills = this.character.skills.reduce((list, curr) => {
      const skill = Skills[curr.name] ? Skills[curr.name] : curr // Debug while MVP not ready
      list.push(skill)
      return list
    }, [])
  }

  get race() {
    return Races[this.character.race]
  }

  get class() {
    return Classes[this.character.class]
  }

  handleUseSkill = skill => this.props.useSkill(skill)
  handleUseAction = action => this.props.useAction(action)
  handleAttack = weapon => this.props.attack(weapon)
  handleMove = () => this.props.move()
  handleEndTurn = () => this.props.endTurn()
  handleDelayTurn = () => this.props.delayTurn()
  onEndTurn = () => this.props.nextTurn()

  render() {
    return (
      <CharacterComponent
        currentTurn={this.props.currentTurn}
        data={this.character}
        skills={this.character.skills}
        state={this.state}
        onUseSkill={this.handleUseSkill}
        onUseAction={this.handleUseAction}
        onAttack={this.handleAttack}
        onMove={this.handleMove}
        onEndTurn={this.handleEndTurn}
        onDelayTurn={this.handleDelayTurn}
      />
    )
  }
}

const mapDispatchToProps = dispatch => ({
  nextTurn: () => {
    dispatch(nextTurn())
  },
  useSkill: skill => {
    dispatch(useSkill(skill.cost))
  },
  useAction: action => {
    dispatch(useAction(action))
  },
  attack: weapon => {
    dispatch(attack(weapon))
  },
  move: () => {
    dispatch(move())
  },
  endTurn: () => {
    dispatch(endTurn())
  },
  delayTurn: () => {
    dispatch(delayTurn())
  }
})

export default connect(null, mapDispatchToProps)(Character)
