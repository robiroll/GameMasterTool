import React from 'react'
import PropTypes from 'prop-types'
import Modal from 'react-modal'

const Dialog = ({ children, ...props }) => (
  <Modal className="card modal--content" overlayClassName="modal--overlay" ariaHideApp={false} {...props}>
    {children}
  </Modal>
)

Dialog.propTypes = {
  children: PropTypes.node.isRequired
}

export default Dialog
