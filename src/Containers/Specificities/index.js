import React, { useState, memo } from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { firebaseConnect } from 'react-redux-firebase'
import { get } from 'lodash'
import * as specificities from './config'
import SpecificitiesComponent from '../../Components/Specificities'

const advantages = Object.values(specificities).filter(({ kind }) => kind === 'advantages')
const flaws = Object.values(specificities).filter(({ kind }) => kind === 'flaws')

const Specificities = ({ idCharacter, characters, firebase }) => {
  const [isAdvantagesOpen, setIsAdvantagesOpen] = useState(false)
  const [isFlawsOpen, setIsFlawsOpen] = useState(false)
  const [isAddingSpec, setIsAddingSpec] = useState(false)
  const [name, setName] = useState('')
  const [points, setPoints] = useState(1)
  const [effects, setEffects] = useState('')
  const [description, setDescription] = useState('')
  const handleToggleAdvantages = () => setIsAdvantagesOpen(!isAdvantagesOpen)
  const handleToggleFlaws = () => setIsFlawsOpen(!isFlawsOpen)
  const handleChangeName = ({ target: { value } }) => setName(value)
  const handleChangeDescription = ({ target: { value } }) => setDescription(value)
  const handleChangeEffects = ({ target: { value } }) => setEffects(value)
  const handleChangePoints = ({ target: { value } }) => setPoints(value)
  const handleAddSpec = () => setIsAddingSpec(true)
  const handleValidateSpec = () => {
    const kind = points > 0 ? 'flaws' : 'advantages'
    const slug = name.toLowerCase().replace(/ /g, '-')
    const spec = {
      kind,
      slug,
      effects,
      name,
      points: Number(points),
      description
    }
    handleAddSpecificity(spec)
    setName('')
    setEffects('')
    setPoints(1)
    setDescription('')
    setIsAddingSpec(false)
  }
  const handleCancelSpec = () => setIsAddingSpec(false)
  const character = characters[idCharacter]

  const handleAddSpecificity = ({ kind, slug, ...spec }) => {
    firebase.set(`characters/${idCharacter}/details/${kind}/${slug}`, spec)
  }
  const handleRemoveSpecificity = (kind, slug) => {
    firebase.remove(`characters/${idCharacter}/details/${kind}/${slug}`)
  }

  const handleIncrementSpecificity = (points, slug, kind) => {
    firebase.update(`characters/${idCharacter}/details/${kind}/${slug}`, { points: points + 1 })
  }
  const handleDecrementSpecificity = (points, slug, kind) => {
    firebase.update(`characters/${idCharacter}/details/${kind}/${slug}`, { points: points - 1 })
  }

  const characterAdvantages = get(character, 'details.advantages')
  const characterFlaws = get(character, 'details.flaws')
  const all = []
  if (characterAdvantages) all.push(...Object.values(characterAdvantages))
  if (characterFlaws) all.push(...Object.values(characterFlaws))

  const total = all.filter(Boolean).reduce((previous, { points }) => previous + points, 0)

  const props = {
    advantages,
    characterAdvantages,
    characterFlaws,
    description,
    effects,
    flaws,
    isAddingSpec,
    isAdvantagesOpen,
    isFlawsOpen,
    name,
    onAddSpec: handleAddSpec,
    onAddSpecificity: handleAddSpecificity,
    onCancelSpec: handleCancelSpec,
    onChangeDescription: handleChangeDescription,
    onChangeEffects: handleChangeEffects,
    onChangeName: handleChangeName,
    onChangePoints: handleChangePoints,
    onDecrementSpecificity: handleDecrementSpecificity,
    onIncrementSpecificity: handleIncrementSpecificity,
    onRemoveSpecificity: handleRemoveSpecificity,
    onToggleAdvantages: handleToggleAdvantages,
    onToggleFlaws: handleToggleFlaws,
    onValidateSpec: handleValidateSpec,
    points,
    total
  }

  return <SpecificitiesComponent {...props} />
}
Specificities.propTypes = {
  characters: PropTypes.object,
  firebase: PropTypes.object,
  idCharacter: PropTypes.string
}

const mapStateToProps = state => ({
  characters: state.firebase.data.characters
})

export default memo(
  compose(
    firebaseConnect(['characters']),
    connect(mapStateToProps)
  )(Specificities)
)
