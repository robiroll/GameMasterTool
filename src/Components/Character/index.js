import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import Card from '../../styleguide/Card'
import Button from '../../styleguide/Button'
import Difficulty from '../Difficulty'
import Passion from '../../Containers/Passion'
import { AP, HP_MAX } from '../../lib'
import './Character.css'

import { standardSkills as standardSkillsBonuses, proSkills as proSkillsBonuses } from './config'

const BONUS_NAME = {
  str: 'Force',
  dex: 'Dextérité',
  int: 'Intelligence',
  con: 'Constitution',
  siz: 'Taille',
  cha: 'Charisme',
  pow: 'Power'
}

const Character = ({
  data: { hp, name, attributes, combatSkills, standardSkills, proSkills, talents, equipment, inventory },
  idCharacter,
  onUpdateHp,
  onChangeHp,
  onChangeAttr,
  onChangeSkill,
  onEquip,
  onUnequip,
  onUseItem,
  onDropItem,
  hpToUpdate,
  skills,
  onToggleStandardSkills,
  onToggleProSkills,
  isStandardSkillsOpen,
  isProSkillsOpen
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

  let armor = 0
  let magicArmor = 0
  Object.values(equipment).forEach(eq => {
    armor += eq.armor || 0
    magicArmor += eq.magicArmor || 0
  })
  const apBase = AP(totalStats).base
  const apStart = AP(totalStats).start
  const apMax = AP(totalStats).max
  const hpMax = HP_MAX(totalStats)

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

  return (
    <Card title={<h2>{name}</h2>}>
      <div className="character">
        <div className="character--stats">
          <div className="character--stats--attributes">
            <h4 className="character--title">Attributes ({Object.values(totalStats).reduce((a, v) => a + v)})</h4>
            {Object.keys(bonuses).map(bns => {
              return (
                <div
                  key={bns}
                  className={`character--stats--attributes--elem character--stats--attributes--elem--${bns}`}
                >
                  <span>
                    {BONUS_NAME[bns]} : {totalStats[bns]} ({attributes[bns]}+{bonuses[bns]})
                  </span>
                  <Button onClick={onChangeAttr('add', bns)} size="small">
                    +
                  </Button>
                  <Button onClick={onChangeAttr('remove', bns)} size="small">
                    -
                  </Button>
                </div>
              )
            })}
          </div>
          <div className="character--stats--defenses">
            <h4 className="character--title">Statistics</h4>
            {weapons.length > 0 && (
              <Fragment>
                <div className="character--action--item">
                  Attack:{' '}
                  {weapons.map((weapon, index) => {
                    const isLast = index === weapons.length - 1
                    const damage = totalStats[weapon.damageType] + weapon.damage
                    const dps = damage % weapon.size === 0 ? damage / weapon.size : (damage / weapon.size).toFixed(1)
                    return (
                      <span key={weapon.name}>
                        {damage} ({dps} dps)
                        {!isLast && ' / '}
                      </span>
                    )
                  })}
                </div>
                <div className="character--action--item">
                  Hit chance:{' '}
                  {weapons.map((weapon, index) => {
                    const isLast = index === weapons.length - 1
                    const hitPercent = 50 + totalStats[weapon.damageType] * 2
                    return (
                      <span key={weapon.name} className="character--action--item">
                        {hitPercent}
                        {!isLast && ' / '}
                      </span>
                    )
                  })}
                </div>
                <div className="character--action--item">
                  Range:{' '}
                  {weapons.map((weapon, index) => {
                    const isLast = index === weapons.length - 1
                    return (
                      <span key={weapon.name} className="character--action--item">
                        {weapon.size}
                        {!isLast && ' / '}
                      </span>
                    )
                  })}
                </div>
              </Fragment>
            )}
            <div className="character--stats--defenses--physical">Armor: {armor}</div>
            <div className="character--stats--defenses--magical">Magic Armor: {magicArmor}</div>
            <div className="character--hp">
              HP: {hp.toLocaleString('fr')} / {hpMax.toLocaleString('fr')}
            </div>
            <div className="character--health">
              <input type="number" value={hpToUpdate} onChange={onChangeHp} />
              <div className="character--health--button">
                <Button onClick={() => onUpdateHp(20)} size="small" format="full">
                  update hp
                </Button>
              </div>
            </div>
          </div>
          <div className="character--stats--general">
            <h4 className="character--title">Fight</h4>
            <div className="character--initiative">Initiative: {Math.ceil((totalStats.int + totalStats.dex) / 2)}</div>
            <div className="character--ap">
              AP start: {apStart}
              <br />
              AP per turn: {apBase}
              <br />
              AP max: {apMax}
            </div>
            <h4 className="character--title">Passions</h4>
            <div className="character--passion">
              <Passion idCharacter={idCharacter} number={1} />
              <Passion idCharacter={idCharacter} number={2} />
              <Passion idCharacter={idCharacter} number={3} />
            </div>
          </div>
        </div>
        <h3 className="character--title" onClick={onToggleStandardSkills}>
          Standard Skills ({totalStandardSkills}) <span>{isStandardSkillsOpen ? '⇡' : '⇣'}</span>
        </h3>
        {isStandardSkillsOpen && (
          <div className="character--skills character--skills__standard">
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
              return (
                <div key={key} className="character--skills--item">
                  <div className="character--skills--item--base">
                    {key}: {base}
                    <div className="character--skills--item--difficulty">
                      <Difficulty title={key} total={total} />
                    </div>
                  </div>
                  <div>
                    <Button onClick={onChangeSkill('add', key, 'standard')} size="small">
                      +
                    </Button>
                    <Button onClick={onChangeSkill('remove', key, 'standard')} size="small">
                      -
                    </Button>
                  </div>
                </div>
              )
            })}
          </div>
        )}
        <h3 className="character--title" onClick={onToggleProSkills}>
          Professional Skills ({totalProSkills})<span>{isProSkillsOpen ? '⇡' : '⇣'}</span>
        </h3>
        {isProSkillsOpen && (
          <div className="character--skills character--skills__pro">
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
              return (
                <div key={key} className="character--skills--item">
                  <div className="character--skills--item--base">
                    {key}: {base}
                    <div className="character--skills--item--difficulty">
                      <Difficulty title={key} total={total} />
                    </div>
                  </div>
                  <div>
                    <Button onClick={onChangeSkill('add', key, 'pro')} size="small">
                      +
                    </Button>
                    <Button onClick={onChangeSkill('remove', key, 'pro')} size="small">
                      -
                    </Button>
                  </div>
                </div>
              )
            })}
          </div>
        )}
        <h3 className="character--title">Inventaire</h3>
        {inventory && (
          <div className="character--inventory">
            {Object.keys(inventory).map(key => {
              const item = inventory[key]
              const { name, quantity } = item
              return (
                <div key={key} className="character--inventory--item">
                  {name} {quantity && <span>({quantity})</span>}
                  {item.type === 'equipment' && <Button onClick={() => onEquip(key, item)}>Equip ({item.slot})</Button>}
                  {(item.type === 'usable' || item.type === 'permanent') && (
                    <Button onClick={() => onUseItem(key, item)} disabled={item.quantity <= 0}>
                      Use item ({item.apCost})
                    </Button>
                  )}
                  <Button onClick={() => onDropItem(key)} size="small">
                    x
                  </Button>
                </div>
              )
            })}
          </div>
        )}
        <h3 className="character--title">Équipement</h3>
        {equipment && (
          <div className="character--equipment">
            {Object.keys(equipment).map(key => {
              const item = equipment[key]
              return (
                <div key={key} className="character--equipment--item">
                  {item.name}{' '}
                  {item.type === 'equipment' && <Button onClick={() => onUnequip(key, item)}>Unequip</Button>}
                </div>
              )
            })}
          </div>
        )}
        <h3 className="character--title">Talents</h3>
        {talents && (
          <div className="character--talents">
            {Object.keys(talents).map(key => {
              const talent = talents[key]
              return (
                <div key={key} className="character--talents--item">
                  {talent.name}
                </div>
              )
            })}
          </div>
        )}
        <h3 className="character--title">Compétences</h3>
        {combatSkills && (
          <div className="character--combat-skills">
            {Object.keys(combatSkills).map(key => {
              const skill = skills[key]
              const success = totalStats[skill.attr1] + totalStats[skill.attr2] + combatSkills[key]
              let successString = `${skill.attr1} + ${skill.attr2} + ${combatSkills[key]}`
              return (
                <div className="character--combat-skills--item" key={key}>
                  <h4 className="character--combat-skills--item--title">
                    {key}: {combatSkills[key]}
                    <div>
                      <Button onClick={onChangeSkill('add', key, 'combat')} size="small">
                        +
                      </Button>
                      <Button onClick={onChangeSkill('remove', key, 'combat')} size="small">
                        -
                      </Button>
                    </div>
                  </h4>
                  <ul className="character--combat-skills--item--infos">
                    <li>type: {skill.type}</li>
                    <li>damage: {skill.damage}</li>
                    <li>CD: {skill.cooldown}</li>
                    <li>cost: {skill.cost}</li>
                    <li>distance: {skill.distance}</li>
                    <li>range: {skill.range}</li>
                    <li>description: {skill.description}</li>
                    <li>
                      success: {success} ({successString})
                    </li>
                  </ul>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </Card>
  )
}

Character.propTypes = {
  data: PropTypes.object,
  idCharacter: PropTypes.string,
  onUpdateHp: PropTypes.func,
  onChangeAttr: PropTypes.func,
  onChangeSkill: PropTypes.func,
  onChangeHp: PropTypes.func,
  onEquip: PropTypes.func,
  onUnequip: PropTypes.func,
  onUseItem: PropTypes.func,
  onDropItem: PropTypes.func,
  hpToUpdate: PropTypes.number,
  skills: PropTypes.object,
  onToggleStandardSkills: PropTypes.func,
  onToggleProSkills: PropTypes.func,
  isStandardSkillsOpen: PropTypes.bool,
  isProSkillsOpen: PropTypes.bool
}

export default Character
