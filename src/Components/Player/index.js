import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { get } from 'lodash'
import Equipment from '../../Containers/Equipment'
import Inventory from '../../Containers/Inventory'
import { entriesToArray, sortArray } from '../Specificities'
import SkillSheet from '../SkillSheet'
import { AP, HP_MAX, STATUSES_STATS } from '../../lib'
import * as S from './styles'
import './Player.scss'

import { standardSkills as standardSkillsBonuses, proSkills as proSkillsBonuses } from '../Character/config'

const BONUS_NAME = {
  str: 'Force',
  dex: 'Dextérité',
  int: 'Intelligence',
  con: 'Constitution',
  siz: 'Taille',
  cha: 'Charisme',
  pow: 'Pouvoir'
}

const Player = ({
  skills,
  character: {
    ap: apCurrent,
    idCharacter,
    hp,
    name,
    attributes,
    combatSkills,
    standardSkills,
    proSkills,
    equipment,
    credits,
    passion1,
    passion2,
    passion3,
    statuses,
    details
  }
}) => {
  let weapons = []
  if (equipment && equipment.weapon1) weapons.push(equipment.weapon1)
  if (equipment && equipment.weapon2) weapons.push(equipment.weapon2)
  let bonuses = {
    str: 0,
    dex: 0,
    con: 0,
    pow: 0,
    cha: 0,
    int: 0,
    siz: 0
  }
  if (equipment)
    Object.keys(equipment).map(key => {
      const eq = equipment[key]
      if (eq.bonus) Object.keys(eq.bonus).map(bns => (bonuses[bns] += eq.bonus[bns]))
    })
  let totalStats = {}
  Object.keys(attributes).map(attr => (totalStats[attr] = bonuses[attr] + attributes[attr]))

  let armor = totalStats.con
  let magicArmor = totalStats.pow
  let bonusHP = 0
  if (equipment)
    Object.values(equipment).forEach(eq => {
      armor += eq.armor || 0
      magicArmor += eq.magicArmor || 0
      bonusHP += eq.hp || 0
    })
  if (statuses) {
    const st = STATUSES_STATS(statuses)
    armor += st.armor
    magicArmor += st.magicArmor
  }
  const apMax = AP.max
  const hpMax = HP_MAX(totalStats, equipment)

  let totalStandardSkills = 0
  Object.keys(standardSkillsBonuses).forEach(key => {
    const value = standardSkills[key] || 0
    totalStandardSkills += value
  })

  let totalProSkills = 0
  Object.keys(proSkillsBonuses).forEach(key => {
    const value = proSkills[key] || 0
    totalProSkills += value
  })

  const characterAdvantages = get(details, 'advantages')
  const characterFlaws = get(details, 'flaws')

  return (
    <div>
      <div className="player">
        <h2 className="player--name">{name}</h2>
        <div className="player--stats">
          <div className="player--stats--attributes">
            <h4 className="player--title">Attributes ({Object.values(totalStats).reduce((a, v) => a + v)})</h4>
            {Object.keys(bonuses).map(bns => {
              return (
                <div key={bns} className={`player--stats--attributes--elem player--stats--attributes--elem--${bns}`}>
                  <span>
                    {BONUS_NAME[bns]} : {totalStats[bns]} ({attributes[bns]}+{bonuses[bns]})
                  </span>
                </div>
              )
            })}
          </div>
          <div className="player--stats--defenses">
            <h4 className="player--title">Statistics</h4>
            {weapons.length > 0 && (
              <Fragment>
                <div className="player--action--item">
                  Attack:{' '}
                  {weapons.map((weapon, index) => {
                    const isLast = index === weapons.length - 1
                    const damage = totalStats[weapon.damageType] + weapon.damage
                    // const dps = damage % weapon.size === 0 ? damage / weapon.size : (damage / weapon.size).toFixed(1)
                    return (
                      <span key={weapon.name}>
                        {damage}
                        {!isLast && ' / '}
                      </span>
                    )
                  })}
                </div>
                <div className="player--action--item">
                  Hit chance:{' '}
                  {weapons.map((weapon, index) => {
                    const isLast = index === weapons.length - 1
                    const hitPercent = 50 + totalStats[weapon.damageType] * 2
                    return (
                      <span key={weapon.name} className="player--action--item">
                        {hitPercent}
                        {!isLast && ' / '}
                      </span>
                    )
                  })}
                </div>
                <div className="player--action--item">
                  Range:{' '}
                  {weapons.map((weapon, index) => {
                    const isLast = index === weapons.length - 1
                    return (
                      <span key={weapon.name} className="player--action--item">
                        {weapon.size}
                        {!isLast && ' / '}
                      </span>
                    )
                  })}
                </div>
              </Fragment>
            )}
            <div className="player--stats--defenses--physical">Armor: {armor}</div>
            <div className="player--stats--defenses--magical">Magic Armor: {magicArmor}</div>
            <div className="player--stats--defenses--hp">Bonus Health: {bonusHP}</div>
            <div className="player--hp">
              HP: {hp.toLocaleString('fr')} / {hpMax.toLocaleString('fr')}
            </div>
          </div>
          <div className="player--stats--general">
            <h4 className="player--title">Fight</h4>
            <div className="player--initiative">Initiative: {Math.ceil((totalStats.int + totalStats.dex) / 2)}</div>
            <S.ActionPoints>
              {Array.from(Array(apMax)).map((_, i) => (
                <S.ActionPoint key={i} isActive={i < apCurrent}></S.ActionPoint>
              ))}
              <S.LifeBar current={hp} max={hpMax} />
            </S.ActionPoints>
            <h4 className="player--title">Passions</h4>
            <div className="player--passion">
              {passion1 && (
                <div>
                  {passion1.name}: {passion1.value} (
                  {passion1.value + totalStats[passion1.attr1] + totalStats[passion1.attr2]} %)
                </div>
              )}
              {passion2 && (
                <div>
                  {passion2.name}: {passion2.value} (
                  {passion2.value + totalStats[passion2.attr1] + totalStats[passion2.attr2]} %)
                </div>
              )}
              {passion3 && (
                <div>
                  {passion3.name}: {passion3.value} (
                  {passion3.value + totalStats[passion3.attr1] + totalStats[passion3.attr2]} %)
                </div>
              )}
            </div>
            <h4 className="player--title">Avantages</h4>
            <div>
              {characterAdvantages &&
                sortArray(entriesToArray(characterAdvantages)).map(({ slug, name, points, effects, description }) => (
                  <S.SpecificityItem key={slug}>
                    <S.SpecificityContentName>
                      <S.SpecificityHeading>
                        {name} ({points})
                      </S.SpecificityHeading>
                    </S.SpecificityContentName>
                    {effects && <S.SpecificityEffects>{effects}</S.SpecificityEffects>}
                    <S.SpecificityDescription>{description}</S.SpecificityDescription>
                  </S.SpecificityItem>
                ))}
            </div>
            <h4 className="player--title">Défauts</h4>
            {characterFlaws &&
              sortArray(entriesToArray(characterFlaws)).map(({ slug, name, points, effects, description }) => (
                <S.SpecificityItem key={slug}>
                  <S.SpecificityContentName>
                    <S.SpecificityHeading>
                      {name} ({points})
                    </S.SpecificityHeading>
                  </S.SpecificityContentName>
                  {effects && <S.SpecificityEffects>{effects}</S.SpecificityEffects>}
                  <S.SpecificityDescription>{description}</S.SpecificityDescription>
                </S.SpecificityItem>
              ))}
          </div>
        </div>
        <h3 className="player--title">Standard Skills ({totalStandardSkills})</h3>
        <div className="player--skills player--skills__standard">
          {Object.keys(standardSkillsBonuses).map(key => {
            const base = standardSkills[key] || 0
            let total = base
            if (standardSkillsBonuses[key])
              standardSkillsBonuses[key].map(skill => {
                if (typeof skill === 'string') {
                  total += attributes[skill]
                  total += bonuses[skill]
                } else total += skill
              })
            if (base !== 0)
              return (
                <div key={key} className="player--skills--item">
                  <div className="player--skills--item--base">
                    {key}: {base} ({total} %)
                  </div>
                </div>
              )
            return null
          })}
        </div>
        <h3 className="player--title">Professional Skills ({totalProSkills})</h3>
        <div className="player--skills player--skills__pro">
          {Object.keys(proSkillsBonuses).map(key => {
            const base = proSkills[key] || 0
            let total = base
            if (proSkillsBonuses[key])
              proSkillsBonuses[key].map(skill => {
                if (typeof skill === 'string') {
                  total += attributes[skill]
                  total += bonuses[skill]
                } else total += skill
              })
            if (base !== 0)
              return (
                <div key={key} className="player--skills--item">
                  <div className="player--skills--item--base">
                    {key}: {base} ({total} %)
                  </div>
                </div>
              )
            return null
          })}
        </div>
        <h3 className="player--title">Inventaire</h3>
        <Inventory idCharacter={idCharacter} />
        <h5 className="player--credits--title">credits: {(credits || 0).toLocaleString('fr')}</h5>
        <h3 className="player--title">Équipement</h3>
        <Equipment idCharacter={idCharacter} />
        <div className="player--title--wrapper">
          <h3 className="player--title">Compétences</h3>
        </div>

        {combatSkills && (
          <div className="player--combat-skills">
            {Object.keys(combatSkills).map(key => {
              const skill = skills[key]
              const skillValue = combatSkills[key]
              const stats = totalStats
              const props = {
                skill,
                skillValue,
                stats,
                weapons
              }
              return <SkillSheet key={key} {...props} />
            })}
          </div>
        )}
      </div>
    </div>
  )
}

Player.propTypes = {
  character: PropTypes.object,
  skills: PropTypes.object
}

export default Player
