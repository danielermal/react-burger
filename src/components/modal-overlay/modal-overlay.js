import React from 'react'
import ReactDOM from 'react-dom'   
import modal from './modal-overlay.module.css'
import PropTypes from 'prop-types';


const modalRoot = document.querySelector('#root')

export const ModalOverlay = (props) => {

    return ReactDOM.createPortal(
      <div className={`${modal.overlay} ${modal.overlay_active}`}>
        {props.children}
      </div>,
      modalRoot
    );
}

ModalOverlay.propTypes = {
  children: PropTypes.element
}