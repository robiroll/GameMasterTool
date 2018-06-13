import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import Card from '../../styleguide/Card'
import Button from '../../styleguide/Button'
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
  data: { cooldowns, hp, name, ap, attributes, combatSkills, standardSkills, proSkills, talents, equipment, inventory },
  onUseSkill,
  onAttack,
  onMove,
  onEndTurn,
  onDelayTurn,
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
  onToggleAttributes,
  onToggleStandardSkills,
  onToggleProSkills,
  isAttributesOpen,
  isStandardSkillsOpen,
  isProSkillsOpen
}) => {
  let weapons = []
  if (equipment && equipment.weapon1) weapons.push(equipment.weapon1)
  if (equipment && equipment.weapon2) weapons.push(equipment.weapon2)
  let bonuses = {
    str: 0,
    siz: 0,
    con: 0,
    dex: 0,
    int: 0,
    pow: 0,
    cha: 0
  }
  if (equipment)
    Object.keys(equipment).map(key => {
      const eq = equipment[key]
      if (eq.bonus) Object.keys(eq.bonus).map(bns => (bonuses[bns] += eq.bonus[bns]))
    })
  let totalStats = {}
  Object.keys(attributes).map(attr => (totalStats[attr] = bonuses[attr] + attributes[attr]))
  const { str, dex, siz } = attributes
  const movement = Math.ceil((str + dex - siz) / 5 + 3)

  const apBase = AP(totalStats).base
  const apStart = AP(totalStats).start
  const apMax = AP(totalStats).max
  const hpMax = HP_MAX(totalStats)
  return (
    <Card title={<h2>{name}</h2>}>
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
        <h3 className="character--title" onClick={onToggleAttributes}>
          Attributes <span>{isAttributesOpen ? '⇡' : '⇣'}</span>
        </h3>
        {isAttributesOpen && (
          <div className="character--attributes">
            {Object.keys(bonuses).map(bns => {
              return (
                <div key={bns} className={`character--attributes--${bns}`}>
                  <span>
                    {BONUS_NAME[bns]} : {totalStats[bns]} ({attributes[bns]}+{bonuses[bns]})
                  </span>{' '}
                  <Button onClick={onChangeAttr('add', bns)} size="small">
                    +
                  </Button>{' '}
                  <Button onClick={onChangeAttr('remove', bns)} size="small">
                    -
                  </Button>
                </div>
              )
            })}
          </div>
        )}
        <h3 className="character--title" onClick={onToggleStandardSkills}>
          Standard Skills <span>{isStandardSkillsOpen ? '⇡' : '⇣'}</span>
        </h3>
        {isStandardSkillsOpen && (
          <div className="character--standard-skills">
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
                <div key={key} className="character--standard-skills--item">
                  <div>
                    {key}: {total} (base {base})
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
          Professional Skills <span>{isProSkillsOpen ? '⇡' : '⇣'}</span>
        </h3>
        {isProSkillsOpen && (
          <div className="character--standard-skills">
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
                <div key={key} className="character--standard-skills--item">
                  <div>
                    {key}: {total} (base {base})
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
        <h3 className="character--title">Actions</h3>
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
  onChangeSkill: PropTypes.func,
  onChangeHp: PropTypes.func,
  onEquip: PropTypes.func,
  onUnequip: PropTypes.func,
  onUseItem: PropTypes.func,
  onDropItem: PropTypes.func,
  hpToUpdate: PropTypes.number,
  skills: PropTypes.object,
  onToggleAttributes: PropTypes.func,
  onToggleStandardSkills: PropTypes.func,
  onToggleProSkills: PropTypes.func,
  isAttributesOpen: PropTypes.bool,
  isStandardSkillsOpen: PropTypes.bool,
  isProSkillsOpen: PropTypes.bool
}

export default Character
