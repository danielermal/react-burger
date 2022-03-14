import React from 'react'
import modal from './modal-overlay.module.css'
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import { cardPropTypes } from '../../utils/types'
import PropTypes from 'prop-types';

export const Modal = (props) => {

    const closeModal = props.onClose

    const closeByEsc = (evt) => {
        if (evt.key === 'Escape') {
            closeModal()
        }
    }

    const closeByClick = (evt) => {
        if (evt.target.classList.contains('modal-overlay_overlay__bjKWl')) {
            closeModal()
        }
    }

    React.useEffect(() => {
        document.addEventListener('keydown', closeByEsc)
        document.addEventListener('click', closeByClick)

        return () => {
            document.removeEventListener('keydown', closeByEsc)
            document.removeEventListener('click', closeByClick)
        }
    }, [])

    return (
        <div className={modal.container}>
          <button className={modal.button} onClick={props.onClose}>
            <CloseIcon type="primary" />
          </button>
          {props.children}
        </div>
    );
}

Modal.propTypes = {
    onClose: PropTypes.func.isRequired,
    children: PropTypes.element.isRequired
}