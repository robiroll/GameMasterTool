import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import Difficulty from '../Difficulty'
import Card from '../../styleguide/Card'
import Button from '../../styleguide/Button'
import Icon from '../../styleguide/Icon'
import { STATS } from '../../lib'
import './FightActions.css'

const FightActions = ({ character, onUseSkill, onAttack, onMove, onUpSp, onEndTurn, onDelayTurn, skills }) => {
  const { cooldowns, ap, sp, combatSkills, equipment } = character
  const stats = STATS(character)
  let weapons = []
  if (equipment && equipment.weapon1) weapons.push(equipment.weapon1)
  if (equipment && equipment.weapon2) weapons.push(equipment.weapon2)
  return (
    <Card title={<h3>Actions</h3>}>
      <div className="fight-actions">
        <div className="fight--actions--ap">Remaining Action Points: {ap}</div>
        <div className="fight--actions--sp">Remaining Symbiosis Points: {sp}</div>
        <div className="fight-actions--standard">
          {weapons.length > 0 &&
            weapons.map(weapon => {
              const hitPercent = 50 + stats[weapon.damageType] * 2
              return (
                <div key={weapon.name} className="fight-actions--standard--item">
                  <Button
                    disabled={!(ap - weapon.size >= 0)}
                    onClick={() => {
                      onAttack(weapon)
                    }}
                  >
                    <span className="fight-actions--standard--item--button">
                      <span>Attack</span>
                      <span>
                        <Icon name="target" />
                        {hitPercent}%
                      </span>
                      <span>
                        <Icon name="damage" />
                        {stats[weapon.damageType] + weapon.damage} + <Icon name="dice" />
                      </span>
                      <span>({weapon.size})</span>
                    </span>
                  </Button>
                  <div className="fight-actions--standard--item--button--difficulty">
                    <Difficulty title="attack" total={hitPercent} />
                  </div>
                </div>
              )
            })}
          <Button
            className="fight-actions--standard--item"
            disabled={!(ap > 0)}
            onClick={() => {
              onMove()
            }}
          >
            Move (1)
          </Button>
          <Button className="character--action--item" disabled={!(ap >= sp + 2) || sp >= 5} onClick={onUpSp}>
            SP + 1 ({sp + 2})
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
              const points = skill.type === 'symbiosis' ? sp : ap
              const hitPercent = character.combatSkills[key] + stats[skill.attr1] + stats[skill.attr2]
              return (
                <Fragment key={key}>
                  <div className="fight-actions--skills--action">
                    <Button
                      className="fight-actions--skills--item"
                      disabled={!(points - skill.cost >= 0) || (cooldowns && cooldowns[key] > 0)}
                      variant={`${skill.type === 'symbiosis' && 'accent-1'}`}
                      onClick={() => {
                        onUseSkill(key, skill)
                      }}
                      progress={cooldowns[key] / skill.cooldown * 100}
                    >
                      <span className="fight-actions--standard--item--button">
                        <span>{key}</span>
                        {skill.type !== 'symbiosis' && (
                          <span>
                            <Icon name="target" />
                            {hitPercent}%
                          </span>
                        )}
                        <span>
                          <Icon name="damage" />
                          {skill.damage}
                        </span>
                        <span>({skill.cost})</span>
                      </span>
                    </Button>
                    {skill.type !== 'symbiosis' && (
                      <div className="fight-actions--standard--item--button--difficulty">
                        <Difficulty title={key} total={hitPercent} />
                      </div>
                    )}

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
  character: PropTypes.object,
  onUseSkill: PropTypes.func,
  onAttack: PropTypes.func,
  onMove: PropTypes.func,
  onUpSp: PropTypes.func,
  onEndTurn: PropTypes.func,
  onDelayTurn: PropTypes.func,
  skills: PropTypes.object
}

export default FightActions
