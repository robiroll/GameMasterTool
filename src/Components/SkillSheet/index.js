import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import Button from '../../styleguide/Button'
import Difficulty from '../Difficulty'
import './SkillSheet.scss'

const LABELS = {
  damage: 'Dégâts',
  heal: 'Soins',
  status: 'Statuts',
  magical: 'magiques',
  physical: 'physiques'
}
export default class SkillSheet extends PureComponent {
  static propTypes = {
    skill: PropTypes.object,
    skillValue: PropTypes.number,
    stats: PropTypes.object,
    onAddSkill: PropTypes.func,
    onRemoveSkill: PropTypes.func,
    weapons: PropTypes.array
  }
  render() {
    const { skill, skillValue, stats, onAddSkill, onRemoveSkill, weapons } = this.props
    const success = stats[skill.attr1] + stats[skill.attr2] + skillValue
    const damage = [
      skill.weapon && 'Arme',
      skill.str && 'Force',
      skill.dex && 'Dextérité',
      skill.pow && 'Power',
      skill.siz && 'Taille',
      skill.modifier
    ]
      .filter(Boolean)
      .join(' + ')
    // let damage = 0
    // console.log(weapons)
    return (
      <div className="skill-sheet">
        <h5 className="skill-sheet--title">
          {skill.name} : {skillValue}
          {onAddSkill && onRemoveSkill && (
            <div>
              <Button onClick={onAddSkill} size="small">
                +
              </Button>
              <Button onClick={onRemoveSkill} size="small">
                -
              </Button>
            </div>
          )}
        </h5>
        <ul className="skill-sheet--infos">
          <li className="skill-sheet--infos--item">
            <span className="skill-sheet--infos--item--label">{LABELS[skill.type]} :</span> {damage}
          </li>
          {skill.type === 'damage' && (
            <li className="skill-sheet--infos--item skill-sheet--infos--item--extra">
              {LABELS[skill.type]} {LABELS[skill.damageType]}
            </li>
          )}
          {skill.ignoreArmor && (
            <li className="skill-sheet--infos--item skill-sheet--infos--item--extra">Ignore l’armure</li>
          )}
          <li className="skill-sheet--infos--item">
            <span className="skill-sheet--infos--item--label">Coût :</span> {skill.cost} AP
          </li>
          <li className="skill-sheet--infos--item">
            <span className="skill-sheet--infos--item--label">Cooldown :</span> {skill.cooldown}
          </li>
          <li className="skill-sheet--infos--item">
            <span className="skill-sheet--infos--item--label">Distance :</span> {skill.distance}
          </li>
          <li className="skill-sheet--infos--item">
            <span className="skill-sheet--infos--item--label">Portée :</span> {skill.range}
          </li>
          <li className="skill-sheet--infos--item">
            <span className="skill-sheet--infos--item--label">Description :</span> {skill.description}
          </li>
          <li className="skill-sheet--infos--item">
            <Difficulty title="Réussite" total={success} />
          </li>
        </ul>
      </div>
    )
  }
}
