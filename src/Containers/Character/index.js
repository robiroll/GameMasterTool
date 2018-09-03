import React, { Component } from 'react'
import PropTypes from 'prop-types'
import CharacterComponent from '../../Components/Character'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { firebaseConnect } from 'react-redux-firebase'

class Character extends Component {
  static propTypes = {
    firebase: PropTypes.object,
    characters: PropTypes.object,
    skills: PropTypes.object,
    idCharacter: PropTypes.string
  }

  constructor(props) {
    super(props)
    const { idCharacter, characters } = props
    const character = characters[idCharacter]
    const hp = characters ? character.hp : 0
    const { credits } = character
    this.state = {
      usedAP: 0,
      hp,
      credits,
      isStandardSkillsOpen: true,
      isProSkillsOpen: true
    }
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.characters) {
      const { idCharacter } = nextProps
      this.setState({ hp: nextProps.characters[idCharacter].hp })
    }
  }

  handleToggleStandardSkills = () => this.setState({ isStandardSkillsOpen: !this.state.isStandardSkillsOpen })
  handleToggleProSkills = () => this.setState({ isProSkillsOpen: !this.state.isProSkillsOpen })

  updateCharacter = changes => {
    const { firebase, idCharacter } = this.props
    firebase.update(`characters/${idCharacter}`, changes)
  }

  handleChangeHp = e => {
    this.setState({ hp: Number(e.target.value) })
  }
  handleChangeCredits = e => {
    this.setState({ credits: Number(e.target.value) })
  }
  handleUpdateHp = () => {
    this.updateCharacter({ hp: this.state.hp })
  }
  handleUpdateCredits = () => {
    this.updateCharacter({ credits: this.state.credits })
  }
  handleChangeAttr = (operation, attr) => () => {
    const { characters, idCharacter, firebase } = this.props
    const attrValue = characters[idCharacter].attributes[attr]
    const newValue = operation === 'add' ? attrValue + 1 : operation === 'remove' && attrValue - 1
    const changes = { [attr]: newValue }
    firebase.update(`characters/${idCharacter}/attributes`, changes)
  }
  handleChangeSkill = (operation, skill, type) => () => {
    // type  must be 'pro', 'combat' or 'standard'
    const { characters, idCharacter, firebase } = this.props
    const skillValue = characters[idCharacter][`${type}Skills`][skill] || 0
    const newValue = operation === 'add' ? skillValue + 1 : operation === 'remove' && skillValue - 1
    const changes = { [skill]: newValue }
    firebase.update(`characters/${idCharacter}/${type}Skills`, changes)
  }

  render() {
    const { characters, idCharacter, skills } = this.props
    const character = characters[idCharacter]
    return (
      <CharacterComponent
        data={character}
        idCharacter={idCharacter}
        skills={skills}
        onChangeHp={this.handleChangeHp}
        onChangeCredits={this.handleChangeCredits}
        onChangeAttr={this.handleChangeAttr}
        onChangeSkill={this.handleChangeSkill}
        onUpdateHp={this.handleUpdateHp}
        onUpdateCredits={this.handleUpdateCredits}
        hpToUpdate={this.state.hp}
        creditsToUpdate={this.state.credits}
        onToggleStandardSkills={this.handleToggleStandardSkills}
        onToggleProSkills={this.handleToggleProSkills}
        isStandardSkillsOpen={this.state.isStandardSkillsOpen}
        isProSkillsOpen={this.state.isProSkillsOpen}
      />
    )
  }
}

const mapStateToProps = state => {
  return {
    characters: state.firebase.data.characters,
    skills: state.firebase.data.skills
  }
}

export default compose(
  firebaseConnect(['characters', 'skills']),
  connect(mapStateToProps)
)(Character)
