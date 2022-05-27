import React from 'react'
import ReactDOM from 'react-dom'   
import modal from './modal-overlay.module.css'
import PropTypes from 'prop-types';


export const ModalOverlay = (props) => {

    return (
      <div className={props.close ? modal.overlay : `${modal.overlay} ${modal.overlay_black}`} onClick={props.close ? props.close : null}>
        {props.children}
      </div>
    );
}

ModalOverlay.propTypes = {
  children: PropTypes.element.isRequired,
  close: PropTypes.func
}