import React, { Fragment, memo } from 'react'
import PropTypes from 'prop-types'
import * as S from './styles'
import { Button, Terminal } from '../../styleguide'

const LABELS = {
  advantages: 'Avantages',
  flaws: 'Défauts'
}
export const entriesToArray = entries => Object.entries(entries).map(([slug, values]) => ({ slug, ...values }))
export const sortArray = arr =>
  arr.sort((a, b) => {
    if (a.name < b.name) {
      return -1
    }
    if (a.name > b.name) {
      return 1
    }
    return 0
  })

const Specificity = ({ kind, items, onRemoveSpecificity, onIncrementSpecificity, onDecrementSpecificity }) => {
  return (
    <Fragment>
      <h3>{LABELS[kind]}</h3>
      <div>
        {items &&
          sortArray(entriesToArray(items)).map(({ slug, name, restrictions, points, effects, description }) => {
            const handleRemoveSpecificity = () => onRemoveSpecificity(kind, slug)
            const handleIncrementSpecificity = () => onIncrementSpecificity(points, slug, kind)
            const handleDecrementSpecificity = () => onDecrementSpecificity(points, slug, kind)
            return (
              <S.SpecificityItem key={slug}>
                <S.SpecificityContentName>
                  <S.SpecificityHeading>
                    {name} ({points})
                  </S.SpecificityHeading>
                  <S.DeleteSpecificity onClick={handleRemoveSpecificity}>x</S.DeleteSpecificity>
                </S.SpecificityContentName>
                <Button size="small" onClick={handleIncrementSpecificity}>
                  +
                </Button>
                <Button size="small" onClick={handleDecrementSpecificity}>
                  -
                </Button>
                {restrictions && <S.SpecificityRestrictions>{restrictions}</S.SpecificityRestrictions>}
                {effects && <S.SpecificityEffects>{effects}</S.SpecificityEffects>}
                <S.SpecificityDescription>{description}</S.SpecificityDescription>
              </S.SpecificityItem>
            )
          })}
      </div>
    </Fragment>
  )
}
Specificity.propTypes = {
  items: PropTypes.object.isRequired,
  kind: PropTypes.string.isRequired,
  onDecrementSpecificity: PropTypes.func.isRequired,
  onIncrementSpecificity: PropTypes.func.isRequired,
  onRemoveSpecificity: PropTypes.func.isRequired
}
const SpecificitiesList = ({ kind, isOpen, onToggle, items, onAddSpecificity }) => (
  <Fragment>
    <S.SpecTitle onClick={onToggle}>Liste des {LABELS[kind]}</S.SpecTitle>
    {isOpen && (
      <S.Specificities>
        {sortArray(items).map(item => {
          const { slug, name, restrictions, points, effects, description } = item
          const addAdvantage = () => onAddSpecificity(item)
          return (
            <S.Specificity key={slug} onClick={addAdvantage}>
              <S.SpecificityName>
                {name} ({points})
              </S.SpecificityName>
              <S.SpecificityContent>
                <Terminal>
                  <S.SpecificityContentName>{name}</S.SpecificityContentName>
                  {restrictions && <S.SpecificityRestrictions>{restrictions}</S.SpecificityRestrictions>}
                  {effects && <S.SpecificityEffects>{effects}</S.SpecificityEffects>}
                  <S.SpecificityDescription>{description}</S.SpecificityDescription>
                </Terminal>
              </S.SpecificityContent>
            </S.Specificity>
          )
        })}
      </S.Specificities>
    )}
  </Fragment>
)
SpecificitiesList.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  items: PropTypes.array.isRequired,
  kind: PropTypes.string.isRequired,
  onAddSpecificity: PropTypes.func.isRequired,
  onToggle: PropTypes.func.isRequired
}

const Specificities = ({
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
  onAddSpec,
  onAddSpecificity,
  onCancelSpec,
  onChangeDescription,
  onChangeEffects,
  onChangeName,
  onChangePoints,
  onDecrementSpecificity,
  onIncrementSpecificity,
  onRemoveSpecificity,
  onToggleAdvantages,
  onToggleFlaws,
  onValidateSpec,
  points,
  total
}) => (
  <div>
    <h3 className="character--title">Avantages & Défauts ({total})</h3>
    <Specificity
      kind="advantages"
      items={characterAdvantages}
      onRemoveSpecificity={onRemoveSpecificity}
      onIncrementSpecificity={onIncrementSpecificity}
      onDecrementSpecificity={onDecrementSpecificity}
    />
    <Specificity
      kind="flaws"
      items={characterFlaws}
      onRemoveSpecificity={onRemoveSpecificity}
      onIncrementSpecificity={onIncrementSpecificity}
      onDecrementSpecificity={onDecrementSpecificity}
    />

    <S.AddButton>
      <Button onClick={onAddSpec}>Add custom</Button>
    </S.AddButton>
    {isAddingSpec && (
      <Fragment>
        <S.SpecFields>
          <S.SpecLabel htmlFor="name">Name</S.SpecLabel>
          <S.SpecInput id="name" type="text" value={name} onChange={onChangeName} />
          <S.SpecLabel htmlFor="effects">Effects</S.SpecLabel>
          <S.SpecInput type="text" value={effects} onChange={onChangeEffects} id="effects" />
          <S.SpecLabel htmlFor="points">Points</S.SpecLabel>
          <S.SpecInput type="number" value={points} onChange={onChangePoints} id="points" />
          <S.SpecLabel htmlFor="description">Description</S.SpecLabel>
          <S.SpecTextArea value={description} onChange={onChangeDescription} id="description" />
        </S.SpecFields>
        <Button onClick={onValidateSpec}>Valider</Button>
        <Button onClick={onCancelSpec}>Annuler</Button>
      </Fragment>
    )}
    <SpecificitiesList
      kind="advantages"
      isOpen={isAdvantagesOpen}
      onToggle={onToggleAdvantages}
      items={advantages}
      onAddSpecificity={onAddSpecificity}
    />
    <SpecificitiesList
      kind="flaws"
      isOpen={isFlawsOpen}
      onToggle={onToggleFlaws}
      items={flaws}
      onAddSpecificity={onAddSpecificity}
    />
  </div>
)

Specificities.propTypes = {
  advantages: PropTypes.array.isRequired,
  characterAdvantages: PropTypes.object.isRequired,
  characterFlaws: PropTypes.object.isRequired,
  description: PropTypes.string.isRequired,
  effects: PropTypes.string.isRequired,
  flaws: PropTypes.array.isRequired,
  isAddingSpec: PropTypes.bool.isRequired,
  isAdvantagesOpen: PropTypes.bool.isRequired,
  isFlawsOpen: PropTypes.bool.isRequired,
  name: PropTypes.string.isRequired,
  onAddSpec: PropTypes.func.isRequired,
  onAddSpecificity: PropTypes.func.isRequired,
  onCancelSpec: PropTypes.func.isRequired,
  onChangeDescription: PropTypes.func.isRequired,
  onChangeEffects: PropTypes.func.isRequired,
  onChangeName: PropTypes.func.isRequired,
  onChangePoints: PropTypes.func.isRequired,
  onDecrementSpecificity: PropTypes.func.isRequired,
  onIncrementSpecificity: PropTypes.func.isRequired,
  onRemoveSpecificity: PropTypes.func.isRequired,
  onToggleAdvantages: PropTypes.func.isRequired,
  onToggleFlaws: PropTypes.func.isRequired,
  onValidateSpec: PropTypes.func.isRequired,
  points: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired
}

export default memo(Specificities)
