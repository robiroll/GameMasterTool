import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import Difficulty from '../Difficulty'
import { Card, Button, Icon, Dialog } from '../../styleguide'
import Target from '../../Containers/Target'
import { STATS } from '../../lib'
import './FightActions.scss'

const FightActions = ({
  character,
  onUseSkill,
  onAttack,
  onMove,
  onUpSp,
  onEndTurn,
  onDelayTurn,
  skills,
  isTargetAttackOpen,
  onOpenTargetAttack,
  onCloseTargetAttack,
  isTargetSkillsOpen,
  onOpenTargetSkills,
  onCloseTargetSkills,
  currentSkill
}) => {
  const { cooldowns, ap, sp, combatSkills, equipment, statuses } = character
  const stats = STATS(character)
  let attackDisabled = false
  let movementDisabled = false
  if (statuses)
    Object.keys(statuses).forEach(key => {
      if (['frozen', 'knocked'].indexOf(key) > -1) attackDisabled = true
      if (['frozen', 'knocked', 'crippled'].indexOf(key) > -1) movementDisabled = true
    })
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
                  <Button disabled={!(ap - 2 >= 0) || attackDisabled} onClick={onOpenTargetAttack}>
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
                      <span>(2)</span>
                    </span>
                  </Button>
                  <div className="fight-actions--standard--item--button--difficulty">
                    <Difficulty title="attack" total={hitPercent} />
                  </div>
                </div>
              )
            })}
          <Dialog isOpen={isTargetAttackOpen} onRequestClose={onCloseTargetAttack}>
            <Target onCloseTarget={onCloseTargetAttack} onAttack={onAttack} character={character} />
          </Dialog>
          <Button className="fight-actions--standard--item" disabled={!(ap > 0) || movementDisabled} onClick={onMove}>
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
              const handleOpenTargetSkills = () => onOpenTargetSkills(key, skill)
              return (
                <Fragment key={key}>
                  <div className="fight-actions--skills--action">
                    <Dialog isOpen={isTargetSkillsOpen && key === currentSkill} onRequestClose={onCloseTargetSkills}>
                      <Target
                        onCloseTarget={onCloseTargetSkills}
                        onUseSkill={onUseSkill}
                        character={character}
                        skillId={key}
                        skill={skill}
                      />
                    </Dialog>
                    <Button
                      className="fight-actions--skills--item"
                      disabled={!(points - skill.cost >= 0) || (cooldowns && cooldowns[key] > 0) || attackDisabled}
                      variant={`${skill.isSymbiosis && 'accent-1'}`}
                      onClick={handleOpenTargetSkills}
                      progress={(cooldowns[key] / skill.cooldown) * 100}
                    >
                      <span className="fight-actions--standard--item--button">
                        <span>{key}</span>
                        {!skill.isSymbiosis && (
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
  skills: PropTypes.object,
  isTargetAttackOpen: PropTypes.bool,
  onOpenTargetAttack: PropTypes.func,
  onCloseTargetAttack: PropTypes.func,
  isTargetSkillsOpen: PropTypes.bool,
  onOpenTargetSkills: PropTypes.func,
  onCloseTargetSkills: PropTypes.func,
  currentSkill: PropTypes.string
}

export default FightActions
