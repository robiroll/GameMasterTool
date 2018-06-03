import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import Card from '../../styleguide/Card'
import Button from '../../styleguide/Button'
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
  data: {
    cooldowns,
    hp,
    // hpBase,
    name,
    level,
    ap,
    // apBase,
    // apStart,
    // apMax,
    attributes,
    combatSkills,
    standardSkills,
    proSkills,
    talents,
    equipment,
    inventory
  },
  onUseSkill,
  onAttack,
  onMove,
  onEndTurn,
  onDelayTurn,
  onUpdateHp,
  onChangeHp,
  onChangeAttr,
  onEquip,
  onUnequip,
  onUseItem,
  onDropItem,
  hpToUpdate,
  skills
}) => {
  let weapons = []
  if (equipment && equipment.weapon1) weapons.push(equipment.weapon1)
  if (equipment && equipment.weapon2) weapons.push(equipment.weapon2)
  const { str, siz, con, dex, int, pow, cha } = attributes
  let bonuses = {
    str: 0,
    siz: 0,
    con: 0,
    dex: 0,
    int: 0,
    pow: 0,
    cha: 0
  }
  const movement = Math.ceil((str + dex) / 5 + 3)

  if (equipment)
    Object.keys(equipment).map(key => {
      const eq = equipment[key]
      if (eq.bonus) Object.keys(eq.bonus).map(bns => (bonuses[bns] += eq.bonus[bns]))
    })
  let totalStats = {}
  Object.keys(attributes).map(attr => (totalStats[attr] = bonuses[attr] + attributes[attr]))
  const apBase = Math.ceil((totalStats.str + totalStats.dex + totalStats.int) / 6)
  const apStart = Math.ceil((totalStats.pow + totalStats.siz) / 4 + 2)
  const apMax = Math.ceil((totalStats.con + totalStats.siz) / 4 + 5)
  // const hpBase = (totalStats.str + totalStats.con * 2 + totalStats.siz * 3) * 2
  const hpMax = (totalStats.con + totalStats.siz) * 10
  return (
    <Card title={`${name} : level ${level.toLocaleString('fr')}`}>
      <div className="character">
        <div className="character--hp">
          HP: {hp} / {hpMax}
        </div>
        <input type="number" value={hpToUpdate} onChange={onChangeHp} />
        <Button onClick={() => onUpdateHp(20)}>update hp</Button>
        <div className="character--ap">
          AP: {ap} / {apMax}
          <br />
          AP start: {apStart}
          <br />
          AP per turn: {apBase}
          <br />
          AP max: {apMax}
        </div>
        <div className="character--title">Attributes</div>
        <div className="character--attributes">
          {Object.keys(bonuses).map(bns => {
            return (
              <div key={bns} className={`character--attributes--${bns}`}>
                <span>
                  {BONUS_NAME[bns]} : {totalStats[bns]} ({attributes[bns]}+{bonuses[bns]})
                </span>{' '}
                <Button onClick={onChangeAttr('add', bns)}> + </Button>{' '}
                <Button onClick={onChangeAttr('remove', bns)}> - </Button>
              </div>
            )
          })}
        </div>
        <div className="character--title">Standard Skills</div>
        <div className="character--standard-skills">
          {Object.keys(standardSkills).map(key => {
            const base = standardSkills[key]
            let total = base
            if (standardSkillsBonuses[key])
              standardSkillsBonuses[key].map(skill => {
                if (typeof skill === 'string') {
                  total += attributes[skill]
                  total += bonuses[skill]
                } else total += skill
              })
            return (
              <div key={key}>
                {key}: {total} (base {base})
              </div>
            )
          })}
        </div>
        <div className="character--title">Professional Skills</div>
        <div className="character--pro-skills">
          {Object.keys(proSkills).map(key => {
            const base = proSkills[key]
            let total = base
            if (proSkillsBonuses[key])
              proSkillsBonuses[key].map(skill => {
                if (typeof skill === 'string') {
                  total += attributes[skill]
                  total += bonuses[skill]
                } else total += skill
              })
            if (base > 0)
              return (
                <div key={key}>
                  {key}: {total} (base {base})
                </div>
              )
          })}
        </div>
        <div className="character--title">Talents</div>
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
        <div className="character--title">Compétences</div>
        {combatSkills && (
          <div className="character--skills">
            {Object.keys(combatSkills).map(key => {
              const skill = skills[key]
              const success = totalStats[skill.attr1] + totalStats[skill.attr2] + combatSkills[key]
              let successString = `${skill.attr1} + ${skill.attr2} + ${combatSkills[key]}`
              return (
                <Fragment key={key}>
                  <div className="character--skills--action">
                    <Button
                      className="character--skills--item"
                      disabled={!(ap - skill.cost >= 0) || (cooldowns && cooldowns[key] > 0)}
                      onClick={() => {
                        onUseSkill(key, skill)
                      }}
                      progress={cooldowns[key] / skill.cooldown * 100}
                    >
                      {key} ({skill.cost})
                    </Button>

                    {cooldowns && (
                      <div className="character--skills--progress">
                        <div>remaining: {cooldowns[key]}</div>
                      </div>
                    )}
                  </div>
                  <div className="character--skill">
                    <div className="character--skill--icon">i</div>
                    <ul className="character--skill--infos">
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
                </Fragment>
              )
            })}
          </div>
        )}
        <div className="character--title">Actions</div>
        <div className="character--action">
          {weapons.length > 0 &&
            weapons.map(weapon => {
              return (
                <Button
                  key={weapon.name}
                  className="character--action--item"
                  disabled={!(ap - weapon.size >= 0)}
                  onClick={() => {
                    onAttack(weapon)
                  }}
                >
                  Attack + {weapon.damage} ({weapon.size})
                </Button>
              )
            })}
          <Button
            className="character--action--item"
            disabled={!(ap > 0)}
            onClick={() => {
              onMove()
            }}
          >
            Move + {movement} (1)
          </Button>
          <Button className="character--action--item" onClick={onDelayTurn}>
            Delay turn
          </Button>
          <Button className="character--action--item" onClick={onEndTurn}>
            Finished !
          </Button>
        </div>
      </div>
      <div className="character--title">Inventaire</div>
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
                <Button onClick={() => onDropItem(key)}>x</Button>
              </div>
            )
          })}
        </div>
      )}
      <div className="character--title">Équipement</div>
      {equipment && (
        <div className="character--equipment">
          {Object.keys(equipment).map(key => {
            const item = equipment[key]
            return (
              <div key={key} className="character--equipment--item">
                {item.name} {item.type === 'equipment' && <Button onClick={() => onUnequip(key, item)}>Unequip</Button>}
              </div>
            )
          })}
        </div>
      )}
    </Card>
  )
}

Character.propTypes = {
  data: PropTypes.shape({
    name: PropTypes.string.isRequired,
    level: PropTypes.number.isRequired,
    combatSkills: PropTypes.object
  }),
  round: PropTypes.number,
  stae: PropTypes.object,
  onSkillClick: PropTypes.func,
  onUseSkill: PropTypes.func,
  onAttack: PropTypes.func,
  onMove: PropTypes.func,
  onEndTurn: PropTypes.func,
  onDelayTurn: PropTypes.func,
  onUpdateHp: PropTypes.func,
  onChangeAttr: PropTypes.func,
  onChangeHp: PropTypes.func,
  onEquip: PropTypes.func,
  onUnequip: PropTypes.func,
  onUseItem: PropTypes.func,
  onDropItem: PropTypes.func,
  hpToUpdate: PropTypes.number,
  skills: PropTypes.object
}

export default Character
