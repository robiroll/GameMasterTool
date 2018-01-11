import React from 'react'
import PropTypes from 'prop-types'
import Card from '../../styleguide/Card'
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
  state,
  onSkillClick
}) => (
  <Card title={`${name} : level ${lvl.toLocaleString('fr')}`}>
    <div className="character">
      <div className="character--ap">
        {ap - state.usedAP} / {apMax}
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
          <div
            key={skill.name}
            className="character--skills--item"
            onClick={() => {
              onSkillClick(skill)
            }}
          >
            {skill.name}
          </div>
        ))}
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
      {equipment.map(item => (
        <div key={item.name} className="character--equipment--item">
          {item.name}
        </div>
      ))}
    </div>
  </Card>
)

Character.propTypes = {
  data: PropTypes.shape({
    name: PropTypes.string.isRequired,
    lvl: PropTypes.number.isRequired
  }),
  skills: PropTypes.array.isRequired,
  stae: PropTypes.object,
  onSkillClick: PropTypes.func
}

export default Character
