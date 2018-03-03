import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import Card from '../../styleguide/Card'
import Button from '../../styleguide/Button'
import './Character.css'

import {
  standardSkills as standardSkillsBonuses,
  proSkills as proSkillsBonuses,
  combatSkills as skills
} from './config'

const Character = ({
  data: {
    cooldowns,
    hp,
    hpBase,
    name,
    level,
    ap,
    apBase,
    apStart,
    apMax,
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
  hpToUpdate
}) => {
  const weapon = equipment.weapon
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
  const hpMax = hpBase + (siz + con) * 2
  const movement = Math.ceil((str + dex) / 5 + 3)

  Object.keys(equipment).map(key => {
    const eq = equipment[key]
    if (eq.bonus)
      Object.keys(eq.bonus).map(bns => (bonuses[bns] += eq.bonus[bns]))
  })
  let totalStats = {}
  Object.keys(attributes).map(
    attr => (totalStats[attr] = bonuses[attr] + attributes[attr])
  )
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
        <div className="character--title">Attributs</div>
        <div className="character--attributes">
          <div className="character--attributes--strength">
            Force : {totalStats.str} ({str}+{bonuses.str})
          </div>
          <div className="character--attributes--dexterity">
            Dexterité : {totalStats.dex} ({dex}+{bonuses.dex})
          </div>
          <div className="character--attributes--constitution">
            Constitution : {totalStats.con} ({con}+{bonuses.con})
          </div>
          <div className="character--attributes--size">
            Taille : {totalStats.siz} ({siz}+{bonuses.siz})
          </div>
          <div className="character--attributes--intelligence">
            Intelligence : {totalStats.int} ({int}+{bonuses.int})
          </div>
          <div className="character--attributes--perception">
            Power : {totalStats.pow} ({pow}+{bonuses.pow})
          </div>
          <div className="character--attributes--speed">
            Charisme : {totalStats.cha} ({cha}+{bonuses.cha})
          </div>
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
              let success = 0
              let successString = ''
              skill.success.map(sk => {
                success += totalStats[sk]
                successString += `${sk} + `
              })
              success += combatSkills[key]
              successString += combatSkills[key]
              return (
                <Fragment key={key}>
                  <div className="character--skills--action">
                    <Button
                      className="character--skills--item"
                      disabled={
                        !(ap - skill.cost >= 0) ||
                        (cooldowns && cooldowns[key] > 0)
                      }
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
                      <li>CD: {skill.cooldown}</li>
                      <li>cost: {skill.cost}</li>
                      <li>distance: {skill.distance}</li>
                      <li>range: {skill.range}</li>
                      <li>damage: {skill.damage}</li>
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
          <Button
            className="character--action--item"
            disabled={!(ap - weapon.size >= 0)}
            onClick={() => {
              onAttack(weapon)
            }}
          >
            Attack + {weapon.damage} ({weapon.size})
          </Button>
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
            return (
              <div key={item.name} className="character--inventory--item">
                {item.name}
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
                {item.name}
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
    skills: PropTypes.object
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
  onChangeHp: PropTypes.func,
  hpToUpdate: PropTypes.number
}

export default Character
