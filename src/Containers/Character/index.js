import React, { Component } from 'react'
import PropTypes from 'prop-types'
import CharacterComponent from '../../Components/Character'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { firebaseConnect } from 'react-redux-firebase'

import {
  useSkill,
  useAction,
  delayTurn,
  endTurn
} from '../../redux/actions/fight'

import * as Races from '../../World/Races'
import * as Classes from '../../World/Classes'
import * as Skills from '../../World/Skills'

class Character extends Component {
  static propTypes = {
    firebase: PropTypes.object,
    characters: PropTypes.object,
    match: PropTypes.object,
    data: PropTypes.string,
    round: PropTypes.number,
    useSkill: PropTypes.func.isRequired,
    useAction: PropTypes.func.isRequired,
    endTurn: PropTypes.func.isRequired,
    delayTurn: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props)
    // this.character =
    //   props.characters[props.data] ||
    //   props.characters[props.match.params.idCharacter]
    this.state = { usedAP: 0, hp: props.characters[props.data].hp }

    // this.setSkills()
  }

  // componentWillReceiveProps(nextProps) {
  //   if (nextProps.data) {
  //     this.character = nextProps.characters[nextProps.data]
  //     // this.setSkills()
  //   }
  // }

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

  updateCharacter = changes => {
    const { data, firebase } = this.props
    firebase.update(`characters/${data}`, changes)
  }

  handleUseSkill = (name, skill) => {
    const { data, characters } = this.props
    const character = characters[data]
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
    const { data, characters } = this.props
    const character = characters[data]
    this.updateCharacter({ ap: character.ap - weapon.size })
  }
  handleMove = () => {
    const { data, characters } = this.props
    const character = characters[data]
    this.updateCharacter({ ap: character.ap - 1 })
    // firebase.update(`characters/${data}`, { ap: character.ap - 1 })
  }
  handleEndTurn = () => this.props.endTurn()
  handleDelayTurn = () => this.props.delayTurn()
  handleChangeHp = e => this.setState({ hp: Number(e.target.value) })
  handleUpdateHp = () =>
    this.props.firebase.update(`characters/${this.props.data}`, {
      hp: this.state.hp
    })

  render() {
    const { data, characters } = this.props
    const character = characters[data]
    // console.log(this.character)
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
export default compose(
  firebaseConnect(['characters']),
  connect(mapStateToProps, mapDispatchToProps)
)(Character)
// export default connect(mapStateToProps, mapDispatchToProps)(Character)
