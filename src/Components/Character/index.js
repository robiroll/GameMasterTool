import React from 'react'
import PropTypes from 'prop-types'
import Card from '../../styleguide/Card'
import Button from '../../styleguide/Button'
import './Character.css'

const Character = ({
  data: {
    name,
    lvl,
    ap,
    apMax,
    attributes: { strength, dexterity, constitution, intelligence, perception, speed },
    talents,
    equipment,
    inventory
  },
  skills,
  onUseSkill,
  onAttack,
  onMove,
  onEndTurn,
  onDelayTurn
}) => {
  return (
    <Card title={`${name} : level ${lvl.toLocaleString('fr')}`}>
      <div className="character">
        <div className="character--ap">
          {ap} / {apMax}
        </div>
        <div className="character--title">Attributs</div>
        <div className="character--attributes">
          <div className="character--attributes--strength">Force : {strength}</div>
          <div className="character--attributes--dexterity">Dexterité : {dexterity}</div>
          <div className="character--attributes--constitution">Constitution : {constitution}</div>
          <div className="character--attributes--intelligence">Intelligence : {intelligence}</div>
          <div className="character--attributes--perception">Perception : {perception}</div>
          <div className="character--attributes--speed">Vitesse : {speed}</div>
        </div>
        <div className="character--title">Talents</div>
        <div className="character--talents">
          {talents.map(talent => (
            <div key={talent.name} className="character--talents--item">
              {talent.name}
            </div>
          ))}
        </div>
        <div className="character--title">Compétences</div>
        <div className="character--skills">
          {skills.map(skill => (
            <Button
              key={skill.name}
              className="character--skills--item"
              disabled={!(ap - skill.cost >= 0)}
              onClick={() => {
                onUseSkill(skill)
              }}
            >
              {skill.name} ({skill.cost})
            </Button>
          ))}
        </div>
        <div className="character--title">Actions</div>
        <div className="character--action">
          <Button
            className="character--action--item"
            disabled={!(ap - equipment.weapon.size >= 0)}
            onClick={() => {
              onAttack(equipment.weapon)
            }}
          >
            Attack ({equipment.weapon.size})
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
      <div className="character--inventory">
        {inventory.map(item => (
          <div key={item.name} className="character--inventory--item">
            {item.name}
          </div>
        ))}
      </div>
      <div className="character--title">Équipement</div>
      <div className="character--equipment">
        {equipment.weapon.name} <br />
        - Dégâts : {equipment.weapon.damage} <br />
        - Taille : {equipment.weapon.size}
      </div>
    </Card>
  )
}

Character.propTypes = {
  data: PropTypes.shape({
    name: PropTypes.string.isRequired,
    lvl: PropTypes.number.isRequired
  }),
  skills: PropTypes.array.isRequired,
  stae: PropTypes.object,
  onSkillClick: PropTypes.func,
  onUseSkill: PropTypes.func,
  onAttack: PropTypes.func,
  onMove: PropTypes.func,
  onEndTurn: PropTypes.func,
  onDelayTurn: PropTypes.func
}

export default Character
