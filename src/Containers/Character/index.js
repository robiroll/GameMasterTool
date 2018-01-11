import React, { Component } from 'react'
import PropTypes from 'prop-types'
import CharacterComponent from '../../Components/Character'

import * as Races from '../../World/Races'
import * as Classes from '../../World/Classes'
import * as Skills from '../../World/Skills'

import CHARACTERS from '../../World/Characters'

export default class Character extends Component {
  static propTypes = {
    match: PropTypes.object,
    data: PropTypes.object,
    currentTurn: PropTypes.number
  }

  constructor(props) {
    super(props)
    this.character = props.data || CHARACTERS.find(char => char.idCharacter === props.match.params.idCharacter) // We might need to do a `new Character`. As of now, I'm testing without it

    this.state = { usedAP: 0 }

    this.setSkills()
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

  render() {
    return (
      <CharacterComponent
        currentTurn={this.props.currentTurn}
        data={this.character}
        skills={this.skills}
        state={this.state}
        onSkillClick={this.onSkillClick}
      />
    )
  }

  onSkillClick = skill => {
    // Todo w/ redux maybe?
    if (this.character.ap - this.state.usedAP >= skill.apCost) {
      this.setState({
        usedAP: this.state.usedAP + skill.apCost
      })
    } else {
      // TODO, or disable click
      alert('Pas assez de PA')
    }
  }

  onEndTurn() {
    this.setState({
      usedAP: 0
    })
  }
}
