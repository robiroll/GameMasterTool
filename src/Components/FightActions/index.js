import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import Card from '../../styleguide/Card'
import Button from '../../styleguide/Button'
import './FightActions.css'

const FightActions = ({
  data: { cooldowns, ap, attributes, combatSkills, equipment },
  onUseSkill,
  onAttack,
  onMove,
  onEndTurn,
  onDelayTurn,
  skills
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

  return (
    <Card title={<h3>Actions</h3>}>
      <div className="fight-actions">
        <div className="fight--actions--ap">Remaining Action Points: {ap}</div>
        <div className="fight-actions--standard">
          {weapons.length > 0 &&
            weapons.map(weapon => {
              return (
                <Button
                  key={weapon.name}
                  className="fight-actions--standard--item"
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
            className="fight-actions--standard--item"
            disabled={!(ap > 0)}
            onClick={() => {
              onMove()
            }}
          >
            Move + {movement} (1)
          </Button>
          <Button className="fight-actions--standard--item" onClick={onDelayTurn}>
            Delay turn
          </Button>
          <Button className="fight-actions--standard--item" onClick={onEndTurn}>
            Finished !
          </Button>
        </div>
        {combatSkills && (
          <div className="fight-actions--skills">
            {Object.keys(combatSkills).map(key => {
              const skill = skills[key]
              return (
                <Fragment key={key}>
                  <div className="fight-actions--skills--action">
                    <Button
                      className="fight-actions--skills--item"
                      disabled={!(ap - skill.cost >= 0) || (cooldowns && cooldowns[key] > 0)}
                      onClick={() => {
                        onUseSkill(key, skill)
                      }}
                      progress={cooldowns[key] / skill.cooldown * 100}
                    >
                      {key} ({skill.cost})
                    </Button>

                    {cooldowns && (
                      <div className="fight-actions--skills--progress">
                        <div>remaining: {cooldowns[key]}</div>
                      </div>
                    )}
                  </div>
                </Fragment>
              )
            })}
          </div>
        )}
      </div>
    </Card>
  )
}

FightActions.propTypes = {
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

export default FightActions
