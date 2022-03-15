import React from 'react'
import ReactDOM from 'react-dom'   
import modal from './modal-overlay.module.css'
import PropTypes from 'prop-types';


export const ModalOverlay = (props) => {

    return (
      <div className={`${modal.overlay} ${modal.overlay_active}`} onClick={props.close}>
        {props.children}
      </div>
    );
}

ModalOverlay.propTypes = {
  children: PropTypes.element.isRequired,
  close: PropTypes.func.isRequired
}