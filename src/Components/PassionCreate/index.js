import React from 'react'
import PropTypes from 'prop-types'
import Button from '../../styleguide/Button'
import './PassionCreate.scss'

const PassionCreate = ({ name, onChangeInput, attr1, attr2, onChangeAttr, onCreate }) => (
  <div className="passion-create">
    <div className="passion-create--input">
      <input type="text" value={name} placeholder="What do you like?" onChange={onChangeInput} />
    </div>
    <div className="passion-create--options">
      <select name="attr1" id="attr1" value={attr1} onChange={onChangeAttr('attr1')}>
        <option value="str">str</option>
        <option value="dex">dex</option>
        <option value="con">con</option>
        <option value="pow">pow</option>
        <option value="cha">cha</option>
        <option value="int">int</option>
        <option value="siz">siz</option>
      </select>
    </div>
    <div className="passion-create--options">
      <select name="attr2" id="attr2" value={attr2} onChange={onChangeAttr('attr2')}>
        <option value="str">str</option>
        <option value="dex">dex</option>
        <option value="con">con</option>
        <option value="pow">pow</option>
        <option value="cha">cha</option>
        <option value="int">int</option>
        <option value="siz">siz</option>
      </select>
    </div>
    <div className="passion-create--action">
      <Button size="small" format="full" onClick={onCreate} disabled={name.length < 2}>
        Valider
      </Button>
    </div>
  </div>
)

PassionCreate.propTypes = {
  name: PropTypes.string,
  onChangeInput: PropTypes.func,
  attr1: PropTypes.string,
  attr2: PropTypes.string,
  onChangeAttr: PropTypes.func,
  onCreate: PropTypes.func
}

export default PassionCreate
