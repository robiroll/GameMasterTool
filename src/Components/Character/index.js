import React from 'react'
import PropTypes from 'prop-types'
import Card from '../../styleguide/Card'
import Button from '../../styleguide/Button'
// import { mapKeys } from 'lodash'
// import Equipment from '../Equipment'
import './Character.css'

const STANDARD_SKILLS = {
  athletics: ['str', 'dex']
}

const Character = ({
  data: { name, level, ap, apBase, apStart, apMax, attributes, standardSkills, talents, equipment, inventory, skills },
  onUseSkill,
  onAttack,
  onMove,
  onEndTurn,
  onDelayTurn
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
  // let characterSkills = []
  // let characterEquipment = []
  // let characterTalents = []
  // let characterInventory = []

  // TODO: Use Object.entries instead of creating new objects
  // Skills
  // for (const key in skills) {
  //   if (skills.hasOwnProperty(key)) {
  //     characterSkills.push({ ...skills[key], name: key })
  //   }
  // }
  // equipment
  // for (const key in equipment) {
  //   if (equipment.hasOwnProperty(key)) {
  //     characterEquipment.push({ ...equipment[key], slot: key })
  //   }
  // }
  // Talents
  // for (const key in talents) {
  //   if (equipment.hasOwnProperty(key)) {
  //     characterEquipment.push({ ...equipment[key], slot: key })
  //   }
  // }
  // Inventory
  // for (const key in equipment) {
  //   if (equipment.hasOwnProperty(key)) {
  //     characterEquipment.push({ ...equipment[key], slot: key })
  //   }
  // }
  // total bonuses
  Object.keys(equipment).map(key => {
    const eq = equipment[key]
    if (eq.bonus) Object.keys(eq.bonus).map(bns => (bonuses[bns] += eq.bonus[bns]))
  })
  // characterEquipment.map(item => {
  //   for (const key in item.bonus) {
  //     if (item.bonus.hasOwnProperty(key)) {
  //       bonuses[key] += item.bonus[key]
  //     }
  //   }
  // })

  return (
    <Card title={`${name} : level ${level.toLocaleString('fr')}`}>
      <div className="character">
        <div className="character--ap">
          {apBase} / {apMax} / {apStart}
        </div>
        <div className="character--title">Attributs</div>
        <div className="character--attributes">
          <div className="character--attributes--strength">
            Force : {str} (+{bonuses.str})
          </div>
          <div className="character--attributes--dexterity">
            Dexterité : {dex} (+{bonuses.dex})
          </div>
          <div className="character--attributes--constitution">
            Constitution : {con} (+{bonuses.con})
          </div>
          <div className="character--attributes--size">
            Taille : {siz} (+{bonuses.siz})
          </div>
          <div className="character--attributes--intelligence">
            Intelligence : {int} (+{bonuses.int})
          </div>
          <div className="character--attributes--perception">
            Power : {pow} (+{bonuses.pow})
          </div>
          <div className="character--attributes--speed">
            Charisme : {cha} (+{bonuses.cha})
          </div>
        </div>
        <div className="character--title">Standard Skills</div>
        <div className="character--standard-skills">
          {Object.keys(standardSkills).map(key => {
            const base = standardSkills[key]
            let total = base
            if (STANDARD_SKILLS[key])
              STANDARD_SKILLS[key].map(skill => {
                total += attributes[skill]
                total += bonuses[skill]
              })
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
        {skills && (
          <div className="character--skills">
            {Object.keys(skills).map(key => {
              const skill = skills[key]
              return (
                <Button
                  key={key}
                  className="character--skills--item"
                  disabled={!(ap - skill.cost >= 0)}
                  onClick={() => {
                    onUseSkill(skill)
                  }}
                >
                  {skill.name} ({skill.cost})
                </Button>
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
            Attack ({weapon.size})
          </Button>
          <Button
            className="character--action--item"
            disabled={!(ap > 0)}
            onClick={() => {
              onMove()
            }}
          >
            Move (1)
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
  stae: PropTypes.object,
  onSkillClick: PropTypes.func,
  onUseSkill: PropTypes.func,
  onAttack: PropTypes.func,
  onMove: PropTypes.func,
  onEndTurn: PropTypes.func,
  onDelayTurn: PropTypes.func
}

export default Character
