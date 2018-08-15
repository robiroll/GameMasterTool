import React from 'react'
import PropTypes from 'prop-types'
import './Difficulty.css'

const Difficulty = ({ title, total }) => {
  const veryEasy = total * 2
  const easy = Math.round(total * 1.5)
  const standard = Math.round(total)
  const hard = Math.round(total / 3 * 2)
  const formidable = Math.round(total / 2)
  const herculean = Math.round(total / 5)
  return (
    <div className="difficulty">
      <div className="difficulty--title">{title}</div>
      <div className="difficulty--content">
        <ul>
          <li>
            <span>Very easy:</span>
            <span className="separator" />
            <span>
              {veryEasy} ({Math.round(veryEasy * 0.1)})
            </span>
          </li>
          <li>
            <span>Easy:</span>
            <span className="separator" />
            <span>
              {easy} ({Math.round(easy * 0.1)})
            </span>
          </li>
          <li>
            <span>Standard:</span>
            <span className="separator" />
            <span>
              {standard} ({Math.round(standard * 0.1)})
            </span>
          </li>
          <li>
            <span>Hard:</span>
            <span className="separator" />
            <span>
              {hard} ({Math.round(hard * 0.1)})
            </span>
          </li>
          <li>
            <span>Formidable:</span>
            <span className="separator" />
            <span>
              {formidable} ({Math.round(formidable * 0.1)})
            </span>
          </li>
          <li>
            <span>Herculean:</span>
            <span className="separator" />
            <span>
              {herculean} ({Math.round(herculean * 0.1)})
            </span>
          </li>
        </ul>
      </div>
    </div>
  )
}

Difficulty.propTypes = {
  title: PropTypes.string.isRequired,
  total: PropTypes.number.isRequired
}

export default Difficulty
